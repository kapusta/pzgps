import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from '../index.scss';
import buttonStyles from './navbutton.scss';

//let classNames = 'btn btn-primary ' + buttonStyles.button;

class Navbutton extends React.Component {


  render() {
    return (
      //<button className={classNames}>{this.props.children}</button>
      <button className={`btn btn-primary ${buttonStyles.button}`}>{this.props.children}</button>
    )
  }
}

export default Navbutton;
