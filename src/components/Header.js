import React from 'react';
import { Select, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const { Option } = Select;

let Header = () => {

  return (
    <div className="header-wrapper">
      <Col span={22}>
        <div className="category-select">
          <Select defaultValue="lucy" style={{width: 200}} onChange={() => {}}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy fjdskjfhkjshfkdskf ljkhkhkjh</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
      </Col>
      <Col span={2}>
        
      </Col>
    </div>
  )
}

export default Header;