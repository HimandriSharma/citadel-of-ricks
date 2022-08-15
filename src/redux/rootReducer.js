import responseReducer from "./api/ResponseReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  api: responseReducer,
});

export default rootReducer;
