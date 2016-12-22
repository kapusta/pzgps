import { h, Component } from 'preact';
import SaveClimb from '../SaveClimb/SaveClimb.jsx';
import shortid from 'shortid';
import classNames from 'classnames/bind';
import styles from './gpsdata.css';
import Select from 'react-select';

class GpsData extends Component {
  constructor(props) {
    super(props);
    this.props.socket.onmessage = e => {
      let data = JSON.parse(e.data);
      console.log(data);
    };
  }
  selectChanged = val => {
    console.log('select changed to', val);
    this.setState({
      climbRating: val
    });
  }
  handleChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }
  saveLocation = evt => {
    this.props.socket.send(JSON.stringify({
      action: 'newClimb',
      climbName: this.state.climbName,
      climbPitches: this.state.climbPitches,
      climbRating: this.state.climbRating
    }));
  }
  render() {

    let cx = classNames.bind(styles);
    let labelStyles = cx('col-lg-2 col-form-label', {
      label: true
    });
    let loggerStyles = cx('btn', {
      'btn-logger': true
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


          <h4 className={styles.header}>Raw Data</h4>
          <div className="card card-block">
            <div>
              {Object.keys(this.props.gpsData).map((val) => {
                return (
                  <li key={shortid.generate()}>{val} - {this.props.gpsData[val]}</li>
                );
              })}
            </div>
          </div>
        </div>

        <SaveClimb socket={this.props.socket} gpsData={this.props.gpsData}/>

      </div>
    );
  }
}

// GpsData.propTypes = {
//   gpsData: React.PropTypes.object
// };

export default GpsData;
