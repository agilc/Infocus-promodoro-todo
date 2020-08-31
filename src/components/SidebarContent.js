import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList } from '@fortawesome/free-solid-svg-icons'

const TODO_CATEGORIES = [
  {
    id: 1,
    value: "Personal"
  },
  {
    id: 2,
    value: "Work"
  }
]

let SidebarContent = () => {
  const [todoCategories, setTodoCategories] = useState(TODO_CATEGORIES);

  return (
    <>
      <div className="add-more-icon">
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>
      <div className="category-list-wrapper">
        <List
          dataSource={todoCategories}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon icon={faList} />
                }
                title={<a href="https://ant.design">{item.value}</a>}
              />
              <div className="item-count">12</div>
            </List.Item>
          )}
        >
        </List>
      </div>
    </>
  )
}

export default SidebarContent;