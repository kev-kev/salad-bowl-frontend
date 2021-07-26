import { Button } from "react-bootstrap/";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GuessingForm = (props) => {
  const [deckIndex, setDeckIndex] = useState(0);
  const deckLen = props.deck.length;

  const handleScore = () => {
    if (deckIndex < deckLen) {
      setDeckIndex(deckIndex + 1);
      const curWord = props.deck[deckIndex].word;
      props.socket.emit("score word", props.teamIndex, curWord);
    }
  };
  if (props.clueGiver === props.username) {
    // display a card and pass/score buttons
    debugger;
    return (
      <div>
        Am giving clues
        <div>Word: {props.deck[deckIndex].word}</div>
        <div>Explanation: {props.deck[deckIndex].explanation}</div>
        <Button onClick={() => handleScore} variant="success">
          Score!
        </Button>
        <Button onClick={setDeckIndex(deckIndex + 1)} variant="danger">
          Pass
        </Button>
      </div>
    );
  } else {
    return <div>Am guessing</div>;
    // render guessing form for team where isGuessing = true
    // for every
  }
  return null;
};

export default GuessingForm;
