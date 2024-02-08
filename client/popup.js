console.log("Popup.js is running!");

//getting from background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "SEND_DATA") {
    console.log("Data: ", request.data);
    updateFrontend(request.data);
  }
});

function updateFrontend(data) {
  //sending to background

  const site = new URL(data.meta.url_info.url).hostname;
  var score = `<span style="color: #CHANGE_HEX !important"> Site is {SAFE_META} </span>`;
  const malicious = data.data.attributes.stats.malicious;
  console.log("Malicious: ", malicious);

  if (malicious >= 3) {
    score = score.replace("#CHANGE_HEX", "red");
    score = score.replace("{SAFE_META}", "Not Safe");
  } else {
    score = score.replace("#CHANGE_HEX", "green");
    score = score.replace("{SAFE_META}", "Safe");
  }

  const site_header = document.getElementById("site_header");
  const is_safe = document.getElementById("is_safe");
  const risks_score = document.getElementById("risks_score");

  site_header.innerText = `Details About Site ${site}`;
  is_safe.innerHTML = score;

  let scorePercentage = (malicious / 15) * 100;
  if (scorePercentage > 100) {
    scorePercentage = 100;
  }

  var ctx = document.getElementById("doughnutChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Unsafe", "Safe"],
      datasets: [
        {
          data: [scorePercentage, 100 - scorePercentage],
          backgroundColor: ["red", "green"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutoutPercentage: 70, // Adjusts the size of the hole in the middle of the doughnut
      responsive: false, // Set to true to enable responsiveness
      legend: {
        display: false,
      },
    },
  });
  risks_score.innerText = scorePercentage + "%";
}
