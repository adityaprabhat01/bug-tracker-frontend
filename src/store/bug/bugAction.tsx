import {
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  BUG_FETCH_FAILURE,
  BUG_FETCH_REQUEST,
  BUG_FETCH_SUCCESS,
} from "./bugType";

export const bug_fetch_request = () => {
  return {
    type: BUG_FETCH_REQUEST,
  };
};

export const bug_fetch_success = (data: any) => {
  return {
    type: BUG_FETCH_SUCCESS,
    payload: data,
  };
};

export const bug_fetch_failure = (data: any) => {
  return {
    type: BUG_FETCH_FAILURE,
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
  return  {
    type: ADD_MEMBER_FAILURE,
    payload: data
  }
}