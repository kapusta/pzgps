import { h, Component } from 'preact';
import styles from './mapquest.css';

class MapQuest extends Component {
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
        <h4 className="card-title">MapQuest Staticmap</h4>
        <div className="card card-block">
          <img src={this.state.mapUrl} />
        </div>
      </div>
    );
  }
}

export default MapQuest;
