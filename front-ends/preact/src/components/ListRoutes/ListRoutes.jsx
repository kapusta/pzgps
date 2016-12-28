import { h, Component } from 'preact';
import shortid from 'shortid';
import styles from './listroutes.css';
import classNames from 'classnames/bind';

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
            </tr>
          </thead>
          <tbody>
          {this.props.routeList.map((val) => {
            return (
              <tr key={shortid.generate()}>
                <td className={cell}>{val.name}</td>
                <td className={cell}>{val.rating}</td>
                <td className={cell}>{val.pitches}</td>
                <td className={cell}>
                  <a
                    target="googmap"
                    href={'https://www.google.com/maps/@'+ val.lat +','+val.lon+',16z'}
                  >
                    {val.lat}<br/>{val.lon}
                  </a>
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
