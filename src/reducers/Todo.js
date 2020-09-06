import { ADD_CATEGORY } from 'constants/ActionTypes';

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

    default:
      let currentTodoCategories = JSON.parse(localStorage.getItem('todo_categories'));
      if(currentTodoCategories)
        currentTodoCategories = [ {id: 0, value: "Favorites"}, ...currentTodoCategories];
      else
        currentTodoCategories = [ {id: 0, value: "Favorites"}];
      return {
        ...state,
        categoryList: currentTodoCategories
      }  
  }
}
