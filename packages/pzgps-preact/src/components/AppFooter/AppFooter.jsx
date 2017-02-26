import { h, Component } from 'preact';
import styles from './AppFooter.css';
import classNames from 'classnames/bind';

class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    //
  }
  componentWillUnmount() {
    //
  }
  // method is passed down to App -> NavBar -> NavButton
  handleClick = name => {
    this.setState({
      componentName: name
    });
  }
  render() {
    let cn = classNames.bind(styles);
    let footerShell = cn('footer', {
      'footer-shell': true
    });
    return (
      <footer className={footerShell}>
        <div className="container">
          footer content here
        </div>
      </footer>
    );
  }
}

export default AppFooter;
