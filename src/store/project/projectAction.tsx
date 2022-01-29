import {
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
} from "./projectTypes";

export const fetch_project_request = () => {
  return {
    type: FETCH_PROJECT_REQUEST,
  };
};

export const fetch_project_sucess = (data: any) => {
  return {
    type: FETCH_PROJECT_SUCCESS,
    payload: data,
  };
};

export const fetch_project_failure = (data: any) => {
  return {
    type: FETCH_PROJECT_FAILURE,
    payload: data,
  };
};

export const add_project_request = () => {
  return {
    type: ADD_PROJECT_REQUEST
  }
}

export const add_project_success = (data: any) => {
  console.log(data)
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: data
  }
}

export const add_project_failure = (data: any) => {
  return {
    type: ADD_PROJECT_FAILURE,
    payload: data
  }
}