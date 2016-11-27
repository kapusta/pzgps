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
            This is a <a href="https://preactjs.com/">Preact</a> implementation of the GPS front end based on the <a href="https://github.com/developit/preact-boilerplate">preact-boilerplate</a> project. If the server on the pizero is set up correctly, a GPS Data and MapQuest button will appear above.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
