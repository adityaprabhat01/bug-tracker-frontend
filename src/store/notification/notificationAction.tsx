import { FETCH_NOTIFICATION_FAILURE, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS } from "./notificationType"

export const fetch_notification_request = () => {
  return {
    type: FETCH_NOTIFICATION_REQUEST
  }
}

export const fetch_notification_success = (data: any) => {
  return {
    type: FETCH_NOTIFICATION_SUCCESS,
    payload: data
  }
}

export const fetch_notification_failure = (data: any) => {
  return {
    type: FETCH_NOTIFICATION_FAILURE,
    payload: data
  }
}