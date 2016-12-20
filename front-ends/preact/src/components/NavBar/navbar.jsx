import { h, Component } from 'preact';
import navbarStyles from './navbar.css';
import NavButton from '../NavButton/NavButton.jsx';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <div className={navbarStyles.navbar}>

            <NavButton
              handleClick={this.props.handleClick}
              section="About"
              isActive={this.props.componentName === 'About'}
              ><i className="fa fa-home" aria-hidden="true"></i> Home
            </NavButton>

            {(this.props.gpsData) ? <NavButton
              handleClick={this.props.handleClick}
              section="GpsData"
              isActive={this.props.componentName === 'GpsData'}
              ><i className="fa fa-map-marker" aria-hidden="true"></i> Location Data</NavButton> : ''
            }

            {(this.props.gpsData && this.props.consumerKey) ? <NavButton
              handleClick={this.props.handleClick}
              section="MapQuest"
              isActive={this.props.componentName === 'MapQuest'}
              ><i className="fa fa-map" aria-hidden="true"></i> Map</NavButton> : ''
            }

          </div>
        </div>
    );
  }
}

// Navbar.propTypes = {
//   consumerKey: React.PropTypes.bool,
//   componentName: React.PropTypes.string,
//   gpsData: React.PropTypes.bool,
//   handleClick: React.PropTypes.func
// };

export default Navbar;
