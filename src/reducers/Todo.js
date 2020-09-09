/* global chrome */

import { 
  ADD_CATEGORY, 
  ADD_TODO_ITEM,
  SELECT_TODO_CATEGORY
 } from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  categoryList: [],
  todoList: [],
  selectedTodoCategory: null
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      // localStorage.setItem('todo_categories', JSON.stringify(action.payload.slice(1)));
      chrome.storage.local.set({'todo_categories': JSON.stringify(action.payload.slice(1))});
      return {
        ...state,
        categoryList: action.payload
      }      
    }

    case ADD_TODO_ITEM: {
      localStorage.setItem('todo_list', JSON.stringify(action.payload));
      // chrome.storage.local.set({'todo_list': JSON.stringify(action.payload)});
      return {
        ...state,
        todoList: action.payload
      }      
    }

    case SELECT_TODO_CATEGORY: {
      // localStorage.setItem('selected_todo_category', JSON.stringify(action.payload));
      chrome.storage.local.set({'selected_todo_category': JSON.stringify(action.payload)});
      return {
        ...state,
        selectedTodoCategory: action.payload
      }      
    }

    default:
      // let currentTodoCategories=[{id: 0, value: "Favorites"}];
      // let todoList = [];
      // let selectedTodoCategory = '';

      // chrome.storage.local.get(['todo_categories'], function(result) {
      //   if(result.todo_categories){
      //     currentTodoCategories = [...currentTodoCategories, ...JSON.parse(result.todo_categories)];
      //   }
      // });
      // chrome.storage.local.get(['todo_list'], function(result) {
      //   if(result.todo_list)
      //     todoList = JSON.parse(result.todo_list);
      // });
      // chrome.storage.local.get(['selected_todo_category'], function(result) {
      //   selectedTodoCategory = result.selected_todo_category;
      // });

      // if(localStorage.getItem('todo_categories'))
      //   currentTodoCategories = [ {id: 0, value: "Favorites"}, ...JSON.parse(localStorage.getItem('todo_categories'))];
      // if(localStorage.getItem('todo_list'))
      //   todoList = JSON.parse(localStorage.getItem('todo_list'));

      // selectedTodoCategory = JSON.parse(localStorage.getItem('selected_todo_category'));
      return {
        ...state,
        // categoryList: currentTodoCategories,
        // todoList: todoList,
        // selectedTodoCategory: selectedTodoCategory
      }  
  }
}
