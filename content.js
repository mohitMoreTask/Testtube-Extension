// // // // pp-3

// // let capturedSelectors = [];
// // let isRecording = false;
// // let dragEndElement = null;

// // //Encrypt code
// // // Encrypt function
// // async function encryptData(data, keyHex, ivHex) {
// //   const keyBuffer = hexToArrayBuffer(keyHex);
// //   const ivBuffer = hexToArrayBuffer(ivHex);

// //   // Import the key
// //   const key = await crypto.subtle.importKey(
// //     'raw',
// //     keyBuffer,
// //     { name: 'AES-CBC' },
// //     false,
// //     ['encrypt']
// //   );

// //   // Encode the data
// //   const encodedData = new TextEncoder().encode(data);

// //   // Encrypt the data
// //   const encryptedBuffer = await crypto.subtle.encrypt(
// //     { name: 'AES-CBC', iv: ivBuffer },
// //     key,
// //     encodedData
// //   );

// //   // Convert ArrayBuffer to Base64
// //   const encryptedArray = new Uint8Array(encryptedBuffer);
// //   return arrayBufferToBase64(encryptedArray);
// // }

// // // Helper function to convert hex to ArrayBuffer
// // function hexToArrayBuffer(hex) {
// //   const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
// //   return bytes.buffer;
// // }

// // // Helper function to convert ArrayBuffer to Base64
// // function arrayBufferToBase64(buffer) {
// //   let binary = '';
// //   const bytes = new Uint8Array(buffer);
// //   const len = bytes.byteLength;
// //   for (let i = 0; i < len; i++) {
// //     binary += String.fromCharCode(bytes[i]);
// //   }
// //   return window.btoa(binary);
// // }

// // // Example usage
// // const keyHex = '9e769fdd0e381e1c4ba505c2a500c59662ce98a395bca4ef5ca6ae6f7b11f902';  // Should match your Node.js key
// // const ivHex = 'e580e3f6dd7d55b3ef84264312316fb2';  // Should match your Node.js IV (should be 16 bytes)
// // const data = 'your sensitive data';

// // encryptData(data, keyHex, ivHex).then(encryptedData => {
// //   console.log('Encrypted Data:', encryptedData);
// //   // Send encryptedData to your server
// // });

// // //Trying to add communication
// // // Listen for messages from the extension's background script
// // // Listen for messages from the React app
// // window.addEventListener("message", (event) => {
// //   // Make sure the message is from your React app
// //   if (event.source !== window) return;

// //   if (event.data.type && event.data.type === "FROM_REACT_APP") {
// //       console.log("Message from React app:", event.data.data);
// //       // Forward the message to the extension's background script
// //       chrome.runtime.sendMessage(event.data);
// //   }
// // });

// // // Listen for messages from the extension's background script
// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //   if (message.type === "FROM_EXTENSION") {
// //       // Forward the message to the React app
// //       window.postMessage(message, "*");
// //   }
// // });
// // ////

// // ////// Trying to add url
// // // Add this to your existing content.js
// // window.addEventListener("message", (event) => {
// //   if (event.source !== window) return;

// //   if (event.data.type === "START_TRACKING") {
// //       chrome.runtime.sendMessage(event.data);
// //   }
// // });

// // /////

// // //Today code
// // let shouldShowCard = false;
// // const captureClick = (element) => {
// //   // if (!isRecording) return;
// //   console.log("i am running using click ................")
// //   const selector = getSelector(element);
// //   const tag = element.tagName.toLowerCase();
// //   const type = element.type || '';
// //   const innerText = element.innerText || '';
// //   const xpath = getXPath(element);

// //   if (tag === 'a') {
// //     const href = element.href || '';
// //     capturedSelectors.push({ selector, tag, value: href, type, innerText, xpath });
// //     saveToLocalStorage();
// //     updateClickCount();
// //   } else {
// //     const handleInput =async (event) => {
// //       const value = event.target.value || '';
// //       let storedValue = value;

// //       // Encrypt password fields
// //       if (type === 'password') {
// //         console.log("Password field detected");
// //         const keyHex = '9e769fdd0e381e1c4ba505c2a500c59662ce98a395bca4ef5ca6ae6f7b11f902'; // Replace with your actual key
// //         const ivHex = 'e580e3f6dd7d55b3ef84264312316fb2'; // Replace with your actual IV

// //         // Encrypt the password value
// //         try {
// //           storedValue = await encryptData(value, keyHex, ivHex);
// //           console.log("Encrypted password value:", storedValue);
// //         } catch (error) {
// //           console.error("Encryption error:", error);
// //           return; // Exit if encryption fails
// //         }
// //       }

// //       if (selector && !selector.includes('.drag-button') && !selector.includes('.finish-button')) {
// //         capturedSelectors.push({ selector, tag, value: storedValue, type, innerText, xpath });
// //         saveToLocalStorage();
// //         updateClickCount();
// //       }

// //       element.removeEventListener('blur', handleInput);
// //       element.removeEventListener('keypress', handleKeyPress);
// //     };

// //     element.addEventListener('blur', handleInput);

// //     const handleKeyPress = (event) => {
// //       if (event.key === 'Enter') {
// //         handleInput(event);
// //       }
// //     };
// //     element.addEventListener('keypress', handleKeyPress);
// //   }
// // };

// // const injectCardContent = () => {
// //   if (!document.querySelector('.container-2') && window.name !== 'footprint_new_tab') {
// //     const style = document.createElement('style');
// //     style.textContent = `
// //     .container-2 {
// //       position: fixed;
// //       top: 20px;
// //       left: 20px;
// //       width: 363px;
// //       z-index: 9999999;
// //       cursor: move;
// //       border-radius: 10px;
// //     }
// //     .wrapper-2 {
// //       background-color: #000;
// //       width: 100%;
// //       height: auto;
// //       border: 1px solid #333;
// //       border-radius: 10px;
// //       padding: 10px;
// //       display: flex;
// //       flex-direction: column;
// //       color: white;
// //     }
// //     .top-section {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //     }
// //     .content h3 {
// //       color: #fff;
// //       font-size: 20px;
// //       font-weight: bold;
// //       margin: 0;
// //     }
// //     .cross-icon svg {
// //       cursor: pointer;
// //     }
// //     .text-content p {
// //       color: #ddd;
// //       margin: 0;
// //     }
// //     .step-button {
// //       background-color: #fff;
// //       border: 1px solid #ddd;
// //       border-radius: 5px;
// //       color: #000;
// //       padding: 5px 10px;
// //       font-size: 14px;
// //     }

// //     .click-count {
// //       font-size: 16px;
// //       color: #fff;
// //     }
// //     .drag-button {
// //       background-color: #F4DB71;
// //       border: 1px solid #ddd;
// //       border-radius: 5px;
// //       color: #414141;
// //       padding: 5px 10px;
// //       margin-top: 10px;
// //       font-size: 14px;
// //     }
// //     .finish-button {
// //       background-color: #414141;
// //       border-radius: 5px;
// //       color: #FFF;
// //       padding: 5px 10px;
// //       width: 100%;
// //       margin-top: 10px;
// //       font-size: 14px;
// //     }
// //   `;
// //     document.head.appendChild(style);

// //     const container = document.createElement('div');
// //     container.className = 'container-2';
// //     container.innerHTML = `
// //       <div class="wrapper-2">
// //         <div class="top-section">
// //           <div class="content">
// //             <h3>Footprint Creator</h3>
// //           </div>
// //           <div class="cross-icon">
// //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// //               <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// //             </svg>
// //           </div>
// //         </div>
// //         <div class="text-content">
// //           <p>You are now creating a footprint.</p>
// //           <p>Do the steps you want the system to repeat.</p>
// //           <p>Once you are done, drag and drop the yellow button on an element that confirms a successful run.</p>
// //           <p>A footprint should have at least 1 click to run.</p>
// //         </div>
// //         <div class="click-count">Clicks: 0</div>
// //         <button class="step-button">0/10 steps</button>
// //         <button class="drag-button" draggable="true">Drag me to finish</button>
// //         <button class="finish-button">Finish</button>
// //       </div>
// //     `;

// //     document.body.appendChild(container);

// //     const crossIcon = container.querySelector('.cross-icon');
// //     crossIcon.addEventListener('click', () => {
// //       container.remove();
// //       localStorage.clear()
// //     });

// //     const dragButton = container.querySelector('.drag-button');
// //     dragButton.addEventListener('dragstart', (e) => {
// //       e.dataTransfer.setData('text/plain', 'drag-button');
// //     });

// //     const finishButton = container.querySelector('.finish-button');
// //     finishButton.addEventListener('click', () => {
// //       // redirectToDashboard();
// //       sendDataToServer();
// //     });

// //     // Make the container draggable
// //     let isDragging = false;
// //     let currentX;
// //     let currentY;
// //     let initialX;
// //     let initialY;
// //     let xOffset = 0;
// //     let yOffset = 0;

// //     container.addEventListener('mousedown', dragStart);
// //     document.addEventListener('mousemove', drag);
// //     document.addEventListener('mouseup', dragEnd);

// //     function dragStart(e) {
// //       initialX = e.clientX - xOffset;
// //       initialY = e.clientY - yOffset;

// //       if (e.target === container || e.target.closest('.wrapper-2')) {
// //         isDragging = true;
// //       }
// //     }

// //     function drag(e) {
// //       if (isDragging) {
// //         e.preventDefault();
// //         currentX = e.clientX - initialX;
// //         currentY = e.clientY - initialY;

// //         xOffset = currentX;
// //         yOffset = currentY;

// //         setTranslate(currentX, currentY, container);
// //       }
// //     }

// //     function dragEnd(e) {
// //       initialX = currentX;
// //       initialY = currentY;

// //       isDragging = false;
// //     }

// //     function setTranslate(xPos, yPos, el) {
// //       el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
// //     }

// //     // Make the "Drag me" button draggable only once
// //     let isDragButtonDragged = false;

// //     dragButton.addEventListener('dragstart', (e) => {
// //       if (!isDragButtonDragged) {
// //         e.dataTransfer.setData('text/plain', 'drag-button');
// //       } else {
// //         e.preventDefault();
// //       }
// //     });

// //     document.addEventListener('dragover', (e) => {
// //       e.preventDefault();
// //     });

// //     document.addEventListener('drop', (e) => {
// //       e.preventDefault();
// //       if (!isDragButtonDragged && e.dataTransfer.getData('text') === 'drag-button') {
// //         isDragButtonDragged = true;
// //         dragEndElement = e.target;
// //         dragButton.setAttribute('draggable', 'false');
// //         dragButton.style.opacity = '0.5';
// //         dragButton.textContent = 'Dropped';

// //         // Capture the element where the drag button was dropped
// //         const selector = getSelector(dragEndElement);
// //         const tag = dragEndElement.tagName.toLowerCase();
// //         const type = dragEndElement.type || '';
// //         const innerText = dragEndElement.innerText || '';
// //         const xpath = getXPath(dragEndElement);

// //         capturedSelectors.push({
// //           selector,
// //           tag,
// //           type,
// //           innerText,
// //           xpath,
// //           isDragEndElement: true
// //         });

// //         saveToLocalStorage();
// //         updateClickCount();
// //       }
// //     });

// //     console.log('Card visibility:', container.offsetParent !== null);
// //   }
// // };

// // function getSelector(element) {
// //   if (!element) return null;

// //   const actionableTags = ['button', 'input', 'select', 'textarea'];

// //   let actionableElement = element;
// //   while (actionableElement && !actionableTags.includes(actionableElement.tagName.toLowerCase())) {
// //     actionableElement = actionableElement.parentElement;
// //   }

// //   if (actionableElement) {
// //     element = actionableElement;
// //   }

// //   if (element.id) {
// //     return `#${element.id}`;
// //   }

// //   if (element.className) {
// //     const classSelector = `.${element.className.split(" ").join(".")}`;
// //     if (document.querySelectorAll(classSelector).length === 1) {
// //       return classSelector;
// //     }
// //   }

// //   if (element.tagName.toLowerCase() === 'a' && element.href) {
// //     return `a[href="${element.href}"]`;
// //   }

// //   return getXPath(element);
// // }

// // function getXPath(element) {
// //   if (element.id) {
// //     return `//*[@id="${element.id}"]`;
// //   }
// //   if (element === document.body) {
// //     return "/html/body";
// //   }
// //   let ix = 0;
// //   const siblings = element.parentNode ? element.parentNode.childNodes : [];
// //   for (let i = 0; i < siblings.length; i++) {
// //     const sibling = siblings[i];
// //     if (sibling === element) {
// //       return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${ix + 1}]`;
// //     }
// //     if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
// //       ix++;
// //     }
// //   }
// //   return null;
// // }

// // const saveToLocalStorage = () => {
// //   localStorage.setItem('capturedSelectors', JSON.stringify(capturedSelectors));
// // };

// // const loadFromLocalStorage = () => {
// //   const storedSelectors = localStorage.getItem('capturedSelectors');
// //   if (storedSelectors) {
// //     capturedSelectors = JSON.parse(storedSelectors);
// //     updateClickCount();
// //   }
// // };

// // const updateClickCount = () => {
// //   const clickCountElement = document.querySelector('.click-count');
// //   const stepButtonElement = document.querySelector('.step-button');
// //   if (clickCountElement && stepButtonElement) {
// //     clickCountElement.textContent = `Clicks: ${capturedSelectors.length}`;
// //     stepButtonElement.textContent = `${capturedSelectors.length}/10 steps`;
// //   }
// // };

// // const sendDataToServer = async () => {
// //   // Implement the logic to send capturedSelectors to your server
// //   console.log('Sending data to server:', capturedSelectors);
// //   // You can use fetch or XMLHttpRequest to send the data

// //   const url = 'http://localhost:5000/api/footprint/extension'; // Replace with your backend URL
// //   const data = { capturedSelectors };
// //   console.log("data", JSON.stringify(data))

// //   try {
// //     const response = await fetch(url, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(data),
// //     });

// //     const result = await response.json();
// //     console.log(result)
// //     if (result.success) {
// //       alert('Footprint saved successfully!');
// //     } else {
// //       alert('Failed to save the footprint. Please try again.');
// //     }
// //   } catch (error) {
// //     console.error('Error saving the footprint:', error);
// //     alert('An error occurred while saving the footprint.');
// //   }

// // };

// // // Call the function to inject the card content
// // //injectCardContent();

// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //   if (message.type === "update-domain" || message.type === "check-domain") {
// //     const currentDomain = window.location.hostname;
// //     shouldShowCard = currentDomain === message.domain || currentDomain.endsWith('.' + message.domain);
// //     updateCardVisibility();
// //   }
// // });

// // function updateCardVisibility() {
// //   const card = document.querySelector('.container-2');
// //   if (card) {
// //     card.style.display = shouldShowCard ? 'block' : 'none';
// //   } else if (shouldShowCard) {
// //     injectCardContent();
// //   }
// // }

// // const redirectToDashboard = () => {
// //   try {
// //     window.location.href = `https://render.com/`; // Replace with your actual dashboard URL
// //   } catch (error) {
// //     console.error('Redirect failed:', error);
// //   }
// // };

// // updateCardVisibility();

// // // Add event listener to capture clicks on the entire document
// // document.addEventListener('click', (event) => {
// //   captureClick(event.target);
// // });

// // // Load previously captured selectors from localStorage
// // loadFromLocalStorage();

// // // Set a flag in sessionStorage to indicate that this tab has the card
// // sessionStorage.setItem('footprint_card_visible', 'true');

// // // Check if this is a new tab
// // if (window.opener && !sessionStorage.getItem('footprint_card_visible')) {
// //   window.name = 'footprint_new_tab';
// // }

// //22/08/24

// let capturedSelectors = [];
// let isRecording = false;
// let dragEndElement = null;

// //Encrypt code
// // Encrypt function
// async function encryptData(data, keyHex, ivHex) {
//   const keyBuffer = hexToArrayBuffer(keyHex);
//   const ivBuffer = hexToArrayBuffer(ivHex);

//   // Import the key
//   const key = await crypto.subtle.importKey(
//     'raw',
//     keyBuffer,
//     { name: 'AES-CBC' },
//     false,
//     ['encrypt']
//   );

//   // Encode the data
//   const encodedData = new TextEncoder().encode(data);

//   // Encrypt the data
//   const encryptedBuffer = await crypto.subtle.encrypt(
//     { name: 'AES-CBC', iv: ivBuffer },
//     key,
//     encodedData
//   );

//   // Convert ArrayBuffer to Base64
//   const encryptedArray = new Uint8Array(encryptedBuffer);
//   return arrayBufferToBase64(encryptedArray);
// }

// // Helper function to convert hex to ArrayBuffer
// function hexToArrayBuffer(hex) {
//   const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
//   return bytes.buffer;
// }

// // Helper function to convert ArrayBuffer to Base64
// function arrayBufferToBase64(buffer) {
//   let binary = '';
//   const bytes = new Uint8Array(buffer);
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return window.btoa(binary);
// }

// // Example usage
// const keyHex = '9e769fdd0e381e1c4ba505c2a500c59662ce98a395bca4ef5ca6ae6f7b11f902';  // Should match your Node.js key
// const ivHex = 'e580e3f6dd7d55b3ef84264312316fb2';  // Should match your Node.js IV (should be 16 bytes)
// const data = 'your sensitive data';
// let formData={
//   footprintName:"",
//   tags:"",
//   footprintUrl:"",
//   websiteId:"",
//   userId:"",
// }
// encryptData(data, keyHex, ivHex).then(encryptedData => {
//   console.log('Encrypted Data:', encryptedData);
//   // Send encryptedData to your server
// });

// //Trying to add communication
// // Listen for messages from the extension's background script
// // Listen for messages from the React app
// // window.addEventListener("message", (event) => {
// //   // Make sure the message is from your React app
// //   if (event.source !== window) return;

// //   if (event.data.type && event.data.type === "FROM_REACT_APP") {
// //       console.log("Message from React app:", event.data.data);
// //       // Forward the message to the extension's background script
// //       chrome.runtime.sendMessage(event.data);
// //   }
// // });

// // Listen for messages from the extension's background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FROM_EXTENSION") {
//       // Forward the message to the React app
//       window.postMessage(message, "*");
//   }
// });
// ////

// ////// Trying to add url
// // Add this to your existing content.js
// // window.addEventListener("message", (event) => {
// //   if (event.source !== window) return;

// //   if (event.data.type === "START_TRACKING") {
// //       chrome.runtime.sendMessage(event.data);
// //   }
// // });

// window.addEventListener("message", (event) => {
//   if (event.source !== window) return;
//   if (event.data.type === "START_TRACKING") {
//     // Send message to background script to open new tab
//     chrome.runtime.sendMessage(event.data);

//     const {footprintName,tags ,url,userId,websiteId} =event.data;
//     formData.footprintName=footprintName;
//     formData.tags=tags;
//     formData.footprintUrl=url
//     formData.websiteId=websiteId
//     formData.userId=userId

//       // Store the received data
//     chrome.storage.local.set({ 'footprintData': formData }, function() {
//       console.log('Footprint data saved',formData);
//     });

//     console.log("Received formData:", formData);
//     // You can now use this formData in your content script as needed
//   }
// });

// /////

// //Today code
// let shouldShowCard = false;
// const captureClick = (element) => {
//   // if (!isRecording) return;
//   console.log("i am running using click ................")
//   const selector = getSelector(element);
//   const tag = element.tagName.toLowerCase();
//   const type = element.type || '';
//   const innerText = element.innerText || '';
//   const xpath = getXPath(element);

//   if (tag === 'a') {
//     const href = element.href || '';
//     capturedSelectors.push({ selector, tag, value: href, type, innerText, xpath });
//     saveToLocalStorage();
//     updateClickCount();
//   } else {
//     const handleInput =async (event) => {
//       const value = event.target.value || '';
//       let storedValue = value;

//       // Encrypt password fields
//       if (type === 'password') {
//         console.log("Password field detected");
//         const keyHex = '9e769fdd0e381e1c4ba505c2a500c59662ce98a395bca4ef5ca6ae6f7b11f902'; // Replace with your actual key
//         const ivHex = 'e580e3f6dd7d55b3ef84264312316fb2'; // Replace with your actual IV

//         // Encrypt the password value
//         try {
//           storedValue = await encryptData(value, keyHex, ivHex);
//           console.log("Encrypted password value:", storedValue);
//         } catch (error) {
//           console.error("Encryption error:", error);
//           return; // Exit if encryption fails
//         }
//       }

//       if (selector && !selector.includes('.drag-button') && !selector.includes('.finish-button')) {
//         capturedSelectors.push({ selector, tag, value: storedValue, type, innerText, xpath });
//         saveToLocalStorage();
//         updateClickCount();
//       }

//       element.removeEventListener('blur', handleInput);
//       element.removeEventListener('keypress', handleKeyPress);
//     };

//     element.addEventListener('blur', handleInput);

//     const handleKeyPress = (event) => {
//       if (event.key === 'Enter') {
//         handleInput(event);
//       }
//     };
//     element.addEventListener('keypress', handleKeyPress);
//   }
// };

// const injectCardContent = () => {
//   if (!document.querySelector('.container-2') && window.name !== 'footprint_new_tab') {
//     const style = document.createElement('style');
//     style.textContent = `
//     .container-2 {
//       position: fixed;
//       top: 20px;
//       left: 20px;
//       width: 363px;
//       z-index: 9999999;
//       cursor: move;
//       border-radius: 10px;
//     }
//     .wrapper-2 {
//       background-color: #000;
//       width: 100%;
//       height: auto;
//       border: 1px solid #333;
//       border-radius: 10px;
//       padding: 10px;
//       display: flex;
//       flex-direction: column;
//       color: white;
//     }
//     .top-section {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//     }
//     .content h3 {
//       color: #fff;
//       font-size: 20px;
//       font-weight: bold;
//       margin: 0;
//     }
//     .cross-icon svg {
//       cursor: pointer;
//     }
//     .text-content p {
//       color: #ddd;
//       margin: 0;
//     }
//     .step-button {
//       background-color: #fff;
//       border: 1px solid #ddd;
//       border-radius: 5px;
//       color: #000;
//       padding: 5px 10px;
//       font-size: 14px;
//     }

//     .click-count {
//       font-size: 16px;
//       color: #fff;
//     }
//     .drag-button {
//       background-color: #F4DB71;
//       border: 1px solid #ddd;
//       border-radius: 5px;
//       color: #414141;
//       padding: 5px 10px;
//       margin-top: 10px;
//       font-size: 14px;
//     }
//     .finish-button {
//       background-color: #414141;
//       border-radius: 5px;
//       color: #FFF;
//       padding: 5px 10px;
//       width: 100%;
//       margin-top: 10px;
//       font-size: 14px;
//     }
//   `;
//     document.head.appendChild(style);

//     const container = document.createElement('div');
//     container.className = 'container-2';
//     container.innerHTML = `
//       <div class="wrapper-2">
//         <div class="top-section">
//           <div class="content">
//             <h3>Footprint Creator</h3>
//           </div>
//           <div class="cross-icon">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//               <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>
//           </div>
//         </div>
//         <div class="text-content">
//           <p>You are now creating a footprint.</p>
//           <p>Do the steps you want the system to repeat.</p>
//           <p>Once you are done, drag and drop the yellow button on an element that confirms a successful run.</p>
//           <p>A footprint should have at least 1 click to run.</p>
//         </div>
//         <div class="click-count">Clicks: 0</div>
//         <button class="step-button">0/10 steps</button>
//         <button class="drag-button" draggable="true">Drag me to finish</button>
//         <button class="finish-button">Finish</button>
//       </div>
//     `;

//     document.body.appendChild(container);

//     const crossIcon = container.querySelector('.cross-icon');
//     crossIcon.addEventListener('click', () => {
//       container.remove();
//       localStorage.clear()
//       chrome.storage.local.remove('footprintData', function() {
//         console.log('Footprint data cleared');
//       });

//     });

//     const dragButton = container.querySelector('.drag-button');
//     dragButton.addEventListener('dragstart', (e) => {
//       e.dataTransfer.setData('text/plain', 'drag-button');
//     });

//     const finishButton = container.querySelector('.finish-button');
//     finishButton.addEventListener('click', () => {
//       // redirectToDashboard();
//       sendDataToServer();
//     });

//     // Make the container draggable
//     let isDragging = false;
//     let currentX;
//     let currentY;
//     let initialX;
//     let initialY;
//     let xOffset = 0;
//     let yOffset = 0;

//     container.addEventListener('mousedown', dragStart);
//     document.addEventListener('mousemove', drag);
//     document.addEventListener('mouseup', dragEnd);

//     function dragStart(e) {
//       initialX = e.clientX - xOffset;
//       initialY = e.clientY - yOffset;

//       if (e.target === container || e.target.closest('.wrapper-2')) {
//         isDragging = true;
//       }
//     }

//     function drag(e) {
//       if (isDragging) {
//         e.preventDefault();
//         currentX = e.clientX - initialX;
//         currentY = e.clientY - initialY;

//         xOffset = currentX;
//         yOffset = currentY;

//         setTranslate(currentX, currentY, container);
//       }
//     }

//     function dragEnd(e) {
//       initialX = currentX;
//       initialY = currentY;

//       isDragging = false;
//     }

//     function setTranslate(xPos, yPos, el) {
//       el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
//     }

//     // Make the "Drag me" button draggable only once
//     let isDragButtonDragged = false;

//     dragButton.addEventListener('dragstart', (e) => {
//       if (!isDragButtonDragged) {
//         e.dataTransfer.setData('text/plain', 'drag-button');
//       } else {
//         e.preventDefault();
//       }
//     });

//     document.addEventListener('dragover', (e) => {
//       e.preventDefault();
//     });

//     document.addEventListener('drop', (e) => {
//       e.preventDefault();
//       if (!isDragButtonDragged && e.dataTransfer.getData('text') === 'drag-button') {
//         isDragButtonDragged = true;
//         dragEndElement = e.target;
//         dragButton.setAttribute('draggable', 'false');
//         dragButton.style.opacity = '0.5';
//         dragButton.textContent = 'Dropped';

//         // Capture the element where the drag button was dropped
//         const selector = getSelector(dragEndElement);
//         const tag = dragEndElement.tagName.toLowerCase();
//         const type = dragEndElement.type || '';
//         const innerText = dragEndElement.innerText || '';
//         const xpath = getXPath(dragEndElement);

//         capturedSelectors.push({
//           selector,
//           tag,
//           type,
//           innerText,
//           xpath,
//           isDragEndElement: true
//         });

//         saveToLocalStorage();
//         updateClickCount();
//       }
//     });

//     console.log('Card visibility:', container.offsetParent !== null);
//   }
// };

// function getSelector(element) {
//   if (!element) return null;

//   const actionableTags = ['button', 'input', 'select', 'textarea'];

//   let actionableElement = element;
//   while (actionableElement && !actionableTags.includes(actionableElement.tagName.toLowerCase())) {
//     actionableElement = actionableElement.parentElement;
//   }

//   if (actionableElement) {
//     element = actionableElement;
//   }

//   if (element.id) {
//     return `#${element.id}`;
//   }

//   if (element.className) {
//     const classSelector = `.${element.className.split(" ").join(".")}`;
//     if (document.querySelectorAll(classSelector).length === 1) {
//       return classSelector;
//     }
//   }

//   if (element.tagName.toLowerCase() === 'a' && element.href) {
//     return `a[href="${element.href}"]`;
//   }

//   return getXPath(element);
// }

// function getXPath(element) {
//   if (element.id) {
//     return `//*[@id="${element.id}"]`;
//   }
//   if (element === document.body) {
//     return "/html/body";
//   }
//   let ix = 0;
//   const siblings = element.parentNode ? element.parentNode.childNodes : [];
//   for (let i = 0; i < siblings.length; i++) {
//     const sibling = siblings[i];
//     if (sibling === element) {
//       return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${ix + 1}]`;
//     }
//     if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
//       ix++;
//     }
//   }
//   return null;
// }

// const saveToLocalStorage = () => {
//   localStorage.setItem('capturedSelectors', JSON.stringify(capturedSelectors));
// };

// const loadFromLocalStorage = () => {
//   const storedSelectors = localStorage.getItem('capturedSelectors');
//   if (storedSelectors) {
//     capturedSelectors = JSON.parse(storedSelectors);
//     updateClickCount();
//   }
// };

// const updateClickCount = () => {
//   const clickCountElement = document.querySelector('.click-count');
//   const stepButtonElement = document.querySelector('.step-button');
//   if (clickCountElement && stepButtonElement) {
//     clickCountElement.textContent = `Clicks: ${capturedSelectors.length}`;
//     stepButtonElement.textContent = `${capturedSelectors.length}/10 steps`;
//   }
// };

// // const sendDataToServer = async () => {
// //   // Implement the logic to send capturedSelectors to your server
// //   const response = getFootprintData();

// //   console.log('Sending data to server:', capturedSelectors ,response,"tyrye");
// //   // You can use fetch or XMLHttpRequest to send the data

// //   const url = 'http://localhost:5000/api/footprint/'; // Replace with your backend URL
// //   const data = { response };
// //   console.log("data", JSON.stringify(data))
// //   const payload ={
// //     response,capturedSelectors
// //   }

// //   console.log(data,"mai tera", payload)

// //   try {
// //     const response = await fetch(url, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(payload),
// //     });

// //     const result = await response.json();
// //     console.log(result ,"mai result hu")
// //     chrome.storage.local.remove('footprintData', function() {
// //       console.log('Footprint data cleared');
// //     });

// //     if (result.success) {
// //       alert('Footprint saved successfully!',result );
// //     } else {
// //       alert('Failed to save the footprint. Please try again.',result);
// //     }
// //   } catch (error) {
// //     console.error('Error saving the footprint:', error);
// //     alert('An error occurred while saving the footprint.');
// //   }

// // };

// // Call the function to inject the card content
// //injectCardContent();

// const sendDataToServer = async () => {
//   try {
//     const response = await getFootprintData();
//     console.log('Sending data to server:', capturedSelectors, response, "tyrye");

//     const url = 'http://localhost:5000/api/footprint/'; // Replace with your backend URL
//     const payload = {
//       response,
//       capturedSelectors
//     };

//     console.log("payload", payload);

//     const serverResponse = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await serverResponse.json();
//     console.log(result, "mai result hu");
//     chrome.storage.local.remove('footprintData', function() {
//       console.log('Footprint data cleared');
//     });

//     if (result) {
//       alert('Footprint saved successfully!', result);
//       localStorage.clear();
//       redirectToDashboard(result._id ,result.website.toString())

//     } else {
//       alert('Failed to save the footprint. Please try again.', result);
//     }
//   } catch (error) {
//     console.error('Error saving the footprint:', error);
//     alert('An error occurred while saving the footprint.');
//   }
// };

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "update-domain" || message.type === "check-domain") {
//     const currentDomain = window.location.hostname;
//     shouldShowCard = currentDomain === message.domain || currentDomain.endsWith('.' + message.domain);
//     updateCardVisibility();
//   }
// });

// function updateCardVisibility() {
//   const card = document.querySelector('.container-2');
//   if (card) {
//     card.style.display = shouldShowCard ? 'block' : 'none';
//   } else if (shouldShowCard) {
//     injectCardContent();
//   }
// }

// const redirectToDashboard = (footprintId,websiteId) => {
//   try {
//     window.location.href = `http://localhost:3000/footprint/${footprintId}/website/${websiteId}`; // Replace with your actual dashboard URL
//   } catch (error) {
//     console.error('Redirect failed:', error);
//   }
// };

// updateCardVisibility();

// // Add event listener to capture clicks on the entire document
// document.addEventListener('click', (event) => {
//   captureClick(event.target);
// });

// // Load previously captured selectors from localStorage
// loadFromLocalStorage();

// // Set a flag in sessionStorage to indicate that this tab has the card
// sessionStorage.setItem('footprint_card_visible', 'true');

// // Check if this is a new tab
// if (window.opener && !sessionStorage.getItem('footprint_card_visible')) {
//   window.name = 'footprint_new_tab';
// }

// //delete code 3.30
// function getFootprintData() {
//   return new Promise((resolve) => {
//     chrome.storage.local.get(['footprintData'], function(result) {
//       if (result.footprintData) {
//         console.log("result mera hai", result.footprintData);
//         resolve(result.footprintData);
//       } else {
//         resolve(null);
//       }
//     });
//   });
// }

let capturedSelectors = [];
let isRecording = false;
let dragEndElement = null;

//Encrypt code
// Encrypt function
async function encryptData(data, keyHex, ivHex) {
  const keyBuffer = hexToArrayBuffer(keyHex);
  const ivBuffer = hexToArrayBuffer(ivHex);

  // Import the key
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Encode the data
  const encodedData = new TextEncoder().encode(data);

  // Encrypt the data
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBuffer },
    key,
    encodedData
  );

  // Convert ArrayBuffer to Base64
  const encryptedArray = new Uint8Array(encryptedBuffer);
  return arrayBufferToBase64(encryptedArray);
}

// Helper function to convert hex to ArrayBuffer
function hexToArrayBuffer(hex) {
  const bytes = new Uint8Array(
    hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  return bytes.buffer;
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Example usage
const keyHex =
  "9e769fdd0e381e1c4ba505c2a500c59662ce98a395bca4ef5ca6ae6f7b11f902"; // Should match your Node.js key
const ivHex = "e580e3f6dd7d55b3ef84264312316fb2"; // Should match your Node.js IV (should be 16 bytes)
const data = "your sensitive data";
let formData = {
  footprintName: "",
  tags: "",
  footprintUrl: "",
  websiteId: "",
  userId: "",
};
encryptData(data, keyHex, ivHex).then((encryptedData) => {
  console.log("Encrypted Data:", encryptedData);
  // Send encryptedData to your server
});

// Listen for messages from the extension's background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FROM_EXTENSION") {
    // Forward the message to the React app
    window.postMessage(message, "*");
  }
});

var clientUrl;

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "START_TRACKING") {
    // Send message to background script to open new tab
    chrome.runtime.sendMessage(event.data);

    const { footprintName, tags, url, userId, websiteId, websiteUrl } =
      event.data;
    formData.footprintName = footprintName;
    formData.tags = tags;
    formData.footprintUrl = url;
    formData.websiteId = websiteId;
    formData.userId = userId;

    // Store the received data
    chrome.storage.local.set(
      { footprintData: formData, clientUrl: websiteUrl },
      function () {
        console.log("Footprint data saved", formData);
      }
    );

    console.log("Received formData from react appp:", formData, websiteUrl);
    // You can now use this formData in your content script as needed
  }
});

/////

//Today code

const captureClick = (element) => {
  // if (!isRecording) return;
  console.log("i am running using click ................");
  const selector = getSelector(element);
  const tag = element.tagName.toLowerCase();
  const type = element.type || "";
  const innerText = element.innerText || "";
  const xpath = getXPath(element);

  if (tag === "a") {
    const href = element.href || "";
    capturedSelectors.push({
      selector,
      tag,
      value: href,
      type,
      innerText,
      xpath,
    });
    saveToLocalStorage();
    updateClickCount();
  } else {
    const handleInput = async (event) => {
      const value = event.target.value || "";
      let storedValue = value;

      // Encrypt password fields
      if (type === "password") {
        console.log("Password field detected");
        const keyHex =
          "9e769fdd0e381e1c4ba505c2a500c59662ce98a395bca4ef5ca6ae6f7b11f902"; // Replace with your actual key
        const ivHex = "e580e3f6dd7d55b3ef84264312316fb2"; // Replace with your actual IV

        // Encrypt the password value
        try {
          storedValue = await encryptData(value, keyHex, ivHex);
          console.log("Encrypted password value:", storedValue);
        } catch (error) {
          console.error("Encryption error:", error);
          return; // Exit if encryption fails
        }
      }

      if (
        selector &&
        !selector.includes(".drag-button") &&
        !selector.includes(".finish-button")
      ) {
        capturedSelectors.push({
          selector,
          tag,
          value: storedValue,
          type,
          innerText,
          xpath,
        });
        saveToLocalStorage();
        updateClickCount();
      }

      element.removeEventListener("blur", handleInput);
      element.removeEventListener("keypress", handleKeyPress);
    };

    element.addEventListener("blur", handleInput);

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleInput(event);
      }
    };
    element.addEventListener("keypress", handleKeyPress);
  }
};

// let allowedUrls = [];
// const clientUrl = getWebsiteData();
// console.log("clientUrl", clientUrl);
// // allowedUrls.push(clientUrl);
// const currentUrl = window.location.href;

// const isAllowed = allowedUrls.some((url) => new RegExp(url).test(currentUrl));

const injectCardContent = () => {
  const style = document.createElement("style");
  style.textContent = `
    .container-2 {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 363px;
      z-index: 9999999;
      cursor: move;
      border-radius: 10px;
    }
    .wrapper-2 {
      background-color: #000;
      width: 100%;
      height: auto;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      color: white;
    }
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content h3 {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    .cross-icon svg {
      cursor: pointer;
    }
    .text-content p {
      color: #ddd;
      margin: 0;
    }
    .step-button {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      color: #000;
      padding: 5px 10px;
      font-size: 14px;
    }

    .click-count {
      font-size: 16px;
      color: #fff;
    }
    .drag-button {
      background-color: #F4DB71;
      border: 1px solid #ddd;
      border-radius: 5px;
      color: #414141;
      padding: 5px 10px;
      margin-top: 10px;
      font-size: 14px;
    }
    .finish-button {
      background-color: #414141;
      border-radius: 5px;
      color: #FFF;
      padding: 5px 10px;
      width: 100%;
      margin-top: 10px;
      font-size: 14px;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.className = "container-2";
  container.innerHTML = `
      <div class="wrapper-2">
        <div class="top-section">
          <div class="content">
            <h3>Footprint Creator</h3>
          </div>
          <div class="cross-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="text-content">
          <p>You are now creating a footprint.</p>
          <p>Do the steps you want the system to repeat.</p>
          <p>Once you are done, drag and drop the yellow button on an element that confirms a successful run.</p>
          <p>A footprint should have at least 1 click to run.</p>
        </div>
        <div class="click-count">Clicks: 0</div>
        <button class="step-button">0/10 steps</button>
        <button class="drag-button" draggable="true">Drag me to finish</button>
        <button class="finish-button">Finish</button>
      </div>
    `;

  document.body.appendChild(container);

  const crossIcon = container.querySelector(".cross-icon");
  crossIcon.addEventListener("click", () => {
    container.remove();
    localStorage.clear();
    chrome.storage.local.remove("footprintData", function () {
      console.log("Footprint data cleared");
    });
  });

  const dragButton = container.querySelector(".drag-button");
  dragButton.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "drag-button");
  });

  const finishButton = container.querySelector(".finish-button");
  finishButton.addEventListener("click", () => {
    // redirectToDashboard();
    sendDataToServer();
  });

  // Make the container draggable
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  container.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === container || e.target.closest(".wrapper-2")) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, container);
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  // Make the "Drag me" button draggable only once
  let isDragButtonDragged = false;

  dragButton.addEventListener("dragstart", (e) => {
    if (!isDragButtonDragged) {
      e.dataTransfer.setData("text/plain", "drag-button");
    } else {
      e.preventDefault();
    }
  });

  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    if (
      !isDragButtonDragged &&
      e.dataTransfer.getData("text") === "drag-button"
    ) {
      isDragButtonDragged = true;
      dragEndElement = e.target;
      dragButton.setAttribute("draggable", "false");
      dragButton.style.opacity = "0.5";
      dragButton.textContent = "Dropped";

      // Capture the element where the drag button was dropped
      const selector = getSelector(dragEndElement);
      const tag = dragEndElement.tagName.toLowerCase();
      const type = dragEndElement.type || "";
      const innerText = dragEndElement.innerText || "";
      const xpath = getXPath(dragEndElement);

      capturedSelectors.push({
        selector,
        tag,
        type,
        innerText,
        xpath,
        isDragEndElement: true,
      });

      saveToLocalStorage();
      updateClickCount();
    }
  });

  console.log("Card visibility:", container.offsetParent !== null);
};

function getUrlData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["clientUrl"], function (result) {
      if (result.clientUrl) {
        console.log("clientUrl mera hai", result.clientUrl);
        resolve(result.clientUrl);
      } else {
        resolve(null);
      }
    });
  });
}

async function checkShowCard() {
  let allowedUrls = [];
  let clientUrl = await getUrlData(); // Wait for the Promise to resolve
  console.log("CLIENT URL", clientUrl);
  allowedUrls.push(clientUrl);

  const currentUrl = window.location.href;
  console.log("currentUrl", currentUrl);
  const isAllowed = allowedUrls.some(
    (url) => url && new RegExp(url).test(currentUrl)
  );
  // console.log("isAllowed", isAllowed);
  console.log("isAllowed", isAllowed);
  if (isAllowed) {
    injectCardContent();
  }
}

checkShowCard();

// console.log("isAllowed", isAllowed, "clientUrl", clientUrl);
// if (isAllowed) {
//   injectCardContent();
// }

function getSelector(element) {
  if (!element) return null;

  const actionableTags = ["button", "input", "select", "textarea"];

  let actionableElement = element;
  while (
    actionableElement &&
    !actionableTags.includes(actionableElement.tagName.toLowerCase())
  ) {
    actionableElement = actionableElement.parentElement;
  }

  if (actionableElement) {
    element = actionableElement;
  }

  if (element.id) {
    return `#${element.id}`;
  }

  if (element.className) {
    const classSelector = `.${element.className.split(" ").join(".")}`;
    if (document.querySelectorAll(classSelector).length === 1) {
      return classSelector;
    }
  }

  if (element.tagName.toLowerCase() === "a" && element.href) {
    return `a[href="${element.href}"]`;
  }

  return getXPath(element);
}

function getXPath(element) {
  if (element.id) {
    return `//*[@id="${element.id}"]`;
  }
  if (element === document.body) {
    return "/html/body";
  }
  let ix = 0;
  const siblings = element.parentNode ? element.parentNode.childNodes : [];
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return `${getXPath(
        element.parentNode
      )}/${element.tagName.toLowerCase()}[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
  return null;
}

const saveToLocalStorage = () => {
  localStorage.setItem("capturedSelectors", JSON.stringify(capturedSelectors));
};

const loadFromLocalStorage = () => {
  const storedSelectors = localStorage.getItem("capturedSelectors");
  if (storedSelectors) {
    capturedSelectors = JSON.parse(storedSelectors);
    updateClickCount();
  }
};

const updateClickCount = () => {
  const clickCountElement = document.querySelector(".click-count");
  const stepButtonElement = document.querySelector(".step-button");
  if (clickCountElement && stepButtonElement) {
    clickCountElement.textContent = `Clicks: ${capturedSelectors.length}`;
    stepButtonElement.textContent = `${capturedSelectors.length}/10 steps`;
  }
};

const sendDataToServer = async () => {
  try {
    const response = await getFootprintData();
    console.log(
      "Sending data to server:",
      capturedSelectors,
      response,
      "tyrye"
    );

    const url = "https://api.testtube.io/api/footprint/"; // Replace with your backend URL
    const payload = {
      response,
      capturedSelectors,
    };

    console.log("payload", payload);

    const serverResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await serverResponse.json();
    console.log(result, "mai result hu");
    chrome.storage.local.remove("footprintData", function () {
      console.log("Footprint data cleared");
    });

    if (result) {
      alert("Footprint saved successfully!", result);
      localStorage.clear();
      redirectToDashboard(result._id, result.website.toString());
    } else {
      alert("Failed to save the footprint. Please try again.", result);
    }
  } catch (error) {
    console.error("Error saving the footprint:", error);
    alert("An error occurred while saving the footprint.");
  }
};

const redirectToDashboard = (footprintId, websiteId) => {
  try {
    window.location.href = `http://localhost:3000/Savefootprint/${footprintId}/website/${websiteId}`; // Replace with your actual dashboard URL
  } catch (error) {
    console.error("Redirect failed:", error);
  }
};

// updateCardVisibility();

// Add event listener to capture clicks on the entire document
document.addEventListener("click", (event) => {
  captureClick(event.target);
});

// Load previously captured selectors from localStorage
loadFromLocalStorage();

// Set a flag in sessionStorage to indicate that this tab has the card
sessionStorage.setItem("footprint_card_visible", "true");

// Check if this is a new tab
if (window.opener && !sessionStorage.getItem("footprint_card_visible")) {
  window.name = "footprint_new_tab";
}

//delete code 3.30

function getFootprintData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["footprintData"], function (result) {
      if (result.footprintData) {
        console.log("result mera hai", result.footprintData);
        resolve(result.footprintData);
      } else {
        resolve(null);
      }
    });
  });
}
