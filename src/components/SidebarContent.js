/* global chrome */

import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar, faEdit } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";

import AddCategoryModal from 'components/modal/AddCategoryModal';
import {addCategory} from 'actions/Todo';

let SidebarContent = ({addCategory, categoryList}) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false),
        [selectedCategory,setSelectedCategory] = useState(null);

  useEffect(()=> {
    let currentTodoCategories = [];
    // chrome.storage.local.get(['todo_categories'], function(result) {
    //   if(result.todo_categories)
    //     currentTodoCategories = JSON.parse(result.todo_categories);
    //   setTodoCategories([ {id: 0, value: "Favorites"}, ...currentTodoCategories]);
    // });
    // if(localStorage.getItem('todo_categories'))
    //   currentTodoCategories = JSON.parse(localStorage.getItem('todo_categories'));
  }, []);

  const onCategoryAdd = (categoryName) => {
    const categoryCount = categoryList.length;

    let updatedTodoCategories = [];
    if(selectedCategory && selectedCategory.id){
      updatedTodoCategories = categoryList.map(item => {
        if(item.id === selectedCategory.id)
          return {id: selectedCategory.id, value: categoryName };
        return item;
      })
    }
    else
      updatedTodoCategories = [...categoryList, {id: categoryCount+1, value: categoryName}];
    addCategory(updatedTodoCategories);
    setShowAddCategoryModal(false);
    
    localStorage.setItem('todo_categories', JSON.stringify(updatedTodoCategories.slice(1)));
    // chrome.storage.local.set({todo_categories: JSON.stringify(updatedTodoCategories.slice(1))});
    setSelectedCategory(null);
  }

  const onCategoryRemove = (categoryId) => {
    const updatedTodoCategories = categoryList.filter(item => item.id !== categoryId);
    // chrome.storage.local.set({todo_categories: JSON.stringify(updatedTodoCategories.slice(1))})
    addCategory(updatedTodoCategories);
  }

  const onCategoryEdit = (category) => {
    setSelectedCategory(category);
    setShowAddCategoryModal(true)
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
          dataSource={categoryList}
          renderItem={item => (
            <List.Item key={item.id} className="list-item">
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon icon={item.id === 0 ? faStar : faList} />
                }
                title={<div>{item.value}</div>}
              />
              <div className="item-count">12</div>
              { item.id !== 0 && <div className="item-remove"><FontAwesomeIcon icon={faEdit} onClick={() => onCategoryEdit(item)}/></div> }
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
        title={selectedCategory ? "Edit Category" : "Add Category"}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}

// export default SidebarContent;
const mapStateToProps = ({ todo }) => {
  const { categoryList } = todo;

  return {
    categoryList
  };
};

export default connect(
  mapStateToProps,
  {
    addCategory
  }
)(SidebarContent);