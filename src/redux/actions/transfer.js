import { actionStrings } from "./actionStrings";
import { ActionType } from "redux-promise-middleware";
import { transfer } from "src/modules/api/Transfer";

const transferData = (body) => {
  return {
    type: actionStrings.transferData,
    payload: { body },
  };
};

const { Pending, Rejected, Fulfilled } = ActionType;

const transferPending = () => ({
  type: actionStrings.transfer.concat("_", Pending),
});

const transferRejected = (error) => ({
  type: actionStrings.transfer.concat("_", Rejected),
  payload: { error },
});

const transferFulfilled = (data) => ({
  type: actionStrings.transfer.concat("_", Fulfilled),
  payload: { data },
});

const transferThunk = (token, body, cb) => {
  return async (dispatch) => {
    try {
      dispatch(transferPending());
      const result = await transfer(token, body);
      if (typeof cb === "function") {
        cb();
      }
      dispatch(transferFulfilled(result.data));
    } catch (error) {
      dispatch(transferRejected(error));
    }
  };
};

const transferReset = () => {
  return {
    type: actionStrings.resetTransfer,
  };
};

const transferDataActions = {
  transferData,
  transferThunk,
  transferReset,
};

export default transferDataActions;
