import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAlert, createAlert, selectAlert } from '../../actions/Alert';
class AlertForm extends Component {
  constructor(props) {
    super(props);

    this.createOrUpdateAlert = this.createOrUpdateAlert.bind(this);
  }

  render() {
    const { alert } = this.props;

    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="email">Email</label>
          <div className="col-sm-7">
            <input type="email" className="form-control" id="email" placeholder="Enter email" value={alert.email} onChange={(e) => { this.updateState('email', e.target.value) }} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="keyword">Keyword</label>
          <div className="col-sm-7">
            <input type="text" className="form-control" id="keyword" placeholder="Keyword" value={alert.term} onChange={(e) => { this.updateState('term', e.target.value) }} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="keyword">Frequency</label>
          <div className="col-sm-7">
            <select className="custom-select" value={alert.frequency} onChange={(e) => { this.updateState('frequency', e.target.value) }} >
              <option value="2">2 minutes</option>
              <option value="5">5 minutes</option>
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

  async createOrUpdateAlert(e) {
    e.preventDefault();
    const { alert } = this.props;
      if (alert._id) {
        const response = await this.props.updateAlert(alert)
      }

      const response = await this.props.createAlert(alert)
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
