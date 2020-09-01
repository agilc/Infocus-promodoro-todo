import React, { useState, useEffect } from 'react';
import { List, Avatar, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar, faEdit } from '@fortawesome/free-solid-svg-icons'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];



let MainContent = () => {
  return (
    <div className="main-content-wrapper">
      <List
        split={true}
        // bordered={true}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item className="list-item">
            <List.Item.Meta
              avatar={<Radio></Radio>}
              title={<div >{item.title}</div>}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default MainContent;