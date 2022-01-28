import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./authTypes";

const initState = {
  name: "",
  username: "",
  email: "",
  user_id: "",
  loading: false,
  error: "",
};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        name: "",
        username: "",
        email: "",
        user_id: "",
      };
    case SIGNUP_SUCCESS: {
      const { name, user_id, username, email } = action.payload;
      return {
        ...state,
        loading: false,
        name,
        user_id,
        username,
        email,
        error: "",
      };
    }
    case SIGNUP_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        name: "",
        username: "",
        email: "",
        user_id: "",
      };
    case LOGIN_SUCCESS: {
      const { name, user_id, username, email } = action.payload;
      return {
        ...state,
        name,
        user_id,
        username,
        email,
        loading: false,
        error: "",
      };
    }
    case LOGIN_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
