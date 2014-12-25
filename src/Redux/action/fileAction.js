export const API_CALL_STARTS = "API_CALL_STARTS";
export const API_CALL_SUCCESSFUL = "API_CALL_SUCCESSFUL";
export const API_CALL_FAILED = "API_CALL_FAILED";
export const FETCH_STARTS = "FETCH_STARTS";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILED = "FETCH_FAILED";

export const api_call_starts = () => {
  return {
    type: "API_CALL_STARTS",
  };
};
export const api_call_success = () => {
  return {
    type: "API_CALL_SUCCESSFUL",
  };
};
export const api_call_failed = () => {
  return {
    type: "API_CALL_FAILED",
  };
};
export const fetch_starts = () => {
  return {
    type: "FETCH_STARTS",
  };
};
export const fetch_success = () => {
  return {
    type: "FETCH_SUCCESS",
  };
};
export const fetch_failed = () => {
  return {
    type: "FETCH_FAILED",
  };
};
