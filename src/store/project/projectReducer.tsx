import { initStateInterface } from "../../interface/projectInterface";
import {
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
} from "./projectTypes";

const initState: initStateInterface = {
  projects: [],
  loading: false,
  error: "",
};

const projectReducer = (state = initState, action: any) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_PROJECT_SUCCESS: {
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: "",
      };
    }
    case FETCH_PROJECT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ADD_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case ADD_PROJECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        projects: [...state.projects, action.payload]
      }
    }
    case ADD_PROJECT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default:
      return state;
  }
};

export default projectReducer;
