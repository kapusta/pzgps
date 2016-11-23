import { h, Component } from 'preact';
//import styles from '../index.scss';


class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="card card-block">
          <h3 className="card-title">About</h3>
          <p>
            This is a ReactJS implementation of the GPS front end. It's based on the <a href="https://github.com/alicoding/react-webpack-babel">react-webpack-babel</a> project and uses <a href="https://www.npmjs.com/package/react-websocket">react-websocket</a> for the connection to the server.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
