import {
  LOGIN_STARTS,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
} from "../action/userAction";
import { initialValue } from "../initialValue";

const userReducer = (state = initialValue.user, action) => {
  switch (action.type) {
    case LOGIN_STARTS:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_SUCCESSFUL:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const token = localStorage.getItem("token");
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        token: token,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        userInfo: null,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isFetching: false,
        userInfo: null,
        error: null,
        token: null,
      };
    case UPDATE_START:
      return {
        ...state,
        isFetching: true,
        userInfo: state.userInfo,
        error: null,
        token: state.token,
      };
    case UPDATE_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        error: null,
        token: state.token,
      };
    case UPDATE_FAILED:
      return {
        ...state,
        isFetching: false,
        userInfo: state.userInfo,
        error: action.payload,
        token: state.token,
      };
    default:
      return state;
  }
};

export default userReducer;
