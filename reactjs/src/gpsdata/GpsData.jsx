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
          <p>
            Eventually GPS data will appear here
          </p>
        </div>
      </div>
    )
  }
}

export default GpsData;
