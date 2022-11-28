import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import transferReducer from "./transfer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  transfer: transferReducer,
});
