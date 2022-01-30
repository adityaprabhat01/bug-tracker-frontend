import { selectProjectInitStateInterface } from "../../interface/projectInterface";
import { FETCH_SELECT_PROJECT_FAILURE, FETCH_SELECT_PROJECT_REQUEST, FETCH_SELECT_PROJECT_SUCCESS } from "./selectProjectType";

const initState: selectProjectInitStateInterface = {
  project: {},
  loading: false,
  error: "",
};

const selectProjectReducer = (state = initState, action: any) => {
  switch(action.type) {
    case FETCH_SELECT_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case FETCH_SELECT_PROJECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        project: action.payload
      }
    }
    case FETCH_SELECT_PROJECT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default: return state
  }
}

export default selectProjectReducer;