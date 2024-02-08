const API_URL = "http://localhost:3000/api/detect";
const THRESHOLD = 3;
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  await handleRequests(request);
});

async function handleRequests(request) {
  switch (request.event) {
    case "URL":
      console.log("URL: ", request.data);
      const data = await getDetectionData(request.data);
      console.log("Data: ", data);
      chrome.runtime.sendMessage({
        msg: "SEND_DATA",
        data,
      });

      // Checking if more than 3 detections

      const totalDetections = data.data.attributes.stats.malicious;
    

      console.log("Detections: ", totalDetections);
      if (totalDetections >= THRESHOLD) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "open_dialog_box" },
            function (response) {}
          );
        });
      }
      break;
    default:
      console.log("Unknown request: ", request);
  }
}

async function getDetectionData(url) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  });
  const data = await response.json();
  return data;
}
