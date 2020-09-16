/* global chrome */



// chrome.app.runtime.onLaunched.addListener(function() {
//   chrome.app.window.create('index.html', {
//     id: 'main',
//     bounds: { width: 620, height: 500 }
//   });
// });
chrome.alarms.onAlarm.addListener(function( alarm ) {
  let totalElapsedTime=0;

  chrome.alarms.get('pomodoro_complete', (alarm) => {
    totalElapsedTime = parseInt((alarm.scheduledTime-Date.now())/(1000*60))+1;
    console.log(totalElapsedTime)
    if(totalElapsedTime<=0)
      showChromeNotification("Pomodoro session completed!");
  });

  chrome.alarms.get('pomodoro_one_min', (alarm) => {
    chrome.browserAction.setBadgeText({text: String(totalElapsedTime)});
  });
});

chrome.tabs.onUpdated.addListener(function (tab) {
  document = tab.dom;
    var dialog = document.createElement("dialog")
    dialog.textContent = "This is a dialog"
    var button = document.createElement("button")
    button.textContent = "Close"
    dialog.appendChild(button)
    button.addEventListener("click", function() {
      dialog.close()
    })
    document.body.appendChild(dialog)
    dialog.showModal()
});

chrome.tabs.onCreated.addListener((tab)=> {
  chrome.tabCapture.capture((tab) =>{
    alert("tab load",tab);
  })
  chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
    alert("DOm")
    console.log(response.dom);
    document = response.dom;
    var dialog = document.createElement("dialog")
    dialog.textContent = "This is a dialog"
    var button = document.createElement("button")
    button.textContent = "Close"
    dialog.appendChild(button)
    button.addEventListener("click", function() {
      dialog.close()
    })
    document.body.appendChild(dialog)
    dialog.showModal()
  });

})


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