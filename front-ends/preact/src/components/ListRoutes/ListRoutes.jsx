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
    return (
      <div className={routeBlock}>
        <h4 className="card-title">Known Routes</h4>
        <div className="card card-block">
          <ul>
          {this.props.routeList.map((val) => {
            return (
              <li key={shortid.generate()}>{val.name} - {val.rating}</li>
            );
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListRoutes;
