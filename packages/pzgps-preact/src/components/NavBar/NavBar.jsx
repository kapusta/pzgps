import { h, Component } from 'preact';
import classNames from 'classnames/bind';
import styles from './NavBar.css';
import NavButton from '../NavButton/NavButton.jsx';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cn = classNames.bind(styles);
    let navIcon = cn('col-3', {
      'nav-icon': true
    });
    return (
      <nav class="navbar fixed-top navbar-light bg-faded">
        <div className="container">
          <div class="row">
            <div className={navIcon}>
              <NavButton
                handleClick={this.props.handleClick}
                section="About"
                isActive={this.props.componentName === 'About'}
                ><big><i className="fa fa-home" aria-hidden="true"></i></big>
              </NavButton>
            </div>

            <div className={navIcon}>
              {(this.props.gpsData) ? <NavButton
                handleClick={this.props.handleClick}
                section="GpsData"
                isActive={this.props.componentName === 'GpsData'}
                ><big><i className="fa fa-map-marker" aria-hidden="true"></i></big></NavButton> : ''
              }
            </div>
            <div className={navIcon}>
              {(this.props.gpsData) ? <NavButton
                handleClick={this.props.handleClick}
                section="RouteEditor"
                isActive={this.props.componentName === 'RouteEditor'}
                ><big><i class="fa fa-list-alt" aria-hidden="true"></i></big></NavButton> : ''
              }
            </div>
            <div className={navIcon}>
              {(this.props.gpsData && this.props.consumerKey) ? <NavButton
                handleClick={this.props.handleClick}
                section="MapQuest"
                isActive={this.props.componentName === 'MapQuest'}
                ><big><i className="fa fa-map" aria-hidden="true"></i></big></NavButton> : ''
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
