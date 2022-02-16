import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import bugReducer from "./bug/bugReducer";
import notificationReducer from "./notification/notificationReducer";
import projectReducer from "./project/projectReducer";
import selectProjectReducer from "./selectProject.tsx/selectProjectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  project: selectProjectReducer,
  bug: bugReducer,
  notification: notificationReducer
})

export default rootReducer;