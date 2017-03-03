import { h, Component } from 'preact';
import About from '../About/About.jsx';
import GpsData from '../GpsData/GpsData.jsx';
import MapQuest from '../MapQuest/MapQuest.jsx';
import RouteEditor from '../RouteEditor/RouteEditor.jsx';

// @description this is kind of gross, but neccessary
// @see https://github.com/facebook/react/issues/3365
const contentComponents = {
  About,
  GpsData,
  MapQuest,
  RouteEditor
};

class ContentBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let Content = contentComponents[this.props.content];
    switch (this.props.content) {
    case 'MapQuest':
      return (
        <div className="container">
          <Content {...this.props}>{this.props.children}</Content>
        </div>
      );
    case 'RouteEditor':
      return (
        <div className="container">
          <Content
            gpsData={this.props.gpsData}
            routesDb={this.props.databases['routes-local']}
          >
            {this.props.children}
          </Content>
        </div>
      );
    default:
      return (
        <div className="container">
          <Content
            gpsData={this.props.gpsData}
          >
            {this.props.children}
          </Content>
        </div>
      );
    }
  }
}

export default ContentBox;
