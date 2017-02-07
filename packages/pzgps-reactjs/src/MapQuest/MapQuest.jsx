import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import styles from './mapquest.scss';

class MapQuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapUrl: ''
    };
  }
  componentDidMount() {
    this.setState({
      mapUrl: 'https://www.mapquestapi.com/staticmap/v4/getmap?key='
        + this.props.consumerKey
        + '&center=' + this.props.gpsData.lat + ',' + this.props.gpsData.lon
        + '&zoom=10&size=640,480&type=map&imagetype=png&pois=blue,'
        + this.props.gpsData.lat + ',' + this.props.gpsData.lon
    });
  }
  render() {
    return (
      <div>
        <div className="card card-block">
          <h3 className="card-title">MapQuest</h3>
          <img src={this.state.mapUrl} />
        </div>
      </div>
    )
  }
}

MapQuest.propTypes = {
  gpsData: React.PropTypes.object,
  consumerKey: React.PropTypes.string
};

export default MapQuest;
