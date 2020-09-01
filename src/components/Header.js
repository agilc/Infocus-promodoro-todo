import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;

let Header = () => {

  return (
    <div className="header-wrapper">
      <div className="category-select">
        <Select defaultValue="lucy" onChange={() => {}}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy fjdskjfhkjshfkdskf ljkhkhkjh</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
    </div>
  )
}

export default Header;