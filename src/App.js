import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./index.css";
const serverUrl = "http://localhost:4001/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(serverUrl);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  });

  return (
    <div>
      <head>
        <title>Socket.IO Chat</title>
      </head>
      <body>
        <form id="usernameForm">
          <label>Enter a Username</label>
          <br />
          <input id="usernameInput" autocomplete="off" />
          <button>Submit</button>
        </form>
        <ul id="messages"></ul>
        <form id="messageForm">
          <input id="messageInput" autocomplete="off" />
          <button>Send</button>
        </form>
      </body>
    </div>
  );
}

export default App;
