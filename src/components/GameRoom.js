import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Redirect } from "react-router-dom";
import history from "../history";

const WORD_REGEX = /[\W_]/g;

const GameRoom = (props) => {
  const { username, room, setUsername, error } = useContext(GlobalContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [explanationInput, setExplanationInput] = useState("");

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
    if (name.length < 1) return false;
    const nameStr = name.replace(WORD_REGEX, "").toLowerCase();
    const len = Math.max(room.team1.users.length, room.team2.users.length);
    for (let i = 0; i < len; i++) {
      if (room.team1.users[i]) {
        if (
          room.team1.users[i].name.replace(WORD_REGEX, "").toLowerCase() ===
          nameStr
        ) {
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
      props.socket.emit("create user", usernameInput);
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
            value={usernameInput}
            maxLength="64"
          />
          <Button type="submit">Submit</Button>
        </Form>
      );
    }
  };

  const renderStartGameButton = () => {
    if (!room.gameInProgress && room.roomOwner === username) {
      return (
        <Button onClick={() => props.socket.emit("start game")}>
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
    const wordStr = word.replace(WORD_REGEX, "").toLowerCase();
    for (let i = 0; i < room.deck.length; i++) {
      let curWord = room.deck[i].word.replace(WORD_REGEX, "").toLowerCase();
      if (wordStr === curWord) {
        return false;
      }
    }
    return true;
  };

  const renderWordForm = () => {
    if (room.gameInProgress) {
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
          <Button type="submit">Submit</Button>
        </Form>
      );
    }
  };

  if (!room) return <Redirect to="/" />;

  return (
    <>
      <div>Room: {room.code}</div>
      {renderUsernameForm()}
      {renderStartGameButton()}
      {room.phase == "submitting" && renderWordForm()}
    </>
  );
};

export default GameRoom;
