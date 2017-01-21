import { h, Component } from 'preact';
import RouteEditor from '../RouteEditor/RouteEditor.jsx';
import shortid from 'shortid';
import classNames from 'classnames/bind';
import styles from './gpsdata.css';
import Select from 'react-select';

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
    let cn = classNames.bind(styles);
    let labelStyles = cn('col-lg-2 col-form-label', {
      'label': true
    });
    let loggerStyles = cn('btn', {
      'btn-logger': true
    });
    let rawdata = cn('card card-block', {
      'rawdata': true
    });
    return (
      <div className="row">
        <div className="col-lg-6">
          <h4 className="card-title">GPS Data</h4>
          <div className="card card-block">
            <span className={styles.keyname}>Latitude</span> {this.props.gpsData.lat}<br/>
            <span className={styles.keyname}>Longitude</span> {this.props.gpsData.lon}<br/>
            <span className={styles.keyname}>Altitude</span> {this.props.gpsData.alt} meters<br/>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="card-title">Raw Data</h4>
          <div className={rawdata}>
            <div>
              {Object.keys(this.props.gpsData).map((val) => {
                return (
                  <li key={shortid.generate()}>{val} - {this.props.gpsData[val]}</li>
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
