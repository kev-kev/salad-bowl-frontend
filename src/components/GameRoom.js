import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";

const REGEX = /[\W_]/g; // Selects all spaces and punctuation, including underscores
const MIN_USER_COUNT = 2;

const GameRoom = (props) => {
  const { username, room, setUsername } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [explanationInput, setExplanationInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    // Listening to back and window closing
    window.onpopstate = (e) => {
      console.log("going back!");
      if (room) props.socket.emit("page close", room.code, username);
    };
    window.onbeforeunload = () => {
      if (room) props.socket.emit("page close", room.code, username);
    };
  });

  const checkIfValidName = (name) => {
    // Returns false if name isn't present or unqique (non-case sensitive)
    // if (name.length < 1) {
    //   setErrorMessage("Username is too short!");
    //   return false;
    // }
    const nameStr = name.replace(REGEX, "").toLowerCase();
    const len = Math.max(room.team1.users.length, room.team2.users.length);
    for (let i = 0; i < len; i++) {
      if (room.team1.users[i]) {
        if (
          room.team1.users[i].name.replace(REGEX, "").toLowerCase() === nameStr
        ) {
          setErrorMessage("Username already taken!");
          return false;
        }
      }
      if (room.team2.users[i]) {
        if (
          room.team2.users[i].name.replace(REGEX, "").toLowerCase() === nameStr
        ) {
          setErrorMessage("Username already taken!");
          return false;
        }
      }
    }
    return true;
  };

  const handleUsernameSubmit = () => {
    if (checkIfValidName(usernameInput)) {
      props.socket.emit("create user", usernameInput);
      setUsername(usernameInput);
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
    if (room.phase === "waiting" && room.roomOwner === username) {
      return (
        <Button
          onClick={() => props.socket.emit("start game")}
          disabled={
            room.team1.users.length + room.team2.users.length < MIN_USER_COUNT
          }
        >
          Start Game
        </Button>
      );
    }
  };

  const handleWordSubmit = () => {
    if (wordInput && checkIfValidWord(wordInput)) {
      props.socket.emit("submit word", wordInput, explanationInput);
      setWordInput("");
      setExplanationInput("");
    }
  };

  const checkIfValidWord = (word) => {
    const wordStr = word.replace(REGEX, "").toLowerCase();
    for (let i = 0; i < room.deck.length; i++) {
      let curWord = room.deck[i].word.replace(REGEX, "").toLowerCase();
      if (wordStr === curWord) {
        return false;
      }
    }
    return true;
  };

  const renderWordForm = () => {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleWordSubmit();
        }}
      >
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter a Word or Short Phrase"
          onChange={(e) => setWordInput(e.target.value)}
          value={wordInput}
          maxLength="64"
        />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter an Explanation (optional)"
          onChange={(e) => setExplanationInput(e.target.value)}
          value={explanationInput}
          maxLength="256"
        />
        <Button type="submit" disabled={wordInput.length < 1}>
          Submit
        </Button>
      </Form>
    );
  };

  const renderGuessingForm = () => {
    if (room.clueGiver === username) {
      // display a card and pass/score buttons
      return (
        <div>
          {room.deck[cardIndex].word}
          {room.deck[cardIndex].explanation}
          <Button onClick={setCardIndex(cardIndex + 1)} variant="success">
            Score!
          </Button>
          <Button onClick={setCardIndex(cardIndex + 1)} variant="danger">
            Pass
          </Button>
        </div>
      );
    } else {
      // render guessing form for team where isGuessing = true
      // for every
    }
  };

  if (!room) return <Redirect to="/" />;

  return (
    <>
      <div>Room: {room.code}</div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {renderUsernameForm()}
      {renderStartGameButton()}
      {room.phase === "submitting" && renderWordForm()}
      {room.phase === "guessing" && renderGuessingForm()}
    </>
  );
};

export default GameRoom;
