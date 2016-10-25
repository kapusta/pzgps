import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// maybe set up the WebSocket here?

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
