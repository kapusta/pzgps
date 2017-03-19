/* global emit:false */
/*
  @global `emit` is in scope in getRoutes() when run in PouchDB context
  @see https://pouchdb.com/guides/queries.html
*/
import { h, Component } from 'preact';
import Select from 'react-select';
import classNames from 'classnames/bind';
import styles from './RouteEditor.css';
import { yds } from '../../lib/ratings.js';
import merge from 'lodash/merge';
import ListRoutes from '../ListRoutes/ListRoutes.jsx';
import CragInput from './CragInput.jsx';
import KeyValuePair from '../KeyValuePair/KeyValuePair.jsx';

class RouteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false, // is the page saving data?
      searching: false, // is the page searching for data?
      updateLocation: false,
      routeList: [],
      route: {
        crag: '',
        name: '',
        pitches: null,
        rating: null
      }
    };
    this.pitches = new Array(30).fill(0).map((val, idx) => {
      return {
        'value': idx + 1,
        'label': idx + 1
      };
    });
  }
  componentDidMount = () => {
    this.getRoutes();
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
  handleRouteChange = (evt, data) => {
    if (evt.keyCode === 13) { // return
      this.search(data);
    }
    let route = merge({}, this.state.route, {name: evt.target.value});
    this.setState({
      doc: null, // kill the doc in state if/when the user changes the name
      route
    });
  }
  handleCragChange = crag => {
    let route = merge({}, this.state.route, {crag: crag});
    this.setState({
      route
    });
  }
  handleCheckbox = evt => {
    this.setState({
      updateLocation: !this.state.updateLocation
    });
  }
  logState = () => {
    console.log(this.state);
  }
  search = ({db, name}) => {
    if (name.length) {
      this.setState({
        searching: true
      });
      // get data based on the name, if found, use the data to
      // prepopulate the rest of the form
      this.props[db].get(name)
      .then(doc => {
        let route = merge({}, {
          crag: (doc.crag) ? doc.crag : this.state.route.crag,
          name: doc.name,
          pitches: doc.pitches,
          rating: doc.rating
        });
        this.setState({
          searching: false,
          doc,
          route
        });
      })
      .catch(err => {
        this.setState({
          searching: false
        });
        console.error('searched for', name, 'but no route found', err);
      });
    }
  }
  removeRoute = route => {
    this.props.routesDb.get(route._id).then(doc => {
      return this.props.routesDb.remove(doc);
    }).then(response => {
      this.getRoutes();
    }).catch(err => {
      console.error('failed to delete a route', err);
    });
  }
  create = evt => {
    this.setState({
      saving: true
    });
    let newRoute = merge(
      { _id: this.state.route.name },
      this.state.route,
      this.props.gpsData
    );
    this.props.routesDb.put(newRoute).then(response => {
      this.getRoutes();
      this.setState({
        saving: false,
        doc: null,
        route: {
          name: ''
        }
      });
    });
  }
  save = evt => {
    // get attr data from the clicked button via the undocumented Symbol feature
    // @see https://twitter.com/_developit/status/815027807818514432
    // let attrData = evt.target[Symbol.for('preactattr')];
    this.setState({
      saving: true
    });

    let routeData = merge(
      {}, // new object
      this.state.doc, // the document from the database
      this.state.route, // the route data from the from in the UI
      ((this.state.updateLocation) ? this.props.gpsData : {}) // gps data if  update location is true
    );

    this.props.routesDb.put(routeData)
    .then(response => {
      this.getRoutes();
      this.setState({
        saving: false,
        doc: null,
        route: {
          name: ''
        }
      });
    }).catch(err => {
      this.setState({
        saving: false
      });
    });
  }
  getRoutes = () => {
    function getRoutes(doc) {
      emit(doc.name);
    }
    let opt = {
      include_docs: true
    };
    this.props.routesDb.query(getRoutes, opt).then(res => {
      let routeList = res.rows.map(route => {
        return route.doc;
      });
      this.setState({
        routeList
      });
    }).catch(err => {
      return err;
    });
  }
  render() {
    let cn = classNames.bind(styles);
    let rowStyles = cn('row', {
      'row-route': true
    });
    let labelStyles = cn('col-lg-2 col-form-label', {
      'label': true
    });
    let valueStyles = cn('col-lg-6', {
      'value': true
    });
    let loggerStyles = cn('btn btn-sm mybuttons', {
      mybuttons: true // add css module styles
    });
    let searchButtonStyles = cn('fa', {
      'search-enabled': this.state.route.name, // there has to be a better...
      'search-disabled': !this.state.route.name, // ...way to do this.
      'fa-search-plus': !this.state.searching,
      'fa-spinner': this.state.searching,
      'fa-spin': this.state.searching
    });
    let saveButtonStyles = cn('btn btn-sm btn-primary');
    let saveButtonIcon = cn('fa', {
      'fa-floppy-o': !this.state.saving,
      'fa-spinner': this.state.saving,
      'fa-spin': this.state.saving
    });
    let inputGroupAddon = cn('input-group-addon', {
      'blue': this.state.route.name
    });

    return (
      <div className="row">

        <div className="col-lg-6">
          <h4 className="card-title">{(this.state.doc) ? 'Save' : 'Create New'} Route</h4>
          <div className="card card-block">
            <form>

              <CragInput label="Crag" db={this.props.cragsDb} handleCragChange={this.handleCragChange}/>

              <div className={rowStyles}>
                <label for="route" className={labelStyles}>Route</label>
                <div className="col-lg-8">
                  <div className="input-group">
                    <input
                      id="route-name"
                      placeholder="Name of the Route"
                      type="text"
                      className="form-control"
                      value={this.state.route.name}
                      onKeyUp={(evt) => this.handleRouteChange(evt, {
                        db: 'routesDb',
                        name: this.state.route.name
                      })}
                    /><span className={inputGroupAddon}>
                      <i
                        className={searchButtonStyles}
                        onClick={() => this.search({
                          db: 'routesDb',
                          name: this.state.route.name
                        })}
                      ></i>
                    </span>
                  </div>

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

              <div className={rowStyles}>
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

              <div className={rowStyles}>
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

              <KeyValuePair
                label="Latitude"
                value={this.props.gpsData.lat}
              />

              <KeyValuePair
                label="Longitude"
                value={this.props.gpsData.lon}
              />

              <KeyValuePair
                label="Altitude"
                value={this.props.gpsData.alt + ' meters'}
              />

            </form>
          </div>
          <br/>

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
            className={loggerStyles}
            onClick={this.logState}
          >
            <i className="fa fa-list" aria-hidden="true"></i> Log State
          </button>
          <br/><br/>
        </div>

        <ListRoutes
          lat={this.props.gpsData.lat}
          lon={this.props.gpsData.lon}
          removeRoute={this.removeRoute}
          routeList={this.state.routeList}
        />

      </div>
    );
  }
}

export default RouteEditor;
