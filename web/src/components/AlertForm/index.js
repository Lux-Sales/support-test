import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAlert, createAlert, selectAlert } from '../../service/Alert';
import Swal from 'sweetalert2'
class AlertForm extends Component {
  constructor(props) {
    super(props);

    this.OriginalAlert = this.props.alert
    this.createOrUpdateAlert = this.createOrUpdateAlert.bind(this);
  }

  render() {
    const { alert } = this.props;

    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="email">Email</label>
          <div className="col-sm-7">
            <input type="email" className="form-control" id="email" placeholder="Enter email" value={alert.email} onChange={(e) => { this.updateState('email', e.target.value) }} style={this.props.alert.error && this.props.alert.path === 'email'?{border: "solid red 3px"}:{}}/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="keyword">Keyword</label>
          <div className="col-sm-7">
            <input type="text" className="form-control" id="keyword" placeholder="Keyword" value={alert.term} onChange={(e) => { this.updateState('term', e.target.value) }} style={this.props.alert.error && this.props.alert.path === 'term'?{border: "solid red 3px"}:{}}/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="keyword">Frequency</label>
          <div className="col-sm-7">
            <select className="custom-select" value={alert.frequency} onChange={(e) => { this.updateState('frequency', e.target.value) }} >
              <option value="2">2 minutes</option>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success"
          onClick={this.createOrUpdateAlert}>{alert._id ? 'Update ' : 'Create '} alert</button>

        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => this.cancelAlert()}>Cancel</button>
      </form>
    );
  }

  updateState(field, value) {
    const alert = { ...this.props.alert };
    alert[field] = value;
    this.props.selectAlert(alert);
  }

  createOrUpdateAlert(e) {
    e.preventDefault();
    const { alert } = this.props;
      if (alert._id) {
        Swal.fire({
        title: `Save changes?`,
        text: ` Email: ${alert.email || this.OriginalAlert.email}, Term: ${alert.term || this.OriginalAlert.term}`,
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        denyButtonText: `Let me see one more time`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.props.updateAlert(alert)
          Swal.fire('Updated!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
    else {
      this.props.createAlert(alert)
    }
  }

  cancelAlert() {
    this.props.selectAlert(null)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectAlert,
    updateAlert: updateAlert(dispatch),
    createAlert: createAlert(dispatch)
  }, dispatch);
}

function mapStateToProps({ alert }) {
  return { alert };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertForm);
