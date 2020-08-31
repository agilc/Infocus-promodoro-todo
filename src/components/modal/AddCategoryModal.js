import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';


let AddCategoryModal = ({ show, onConfirm, onCancel, title, selectedCategory}) => {
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    if(selectedCategory && selectedCategory.id)
      setCategoryName(selectedCategory.value);
  }, [selectedCategory]);

  const onCategoryChange = (e) => {
    setCategoryName(e.target.value)
  }

  const onSave = () => {
    onConfirm(categoryName);
    setCategoryName("");
  }

  return (
    <Modal
      // title="Add Categories"
      visible={show}
      onOk={() => onConfirm(categoryName)}
      onCancel={onCancel}
      footer={false}
    >
      <div className="modal-wrapper">
        <div className="modal-title">{title}</div>
        <Input placeholder="Enter category name" value={categoryName} onChange={onCategoryChange}/>
        <div className="modal-footer">
          <Button type="default" icon={<FontAwesomeIcon icon={faWindowClose} />} onClick={onCancel}>Cancel</Button>
          <Button type="primary" icon={<FontAwesomeIcon icon={faSave} />} onClick={onSave}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddCategoryModal;