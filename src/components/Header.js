import React from 'react';
import { Select, Col, Row } from 'antd';
import { connect } from 'react-redux';

const { Option } = Select;

let Header = ({categoryList}) => {

  return (
    <div className="header-wrapper">
      <Col span={22}>
        <div className="category-select">
          <Select defaultValue="lucy" style={{width: 200}} onChange={() => {}}>
            {
              categoryList.map(item =>{
                return <Option value={item.id}>{item.value}</Option>
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
  const { categoryList } = todo;
  return {
    categoryList
  };
};

export default connect(mapStateToProps)(Header);