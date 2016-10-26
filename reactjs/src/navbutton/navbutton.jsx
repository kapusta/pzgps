import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from '../index.scss';
import buttonStyles from './navbutton.scss';

class Navbutton extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = e => {
    console.log(e);
    console.log(this.props.section);
    this.props.handleClick(this.props.section);
  }

  render() {
    return (
      <button className={`btn btn-primary ${buttonStyles.button}`} onClick={this.handleClick}>{this.props.children}</button>
    )
  }
}

export default Navbutton;
