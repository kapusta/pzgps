import { h, Component } from 'preact';
import proptypes from 'proptypes';
import classnames from 'classnames/bind';
import styles from './KeyValuePair.css';

class KeyValuePair extends Component {
  constructor(props) {
    super(props);
  }
  render({label, value}) {
    let cn = classnames.bind(styles);
    let rowStyles = cn('row', {
      'row-route': true
    });
    let labelStyles = cn('col-lg-2 col-form-label', {
      'label': true
    });
    let valueStyles = cn('col-lg-6', {
      'value': true
    });

    return (

      <div className={rowStyles}>
        <label className={labelStyles}>{label}</label>
        <div className={valueStyles}>
          {value}
        </div>
      </div>

    );
  }
}

export default KeyValuePair;
