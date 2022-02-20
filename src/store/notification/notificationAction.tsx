import { FETCH_NOTIFICATION_FAILURE, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS, MARK_AS_READ_FAILURE, MARK_AS_READ_REQUEST, MARK_AS_READ_SUCCESS, RECEIVE_NOTIFICATION_COUNT } from "./notificationType"

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

export const receive_notification = (data: any) => {
  return {
    type: RECEIVE_NOTIFICATION_COUNT,
    payload: data
  }
}

export const mark_as_read_request = () => {
  return {
    type: MARK_AS_READ_REQUEST
  }
}

export const mark_as_read_success = (data: { read: boolean, notification_id: string }) => {
  return {
    type: MARK_AS_READ_SUCCESS,
    payload: data
  }
}

export const mark_as_read_failure = (data: { message: string , error: string }) => {
  return {
    type: MARK_AS_READ_FAILURE,
    payload: data
  }
}