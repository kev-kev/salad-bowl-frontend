import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";

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
  } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [explanationInput, setExplanationInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cardIndex, setCardIndex] = useState(0);

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
    const len = Math.max(team1.length, team2.length);
    for (let i = 0; i < len; i++) {
      if (team1[i]) {
        if (team1[i].replace(REGEX, "").toLowerCase() === nameStr) {
          setErrorMessage("Username already taken!");
          return false;
        }
      }
      if (team2[i]) {
        if (team2[i].replace(REGEX, "").toLowerCase() === nameStr) {
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
          disabled={team1.length + team2.length < MIN_USER_COUNT}
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
    if (deck) {
      const wordStr = word.replace(REGEX, "").toLowerCase();
      for (let i = 0; i < deck.length; i++) {
        let curWord = deck[i].word.replace(REGEX, "").toLowerCase();
        if (wordStr === curWord) {
          return false;
        }
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
    if (clueGiver === username) {
      // display a card and pass/score buttons
      return (
        <div>
          {deck[cardIndex].word}
          {deck[cardIndex].explanation}
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

  if (!roomCode) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>Room: {roomCode}</div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {renderUsernameForm()}
      {renderStartGameButton()}
      {phase === "submitting" && renderWordForm()}
      {phase === "guessing" && renderGuessingForm()}
    </>
  );
};

export default GameRoom;
