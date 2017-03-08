import { h, Component } from 'preact';
import proptypes from 'proptypes';
import classNames from 'classnames/bind';
import styles from './navbutton.css';

class Navbutton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    //console.log('button click event', e);
    this.props.handleClick(this.props.section);
  }
  render({children}) {
    let cx = classNames.bind(styles);
    let buttonStyles = cx('btn', {
      'btn-info': this.props.isActive,
      'button': true
    });
    return (
      <a
        className={buttonStyles}
        onClick={this.handleClick}
      >{children}</a>
    );
  }
}

export default Navbutton;
