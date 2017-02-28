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
    let footerIcon = cn('col-3', {
      'footer-icon': true
    });
    return (
      <footer className={footerShell}>
        <div className="container">
          <div class="row">
            <div className={footerIcon}>
              <big><i className="fa fa-home" aria-hidden="true"></i></big>
            </div>
            <div className={footerIcon}>
              <big><i className="fa fa-map-marker" aria-hidden="true"></i></big>
            </div>
            <div className={footerIcon}>
              <big><i class="fa fa-list-alt" aria-hidden="true"></i></big>
            </div>
            <div className={footerIcon}>
              <big><i className="fa fa-map" aria-hidden="true"></i></big>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default AppFooter;
