import { h, Component } from 'preact';
import shortid from 'shortid';
import Select from 'react-select';
import classNames from 'classnames/bind';
import styles from './saveclimb.css';
import { yds } from '../../lib/ratings.js';
import merge from 'lodash/merge';

class SaveClimb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: {
        name: '',
        pitches: 3,
        rating: '5.5'
      }
    };
    this.pitches = new Array(30).fill(0).map((val, idx) => {
      return {
        'value': idx + 1,
        'label': idx + 1
      };
    });
  }
  handleRatingChange = val => {
    let route = merge({}, this.state.route, {rating: val.value});
    this.setState({
      route
    });
  }
  handlePitchesChange = val => {
    let route = merge({}, this.state.route, {pitches: val.value});
    this.setState({
      route
    });
  }
  handleChange = evt => {
    let route = merge({}, this.state.route, {[evt.target.id]: evt.target.value});
    this.setState({
      route
    });
  }
  logState = () => {
    console.log(this.state);
  }
  save = evt => {
    this.props.socket.send(JSON.stringify({
      action: 'newRoute',
      route: this.state.route
    }));
  }
  render() {
    let cn = classNames.bind(styles);
    let labelStyles = cn('col-lg-2 col-form-label', {
      label: true
    });
    let loggerStyles = cn('btn', {
      'btn-logger': true
    });

    return (
      <div className="col-lg-6">
        <h4 className="card-title">Save New Climb</h4>
        <div className="card card-block">
          <form>

            <label for="route" className={labelStyles}>Route Name</label>
            <div className="col-lg-8">
              <input id="name" placeholder="Name of the Route" type="text" className="form-control" value={this.state.route.name} onKeyUp={this.handleChange} />
            </div>
            <br/><br/>

            <label for="pitches" className={labelStyles}>Pitches</label>
            <div className="col-lg-8">
              <Select
                name="pitches"
                id="pitches"
                value={this.state.route.pitches}
                options={this.pitches}
                onChange={this.handlePitchesChange}
              />
            </div>
            <br/><br/>

            <label for="rating" className={labelStyles}>Rating</label>
            <div className="col-lg-8">
              <Select
                name="rating"
                id="rating"
                value={this.state.route.rating}
                options={yds}
                onChange={this.handleRatingChange}
              />
            </div>

          </form>
        </div>
        <input type="button" className="btn btn-primary" value="Save" onClick={this.save} />
        <input type="button" className={loggerStyles} value="Log State" onClick={this.logState} />
      </div>
    );
  }
}

export default SaveClimb;
