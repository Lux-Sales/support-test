import api from '../service/api'
import Swal from 'sweetalert2'
import { ERROR_ALERT, CREATE_ALERT, DELETE_ALERT, FETCH_ALERTS, SELECT_ALERT, UPDATE_ALERT } from '../actions/Alert';
const errorHandler = (err) => {
  const { message, path } = err.response.data.errors[0];
  Swal.fire({
    title: `Error!`,
    icon: "error",
    text:message
  })
  return {
    type: ERROR_ALERT,
    payload: {
      error: true,
      path,
      message
    },
  };
}

const formatAlert = (alert) => {
  return {
    email: alert.email,
    frequency: alert.frequency,
    term: alert.term
  };
}

export function fetchAlerts() {
  const request = api.get('/notification');

  return {
    type: FETCH_ALERTS,
    payload: request,
  };
}

export function selectAlert(alert) {
  return {
    type: SELECT_ALERT,
    payload: alert,
  };
}


export function createAlert(dispatch) {
  const create = async (alert) => {
    const formattedAlert = formatAlert(alert);

    try {
      const request = await api.post('/notification', formattedAlert);
      const { data } = request;

      dispatch(selectAlert(null));
      Swal.fire({
        title: `Created!`,
        text: ` Email: ${alert.email}, Term: ${alert.term}`,
        icon: "success",
      })
      return {
        type: CREATE_ALERT,
        payload: { data },
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  return create;
}

export function updateAlert(dispatch) {
  const update = async (alert) => {
    const formattedAlert = formatAlert(alert);

    try {
      const request = await api.put(`/notification/${alert._id}`, formattedAlert);
      const { data } = request;

      dispatch(selectAlert(null));

      return {
        type: UPDATE_ALERT,
        payload: { data },
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  return update;
}

export function deleteAlert(alert) {
  const request = api.delete(`/notification/${alert._id}`);

  return {
    type: DELETE_ALERT,
    payload: request,
  };
}
