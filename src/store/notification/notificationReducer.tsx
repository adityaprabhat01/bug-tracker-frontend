import {
  FETCH_NOTIFICATION_COUNT,
  FETCH_NOTIFICATION_FAILURE,
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  MARK_AS_READ_FAILURE,
  MARK_AS_READ_REQUEST,
  MARK_AS_READ_SUCCESS,
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
  seen: {
    seen: false,
    loading: false,
    error: "",
  },
  received: {
    notifications: []
  }
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
          count: state.notification.count + 1,
        },
        received: {
          ...state.received,
          notifications: [...state.received.notifications, action.payload]
        }
      };
    }
    case MARK_AS_READ_REQUEST: {
      return {
        ...state,
        seen: {
          ...state.seen,
          loading: true,
          error: "",
        },
      };
    }
    case MARK_AS_READ_SUCCESS: {
      return {
        ...state,
        notification: {
          ...state.notification,
          notifications: state.notification.notifications.map((item: any, i) =>
            item._id === action.payload.notification_id
              ? { ...item, seen: true }
              : item
          ),
        },
      };
    }
    case MARK_AS_READ_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        seen: {
          ...state.seen,
          seen: action.payload.read,
          loading: false,
          error: error === undefined ? message : error,
        },
      };
    }
    case FETCH_NOTIFICATION_COUNT: {
      return {
        ...state,
        notification: {
          ...state.notification,
          count: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;
