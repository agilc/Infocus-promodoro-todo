import {
  ADD_CATEGORY
} from 'constants/ActionTypes';

export const addCategory = (data) => {
  return {
    type: ADD_CATEGORY,
    payload: data
  };
};