import React from 'react';
import { Select, Col, Row } from 'antd';
import { connect } from 'react-redux';

import { selectTodoCategory } from 'actions/Todo';

const { Option } = Select;

let Header = ({categoryList, selectTodoCategory, selectedTodoCategory}) => {

  const onCategoryChange = (item) => {
    selectTodoCategory(item);
  }

  return (
    <div className="header-wrapper">
      <Col span={22}>
        <div className="category-select">
          <Select defaultValue={selectedTodoCategory} value={selectedTodoCategory} placeholder="Select" style={{width: 200}} onChange={onCategoryChange}>
            {
              categoryList.map(item =>{
                return <Option key={item.id} value={item.id}>{item.value}</Option>
              })
            }
          </Select>
        </div>
      </Col>
      <Col span={2}>
        
      </Col>
    </div>
  )
}

const mapStateToProps = ({ todo }) => {
  const { categoryList, selectedTodoCategory } = todo;
  return {
    categoryList,
    selectedTodoCategory
  };
};

export default connect(
  mapStateToProps,
  {
    selectTodoCategory
  }
)(Header);