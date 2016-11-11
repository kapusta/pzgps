import 'bootstrap/dist/css/bootstrap.min.css';
//import styles from '../index.scss';
import React from 'react';

class About extends React.Component {
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
    )
  }
}

export default About;
