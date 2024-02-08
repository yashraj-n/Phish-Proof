const API_URL = "http://localhost:3000/api/emailDetect";
const email_input = document.getElementById("email_input");
const is_fraud = document.getElementById("is_fraud");
const main_form = document.getElementById("main_form");

main_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Detecting Email...");
  var email = email_input.value;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  console.log(data);

  const fraud_score = data.emailMetrics.fraud_score;
  const THRESHOLD = 30;
  console.log("Fraud Score: " + fraud_score);

  if (fraud_score > THRESHOLD) {
    is_fraud.innerHTML = "<span style='color:red'>Fraudulent Email</span>";
  } else {
    is_fraud.innerHTML =
      "<span style='color:green'>Not Fraudulent Email</span>";
  }
});
