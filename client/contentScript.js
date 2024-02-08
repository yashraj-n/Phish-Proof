chrome.runtime.sendMessage({ event: "URL", data: window.location.href });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  alert("This website is not safe to visit!");
  alert("Please do not enter any personal information!");
  // window.close();

});
