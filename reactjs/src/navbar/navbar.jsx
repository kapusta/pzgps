import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from '../index.scss';
import navbarStyles from './navbar.scss';
import Navbutton from '../navbutton/navbutton.jsx';

const buttonStyles = {
  margin: '10px 10px 10px 0px'
};

const buttons = [{
  id: 1,
  text: 'About'
}, {
  id: 2,
  text: 'GPS Data'
}, {
  id: 3,
  text: 'MapQuest'
}];


class Navbar extends React.Component {
  render() {
    var btns = buttons.map(function(b) {
      return (
        <Navbutton key={b.id}>{b.text}</Navbutton>
      )
    });
    return (
      <div className={navbarStyles.navbar}>
        {btns}
      </div>
    )
  }
}

export default Navbar;
