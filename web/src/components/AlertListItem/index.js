import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectAlert, deleteAlert } from '../../service/Alert';
import Swal from 'sweetalert2'

class AlertListItem extends Component {
  render() {
    const { alert } =  this.props;

    return (
      <tr>
        <th scope="row">{ alert._id }</th>
        <td>{ alert.email }</td>
        <td>{ alert.frequency } minutes</td>
        <td>{ alert.term }</td>
        <td>
          <div>
            <button type="button" className="btn btn-sm btn-info" onClick={ (e) => this.editAlert() }>Edit</button>
            <button type="button" className="btn btn-sm btn-danger" onClick={ (e) => this.deleteAlert() }>Delete</button>
          </div>
        </td>
      </tr>
    );
  }

  editAlert() {
    const { alert } = this.props;
    this.props.selectAlert(alert);
  }

  deleteAlert() {
    const { alert } = this.props;
    Swal.fire({
      title: `Do you really want to delete the alert?`,
      text: ` Email: ${alert.email}, Term: ${alert.term}`,
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteAlert(alert);
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectAlert,
    deleteAlert
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AlertListItem);
