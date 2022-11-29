import { ActionType } from "redux-promise-middleware";
import {
  checkPin,
  deleteImage,
  editImage,
  editPassword,
  editPhone,
  editPin,
  editProfile,
  getDetailUser,
  getDetailUser2,
  getExpense,
  getHistory,
  getAllUser,
} from "src/modules/api/User";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const userGetAllPending = () => ({
  type: actionStrings.userGetAll.concat("_", Pending),
});

const userGetAllRejected = (error) => ({
  type: actionStrings.userGetAll.concat("_", Rejected),
  payload: { error },
});

const userGetAllFulfilled = (data) => ({
  type: actionStrings.userGetAll.concat("_", Fulfilled),
  payload: { data },
});

const userDetailPending = () => ({
  type: actionStrings.userDetail.concat("_", Pending),
});

const userDetailRejected = (error) => ({
  type: actionStrings.userDetail.concat("_", Rejected),
  payload: { error },
});

const userDetailFulfilled = (data) => ({
  type: actionStrings.userDetail.concat("_", Fulfilled),
  payload: { data },
});

const userDetail2Pending = () => ({
  type: actionStrings.userDetail2.concat("_", Pending),
});

const userDetail2Rejected = (error) => ({
  type: actionStrings.userDetail2.concat("_", Rejected),
  payload: { error },
});

const userDetail2Fulfilled = (data) => ({
  type: actionStrings.userDetail2.concat("_", Fulfilled),
  payload: { data },
});

const userExpensePending = () => ({
  type: actionStrings.userExpense.concat("_", Pending),
});

const userExpenseRejected = (error) => ({
  type: actionStrings.userExpense.concat("_", Rejected),
  payload: { error },
});

const userExpenseFulfilled = (data) => ({
  type: actionStrings.userExpense.concat("_", Fulfilled),
  payload: { data },
});

const userHistoryPending = () => ({
  type: actionStrings.userHistory.concat("_", Pending),
});

const userHistoryRejected = (error) => ({
  type: actionStrings.userHistory.concat("_", Rejected),
  payload: { error },
});

const userHistoryFulfilled = (data) => ({
  type: actionStrings.userHistory.concat("_", Fulfilled),
  payload: { data },
});

const editProfilePending = () => ({
  type: actionStrings.userEditProfile.concat("_", Pending),
});

const editProfileRejected = (error) => ({
  type: actionStrings.userEditProfile.concat("_", Rejected),
  payload: { error },
});
const editProfileFulfilled = (data) => ({
  type: actionStrings.userEditProfile.concat("_", Fulfilled),
  payload: { data },
});

const editPhonePending = () => ({
  type: actionStrings.userEditPhone.concat("_", Pending),
});

const editPhoneRejected = (error) => ({
  type: actionStrings.userEditPhone.concat("_", Rejected),
  payload: { error },
});
const editPhoneFulfilled = (data) => ({
  type: actionStrings.userEditPhone.concat("_", Fulfilled),
  payload: { data },
});

const editPinPending = () => ({
  type: actionStrings.userEditPin.concat("_", Pending),
});

const editPinRejected = (error) => ({
  type: actionStrings.userEditPin.concat("_", Rejected),
  payload: { error },
});
const editPinFulfilled = (data) => ({
  type: actionStrings.userEditPin.concat("_", Fulfilled),
  payload: { data },
});

const editPasswordPending = () => ({
  type: actionStrings.userEditPassword.concat("_", Pending),
});

const editPasswordRejected = (error) => ({
  type: actionStrings.userEditPassword.concat("_", Rejected),
  payload: { error },
});
const editPasswordFulfilled = (data) => ({
  type: actionStrings.userEditPassword.concat("_", Fulfilled),
  payload: { data },
});

const editImagePending = () => ({
  type: actionStrings.userEditImage.concat("_", Pending),
});

const editImageRejected = (error) => ({
  type: actionStrings.userEditImage.concat("_", Rejected),
  payload: { error },
});
const editImageFulfilled = (data) => ({
  type: actionStrings.userEditImage.concat("_", Fulfilled),
  payload: { data },
});

const deleteImagePending = () => ({
  type: actionStrings.userDeleteImage.concat("_", Pending),
});

const deleteImageRejected = (error) => ({
  type: actionStrings.userDeleteImage.concat("_", Rejected),
  payload: { error },
});
const deleteImageFulfilled = (data) => ({
  type: actionStrings.userDeleteImage.concat("_", Fulfilled),
  payload: { data },
});

const checkPinPending = () => ({
  type: actionStrings.checkPin.concat("_", Pending),
});

const checkPinRejected = (error) => ({
  type: actionStrings.checkPin.concat("_", Rejected),
  payload: { error },
});

const checkPinFulfilled = (pin) => ({
  type: actionStrings.checkPin.concat("_", Fulfilled),
  payload: { pin },
});

const getAllUserThunk = (token, link) => {
  return async (dispatch) => {
    try {
      dispatch(userGetAllPending());
      const result = await getAllUser(token, link);
      dispatch(userGetAllFulfilled(result.data));
    } catch (error) {
      dispatch(userGetAllRejected(error));
    }
  };
};

const getUserDetailThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(userDetailPending());
      const result = await getDetailUser(token, id);
      dispatch(userDetailFulfilled(result.data));
    } catch (error) {
      dispatch(userDetailRejected(error));
    }
  };
};

const getUserDetail2Thunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(userDetail2Pending());
      const result = await getDetailUser2(token, id);
      dispatch(userDetail2Fulfilled(result.data));
    } catch (error) {
      dispatch(userDetail2Rejected(error));
    }
  };
};

const getUserExpenseThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(userExpensePending());
      const result = await getExpense(token, id);
      dispatch(userExpenseFulfilled(result.data));
    } catch (error) {
      dispatch(userExpenseRejected(error));
    }
  };
};

const getUserHistoryThunk = (token, link) => {
  return async (dispatch) => {
    try {
      dispatch(userHistoryPending());
      const result = await getHistory(token, link);
      dispatch(userHistoryFulfilled(result.data));
    } catch (error) {
      dispatch(userHistoryRejected(error));
    }
  };
};

const editProfileThunk = (token, id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editProfilePending());
      const result = await editProfile(token, id, body);
      dispatch(editProfileFulfilled(result.data));
    } catch (error) {
      dispatch(editProfileRejected(error));
    }
  };
};

const editPhoneThunk = (token, id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editPhonePending());
      const result = await editPhone(token, id, body);
      dispatch(editPhoneFulfilled(result.data));
    } catch (error) {
      dispatch(editPhoneRejected(error));
    }
  };
};

const editImageThunk = (token, id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editImagePending());
      const result = await editImage(token, id, body);
      dispatch(editImageFulfilled(result.data));
    } catch (error) {
      dispatch(editImageRejected(error));
    }
  };
};

const editPinThunk = (token, id, body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(editPinPending());
      const result = await editPin(token, id, body);
      dispatch(editPinFulfilled(result.data));
      typeof cbSuccess === "function" && cbSuccess();
    } catch (error) {
      dispatch(editPinRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const editPasswordThunk = (token, id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editPasswordPending());
      const result = await editPassword(token, id, body);
      dispatch(editPasswordFulfilled(result.data));
    } catch (error) {
      dispatch(editPasswordRejected(error));
    }
  };
};

const deleteImageThunk = (token, id, body) => {
  return async (dispatch) => {
    try {
      dispatch(deleteImagePending());
      const result = await deleteImage(token, id);
      dispatch(deleteImageFulfilled(result.data));
    } catch (error) {
      dispatch(deleteImageRejected(error));
    }
  };
};

const checkPinThunk = (pin, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch(checkPinPending());
      const result = await checkPin(pin, token);
      dispatch(checkPinFulfilled(result));
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      dispatch(checkPinRejected(error));
    }
  };
};

const userAction = {
  getAllUserThunk,
  getUserDetailThunk,
  getUserDetail2Thunk,
  getUserExpenseThunk,
  getUserHistoryThunk,
  editProfileThunk,
  editPhoneThunk,
  editImageThunk,
  editPinThunk,
  editPasswordThunk,
  deleteImageThunk,
  checkPinThunk,
};

export default userAction;
