import React, { useState } from 'react';
import { Modal, Input } from 'antd';


let AddCategoryModal = ({ show, onConfirm, onCancel}) => {
  const [categoryName, setCategoryName] = useState("");

  const onCategoryChange = (e) => {
    setCategoryName(e.target.value)
  }

  return (
    <Modal
      title="Add Categories"
      visible={show}
      onOk={() => onConfirm(categoryName)}
      onCancel={onCancel}
    >
      <Input placeholder="Enter category name" value={categoryName} onChange={onCategoryChange}/>
    </Modal>
  )
}

export default AddCategoryModal;