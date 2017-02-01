import { h, Component } from 'preact';
import classNames from 'classnames/bind';
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
    let cn = classNames.bind(styles);
    let mapStyles = cn({
      'staticmap': true
    });
    let divStyles = cn('card card-block', {
      'mapdiv': true
    });

    return (
      <div>
        <h4 className="card-title">MapQuest Staticmap</h4>
        <div className={divStyles} style={{backgroundImage: 'url('+this.state.mapUrl+')'}}></div>
      </div>
    );
  }
}

export default MapQuest;
