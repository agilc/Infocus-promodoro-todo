import React, { useState, useEffect } from 'react';
import { List, Input, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar, faEdit } from '@fortawesome/free-solid-svg-icons'

const data = [
  {
    id: 1,
    title: 'Ant Design Title 1',
  },
  {
    id: 2,
    title: 'Ant Design Title 2',
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
  },
  {
    id: 4,
    title: 'Ant Design Title 4',
  },
];

let MainContent = () => {
  const [selectedTodo, setSelectedTodo] = useState({});

  const getTodoListContent = (todoItem) => {
    return (
      <div className="todo-item-wrapper">
        { selectedTodo.id === todoItem.id ? <Input placeholder="Basic usage" /> :  <div>{todoItem.title}</div> }
        <div className="todo-action-btn">
          <div className="action-item"><FontAwesomeIcon icon={faStar} onClick={() => {}}/></div> 
          <div className="action-item"><FontAwesomeIcon icon={faWindowClose} onClick={() => {}}/></div> 
        </div>
      </div>
    )
  }

  const onTodoItemSelect = (item) => {
    setSelectedTodo(item);
  }

  return (
    <div className="main-content-wrapper">
      <div className="todo-items-list">
        <List
          split={true}
          // bordered={true}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item className="list-item">
              <List.Item.Meta
                avatar={selectedTodo.id !== item.id && <Radio></Radio>}
                title={getTodoListContent(item)}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                onClick={() => onTodoItemSelect(item)}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="add-more-icon">
        <FontAwesomeIcon className="cursor-pointer" icon={faPlusCircle}/>
      </div>
    </div>
  )
}

export default MainContent;