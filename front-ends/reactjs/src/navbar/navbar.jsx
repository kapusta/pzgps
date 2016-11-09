import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import { render } from 'react-dom';
//import styles from '../index.scss';
import navbarStyles from './navbar.scss';
import Navbutton from '../navbutton/navbutton.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div>
          <div className={navbarStyles.navbar}>

            <Navbutton
              handleClick={this.props.handleClick}
              section="About"
              isActive={this.props.componentName === 'About'}
              >About
            </Navbutton>

            {(this.props.gpsData) ? <Navbutton
              handleClick={this.props.handleClick}
              section="GpsData"
              isActive={this.props.componentName === 'GpsData'}
              >GPS Data</Navbutton> : ''
            }

            {(this.props.gpsData && this.props.consumerKey) ? <Navbutton
              handleClick={this.props.handleClick}
              section="MapQuest"
              isActive={this.props.componentName === 'MapQuest'}
              >MapQuest</Navbutton> : ''
            }

          </div>
        </div>
      )
  }
}

Navbar.propTypes = {
  consumerKey: React.PropTypes.bool,
  gpsData: React.PropTypes.bool,
  handleClick: React.PropTypes.func
};

export default Navbar;
