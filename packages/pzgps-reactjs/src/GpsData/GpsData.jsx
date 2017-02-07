import React from 'react';
import shortid from 'shortid';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './gpsdata.scss';

class GpsData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="card card-block">
          <h3 className="card-title">GPS Data</h3>

          <span className={styles.keyname}>Latitude</span> {this.props.gpsData.lat}<br/>
          <span className={styles.keyname}>Longitude</span> {this.props.gpsData.lon}<br/>
          <span className={styles.keyname}>Altitude</span> {this.props.gpsData.alt} meters<br/>

          <h3 className={styles.header}>Raw Data</h3>
          <div>
            {Object.keys(this.props.gpsData).map(function(val) {
              return (
                <li key={shortid.generate()}>{val} - {this.props.gpsData[val]}</li>
              )
            }.bind(this))}
          </div>
        </div>
      </div>
    )
  }
}

GpsData.propTypes = {
  gpsData: React.PropTypes.object
};

export default GpsData;
