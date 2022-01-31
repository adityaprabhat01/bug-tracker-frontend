import {
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  FETCH_SELECT_PROJECT_FAILURE,
  FETCH_SELECT_PROJECT_REQUEST,
  FETCH_SELECT_PROJECT_SUCCESS,
  REMOVE_MEMBER_FAILURE,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
} from "./selectProjectType";

export const fetch_select_project_request = () => {
  return {
    type: FETCH_SELECT_PROJECT_REQUEST,
  };
};

export const fetch_select_project_success = (data: any) => {
  return {
    type: FETCH_SELECT_PROJECT_SUCCESS,
    payload: data,
  };
};

export const fetch_select_project_failure = (data: any) => {
  return {
    type: FETCH_SELECT_PROJECT_FAILURE,
    payload: data,
  };
};

export const add_member_request = () => {
  return {
    type: ADD_MEMBER_REQUEST
  }
}

export const add_member_success = (data: any) => {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload: data
  }
}

export const add_member_failure = (data: any) => {
  return {
    type: ADD_MEMBER_FAILURE,
    payload: data
  }
}

export const remove_member_request = () => {
  return {
    type: REMOVE_MEMBER_REQUEST
  }
}

export const remove_member_success = (data: any) => {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    payload: data
  }
}

export const remove_member_failure = (data: any) => {
  return {
    type: REMOVE_MEMBER_FAILURE,
    payload: data
  }
}