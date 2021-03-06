import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import history from "../history";
import { Router, Switch, Route } from "react-router-dom";
import React from "react";
import Homepage from "./Homepage";
import GameRoom from "./GameRoom";
import SocketManager from "./SocketManager";
import { GlobalProvider } from "../context/GlobalContext";
import socketIOClient from "socket.io-client";

const serverUrl = "http://localhost:4001/";

function App() {
  const socket = socketIOClient(serverUrl);

  return (
    <GlobalProvider>
      <SocketManager socket={socket} />
      <Router history={history}>
        <Switch>
          <Route path="/rooms/:roomcode">
            <GameRoom socket={socket} />
          </Route>
          <Route path="/">
            <Homepage socket={socket} />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
