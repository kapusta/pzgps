import { h, Component } from 'preact';
import proptypes from 'proptypes';
import classNames from 'classnames/bind';
import styles from './DeleteButton.css';

class DeleteButton extends Component {
  constructor(props) {
    super(props);
  }
  deleteRoute = () => {
    this.setState({
      deleting: true
    });
    this.props.removeRoute(this.props.route);
    // after the delete happens, the parent component will refetch the route list
    // and deliver that to this component forcing a re-render which removes the
    // route 'doc' from the view, so no need to reset `deleting` to false
  }
  render() {
    let cn = classNames.bind(styles);
    let deleteButton = cn('btn btn-sm btn-primary');
    let deleteButtonIcon = cn('fa', {
      'fa-trash': !this.props.deleting,
      'fa-spinner': this.props.deleting,
      'fa-spin': this.props.deleting
    });
    return (
      <button
        bs-button
        className={deleteButton}
        onClick={this.deleteRoute}
        disabled={this.state.deleting}
      >
        <i className={deleteButtonIcon} aria-hidden="true"></i>
      </button>
    );
  }
}

export default DeleteButton;
