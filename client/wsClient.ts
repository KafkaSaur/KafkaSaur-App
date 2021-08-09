/** @format */

const ws = new WebSocket('ws://localhost:8080');

// Register event listeners for the open, close, and message events
ws.onopen = () => {
  console.log('WebSocket ready!');

  // Send a message over the WebSocket to the server
  ws.send('Hello World!');
};
ws.onmessage = (message) => {
  // Log the message we recieve:
  console.log('Received data:', message.data);

  // Close the websocket after receiving the message
  ws.close();
};
ws.onclose = () => console.log('WebSocket closed!');
ws.onerror = (err) => console.log('WebSocket error:');
