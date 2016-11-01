import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from '../navbar/navbar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';

// maybe set up the WebSocket here?

var socket = new WebSocket('ws://circ.local:9000');

socket.onopen = e => {
  socket.send(JSON.stringify({
    'action': 'getConsumerKey'
  }));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: 'About',
      gpsData: {},
      consumerKey: ''
    };
  }

  componentDidMount() {
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
    }
  }

  componentWillUnmount() {
    socket.close();
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
        <Navbar handleClick={this.handleClick}/>
        <ContentBox gpsData={this.state.gpsData} consumerKey={(this.state.consumerKey) ? this.state.consumerKey : null} content={this.state.componentName} />
      </div>
    )
  }
}

export default App;
