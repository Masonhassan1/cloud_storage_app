export const LOGIN_STARTS = "LOGIN_STARTS";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const UPDATE_START = "UPDATE_START";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

export const login_starts = () => {
  return {
    type: "LOGIN_STARTS",
  };
};
export const login_successful = (user) => {
  return {
    type: "LOGIN_SUCCESSFUL",
    payload: user,
  };
};
export const login_failed = (error) => {
  return {
    type: "LOGIN_FAILED",
    payload: error,
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const userUpdateStart = () => {
  return {
    type: "UPDATE_START",
  };
};
export const userUpdateSuccess = (user) => {
  return {
    type: "UPDATE_SUCCESS",
    payload: user,
  };
};
export const userUpdateFailure = (error) => {
  return {
    type: "UPDATE_FAILED",
    payload: error,
  };
};
