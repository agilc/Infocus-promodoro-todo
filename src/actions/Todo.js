import {
  ADD_CATEGORY,
  ADD_TODO_ITEM
} from 'constants/ActionTypes';

export const addCategory = (data) => {
  return {
    type: ADD_CATEGORY,
    payload: data
  };
};

export const addTodoItem = (data) => {
  return {
    type: ADD_TODO_ITEM,
    payload: data
  };
};