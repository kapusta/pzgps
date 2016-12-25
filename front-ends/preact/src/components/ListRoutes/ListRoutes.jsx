import { h, Component } from 'preact';
import shortid from 'shortid';
import styles from './listroutes.css';

// database
import PouchDB from 'pouchdb';
import conf from '../../lib/conf.js';
let dbname = 'routes'
let db = new PouchDB(conf.couchdb + '/' + dbname);

class ListRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: []
    };
  }
  componentWillMount = () => {
    let that = this;
    /*
      @see https://pouchdb.com/api.html#batch_fetch
      @example db.allDocs([options], [callback])
    */
    db.allDocs({
      include_docs: true,
      attachments: false
    }).then(function(result) {
      console.log(result);
      var docs = result.rows.map(function(row) {
        return row.doc;
      });
      that.setState({
        docs
      });
    }).catch(function(err) {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="col-lg-6">
        <h4 className="card-title">Known Routes</h4>
        <div className="card card-block">
          <ul>
          {this.state.docs.map((val) => {
            return (
              <li key={shortid.generate()}>{val.name}</li>
            );
          })}
          </ul>
        </div>
      </div>
    );
  }

}

export default ListRoutes;
