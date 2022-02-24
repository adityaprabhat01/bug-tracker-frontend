import {
  UPDATE_LABEL_FAILURE,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  BUG_FETCH_FAILURE,
  BUG_FETCH_REQUEST,
  BUG_FETCH_SUCCESS,
  POST_BUG_COMMENT_FAILURE,
  POST_BUG_COMMENT_REQUEST,
  POST_BUG_COMMENT_SUCCESS,
  UPDATE_BUG_BODY_FAILURE,
  UPDATE_BUG_BODY_REQUEST,
  UPDATE_BUG_BODY_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  CLOSE_BUG_REQUEST,
  CLOSE_BUG_SUCCESS,
  CLOSE_BUG_FAILURE,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAILURE,
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

export const update_bug_body_request = () => {
  return {
    type: UPDATE_BUG_BODY_REQUEST
  }
}

export const update_bug_body_success = (data: any) => {
  return {
    type: UPDATE_BUG_BODY_SUCCESS,
    payload: data
  }
}

export const update_bug_body_failure = (data: { error: string, message: string }) => {
  return {
    type: UPDATE_BUG_BODY_FAILURE,
    payload: data
  }
}

export const post_bug_comment_request = () => {
  return {
    type: POST_BUG_COMMENT_REQUEST
  }
}

export const post_bug_comment_success = (data: any) => {
  return {
    type: POST_BUG_COMMENT_SUCCESS,
    payload: data
  }
}

export const post_bug_comment_failure = (data: { error: string, message: string }) => {
  return {
    type: POST_BUG_COMMENT_FAILURE,
    payload: data
  }
}

export const update_label_request = () => {
  return {
    type: UPDATE_LABEL_REQUEST
  }
}

export const update_label_success = (data: any) => {
  return {
    type: UPDATE_LABEL_SUCCESS,
    payload: data
  }
}

export const update_label_failure = (data: { error: string, message: string }) => {
  return {
    type: UPDATE_LABEL_FAILURE,
    payload: data
  }
}

export const delete_comment_request = () => {
  return {
    type: DELETE_COMMENT_REQUEST
  }
}

export const delete_comment_success = (data: any) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: data
  }
}

export const delete_comment_failure = (data: { error: string, message: string }) => {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: data
  }
}

export const close_bug_request = () => {
  return {
    type: CLOSE_BUG_REQUEST
  }
}

export const close_bug_success = (data: any) => {
  return {
    type: CLOSE_BUG_SUCCESS,
    payload: data
  }
}

export const close_bug_failure = (data: { error: string, message: string }) => {
  return {
    type: CLOSE_BUG_FAILURE,
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

export const remove_member_failure = (data: { message: string, error: string }) => {
  return {
    type: REMOVE_MEMBER_FAILURE,
    payload: data
  }
}