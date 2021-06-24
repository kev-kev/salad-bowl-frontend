import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext, GlobalProvider } from "../context/GlobalContext";

const GameRoom = () => {
  const { roomCode, setUsername, username } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");

  const createUser = () => {
    setUsername(usernameInput);
  };

  return (
    <>
      <div>Room: {roomCode}</div>
      <Form>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        />
        <Button onClick={() => createUser()}>Submit</Button>
      </Form>
      <div>Name: {username}</div>
    </>
  );
};

export default GameRoom;
