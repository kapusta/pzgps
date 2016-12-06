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
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-block">
            <h4 className="card-title">GPS Data</h4>

            <span className={styles.keyname}>Latitude</span> {this.props.gpsData.lat}<br/>
            <span className={styles.keyname}>Longitude</span> {this.props.gpsData.lon}<br/>
            <span className={styles.keyname}>Altitude</span> {this.props.gpsData.alt} meters<br/>

            <h4 className={styles.header}>Raw Data</h4>
            <div>
              {Object.keys(this.props.gpsData).map((val) => {
                return (
                  <li key={shortid.generate()}>{val} - {this.props.gpsData[val]}</li>
                );
              })}
            </div>
          </div>
        </div>


        <div className="col-lg-6">
          <h4 className="card-title">Save New Climb</h4>
          <div className="card card-block">
            <form>
              <label for="climb-name" className={styles.label + ' col-lg-2 col-form-label'}>Name</label>
              <div className="col-lg-8">
                <input id="climb-name" type="text" className="form-control" value={this.state.name} onChange={this.handleChange} />
              </div>
              <br/><br/>

              <label for="climb-pitches" className={styles.label + ' col-lg-2 col-form-label'}>Pitches</label>
              <div className="col-lg-8">
                <input id="climb-pitches" type="text" className="form-control" value={this.state.pitches} onChange={this.handleChange} />
              </div>
              <br/><br/>


              <label for="climb-rating" className={styles.label + ' col-lg-2 col-form-label'}>Rating</label>
              <div className="col-lg-8">
                <input id="climb-rating" type="text" className="form-control" value={this.state.rating} onChange={this.handleChange} />
              </div>

            </form>
          </div>
          <input type="button" className="btn btn-primary" value="Save" onClick={this.saveLocation}  />
        </div>
      </div>
    );
  }
}

// GpsData.propTypes = {
//   gpsData: React.PropTypes.object
// };

export default GpsData;
