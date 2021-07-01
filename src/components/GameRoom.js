import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext, GlobalProvider } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";

const GameRoom = () => {
  const { createUser, username, startGame, room } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");

  const renderUsernameForm = () => {
    if (username) {
      return <div>Name: {username}</div>;
    } else {
      return (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            createUser(usernameInput, room.code);
          }}
        >
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setUsernameInput(e.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </Form>
      );
    }
  };

  if (!room) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <div>Room: {room.code}</div>
        {renderUsernameForm()}

        <Button onClick={() => startGame()}>Start Game</Button>
      </>
    );
  }
};

export default GameRoom;
