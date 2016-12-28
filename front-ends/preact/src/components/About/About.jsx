import { h, Component } from 'preact';

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <h4 className="card-title">About</h4>
          <div className="card card-block">
            <p>
              This is a <a href="https://preactjs.com/">Preact</a> implementation of the GPS front end based on the <a href="https://github.com/developit/preact-boilerplate">preact-boilerplate</a> project.
            </p>
            <p>
              If the server on the pizero is set up correctly, more buttons will appear above after establishing the WebSocket connection.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <h4 className="card-title">Title</h4>
          <div className="card card-block">
            More content here.
          </div>
        </div>
      </div>
    );
  }
}

export default About;
