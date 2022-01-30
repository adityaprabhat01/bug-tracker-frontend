import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import projectReducer from "./project/projectReducer";
import selectProjectReducer from "./selectProject.tsx/selectProjectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  project: selectProjectReducer
})

export default rootReducer;