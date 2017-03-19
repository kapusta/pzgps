import { h, Component } from 'preact';
import proptypes from 'proptypes';
import merge from 'lodash/merge';
import classNames from 'classnames/bind';
import styles from './RouteEditor.css';

class CragInput extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange = evt => {
    if (evt.keyCode === 13) { // return
      this.search({
        db: this.props.db,
        name: evt.target.value
      });
    }
    this.setState({
      cragName: evt.target.value
    });
  }
  search = ({db, name}) => {
    if (name.length) {
      this.setState({
        searching: true
      });
      // get data based on the name, if found, use the data to
      // prepopulate the rest of the form
      db.get(name)
      .then(doc => {
        let crag = merge({}, {
          name: doc.name
        });
        this.setState({
          searching: false,
        });
        this.props.handleCragChange(crag);
      })
      .catch(err => {
        this.setState({
          searching: false
        });
        console.error('searched for', name, 'but not found', err);
      });
    }
  }
  render({label, db, handleCragChange}) {
    let cn = classNames.bind(styles);
    let rowStyles = cn('row', {
      'row-route': true
    });
    let labelStyles = cn('col-lg-2 col-form-label', {
      'label': true
    });
    let inputGroupAddon = cn('input-group-addon', {
      'blue': this.state.cragName
    });
    let searchButtonStyles = cn('fa', {
      'search-enabled': this.state.cragName, // there has to be a better...
      'search-disabled': !this.state.cragName, // ...way to do this.
      'fa-search-plus': !this.state.searching,
      'fa-spinner': this.state.searching,
      'fa-spin': this.state.searching
    });
    return (

      <div className={rowStyles}>
        <label for="route" className={labelStyles}>{label}</label>
        <div className="col-lg-8">
          <div className="input-group">
            <input
              id="crag-name"
              placeholder={'Name of the ' + label}
              type="text"
              className="form-control"
              value={this.state.cragName}
              onKeyUp={this.handleInputChange}
            /><span className={inputGroupAddon}>
              <i
                className={searchButtonStyles}
                onClick={() => this.search({
                  db,
                  name: this.state.cragName
                })}
              ></i>
            </span>
          </div>
        </div>
      </div>

    );
  }
}

export default CragInput;
