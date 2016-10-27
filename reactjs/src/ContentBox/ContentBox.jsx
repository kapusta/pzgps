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
    var Content = contentComponents[this.props.content];
    return (
      <div>
        <Content>{this.props.children}</Content>
      </div>
    )
  }

}

export default ContentBox;
