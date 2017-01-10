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

    // brain dead switch based `router` should be refactored out
    switch (this.props.content) {
    case 'MapQuest':
      return (
        <div>
          <Content {...this.props}>{this.props.children}</Content>
        </div>
      );

    case 'RouteEditor':
      return (
        <div>
          <Content
            gpsData={this.props.gpsData}
            socket={this.props.socket}
            routes={this.props.databases['routes-local']}
          >
            {this.props.children}
          </Content>
        </div>
      );

    default:
      return (
        <div>
          <Content
            gpsData={this.props.gpsData}
            socket={this.props.socket}
          >
            {this.props.children}
          </Content>
        </div>
      );
    }

    // if (this.props.content === 'MapQuest') {
    //   return (
    //     <div>
    //       <Content {...this.props}>{this.props.children}</Content>
    //     </div>
    //   );
    // }
    // return (
    //   <div>
    //     <Content
    //       gpsData={this.props.gpsData}
    //       socket={this.props.socket}
    //     >
    //       {this.props.children}
    //     </Content>
    //   </div>
    // );
  }
}

export default ContentBox;
