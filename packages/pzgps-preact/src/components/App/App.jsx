import { h, Component } from 'preact';
import sckt from '../../lib/sckt.js';
import conf from '../../lib/conf.js';
import NavBar from '../NavBar/NavBar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';
import AppFooter from '../AppFooter/AppFooter.jsx';
import db from '../../lib/db.js';

require('offline-plugin/runtime').install();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: 'About',
      consumerKey: '',
      gpsData: {},
      socket: {}
    };
  }
  componentWillMount() {
    db.init();
    sckt.init(conf.socketServer, this);
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
          databases={db.databases}
        />

        <AppFooter
          handleClick={this.handleClick}
          consumerKey={this.state.consumerKey ? true : false}
          gpsData={Object.keys(this.state.gpsData).length ? true : false}
          componentName={this.state.componentName}
        />
      </div>
    );
  }
}

export default App;
