import {
  FETCH_NOTIFICATION_FAILURE,
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  RECEIVE_NOTIFICATION_COUNT,
} from "./notificationType";

const initState = {
  notification: {
    _id: "",
    user_id: "",
    username: "",
    name: "",
    count: 0,
    notifications: [],
  },
  loading: false,
  error: "",
};

const notificationReducer = (state = initState, action: any) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notification: action.payload,
        loading: false,
        error: "",
      };
    }
    case FETCH_NOTIFICATION_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error,
      };
    }
    case RECEIVE_NOTIFICATION_COUNT: {
      return {
        ...state,
        notification: {
          ...state.notification,
          count: state.notification.count + 1
        }
      }
    }
    default:
      return state;
  }
};

export default notificationReducer;
