

// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Extension Installed");
//   });
  
//   // Listener to start tracking when the user enters a URL
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "start-tracking") {
//       chrome.tabs.create({ url: message.url }, (tab) => {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: injectTrackingCard
//         });
//       });
//     }
//   });
  
//   // // Function to inject the tracking card into the webpage
//   function injectTrackingCard() {
//     if (!document.getElementById("interaction-tracker-card")) {
//       const card = document.createElement("div");
//       card.id = "interaction-tracker-card";
//       card.style.position = "fixed";
//       card.style.bottom = "10px";
//       card.style.right = "10px";
//       card.style.padding = "10px";
//       card.style.backgroundColor = "white";
//       card.style.border = "1px solid #ccc";
//       card.style.zIndex = "10000";
//       card.innerHTML = `<h4>User Interactions</h4><ul id="interaction-list"></ul><button id="finish-tracking">Finish</button>`;
//       document.body.appendChild(card);
//       document.getElementById("finish-tracking").onclick = () => {
//         chrome.runtime.sendMessage({ type: "finish-tracking" });
//       };
//     }
//   }
  

// let trackedDomain = '';

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "start-tracking") {
//     trackedDomain = new URL(message.url).hostname;
    
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tabId = tabs[0].id;
      
//       // Inject the content script if it's not already injected
//       chrome.scripting.executeScript({
//         target: { tabId: tabId },
//         files: ['content.js'], // Replace with the actual name of your content script
//       }, () => {
//         // Now send the message after ensuring the content script is injected
//         chrome.tabs.sendMessage(tabId, { type: "update-domain", domain: trackedDomain });
//       });
//     });
//   }
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && trackedDomain) {
//     // Check if the content script is already injected before sending a message
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       files: ['content.js'], // Replace with the actual name of your content script
//     }, () => {
//       // Send the message to the content script
//       chrome.tabs.sendMessage(tabId, { type: "check-domain", domain: trackedDomain });
//     });
//   }
// });



// // communication 
// // Function to send message to React app
// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FROM_REACT_APP") {
//       console.log("Message from React app:", message.data);
//       // Handle the message or forward it as needed
//       // You can send a response back to the content script if necessary
//       sendResponse({status: "Message received by extension"});
//   }
// });

// // Function to send message to React app (via content script)
// function sendMessageToReactApp(data) {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {type: "FROM_EXTENSION", data: data});
//   });
// }




///today code  working something

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_TRACKING") {
      chrome.tabs.create({ url: message.url }, (tab) => {
          chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ['content.js'],
          }, () => {
              chrome.tabs.sendMessage(tab.id, { type: "update-domain", domain: new URL(message.url).hostname });
          });
      });
  } else if (message.type === "FROM_REACT_APP") {
      console.log("Message from React app:", message.data);
      sendResponse({status: "Message received by extension"});
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js'],
      }, () => {
          chrome.tabs.sendMessage(tabId, { type: "check-domain", domain: new URL(tab.url).hostname });
      });
  }
});

function sendMessageToReactApp(data) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "FROM_EXTENSION", data: data});
  });
}

