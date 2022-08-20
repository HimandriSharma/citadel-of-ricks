import responseReducer from "./api/ResponseReducer";
import { combineReducers } from "redux";
import stateReducer from "./state/StateReducer";

const rootReducer = combineReducers({
  api: responseReducer,
  counter: stateReducer
});

export default rootReducer;
