import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  userData: { id: null, token: null, pin: null },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
};

const authReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { authForgot, authLogin, authLogout, authRegister, authReset } =
    actionStrings;
  switch (type) {
    case authLogin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogin.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message,
      };
    case authLogin.concat("_", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        userData: {
          id: payload.data.data.id,
          token: payload.data.data.token,
          pin: payload.data.data.pin,
        },
      };

    case authRegister.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authRegister.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message,
      };
    case authRegister.concat("_", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
      };

    case authLogout.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogout.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message,
      };
    case authLogout.concat("_", Fulfilled):
      return initialState;

    case authForgot.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authForgot.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message,
      };
    case authForgot.concat("_", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
      };

    case authReset.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authReset.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message,
      };
    case authReset.concat("_", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
      };

    default:
      return prevState;
  }
};

export default authReducer;
