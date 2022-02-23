import { selectProjectInitStateInterface } from "../../interface/projectInterface";
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

const initState: selectProjectInitStateInterface = {
  project: {
    _id: "",
    title: "",
    body: "",
    user: {
      name: "",
      username: "",
      user_id: "",
      _id: "",
    },
    bugs: [],
    date_opened: "",
    members: [],
    techStack: [],
    comments: [],
  },
  loading: true,
  error: "",
};

const selectProjectReducer = (state = initState, action: any) => {
  switch (action.type) {
    case FETCH_SELECT_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_SELECT_PROJECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        project: action.payload,
      };
    }
    case FETCH_SELECT_PROJECT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ADD_MEMBER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          members: [...state.project.members, action.payload],
        },
        loading: false,
        error: ""
      };
    }
    case ADD_MEMBER_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error
      }
    }
    case REMOVE_MEMBER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case REMOVE_MEMBER_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          members: state.project.members.filter(member => member.user_id !== action.payload)
        },
        loading: false,
        error: ""
      }
    }
    case REMOVE_MEMBER_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error
      }
    }
    case ADD_BUG_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case ADD_BUG_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        project: {
          ...state.project,
          bugs: [...state.project.bugs, action.payload]
        }
      }
    }
    case ADD_BUG_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error
      }
    }
    case UPDATE_PROJECT_BODY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case UPDATE_PROJECT_BODY_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          body: action.payload.body
        },
        loading: false,
        error: ""
      }
    }
    case UPDATE_PROJECT_BODY_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error
      }
    }
    case UPDATE_PROJECT_TECHSTACK_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case UPDATE_PROJECT_TECHSTACK_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        project: {
          ...state.project,
          techStack: action.payload.techStack
        }
      }
    }
    case UPDATE_PROJECT_TECHSTACK_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error
      }
    }
    default:
      return state;
  }
};

export default selectProjectReducer;
