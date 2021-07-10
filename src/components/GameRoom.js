import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";

const GameRoom = (props) => {
  const { username, room, setUsername } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    // listening to back and window closing
    window.onpopstate = (e) => {
      console.log("going back!");
      props.socket.emit("page close", room.code, username);
    };
    window.onbeforeunload = () => {
      props.socket.emit("page close", room.code, username);
    };
  });

  const checkIfValidName = (nameStr) => {
    // Returns false if name isn't present or unqique (non-case sensitive)
    if (nameStr.length < 1) return false;
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
    if (checkIfValidName(usernameInput)) {
      props.socket.emit("create user", usernameInput, room.code);
      setUsername(usernameInput);
    } else {
      console.log("Username is invalid!");
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
