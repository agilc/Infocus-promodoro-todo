import {all} from 'redux-saga/effects';
import homeSage from './home';

export default function* rootSaga(getState) {
  yield all([
    homeSage()
  ]);
}
