// Create a container for the extension
const container = document.createElement('div');
container.id = 'my-angular-extension-container';
container.style.position = 'fixed';
container.style.bottom = '20px';
container.style.left = '20px';
container.style.zIndex = '9999';
container.style.border = '2px solid #007bff'; // Add a blue border
container.style.borderRadius = '8px'; // Rounded corners
container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Add a subtle shadow
container.style.backgroundColor = '#ffffff'; // Ensure white background
container.style.padding = '10px'; // Add some padding around the iframe

// Create an iframe to host the Angular app
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('index.html');
iframe.style.border = 'none';
iframe.style.width = '300px';
iframe.style.height = '200px';
iframe.style.backgroundColor = 'transparent'; // Make iframe background transparent

// Append the iframe to the container
container.appendChild(iframe);

// Append the container to the body
document.body.appendChild(container);

// Add a style to ensure the extension stands out on different backgrounds
const style = document.createElement('style');
style.textContent = `
  #my-angular-extension-container {
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(5px);
  }
`;
document.head.appendChild(style);