import { createStore, combineReducers } from "redux";
import fileReducer from "./reducer/fileReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  file: fileReducer,
  user: userReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
