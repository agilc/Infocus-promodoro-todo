import {all, fork, takeEvery} from 'redux-saga/effects';

// import { apiURL } from 'constants/App';
// import request from 'util/request';

import {
    LIST_CATEGORIES
  } from '../constants/ActionTypes';
// import {
//   } from 'actions/category';

function* listCategoriesRequest() {
  // try {
  //   const requestURL = `${apiURL}category`;
  //   const categories = yield call(request, requestURL, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   yield put(listCategoriesSuccess(categories));
  // } catch (error) {
  //   yield put(listCategoriesFailed(error));
  //   yield showSagaAlert(error.message, "error");
  // }
}

export function* listCategories() {
  yield takeEvery(LIST_CATEGORIES, listCategoriesRequest);
}

export default function* rootSaga() {
  yield all([
    fork(listCategories)
  ]);
}