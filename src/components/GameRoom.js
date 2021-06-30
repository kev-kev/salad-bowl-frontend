import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext, GlobalProvider } from "../context/GlobalContext";

const GameRoom = () => {
  const { createUser, username, startGame, room } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");

  return (
    <>
      <div>Room: {room.code}</div>
      <Form>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        />
        <Button onClick={() => createUser(usernameInput)}>Submit</Button>
      </Form>
      <div>Name: {username}</div>
      <Button onClick={() => startGame()}>Start Game</Button>
    </>
  );
};

export default GameRoom;
