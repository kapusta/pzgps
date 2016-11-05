import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import About from '../about/about.jsx';
import GpsData from '../GpsData/GpsData.jsx';
import MapQuest from '../MapQuest/MapQuest.jsx';

// @description this is kind of gross, but neccessary
// @see https://github.com/facebook/react/issues/3365
const contentComponents = {
  About: About,
  GpsData: GpsData,
  MapQuest: MapQuest
}

class ContentBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // must be capitalized, contains a reference to a Component
    let Content = contentComponents[this.props.content];
    if (this.props.content === 'MapQuest') {
      return (
        <div>
          <Content {...this.props}>{this.props.children}</Content>
        </div>
      )
    } else {
      return (
        <div>
          <Content gpsData={this.props.gpsData}>{this.props.children}</Content>
        </div>
      )
    }
  }
}

ContentBox.propTypes = {
  content: React.PropTypes.string,
  gpsData: React.PropTypes.object
};

export default ContentBox;
