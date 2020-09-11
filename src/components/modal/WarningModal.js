import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { WarningOutlined } from '@ant-design/icons';


let WarningModal = ({ show, onConfirm, onCancel, title, message, successBtnLabel, cancelBtnLabel}) => {
  
  const onSave = () => {
    onConfirm();
  }

  const onClose = () => {
    onCancel();
  }

  return (
    <Modal
      visible={show}
      footer={false}
    >
      <div className="modal-wrapper">
        <div className="modal-title">
          <div className="warning-icon"><WarningOutlined /></div>
          <div className="text-wrapper">
            <span className="title">{title}</span>
            <span className="message">{message}</span>
          </div>
        </div>
        <div className="modal-footer">
          <Button type="default" icon={<FontAwesomeIcon icon={faWindowClose} />} onClick={onClose}>{cancelBtnLabel}</Button>
          <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faSave} />} onClick={onSave}>{successBtnLabel}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default WarningModal;