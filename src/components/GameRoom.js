import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";

const GameRoom = (props) => {
  const { username, room, updateRoom, setUsername } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    props.socket.on("new user created", (curRoom) => {
      console.log("User created. Updating room.");
      updateRoom(curRoom);
    });

    props.socket.on("game started", (curRoom) => {
      console.log("Game Started! Updating room.");
      updateRoom(curRoom);
    });
  }, []);

  const checkIfUniqueName = (nameStr) => {
    // Returns false if name is not unqique (non-case sensitive)
    nameStr = nameStr.toLowerCase();
    const len = Math.max(room.team1.users.length, room.team2.users.length);
    for (let i = 0; i < len; i++) {
      if (room.team1.users[i]) {
        if (room.team1.users[i].name.toLowerCase() === nameStr) {
          return false;
        }
      }
      if (room.team2.users[i]) {
        if (room.team2.users[i].name.toLowerCase() === nameStr) {
          return false;
        }
      }
    }
    return true;
  };

  const handleUsernameSubmit = () => {
    if (checkIfUniqueName(usernameInput)) {
      props.socket.emit("create user", usernameInput, room.code);
      setUsername(usernameInput);
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
      return (
        <Button onClick={() => props.socket.emit("start game", room.code)}>
          Start Game
        </Button>
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
        {renderStartGameButton()}
      </>
    );
  }
};

export default GameRoom;
