import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import saladBowlSVG from "./assets/images/saladbowl.svg";

const serverUrl = "http://localhost:4001/";

function App() {
  const [setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(serverUrl);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  });

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <img src={saladBowlSVG} className="home-logo" />
      <h3 className="mb-5">Salad Bowl</h3>
      <Button className="home-button mb-4" variant="outline-primary" size="lg">
        Create Room
      </Button>
      <span className="mb-4">- or -</span>
      <Form className="d-flex">
        <Form.Control
          className="mr-2"
          size="lg"
          type="text"
          placeholder="Enter Room Code"
        />
        <Button className="home-button mb-0" variant="outline-secondary">
          Join Room
        </Button>
      </Form>
    </div>
  );
}

export default App;
