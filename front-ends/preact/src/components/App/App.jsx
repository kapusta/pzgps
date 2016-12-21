import { h, Component } from 'preact';
import PouchDB from 'pouchdb';
import sckt from '../../lib/sckt.js';
import conf from '../../lib/conf.js';
import NavBar from '../NavBar/NavBar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';

let dbname = 'routes'
let db = PouchDB(conf.couchdb + '/' + dbname);
db.info().then(function(info) {
  console.log(dbname, info);
});

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
    sckt.setUpSocket(conf.socketServer, this);
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

export default App;
