import { combineReducers } from "redux";
import alertReducer from "./alert";
import authReducer from "./auth";
import profile from "./profile";

export default combineReducers({
  alertReducer,
  authReducer,
  profile,
});
