import { actionStrings } from "./actionStrings";
import { ActionType } from "redux-promise-middleware";
import { transferDuit } from "src/modules/api/Transfer";

const transferData = (body) => {
  return {
    type: actionStrings.transferData,
    payload: { body },
  };
};

const { Pending, Rejected, Fulfilled } = ActionType;

const transferDuitPending = () => ({
  type: actionStrings.transferDuit.concat("_", Pending),
});

const transferDuitRejected = (error) => ({
  type: actionStrings.transferDuit.concat("_", Rejected),
  payload: { error },
});

const transferDuitFulfilled = (data) => ({
  type: actionStrings.transferDuit.concat("_", Fulfilled),
  payload: { data },
});

const transferDuitThunk = (token, body, cb) => {
  return async (dispatch) => {
    try {
      dispatch(transferDuitPending());
      const result = await transferDuit(token, body);
      console.log(result);
      if (typeof cb === "function") {
        cb();
      }
      dispatch(transferDuitFulfilled(result.data));
    } catch (error) {
      dispatch(transferDuitRejected(error));
    }
  };
};

const transferDataActions = {
  transferData,
  transferDuitThunk,
};

export default transferDataActions;
