import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";
import GuessingForm from "./GuessingForm";
import WordForm from "./WordForm";

const REGEX = /[\W_]/g; // Selects all spaces and punctuation, including underscores
const MIN_USER_COUNT = 1;

const GameRoom = (props) => {
  const {
    username,
    roomCode,
    setUsername,
    team1,
    team2,
    phase,
    roomOwner,
    clueGiver,
    deck,
    teamIndex,
  } = useContext(GlobalContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Listening to back and window closing
    window.onpopstate = (e) => {
      if (roomCode) props.socket.emit("page close");
    };
    window.onbeforeunload = () => {
      if (roomCode) props.socket.emit("page close");
    };
  });

  const checkIfValidName = (name) => {
    // Returns false if name isn't present or unqique (non-case sensitive)
    const nameStr = name.replace(REGEX, "").toLowerCase();
    const len = Math.max(team1.users.length, team2.users.length);
    for (let i = 0; i < len; i++) {
      if (team1.users[i]) {
        if (team1.users[i].replace(REGEX, "").toLowerCase() === nameStr) {
          setErrorMessage("Username already taken!");
          return false;
        }
      }
      if (team2.users[i]) {
        if (team2.users[i].replace(REGEX, "").toLowerCase() === nameStr) {
          setErrorMessage("Username already taken!");
          return false;
        }
      }
    }
    return true;
  };

  const handleUsernameSubmit = () => {
    if (checkIfValidName(usernameInput)) {
      setUsername(usernameInput);
      props.socket.emit("create user", usernameInput);
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
            value={usernameInput}
            maxLength="64"
          />
          <Button type="submit" disabled={usernameInput < 1}>
            Submit
          </Button>
        </Form>
      );
    }
  };

  const renderStartGameButton = () => {
    if (phase === "waiting" && roomOwner === username) {
      return (
        <Button
          onClick={() => props.socket.emit("start game")}
          disabled={team1.users.length + team2.users.length < MIN_USER_COUNT}
        >
          Start Game
        </Button>
      );
    }
  };

  if (!roomCode) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>Room: {roomCode}</div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {renderUsernameForm()}
      {renderStartGameButton()}
      <WordForm socket={props.socket} />
      {phase === "guessing" && (
        <GuessingForm
          username={username}
          clueGiver={clueGiver}
          deck={deck}
          phase={phase}
        />
      )}
    </>
  );
};

export default GameRoom;
