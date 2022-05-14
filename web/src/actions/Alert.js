import axios from 'axios';
import { API_URL } from '../configs'
import Swal from 'sweetalert2'

export const FETCH_ALERTS = 'FETCH_ALERTS';
export const SELECT_ALERT = 'SELECT_ALERT';
export const CREATE_ALERT = 'CREATE_ALERT';
export const UPDATE_ALERT = 'UPDATE_ALERT';
export const DELETE_ALERT = 'DELETE_ALERT';
export const ERROR_ALERT = 'ERROR_ALERT';

const errorHandler = (err) => {
  const { message } = err.response.data.errors[0];
  return (
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  )
}

const formatAlert = (alert) => {
  return {
    email: alert.email,
    frequency: alert.frequency,
    term: alert.term
  };
}

export function fetchAlerts() {
  const notificationUrl = `${API_URL}/notification`;
  const request = axios.get(notificationUrl);

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
    const notificationUrl = `${API_URL}/notification/`;
    const formattedAlert = formatAlert(alert);

    try {
      const request = await axios.post(notificationUrl, formattedAlert);
      const { data } = request;

      dispatch(selectAlert(null));

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
    const notificationUrl = `${API_URL}/notification/${alert._id}`;
    const formattedAlert = formatAlert(alert);

    try {
      const request = await axios.put(notificationUrl, formattedAlert);
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
  const notificationUrl = `${API_URL}/notification/${alert._id}`;
  const request = axios.delete(notificationUrl);

  return {
    type: DELETE_ALERT,
    payload: request,
  };
}
