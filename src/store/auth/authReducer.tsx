import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_AUTH_FROM_COOKIES,
} from "./authTypes";

const initState = {
  name: "",
  username: "",
  email: "",
  user_id: "",
  loading: false,
  error: "",
  isAuthenticated: false,
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
        isAuthenticated: false,
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
        isAuthenticated: true,
      };
    }
    case SIGNUP_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
        isAuthenticated: false,
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
        isAuthenticated: false,
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
        isAuthenticated: true,
      };
    }
    case LOGIN_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error,
        isAuthenticated: false,
      };
    }
    case UPDATE_AUTH_FROM_COOKIES: {
      const { user_id, username } = action.payload;
      return {
        ...state,
        user_id,
        username
      }
    }
    default:
      return state;
  }
};

export default authReducer;
