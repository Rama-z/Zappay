import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  transferData: {
    receiverId: null,
    amount: null,
    notes: null,
  },
  transferDuit: {
    id: null,
    senderId: null,
    receiverId: null,
    amount: null,
    balance: null,
    notes: null,
    status: null,
  },
};

const transferReducer = (prevState = initialState, { type, payload }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { transferData, transferDuit } = actionStrings;
  console.log(payload);
  switch (type) {
    case transferData:
      return {
        ...prevState,
        transferData: {
          receiverId: payload.body.id,
          amount: Number(payload.body.ammount),
          notes: payload.body.notes,
        },
      };
    case transferDuit.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case transferDuit.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case transferDuit.concat("_", Fulfilled):
      console.log(payload);
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        transferDuit: {
          id: payload.data.id,
          senderId: payload.data.senderId,
          receiverId: payload.data.receiverId,
          amount: payload.data.amount,
          balance: payload.data.balance,
          notes: payload.data.notes,
          status: payload.data.status,
        },
      };
    default:
      return prevState;
  }
};

export default transferReducer;
