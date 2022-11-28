import { ActionType } from "redux-promise-middleware";
import { login, logout, register, forgot, reset } from "src/modules/api/Auth";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const loginPending = () => ({
  type: actionStrings.authLogin.concat("_", Pending),
});
const loginRejected = (error) => ({
  type: actionStrings.authLogin.concat("_", Rejected),
  payload: { error },
});
const loginFulfilled = (data) => ({
  type: actionStrings.authLogin.concat("_", Fulfilled),
  payload: { data },
});

const logoutPending = () => ({
  type: actionStrings.authLogout.concat("_", Pending),
});
const logoutRejected = (error) => ({
  type: actionStrings.authLogout.concat("_", Rejected),
  payload: { error },
});
const logoutFulfilled = (data) => ({
  type: actionStrings.authLogout.concat("_", Fulfilled),
  payload: { data },
});

const registerPending = () => ({
  type: actionStrings.authRegister.concat("_", Pending),
});
const registerRejected = (error) => ({
  type: actionStrings.authRegister.concat("_", Rejected),
  payload: { error },
});
const registerFulfilled = (data) => ({
  type: actionStrings.authRegister.concat("_", Fulfilled),
  payload: { data },
});

const forgotPending = () => ({
  type: actionStrings.authForgot.concat("_", Pending),
});
const forgotRejected = (error) => ({
  type: actionStrings.authForgot.concat("_", Rejected),
  payload: { error },
});
const forgotFulfilled = (data) => ({
  type: actionStrings.authForgot.concat("_", Fulfilled),
  payload: { data },
});

const resetPending = () => ({
  type: actionStrings.authReset.concat("_", Pending),
});
const resetRejected = (error) => ({
  type: actionStrings.authReset.concat("_", Rejected),
  payload: { error },
});
const resetFulfilled = (data) => ({
  type: actionStrings.authReset.concat("_", Fulfilled),
  payload: { data },
});

const loginThunk = (body) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const result = await login(body);
      dispatch(loginFulfilled(result.data));
    } catch (error) {
      dispatch(loginRejected(error));
    }
  };
};

const logoutThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      const result = await logout();
      dispatch(logoutFulfilled(result.data));
    } catch (error) {
      dispatch(logoutRejected(error));
    }
  };
};

const registerThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(registerPending());
      const result = await register(body);
      dispatch(registerFulfilled(result.data));
      typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(registerRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const forgotThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPending());
      const result = await forgot(body);
      dispatch(forgotFulfilled(result.data));
      typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(forgotRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const resetThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(resetPending());
      const result = await reset(body);
      dispatch(resetFulfilled(result.data));
      typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(resetRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const authAction = {
  loginThunk,
  logoutThunk,
  registerThunk,
  forgotThunk,
  resetThunk,
};

export default authAction;
