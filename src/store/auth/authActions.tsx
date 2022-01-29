import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_AUTH_FROM_COOKIES,
} from "./authTypes";

export const signup_request = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signup_success = (data: any) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};

export const signup_failure = (data: any) => {
  return {
    type: SIGNUP_FAILURE,
    payload: data,
  };
};

export const login_request = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const login_success = (data: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const login_failure = (data: any) => {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
};

export const update_auth_from_cookies = (data: any) => {
  return {
    type: UPDATE_AUTH_FROM_COOKIES,
    payload: data
  }
}