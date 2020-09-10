import {
  ADD_CATEGORY,
  ADD_TODO_ITEM,
  SELECT_TODO_CATEGORY,
  START_PMODORO
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

export const selectTodoCategory = (data) => {
  debugger;
  return {
    type: SELECT_TODO_CATEGORY,
    payload: data
  };
};

export const startPomodoro = (data) => {
  debugger;
  return {
    type: START_PMODORO,
    payload: data
  };
};

