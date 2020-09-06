import { ADD_CATEGORY, ADD_TODO_ITEM } from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  categoryList: [],
  todoList: [{
    id: 2,
    title: 'Ant Design Title 2',
    isFavorite: true
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
    isFavorite: false
  }]
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
      debugger;
      return {
        ...state
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
