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
} from "src/modules/api/User";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

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

const checkPinPending = () => ({
  type: actionStrings.userCheckPin.concat("_", Pending),
});

const checkPinRejected = (error) => ({
  type: actionStrings.userCheckPin.concat("_", Rejected),
  payload: { error },
});
const checkPinFulfilled = (data) => ({
  type: actionStrings.userCheckPin.concat("_", Fulfilled),
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

const getUserDetailThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(userDetailPending());
      const result = await getDetailUser(token, id);
      console.log(result);
      dispatch(userDetailFulfilled(result.data));
    } catch (error) {
      dispatch(userDetailRejected(error));
    }
  };
};

const checkPinThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(checkPinPending());
      const result = await checkPin(token, id);
      dispatch(checkPinFulfilled(result.data));
    } catch (error) {
      dispatch(checkPinRejected(error));
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

const userAction = {
  getUserDetailThunk,
  checkPinThunk,
  editProfileThunk,
  editPhoneThunk,
  editImageThunk,
  editPinThunk,
  editPasswordThunk,
  deleteImageThunk,
};

export default userAction;
