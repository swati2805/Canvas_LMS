import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import SignUpReducer from "./reducer_books";
import LoginReducer from "./reducer_login";
import ProfileReducer from "./reducer_profile";
import ProfileStore from "./reducer_profilestore";

const rootReducer = combineReducers({
  newuserinfo : SignUpReducer,
  logininfo : LoginReducer,
  profileinfo : ProfileReducer,
  profilestore : ProfileStore,
  form: formReducer
});

export default rootReducer;
