import { h, Component } from 'preact';
import shortid from 'shortid';
import styles from './listroutes.css';
import classNames from 'classnames/bind';
import DeleteButton from './DeleteButton.jsx';

class ListRoutes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cn = classNames.bind(styles);
    let routeBlock = cn('col-lg-6', {
      'routes': true
    });
    let cell = cn({
      'cell': true
    });
    let trash = cn({
      'trash': true
    });

    return (
      <div className={routeBlock}>
        <h4 className="card-title">My Routes</h4>
        <table className="table table-bordered table-condensed">
          <thead className="thead-default">
            <tr>
              <th>Route</th>
              <th>Rating</th>
              <th>Pitches</th>
              <th>Lat/Lon</th>
              <th className={trash}></th>
            </tr>
          </thead>
          <tbody>
          {this.props.routeList.map((route) => {
            return (
              <tr key={shortid.generate()}>
                <td className={cell}>{route.name}</td>
                <td className={cell}>{route.rating}</td>
                <td className={cell}>{route.pitches}</td>
                <td className={cell}>
                  <a
                    target="googmap"
                    href={'https://www.google.com/maps/@'+ route.lat +','+route.lon+',16z'}
                  >
                    {route.lat}<br/>{route.lon}
                  </a>
                </td>
                <td className={cell}>
                  <DeleteButton
                    route={route}
                    removeRoute={this.props.removeRoute}
                  />
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListRoutes;
