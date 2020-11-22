// Backgound script immediately gets executed doesnt wait
// here we check the tab before injecting a foreground script
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    //   if user is on amazon page then inject script
    if (/^https:\/\/www\.amazon/.test(current_tab_info.url)) {
      chrome.tabs.executeScript(null, { file: "./index.js" }, () =>
        console.log("injected")
      ); //inject script to foreground
    }
  });
});

var user;

chrome.runtime.onMessageExternal.addListener(
  async (request, sender, sendResponse) => {
    if (request.messageFromWeb.user) {
      console.log(JSON.parse(request.messageFromWeb.user));
      user = JSON.parse(request.messageFromWeb.user);
      chrome.storage.local.set({ 'user': user }, function () {
        console.log("Value is set to " + user);
      });
      chrome.tabs.executeScript(null, { file: "../Popup/App.js" }, () => {
        console.table(user);
      });
    }
  }
);
