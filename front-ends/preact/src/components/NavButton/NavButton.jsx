import { h, Component } from 'preact';
import proptypes from 'proptypes';
import buttonStyles from './navbutton.scss';

class Navbutton extends Component {
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
  isActive: proptypes.bool,
  handleClick: proptypes.func,
  section: proptypes.string
};

export default Navbutton;
