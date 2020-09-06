import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Categories from './Categories';

import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const appReducer = combineReducers({
  router: connectRouter(history),
  categories: Categories
});

const rootReducer = (state, action) => {
  // if (action && action.type === SIGNOUT_USER_SUCCESS) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
