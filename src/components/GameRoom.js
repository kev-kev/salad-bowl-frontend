import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext, GlobalProvider } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";

const serverUrl = "http://localhost:4001/";
const socket = socketIOClient(serverUrl);

const GameRoom = () => {
  const { createUser, username, startGame, room } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    if (room) {
      if (room.gameInProgress) {
        console.log("Frontend game started!");
      }
    }
  }, [room]);

  const checkIfUniqueName = (nameStr) => {
    // returns false if name is not unqique (non-case sensitive)
    nameStr = nameStr.toLowerCase();
    const len = Math.max(room.team1.users.length, room.team2.users.length);
    for (let i = 0; i < len; i++) {
      // if (room.team1.users[i]) {
      if (
        room.team1.users[i].name.toLowerCase() === nameStr ||
        room.team2.users[i].name.toLowerCase() === nameStr
      ) {
        return false;
      }
      // }
      // if (this.team2.users[i]) {
      //   if (this.team2.users[i].name.toLowercase() === username) {
      //     return false;
      //   }
      // }
    }
    return true;
  };

  const handleUsernameSubmit = () => {
    if (checkIfUniqueName(usernameInput)) {
      createUser(usernameInput, room.code);
    } else {
      console.log("Username is taken!");
    }
  };
  const renderUsernameForm = () => {
    if (username) {
      return <div>Name: {username}</div>;
    } else {
      return (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleUsernameSubmit();
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

  const renderStartGameButton = () => {
    if (!room.gameInProgress && room.roomOwner === username) {
      return <Button onClick={() => startGame(room.code)}>Start Game</Button>;
    }
  };

  if (!room) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <div>Room: {room.code}</div>
        {renderUsernameForm()}
        {renderStartGameButton()}
      </>
    );
  }
};

export default GameRoom;
