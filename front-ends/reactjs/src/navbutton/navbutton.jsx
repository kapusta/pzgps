import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import buttonStyles from './navbutton.scss';

class Navbutton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(e) {
    console.log('click', e);
    this.props.handleClick(this.props.section);
  }
  render() {
    return (
      <button className={`btn btn-primary ${buttonStyles.button}`} onClick={this.handleClick}>{this.props.children}</button>
    )
  }
}

Navbutton.propTypes = {
  handleClick: React.PropTypes.func,
  section: React.PropTypes.string
};

export default Navbutton;
