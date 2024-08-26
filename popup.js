

document.getElementById("start-tracking").onclick = () => {
  const url = document.getElementById("website-url").value;

  if (url) {
    chrome.runtime.sendMessage({ type: "start-tracking", url: url });
    document.getElementById("message").innerText = "Tracking started!";
  } else {
    document.getElementById("message").innerText = "Please enter a valid URL.";
  }
};