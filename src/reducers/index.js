import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Todo from './Todo';

import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const appReducer = combineReducers({
  router: connectRouter(history),
  todo: Todo
});

const rootReducer = (state, action) => {
  // if (action && action.type === SIGNOUT_USER_SUCCESS) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
