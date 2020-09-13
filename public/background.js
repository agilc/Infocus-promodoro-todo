/* global chrome */



// chrome.app.runtime.onLaunched.addListener(function() {
//   chrome.app.window.create('index.html', {
//     id: 'main',
//     bounds: { width: 620, height: 500 }
//   });
// });
chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
  showChromeNotification("Pomodoro session completed!")
});


const showChromeNotification = (message) => {
  let options = {
    type: "basic",
    title: "Infocus : Todo-pomodoro",
    message: message,
    iconUrl: "logo.png"
  }

  chrome.notifications.create(Date.now().toString(), options, onChromeNotificationSuccess);
};

const onChromeNotificationSuccess = () => {
  let audio = new Audio('notification.mp3');
  audio.play();
}