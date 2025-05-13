async function detectEmotion() {
  const text = document.getElementById("inputText").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerText = "Detecting...";
  try {
    const response = await fetch("http://127.0.0.1:5000/detect-emotion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    if (data.label) {
      resultDiv.innerHTML = `Detected Emotion: <strong>${data.label}</strong> 😃<br>Confidence: ${(
        data.score * 100
      ).toFixed(2)}%`;
    } else {
      resultDiv.innerText = "No emotion detected.";
    }
  } catch (error) {
    resultDiv.innerText = "Error: " + error.message;
  }
}