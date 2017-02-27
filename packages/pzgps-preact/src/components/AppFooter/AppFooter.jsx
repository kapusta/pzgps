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
          <div class="row">
            <div className="col-3">
              <i className="fa fa-home" aria-hidden="true"></i> Home
            </div>
            <div className="col-3">
              <i className="fa fa-map-marker" aria-hidden="true"></i> GPS Data
            </div>
            <div className="col-3">
              <i class="fa fa-list-alt" aria-hidden="true"></i> Routes
            </div>
            <div className="col-3">
              <i className="fa fa-map" aria-hidden="true"></i> Location
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default AppFooter;
