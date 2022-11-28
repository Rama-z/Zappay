import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isFulfilled: false,
  isError: false,
  error: null,
  allData: [],
  profile: {
    firstName: null,
    lastName: null,
    email: null,
    image: null,
    noTelp: null,
    balance: null,
  },
  dashboard: {
    totalIncome: null,
    totalExpense: null,
    listIncome: [],
    listExpense: [],
  },
  history: [],
  pagination: {
    page: null,
    totalPage: null,
    limit: null,
    totalData: null,
  },
  profileTarget: {
    firstName: null,
    lastName: null,
    email: null,
    image: null,
    noTelp: null,
    balance: null,
  },
};

const userReducer = (prevState = initialState, { type, payload }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const {
    userGetAll,
    userDetail,
    userDetail2,
    userExpense,
    userHistory,
    checkPin,
    userEditProfile,
    userEditPhone,
    userEditImage,
    userEditPin,
    userEditPassword,
    userDeleteImage,
  } = actionStrings;

  switch (type) {
    case userGetAll.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userGetAll.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userGetAll.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        allData: payload.data.data.map((item) => {
          return {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            noTelp: item.noTelp,
            image: item.image,
          };
        }),
        pagination: {
          page: payload.data.pagination.page,
          totalPage: payload.data.pagination.totalPage,
          limit: payload.data.pagination.limit,
          totalData: payload.data.pagination.totalData,
        },
      };

    case userDetail.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userDetail.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userDetail.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        profile: {
          firstName: payload.data.data.firstName,
          lastName: payload.data.data.lastName,
          email: payload.data.data.email,
          image: payload.data.data.image,
          noTelp: payload.data.data.noTelp,
          balance: payload.data.data.balance,
        },
      };

    case userDetail2.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userDetail2.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userDetail2.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        profileTarget: {
          firstName: payload.data.data.firstName,
          lastName: payload.data.data.lastName,
          email: payload.data.data.email,
          image: payload.data.data.image,
          noTelp: payload.data.data.noTelp,
          balance: payload.data.data.balance,
        },
      };

    case userExpense.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userExpense.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userExpense.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        dashboard: {
          totalIncome: payload.data.data.totalIncome,
          totalExpense: payload.data.data.totalExpense,
          listIncome: payload.data.data.listIncome.map((item) => {
            return { day: item.day, total: item.total };
          }),
          listExpense: payload.data.data.listExpense.map((item) => {
            return { day: item.day, total: item.total };
          }),
        },
      };

    case userHistory.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userHistory.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userHistory.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        history: payload.data.data.map((item) => {
          return {
            firstName: item.firstName,
            image: item.image,
            lastName: item.lastname,
            id: item.id,
            amount: item.amount,
            status: item.status,
            notes: item.notes,
            createdAt: item.createdAt,
            fullName: item.fullName,
            type: item.type,
          };
        }),
        pagination: {
          page: payload.data.pagination.page,
          totalPage: payload.data.pagination.totalPage,
          limit: payload.data.pagination.limit,
          totalData: payload.data.pagination.totalData,
        },
      };

    case checkPin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        pinMsg: null,
        pinWorng: null,
      };
    case checkPin.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        pinWorng: true,
      };
    case checkPin.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        pinMsg: payload.pin.data.msg,
      };

    case userEditProfile.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userEditProfile.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userEditProfile.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };

    case userEditPhone.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userEditPhone.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userEditPhone.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };

    case userEditImage.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userEditImage.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userEditImage.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };

    case userEditPin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userEditPin.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };

    case userEditPin.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };

    case userEditPassword.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userEditPassword.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userEditPassword.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };

    case userDeleteImage.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userDeleteImage.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case userDeleteImage.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };

    default:
      return prevState;
  }
};

export default userReducer;
