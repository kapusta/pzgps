import { h, Component } from 'preact';
import shortid from 'shortid';
import classNames from 'classnames/bind';
import styles from './gpsdata.scss';
import Select from 'react-select';

class GpsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      climbName: '',
      climbPitches: 3,
      climbRating: "5.5",
      usRatings: [{
        value: "5.0",
        label: "5.0"
      }, {
        value: "5.1",
        label: "5.1"
      }]
    };
    this.props.socket.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data.realmData) {
        console.log(data);
      }
    };
  }
  selectChanged = val => {
    console.log('select changed to', val);
    this.setState({
      climbRating: val
    });
  }
  handleChange = evt => {
    console.log('?', evt);
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }
  logState = () => {
    console.log(this.state);
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


        <div className="col-lg-6">
          <h4 className="card-title">Save New Climb</h4>
          <div className="card card-block">
            <form>
              <label for="climbName" className={labelStyles}>Name</label>
              <div className="col-lg-8">
                <input id="climbName" type="text" className="form-control" value={this.state.climbName} onKeyUp={this.handleChange} />
              </div>
              <br/><br/>

              <label for="climbPitches" className={labelStyles}>Pitches</label>
              <div className="col-lg-8">
                <input id="climbPitches" type="text" className="form-control" value={this.state.climbPitches} onKeyUp={this.handleChange} />
              </div>
              <br/><br/>

              <label for="climbRating" className={labelStyles}>Rating</label>
              <div className="col-lg-8">
                <Select
                  name="climbRating"
                  value={this.state.climbRating}
                  options={this.state.usRatings}
                  onChange={this.selectChanged}
                />
              </div>

            </form>
          </div>
          <input type="button" className="btn btn-primary" value="Save" onClick={this.saveLocation} />
          <input type="button" className={loggerStyles} value="Log State" onClick={this.logState} />
        </div>
      </div>
    );
  }
}

// GpsData.propTypes = {
//   gpsData: React.PropTypes.object
// };

export default GpsData;
