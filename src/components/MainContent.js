import React, { useState, useEffect } from 'react';
import { List, Input, Radio } from 'antd';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { addTodoItem } from 'actions/Todo';

let MainContent = ({}) => {
  const [selectedTodo, setSelectedTodo] = useState({}),
        [todoList, setTodoList] = useState([{
          id: 2,
          value: 'Ant Design Title 2',
          isFavorite: true
        },
        {
          id: 3,
          value: 'Ant Design Title 3',
          isFavorite: false
        }]);

  const getTodoListContent = (todoItem) => {
    return (
      <div className="todo-item-wrapper">
        { selectedTodo.id === todoItem.id ? <Input placeholder="Basic usage" onChange={e => onTodoListItemChange(e)}/> :  <div>{todoItem.value}</div> }
        <div className="todo-action-btn">
          <div className="action-item"><FontAwesomeIcon icon={todoItem.isFavorite ? faStar : faStarRegular } onClick={(e) => addToFavourites(e, todoItem)}/></div> 
          <div className="action-item"><FontAwesomeIcon icon={faWindowClose} onClick={(e) => onTodoItemDelete(e, todoItem)}/></div> 
        </div>
      </div>
    )
  }

  const onTodoListItemChange = (e) => {
    let value = e.target.value;
    let updatedTodoList = todoList.map(item => {
      if(item.id === selectedTodo.id)
        return { 'id': item.id, 'value': value, 'isFavorite': false };
      return item;
    })
    setTodoList(updatedTodoList);
    console.log(e);
  }

  const onTodoItemSelect = (e, item) => {
    e.stopPropagation();
    setSelectedTodo(item);
  }

  const onTodoItemAdd = (e) => {
    e.stopPropagation();
    let newItem = [];
    if(todoList.length)
      newItem = {id: todoList[todoList.length-1].id + 1, value: "" };
    else 
      newItem = {id: 1, value: "" };
    setTodoList([...todoList, newItem ]);
    setSelectedTodo(newItem);
  }

  const onTodoItemDelete = (e, todoItem) => {
    e.stopPropagation();
    let updatedTodoList = todoList.filter(item => item.id !== todoItem.id);
    setTodoList(updatedTodoList);
  }

  const addToFavourites = (e, todoItem) => {
    e.stopPropagation();
    let updatedTodoList = todoList.map(item => {
      if(item.id === todoItem.id)
        return { ...todoItem , 'isFavorite': !todoItem.isFavorite };
      return item;
    })
    setTodoList(updatedTodoList);
  }

  return (
    <div className="main-content-wrapper" onClick={() => setSelectedTodo({})}>
      <div className="todo-items-list">
        <List
          split={true}
          // bordered={true}
          itemLayout="horizontal"
          dataSource={todoList}
          renderItem={item => (
            <List.Item className="list-item">
              <List.Item.Meta
                avatar={selectedTodo.id !== item.id && <Radio></Radio>}
                title={getTodoListContent(item)}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                onClick={(e) => onTodoItemSelect(e, item)}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="add-more-icon">
        <FontAwesomeIcon className="cursor-pointer" icon={faPlusCircle} onClick={onTodoItemAdd}/>
      </div>
    </div>
  )
}

const mapStateToProps = ({ todo }) => {
  const { todoList } = todo;

  return {
    todoList
  };
};

export default connect(
  mapStateToProps,
  {
    addTodoItem
  }
)(MainContent);