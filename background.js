// Backgound script immediately gets executed doesnt wait
// here we check the tab before injecting a foreground script 
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    //   if user is on amazon page then inject script
    if(/^https:\/\/www\.amazon/.test(current_tab_info.url)){
        chrome.tabs.executeScript(null, { file: "./foreground.js" }, () =>
        console.log("injected")
      ); //inject script to foreground
    }
  });
});


