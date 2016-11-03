import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import sckt from '../../lib/sckt.js';
import Navbar from '../navbar/navbar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';

const serverUrl = 'ws://circ.local:9000';

class App extends React.Component {
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

    sckt.connect(serverUrl).then(socket => {

      this.setState({
        socket: socket
      });

      socket.send(JSON.stringify({
        'action': 'getConsumerKey'
      }));

      socket.onclose = e => {
        // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
        console.error('The WebSocket connection closed', e);
        console.log('Trying to reconnect.');
        window.setTimeout(() => {
          sckt.connect(serverUrl);
        }, 5000);
      };

      socket.onmessage = e => {
        let data = JSON.parse(e.data);
        if (data.consumerKey) {
          this.setState({
            consumerKey: data.consumerKey
          });
        } else {
          this.setState({
            gpsData: data
          });
        }
      };

    });

  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  // method is passed down to app -> navbar -> navbutton
  handleClick = n => {
    this.setState({
      componentName: n
    });
  }

  render() {
    return (
      <div>
        <Navbar
          handleClick={this.handleClick}
          consumerKey={this.state.consumerKey ? true : false}
          gpsData={Object.keys(this.state.gpsData).length ? true : false}
        />

        <ContentBox
          gpsData={this.state.gpsData}
          consumerKey={(this.state.consumerKey) ? this.state.consumerKey : null}
          content={this.state.componentName}
        />
      </div>
    )
  }
}

App.PropTypes = {
  componentName: React.PropTypes.string
}

export default App;
