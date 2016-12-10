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
              >Home
            </NavButton>

            {(this.props.gpsData) ? <NavButton
              handleClick={this.props.handleClick}
              section="GpsData"
              isActive={this.props.componentName === 'GpsData'}
              >Location Data</NavButton> : ''
            }

            {(this.props.gpsData && this.props.consumerKey) ? <NavButton
              handleClick={this.props.handleClick}
              section="MapQuest"
              isActive={this.props.componentName === 'MapQuest'}
              >Map</NavButton> : ''
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
