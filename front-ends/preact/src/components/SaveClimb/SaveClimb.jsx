import { h, Component } from 'preact';
import shortid from 'shortid';
import Select from 'react-select';
import classNames from 'classnames/bind';
import PouchDB from 'pouchdb';
import styles from './saveclimb.css';
import conf from '../../lib/conf.js';
import { yds } from '../../lib/ratings.js';
import merge from 'lodash/merge';

let dbname = 'routes'
let db = PouchDB(conf.couchdb + '/' + dbname);

class SaveClimb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false, // is the page saving data
      searching: false, // is the page saving data
      route: {
        name: '',
        pitches: 3,
        rating: '5.5'
      }
    };
    this.pitches = new Array(30).fill(0).map((val, idx) => {
      return {
        'value': idx + 1,
        'label': idx + 1
      };
    });
    this.props.socket.onmessage = e => {
      let parsedData = JSON.parse(e.data);
      if (parsedData.event === 'pzgps.new.route') {
        console.log('new route', parsedData);
        this.setState({
          saving: false
        });
      }
    };
  }
  handleRatingChange = val => {
    let route = merge({}, this.state.route, {rating: val.value});
    this.setState({
      route
    });
  }
  handlePitchesChange = val => {
    let route = merge({}, this.state.route, {pitches: val.value});
    this.setState({
      route
    });
  }
  handleChange = evt => {
    let route = merge({}, this.state.route, {[evt.target.id]: evt.target.value});
    this.setState({
      _rev: null, // kill the db doc _rev value if/when the user changes the name
      route
    });
  }
  logState = () => {
    console.log(this.state);
  }
  search = () => {
    let that = this; // gross, need it for the promise closure
    this.setState({
      searching: true
    });
    // get data based on the name, if found, use the data to
    // prepopulate the rest of the form
    db.get(this.state.route.name)
    .then(function(doc){
      let route = merge({}, {
        name: doc.name,
        pitches: doc.pitches,
        rating: doc.rating
      });
      that.setState({
        _rev: doc._rev,
        searching: false,
        route
      });
    })
    .catch(function(err) {
      console.error(err);
      that.setState({
        searching: false
      });

    });
  }
  save = evt => {
    this.setState({
      saving: true
    });

    db.put(merge({
      _id: (this.state._rev) ? this.state._rev : this.state.route.name
    }, this.state.route, this.props.gpsData));

    this.props.socket.send(JSON.stringify({
      action: 'newRoute',
      route: this.state.route
    }));
  }
  render() {
    let cn = classNames.bind(styles);
    let labelStyles = cn('col-lg-2 col-form-label', {
      'label': true
    });
    let loggerStyles = cn('btn btn-sm mybuttons', {
      mybuttons: true // add css module styles
    });
    let searchButtonStyles = cn('btn btn-sm', {
      mybuttons: true // add css module styles
    });
    let searchButtonIcon = cn('fa', {
      'fa-search': !this.state.searching,
      'fa-spinner': this.state.searching,
      'fa-spin': this.state.searching
    });
    let saveButtonStyles = cn('btn btn-sm btn-primary');
    let saveButtonIcon = cn('fa', {
      'fa-floppy-o': !this.state.saving,
      'fa-spinner': this.state.saving,
      'fa-spin': this.state.saving
    });

    return (
      <div className="col-lg-6">
        <h4 className="card-title">Save New Climb</h4>
        <div className="card card-block">
          <form>

            <label for="route" className={labelStyles}>Route</label>
            <div className="col-lg-8">
              <input id="name" placeholder="Name of the Route" type="text" className="form-control" value={this.state.route.name} onKeyUp={this.handleChange} />
            </div>
            <br/><br/>

            <label for="pitches" className={labelStyles}>Pitches</label>
            <div className="col-lg-8">
              <Select
                name="pitches"
                id="pitches"
                value={this.state.route.pitches}
                options={this.pitches}
                onChange={this.handlePitchesChange}
              />
            </div>
            <br/><br/>

            <label for="rating" className={labelStyles}>Rating</label>
            <div className="col-lg-8">
              <Select
                name="rating"
                id="rating"
                value={this.state.route.rating}
                options={yds}
                onChange={this.handleRatingChange}
              />
            </div>

          </form>
        </div>

        <button
          bs-button
          className={saveButtonStyles}
          onClick={this.save}
          disabled={this.state.saving}
        >
          <i className={saveButtonIcon} aria-hidden="true"></i> Save
        </button>

        <button
          bs-button
          className={searchButtonStyles}
          onClick={this.search}
          disabled={this.state.searching || !this.state.route.name}
        >
          <i className={searchButtonIcon} aria-hidden="true"></i> Look Up By Route Name
        </button>

        <button
          bs-button
          className={loggerStyles}
          onClick={this.logState}
        >
          <i className="fa fa-list" aria-hidden="true"></i> Log State
        </button>
      </div>
    );
  }
}

export default SaveClimb;
