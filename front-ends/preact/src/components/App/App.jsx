import { h, Component } from 'preact';
import sckt from '../../lib/sckt.js';
import NavBar from '../NavBar/NavBar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';
//import 'bootstrap/dist/css/bootstrap.min.css';

const serverUrl = 'ws://circ.local:9000'; // you'll want to change this

// maybe move this into sckt.js
const setUpSocket = Component => {

  sckt.connect(serverUrl).then(socket => {

    Component.setState({
      socket
    });

    socket.send(JSON.stringify({
      'action': 'getConsumerKey'
    }));

    socket.onclose = e => {
      // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
      console.error('The WebSocket connection closed', e);
      console.log('Trying to reconnect...');
      window.setTimeout(() => {
        setUpSocket(Component);
      }, 5000);
    };

    socket.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data.consumerKey) {
        Component.setState({
          consumerKey: data.consumerKey
        });
      } else {
        Component.setState({
          gpsData: data
        });
      }
    };

  }).catch((err) => {
    console.error('could not connect to WebSocket server', err);
    console.log('Trying to reconnect...');
    setTimeout(() => {
      setUpSocket(Component);
    }, 5000);
  });

};


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
    setUpSocket(this);
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
        />
      </div>
    );
  }
}

// App.propTypes = {
//   componentName: React.PropTypes.string
// };

export default App;
