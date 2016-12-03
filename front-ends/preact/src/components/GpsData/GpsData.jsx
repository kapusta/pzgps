import { h, Component } from 'preact';
import shortid from 'shortid';
import styles from './gpsdata.scss';

class GpsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pitches: 3,
      rating: 5.5
    };
    this.props.socket.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data.realmData) {
        console.log(data);
      }
    };
  }
  handleChange(evt) {
    this.setState({
      description: evt.target.value
    });
  }
  saveLocation(evt) {
    this.props.socket.send(JSON.stringify({
      action: 'newClimb',
      name: this.state.name,
      pitches: this.state.pitches,
      rating: this.state.rating
    }));
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
            {Object.keys(this.props.gpsData).map((val) => {
              return (
                <li key={shortid.generate()}>{val} - {this.props.gpsData[val]}</li>
              );
            })}
          </div>

          <form onSubmit={this.handleSubmit}>
            <label>
              Name <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
              Pitches <input type="text" value={this.state.pitches} onChange={this.handleChange} />
            </label>
            <label>
              Rating <input type="text" value={this.state.pitches} onChange={this.handleChange} />
            </label>
            <input type="button" value="Save" onClick={this.saveLocation}  />
          </form>
        </div>
      </div>
    );
  }
}

// GpsData.propTypes = {
//   gpsData: React.PropTypes.object
// };

export default GpsData;
