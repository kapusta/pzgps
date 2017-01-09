import { h, Component } from 'preact';
import classNames from 'classnames/bind';
import styles from './RouteEditor.css';

// database things
// all of this should be in /lib/db.js
import conf from '../../lib/conf.js';
import PouchDB from 'pouchdb';
const dbname = 'routes';
let localDB = new PouchDB(dbname);
let remoteDB = new PouchDB(conf.couchdb + '/' + dbname);

// https://pouchdb.com/guides/queries.html
var ddoc = {
  _id: '_design/routes',
  views: {
    by_name: {
      map: function (doc) { emit(doc.name); }.toString()
    }
  }
};
// save it
localDB.put(ddoc).then(function () {
  // success!
}).catch(function (err) {
  // some error (maybe a 409, because it already exists?)
});

class Db extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false, // are we online?
    };
  }
  componentWillMount = () => {
    // check if we're online, setState accordingly
  }
  render() {
    // maybe a tiny "you're online" indicator?
    <div></div>
  }
}

export default Db;
