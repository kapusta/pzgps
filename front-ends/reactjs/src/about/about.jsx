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
            This is a <a href="https://facebook.github.io/react/">ReactJS</a> implementation of the GPS front end based on the <a href="https://github.com/alicoding/react-webpack-babel">react-webpack-babel</a> project. If the server on the pizero is set up correctly, a GPS Data and MapQuest button will appear above.
          </p>
        </div>
      </div>
    )
  }
}

export default About;
