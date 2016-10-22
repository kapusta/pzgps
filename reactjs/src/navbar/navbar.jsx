import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from '../index.scss';
import navbarStyles from './navbar.scss';

const buttonStyles = {
  margin: '10px 10px 10px 0px'
};

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <button className="btn btn-primary" style={buttonStyles}>About</button>
        <button className="btn btn-primary" style={buttonStyles}>GPS Data</button>
        <button className="btn btn-primary" style={buttonStyles}>MapQuest</button>
      </div>
    )
  }
}

export default Navbar;
