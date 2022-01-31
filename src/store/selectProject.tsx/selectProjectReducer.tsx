import { selectProjectInitStateInterface } from "../../interface/projectInterface";
import {
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  FETCH_SELECT_PROJECT_FAILURE,
  FETCH_SELECT_PROJECT_REQUEST,
  FETCH_SELECT_PROJECT_SUCCESS,
  REMOVE_MEMBER_FAILURE,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
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
    dateCreated: "",
    members: [],
    techStack: [],
    comments: [],
  },
  loading: false,
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
    default:
      return state;
  }
};

export default selectProjectReducer;
