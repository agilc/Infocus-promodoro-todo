import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar } from '@fortawesome/free-solid-svg-icons'

import AddCategoryModal from 'components/modal/AddCategoryModal';

let SidebarContent = () => {
  const [todoCategories, setTodoCategories] = useState(JSON.parse(localStorage.getItem('todo_categories'))),
        [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  useEffect(()=> {
    setTodoCategories([ {id: 0, value: "Favorites"}, ...todoCategories]);
  }, []);

  const onCategoryAdd = (categoryName) => {
    const categoryCount = todoCategories.length;
    let updatedTodoCategories = [...todoCategories, {id: categoryCount+1, value: categoryName}];
    setTodoCategories(updatedTodoCategories);
    setShowAddCategoryModal(false);
    localStorage.setItem('todo_categories', JSON.stringify(updatedTodoCategories));
  }

  const onCategoryRemove = (categoryId) => {
    const updatedTodoCategories = todoCategories.filter(item => item.id !== categoryId);
    setTodoCategories(updatedTodoCategories);
    localStorage.setItem('todo_categories', JSON.stringify(updatedTodoCategories));
  }

  return (
    <div className="sidebar-wrapper">
      <div className="add-more-icon cursor-pointer">
        <FontAwesomeIcon icon={faPlusCircle} onClick={() => setShowAddCategoryModal(true)}/>
      </div>
      <div className="sidebar-content-wrapper">
        <List
          split={true}
          bordered={true}
          dataSource={todoCategories}
          renderItem={item => (
            <List.Item key={item.id} className="list-item">
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon icon={item.id === 0 ? faStar : faList} />
                }
                title={<div>{item.value}</div>}
              />
              <div className="item-count">12</div>
              { item.id !== 0 && <div className="item-remove"><FontAwesomeIcon icon={faWindowClose} onClick={() => onCategoryRemove(item.id)}/></div> }
            </List.Item>
          )}
        >
        </List>
      </div>
      <AddCategoryModal
        show={showAddCategoryModal}
        onConfirm={onCategoryAdd}
        onCancel={() => setShowAddCategoryModal(false)}
      />
    </div>
  )
}

export default SidebarContent;