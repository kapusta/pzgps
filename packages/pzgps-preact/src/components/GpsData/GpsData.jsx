import { h, Component } from 'preact';
import RouteEditor from '../RouteEditor/RouteEditor.jsx';
import shortid from 'shortid';
import classnames from 'classnames/bind';
import styles from './gpsdata.css';
import Select from 'react-select';
import KeyValuePair from '../KeyValuePair/KeyValuePair.jsx';

class GpsData extends Component {
  constructor(props) {
    super(props);
  }
  selectChanged = val => {
    this.setState({
      climbRating: val
    });
  }
  handleChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }
  render() {
    let cn = classnames.bind(styles);
    let rawdata = cn('card card-block', {
      'rawdata': true
    });
    return (
      <div className="row">
        <div className="col-lg-6">
          <h4 className="card-title">GPS Data</h4>
          <div className="card card-block">
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
              value={this.props.gpsData.alt = ' meters'}
            />
          </div>
          <br/>
        </div>

        <div className="col-lg-6">
          <h4 className="card-title">Raw Data</h4>
          <div className={rawdata}>
            <div>
              {Object.keys(this.props.gpsData).map((val) => {
                return (
                  <KeyValuePair
                    key={shortid.generate()}
                    label={val}
                    value={this.props.gpsData[val]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GpsData;
