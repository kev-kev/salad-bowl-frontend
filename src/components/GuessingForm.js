import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const REGEX = /[\W_s]/g;
const GuessingForm = (props) => {
  const [deckIndex, setDeckIndex] = useState(0);
  const [guessInput, setGuessInput] = useState("");
  const deckLen = props.deck.length;
  const deck = props.deck;

  const renderClueGiverForm = () => {
    if (deckIndex < deckLen) {
      return (
        <>
          Am giving clues
          <span>Word: {deck[deckIndex].word}</span>
          <span>Explanation: {deck[deckIndex].explanation}</span>
          {/* <Button onClick={() => handleScore()} variant="success">
            Score!
          </Button> */}
          <Button
            onClick={() => {
              setDeckIndex(deckIndex + 1);
            }}
            variant="danger"
          >
            Pass
          </Button>
        </>
      );
    } else {
      return <span>Out of Cards! Move onto the next round now, G</span>;
    }
  };

  const handleGuessSubmit = () => {
    const curWord = deck[deckIndex].word.replace(REGEX, "").toLowerCase();
    const curGuess = guessInput.replace(REGEX, "").toLowerCase();
    if (curWord === curGuess) {
      setDeckIndex(deckIndex + 1);
      props.socket.emit("score word", props.teamIndex, deck[deckIndex].word);
    }
    setGuessInput("");
  };

  const renderGuessForm = () => {
    return (
      <Form
        onsubmit={(e) => {
          e.preventDefault();
          handleGuessSubmit();
        }}
      >
        <Form.Control
          size="lg"
          type="text"
          placeholder="Guess the Word or Phrase"
          onChange={(e) => {
            setGuessInput(e.target.value);
          }}
        />
      </Form>
    );
  };

  if (props.clueGiver === props.username) {
    return <div>{renderClueGiverForm()}</div>;
  } else if (props.teamIndex === props.guessingTeamIndex) {
    return <div>{renderGuessForm()}</div>;
  }
  return null;
};

export default GuessingForm;
