/* global emit */
import conf from './conf.js';
import PouchDB from 'pouchdb';

let databases = {};
let cancelSync = name => {
  databases[name + '-sync'].cancel();
};

// these could get a bit out of hand overtime, consider moving out to separate files
let queries = {
  routes: {
    _id: '_design/routes',
    views: {
      by_name: {
        map: function (doc) { emit(doc.name); }.toString()
      }
    }
  },
  boulders: {
    _id: '_design/boulders',
    views: {
      by_name: {
        map: function (doc) { emit(doc.name); }.toString()
      }
    }
  }
};

const init = () => {
  ['routes', 'boulders'].forEach(name => {
    console.log('Initializing ' + name + ' database...');
    databases[name + '-local'] = new PouchDB(name);
    databases[name + '-remote'] = new PouchDB(conf.couchdb + '/' + name);
    databases[name + '-sync'] = databases[name + '-local'].sync(databases[name + '-remote'], {
      live: true,
      retry: true
    }).on('complete', n => {
      console.log('local/remote database synced', n);
    }).on('error', err => {
      console.error('replication error', err);
    });
  });

  Object.keys(queries).forEach(q => {
    databases[q + '-local'].put(queries[q]).then(() => {
      console.log('PUT query into db', q);
    }).catch(err => {
      if (err.status !== 409) {
        console.error('FAILED to PUT query into db', err);
      }
    });
  });

};


export default {
  cancelSync,
  databases,
  init
};
