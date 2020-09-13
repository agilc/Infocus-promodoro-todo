/* global chrome */

import { notification } from 'antd';
import NotificationSound from 'assets/sounds/notification.mp3';

export const showNotification = (message, type) => {
  switch(type){
    case "success": 
      notification.success({message});
  }
};

export const showChromeNotification = (message) => {
  let options = {
    type: "basic",
    title: "Infocus : Todo-pomodoro",
    message: message,
    iconUrl: "logo.png"
  }

  chrome.notifications.create(Date.now().toString(), options, onChromeNotificationSuccess);
};

const onChromeNotificationSuccess = () => {
  let audio = new Audio(NotificationSound);
  audio.play();
}