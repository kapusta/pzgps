import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import buttonStyles from './navbutton.scss';

class Navbutton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    console.log('button click event', e);
    this.props.handleClick(this.props.section);
  }
  render() {
    return (
      <button
        className={`btn ${buttonStyles.button}` + ((this.props.isActive) ? ' btn-primary' : '')}
        onClick={this.handleClick}
      >{this.props.children}</button>
    );
  }
}

Navbutton.propTypes = {
  isActive: React.PropTypes.bool,
  handleClick: React.PropTypes.func,
  section: React.PropTypes.string
};

export default Navbutton;
