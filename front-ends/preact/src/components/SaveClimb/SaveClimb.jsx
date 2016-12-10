import { h, Component } from 'preact';
import shortid from 'shortid';
import classNames from 'classnames/bind';
import styles from './saveclimb.css';
import Select from 'react-select';

class SaveClimb extends Component {
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
      <div className="col-lg-6">
        <h4 className="card-title">Save New Climb</h4>
        <div className="card card-block">
          <form>
            <label for="climbName" className={labelStyles}>Name</label>
            <div className="col-lg-8">
              <input id="climbName" placeholder="Name of the Climb" type="text" className="form-control" value={this.state.climbName} onKeyUp={this.handleChange} />
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
    );
  }
}

export default SaveClimb;
