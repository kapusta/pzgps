import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from '../index.scss';
import navbarStyles from './navbar.scss';
import Navbutton from '../navbutton/navbutton.jsx';

const buttonStyles = {
  margin: '10px 10px 10px 0px'
};

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      componentName: 'About'
    };
  }

  handleClick = n => {
    this.setState({
      componentName: n
    });
  }

  render() {
    return (
      <div className={navbarStyles.navbar}>
        <Navbutton handleClick={this.handleClick} section="About">About</Navbutton>
        <Navbutton handleClick={this.handleClick} section="GpsData">GPS Data</Navbutton>
        <Navbutton handleClick={this.handleClick} section="MapQuest">MapQuest</Navbutton>
      </div>
    )
  }

}

export default Navbar;
