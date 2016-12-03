import { h, Component } from 'preact';
import sckt from '../../lib/sckt.js';
import NavBar from '../NavBar/NavBar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';

const serverUrl = 'ws://circ.local:9000'; // you'll want to change this

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: 'About',
      gpsData: {},
      consumerKey: '',
      socket: {}
    };
  }

  componentDidMount() {
    sckt.setUpSocket(serverUrl, this);
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  // method is passed down to App -> NavBar -> NavButton
  handleClick = name => {
    this.setState({
      componentName: name
    });
  }

  render() {
    return (
      <div>
        <NavBar
          handleClick={this.handleClick}
          consumerKey={this.state.consumerKey ? true : false}
          gpsData={Object.keys(this.state.gpsData).length ? true : false}
          componentName={this.state.componentName}
        />

        <ContentBox
          gpsData={this.state.gpsData}
          consumerKey={(this.state.consumerKey) ? this.state.consumerKey : null}
          content={this.state.componentName}
          socket={this.state.socket}
        />
      </div>
    );
  }
}

// App.propTypes = {
//   componentName: React.PropTypes.string
// };

export default App;
