import { Button } from "react-bootstrap/";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GuessingForm = (props) => {
  const [deckIndex, setDeckIndex] = useState(0);
  const deckLen = props.deck.length;
  const deck = props.deck;

  const handleScore = () => {
    setDeckIndex(deckIndex + 1);
    const curWord = deck[deckIndex].word;
    props.socket.emit("score word", props.teamIndex, curWord);
  };

  const renderClueGiverForm = () => {
    if (deckIndex < deckLen) {
      return (
        <>
          Am giving clues
          <span>Word: {deck[deckIndex].word}</span>
          <span>Explanation: {deck[deckIndex].explanation}</span>
          <Button onClick={() => handleScore()} variant="success">
            Score!
          </Button>
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

  if (props.clueGiver === props.username) {
    return <div>{renderClueGiverForm()}</div>;
  } else {
    return <div>Am guessing</div>;
    // render guessing form for team where isGuessing = true
  }
  return null;
};

export default GuessingForm;
