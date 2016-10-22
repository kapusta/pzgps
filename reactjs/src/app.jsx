import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styles from './index.scss';

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
