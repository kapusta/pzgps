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
let db = new PouchDB(conf.couchdb + '/' + dbname);

class SaveClimb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false, // is the page saving data?
      searching: false, // is the page searching for data?
      updateLocation: false,
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
      doc: null, // kill the db doc in state if/when the user changes the name
      route
    });
  }
  handleCheckbox = evt => {
    console.log(evt);
    this.setState({
      updateLocation: !this.state.updateLocation
    })
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
        searching: false,
        doc,
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
  create = evt => {
    var that = this;
    this.setState({
      saving: true
    });
    db.put(merge({
      _id: this.state.route.name
    }, this.state.route, this.props.gpsData))
    .then(function(response) {
      that.setState({
        saving: false
      });
    });
  }
  save = evt => {
    var that = this;
    this.setState({
      saving: true
    });
    // TODO: if "update location" checked also merge `this.props.gpsData`
    let data = merge({}, this.state.doc, this.state.route);
    db.put(data)
    .then(function(response) {
      that.setState({
        saving: false
      });
    }).catch(function(err) {
      that.setState({
        saving: false
      });
    });
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

            <div class="row">
              <label for="route" className={labelStyles}>Route</label>
              <div className="col-lg-8">
                <input id="name" placeholder="Name of the Route" type="text" className="form-control" value={this.state.route.name} onKeyUp={this.handleChange} />
                {(this.state.doc) ?
                  <span>
                    <input
                      type="checkbox"
                      id="updateLocation"
                      name="updateLocation"
                      onClick={this.handleCheckbox}
                      checked={this.state.updateLocation}
                    /> <small><label for="updateLocation">Update "{this.state.route.name}" to current location?</label></small>
                  </span> : ''
                }
              </div>
            </div>

            <div class="row">
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
            </div>

            <div class="row">
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
            </div>

          </form>
        </div>

        {/* if there IS NOT a `doc` from the database, then we are creating a new `doc` */}
        {/* if there IS a `doc` from the database, then we are saving an update to the `doc` */}
        <button
          bs-button
          className={saveButtonStyles}
          onClick={(this.state.doc) ? this.save : this.create}
          disabled={this.state.saving}
        >
          <i className={saveButtonIcon} aria-hidden="true"></i> {(this.state.doc) ? 'Save' : 'Create'}
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
