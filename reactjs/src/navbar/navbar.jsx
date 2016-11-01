import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import styles from '../index.scss';
import navbarStyles from './navbar.scss';
import Navbutton from '../navbutton/navbutton.jsx';

const buttonStyles = {
  margin: '10px 10px 10px 0px'
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div>
          <div className={navbarStyles.navbar}>
            <Navbutton handleClick={this.props.handleClick} section="About">About</Navbutton>
            {this.props.gpsData ? <Navbutton handleClick={this.props.handleClick} section="GpsData">GPS Data</Navbutton> : ''}
            {(this.props.gpsData && this.props.consumerKey) ? <Navbutton handleClick={this.props.handleClick} section="MapQuest">MapQuest</Navbutton> : ''}
          </div>
        </div>
      )
  }
}

export default Navbar;
