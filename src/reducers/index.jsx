import userLinkReducer from "./userLinkReducer";
import userInfoReducer from "./userInfoReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userLinkReducer,
  userInfoReducer,
});

export default rootReducer;
