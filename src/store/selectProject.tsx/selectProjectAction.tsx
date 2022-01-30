import {
  FETCH_SELECT_PROJECT_FAILURE,
  FETCH_SELECT_PROJECT_REQUEST,
  FETCH_SELECT_PROJECT_SUCCESS,
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
