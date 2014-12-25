import {
  API_CALL_STARTS,
  API_CALL_SUCCESSFUL,
  API_CALL_FAILED,
  FETCH_STARTS,
  FETCH_SUCCESS,
  FETCH_FAILED,
} from "../action/fileAction";
import { initialValue } from "../initialValue";

const FileReducer = (state = initialValue.file, action) => {
  switch (action.type) {
    case API_CALL_STARTS:
      return {
        ...state,
        isFetching: true,
        refresh: state.refresh,
      };
    case API_CALL_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
        refresh: !state.refresh,
      };
    case API_CALL_FAILED:
      return {
        ...state,
        isFetching: false,
        refresh: !state.refresh,
      };
    case FETCH_STARTS:
      return {
        ...state,
        isFetching: true,
        refresh: state.refresh,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        refresh: state.refresh,
      };
    case FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        refresh: state.refresh,
      };
    default:
      return state;
  }
};
export default FileReducer;
