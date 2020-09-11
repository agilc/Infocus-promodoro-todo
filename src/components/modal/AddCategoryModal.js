import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';


let AddCategoryModal = ({ show, onConfirm, onCancel, title, selectedCategory}) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if(selectedCategory && selectedCategory.id)
      setCategoryName(selectedCategory.value);
  }, [selectedCategory]);

  const onCategoryChange = (e) => {
    setCategoryName(e.target.value)
  }

  const onSave = () => {
    setCategoryName("");
    onConfirm(categoryName);
  }

  const onClose = () => {
    setCategoryName("");
    onCancel();
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
        <Form
          name="basic"
          onFinish={onSave}
          initialValues={{category_name: ""}}
          fields={[
            {
              "name": [ "category_name" ],
              "value": categoryName
            }
          ]}
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[{ required: true, message: 'Please enter the category name!' }]}
          >
            <Input placeholder="Enter category name" onChange={onCategoryChange} maxLength={20}/>
          </Form.Item>
          <div className="modal-footer">
            <Button type="default" icon={<FontAwesomeIcon icon={faWindowClose} />} onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faSave} />}>Save</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default AddCategoryModal;