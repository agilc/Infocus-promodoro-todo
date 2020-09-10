import { notification } from 'antd';

export const showNotification = (message, type) => {
  switch(type){
    case "success": 
      notification.success({message});
  }
};
