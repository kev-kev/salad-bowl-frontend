import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";
import GuessingForm from "./GuessingForm";
import WordForm from "./WordForm";
import history from "../history";

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
    guessingTeamIndex,
  } = useContext(GlobalContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [teamIndex, setTeamIndex] = useState(null);

  useEffect(() => {
    // Listening to back and window closing
    window.onpopstate = (e) => {
      if (roomCode) props.socket.emit("page close");
    };
    window.onbeforeunload = () => {
      if (roomCode) props.socket.emit("page close");
    };
  });

  useEffect(() => {
    if (phase === "submitting" && !username) {
      history.push("/");
    }
  }, [phase]);

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
      props.socket.emit("create user", usernameInput, (res) => {
        setTeamIndex(res.teamIndex);
      });
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

  const renderScore = () => {
    if (teamIndex === 0) {
      return team1.score;
    } else {
      return team2.score;
    }
  };

  if (!roomCode) return <Redirect to="/" />;
  return (
    <>
      <div>Room: {roomCode}</div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {renderUsernameForm()}
      {renderStartGameButton()}
      <WordForm socket={props.socket} />
      {phase === "guessing" && (
        <div>
          <span>Score: {renderScore()}</span>
          <GuessingForm
            username={username}
            clueGiver={clueGiver}
            deck={deck}
            phase={phase}
            teamIndex={teamIndex}
            socket={props.socket}
            guessingTeamIndex={guessingTeamIndex}
          />
        </div>
      )}
    </>
  );
};

export default GameRoom;
