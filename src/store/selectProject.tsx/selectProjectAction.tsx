import {
  ADD_BUG_FAILURE,
  ADD_BUG_REQUEST,
  ADD_BUG_SUCCESS,
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  FETCH_SELECT_PROJECT_FAILURE,
  FETCH_SELECT_PROJECT_REQUEST,
  FETCH_SELECT_PROJECT_SUCCESS,
  REMOVE_MEMBER_FAILURE,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
  UPDATE_PROJECT_BODY_FAILURE,
  UPDATE_PROJECT_BODY_REQUEST,
  UPDATE_PROJECT_BODY_SUCCESS,
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

export const add_member_failure = (data: { error: string, message: string }) => {
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

export const remove_member_failure = (data: { error: string, message: string }) => {
  return {
    type: REMOVE_MEMBER_FAILURE,
    payload: data
  }
}

export const add_bug_request = () => {
  return {
    type: ADD_BUG_REQUEST
  }
}

export const add_bug_success = (data: any) => {
  return {
    type: ADD_BUG_SUCCESS,
    payload: data
  }
}

export const add_bug_failure = (data: { error: string, message: string }) => {
  return {
    type: ADD_BUG_FAILURE,
    payload: data
  }
}

export const update_project_body_request = () => {
  return {
    type: UPDATE_PROJECT_BODY_REQUEST
  }
}

export const update_project_body_success = (data: any) => {
  return {
    type: UPDATE_PROJECT_BODY_SUCCESS,
    payload: data
  }
}

export const update_project_body_failure = (data: { error: string, message: string }) => {
  return {
    type: UPDATE_PROJECT_BODY_FAILURE,
    payload: data
  }
}