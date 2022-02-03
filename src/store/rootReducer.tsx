import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import bugReducer from "./bug/bugReducer";
import projectReducer from "./project/projectReducer";
import selectProjectReducer from "./selectProject.tsx/selectProjectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  project: selectProjectReducer,
  bug: bugReducer
})

export default rootReducer;