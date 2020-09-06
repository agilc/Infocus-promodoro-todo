import { ADD_CATEGORY, ADD_TODO_ITEM } from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  categoryList: [],
  todoList: []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      localStorage.setItem('todo_categories', JSON.stringify(action.payload.slice(1)));
      return {
        ...state,
        categoryList: action.payload
      }      
    }

    case ADD_TODO_ITEM: {
      localStorage.setItem('todo_list', JSON.stringify(action.payload));
      return {
        ...state,
        todoList: action.payload
      }      
    }

    default:
      let currentTodoCategories=[];
      if(localStorage.getItem('todo_categories'))
        currentTodoCategories = JSON.parse(localStorage.getItem('todo_categories'));
        
      let todoList = []
      if(localStorage.getItem('todo_list'))
        todoList = JSON.parse(localStorage.getItem('todo_list'));

      if(currentTodoCategories)
        currentTodoCategories = [ {id: 0, value: "Favorites"}, ...currentTodoCategories];
      else
        currentTodoCategories = [ {id: 0, value: "Favorites"}];
      return {
        ...state,
        categoryList: currentTodoCategories,
        todoList: todoList
      }  
  }
}
