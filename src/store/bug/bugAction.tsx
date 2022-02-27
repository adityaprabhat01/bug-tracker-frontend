import { BugInterface, CommentInterface, LabelInterface } from "../../interface/bugInterface";
import { ErrorFetched, MessageFetched } from "../../interface/errorInterface";
import { User } from "../../interface/userInterface";
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

export const bug_fetch_success = (data: BugInterface) => {
  return {
    type: BUG_FETCH_SUCCESS,
    payload: data,
  };
};

export const bug_fetch_failure = (data: ErrorFetched | MessageFetched) => {
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

export const add_member_success = (data: User) => {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload: data
  }
}

export const add_member_failure = (data: MessageFetched | ErrorFetched) => {
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

export const update_bug_body_success = (data: { body: string }) => {
  return {
    type: UPDATE_BUG_BODY_SUCCESS,
    payload: data
  }
}

export const update_bug_body_failure = (data: ErrorFetched | MessageFetched) => {
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

export const post_bug_comment_success = (data: CommentInterface) => {
  return {
    type: POST_BUG_COMMENT_SUCCESS,
    payload: data
  }
}

export const post_bug_comment_failure = (data: ErrorFetched | MessageFetched) => {
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

export const update_label_success = (data: Array<LabelInterface>) => {
  return {
    type: UPDATE_LABEL_SUCCESS,
    payload: data
  }
}

export const update_label_failure = (data: ErrorFetched | MessageFetched) => {
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

export const delete_comment_success = (data: CommentInterface) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: data
  }
}

export const delete_comment_failure = (data: ErrorFetched | MessageFetched) => {
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

export const close_bug_success = (data: { isOpen: boolean }) => {
  return {
    type: CLOSE_BUG_SUCCESS,
    payload: data
  }
}

export const close_bug_failure = (data: ErrorFetched | MessageFetched) => {
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

export const remove_member_success = (data: { user_id: string }) => {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    payload: data
  }
}

export const remove_member_failure = (data: ErrorFetched | MessageFetched) => {
  return {
    type: REMOVE_MEMBER_FAILURE,
    payload: data
  }
}