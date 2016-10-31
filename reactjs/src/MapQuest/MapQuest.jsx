import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './mapquest.scss';

class MapQuest extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="card card-block">
          <h3 className="card-title">MapQuest</h3>
          <p>
            Eventually a MapQuest staticmap will go here.
          </p>
        </div>
      </div>
    )
  }
}

export default MapQuest;
