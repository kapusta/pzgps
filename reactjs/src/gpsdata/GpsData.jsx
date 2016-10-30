import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './gpsdata.scss';
import React from 'react';

class GpsData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="card card-block">
          <h3 className="card-title">GPS Data</h3>
          <div>
            {Object.keys(this.props.gpsData).map(function(val, idx, arr) {
              return (
                <li key={val}>{val} - {this.props.gpsData[val]}</li>
              )
            }.bind(this))}
          </div>
        </div>
      </div>
    )
  }
}

export default GpsData;
