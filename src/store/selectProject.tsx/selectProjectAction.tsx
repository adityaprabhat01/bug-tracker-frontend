import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
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
  UPDATE_PROJECT_TECHSTACK_FAILURE,
  UPDATE_PROJECT_TECHSTACK_REQUEST,
  UPDATE_PROJECT_TECHSTACK_SUCCESS,
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

export const fetch_select_project_failure = (
  data: ErrorFetched | MessageFetched
) => {
  return {
    type: FETCH_SELECT_PROJECT_FAILURE,
    payload: data,
  };
};

export const add_member_request = () => {
  return {
    type: ADD_MEMBER_REQUEST,
  };
};

export const add_member_success = (data: {
  project_id: string;
  username: string;
}) => {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload: data,
  };
};

export const add_member_failure = (data: ErrorFetched | MessageFetched) => {
  return {
    type: ADD_MEMBER_FAILURE,
    payload: data,
  };
};

export const remove_member_request = () => {
  return {
    type: REMOVE_MEMBER_REQUEST,
  };
};

export const remove_member_success = (data: { user_id: string }) => {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    payload: data,
  };
};

export const remove_member_failure = (data: ErrorFetched | MessageFetched) => {
  return {
    type: REMOVE_MEMBER_FAILURE,
    payload: data,
  };
};

export const add_bug_request = () => {
  return {
    type: ADD_BUG_REQUEST,
  };
};

export const add_bug_success = (data: any) => {
  return {
    type: ADD_BUG_SUCCESS,
    payload: data,
  };
};

export const add_bug_failure = (data: ErrorFetched | MessageFetched) => {
  return {
    type: ADD_BUG_FAILURE,
    payload: data,
  };
};

export const update_project_body_request = () => {
  return {
    type: UPDATE_PROJECT_BODY_REQUEST,
  };
};

export const update_project_body_success = (data: { body: string }) => {
  return {
    type: UPDATE_PROJECT_BODY_SUCCESS,
    payload: data,
  };
};

export const update_project_body_failure = (
  data: ErrorFetched | MessageFetched
) => {
  return {
    type: UPDATE_PROJECT_BODY_FAILURE,
    payload: data,
  };
};

export const update_project_techStack_request = () => {
  return {
    type: UPDATE_PROJECT_TECHSTACK_REQUEST,
  };
};

export const update_project_techStack_success = (data: {
  name: string;
  project_id: string;
  type: string;
}) => {
  return {
    type: UPDATE_PROJECT_TECHSTACK_SUCCESS,
    payload: data,
  };
};

export const update_project_techstack_failure = (
  data: ErrorFetched | MessageFetched
) => {
  return {
    type: UPDATE_PROJECT_TECHSTACK_FAILURE,
    payload: data,
  };
};
