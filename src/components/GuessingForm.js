import { Button } from "react-bootstrap/";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const GuessingForm = (props) => {
  // const { username, clueGiver, deck, phase } = useContext(GlobalContext);
  const [cardIndex, setCardIndex] = useState(0);
  const deckLen = props.deck.length;

  const handleScore = () => {
    if (cardIndex < deckLen) {
      setCardIndex(cardIndex + 1);
      props.socket.emit("set score");
    }
  };
  if (props.clueGiver === props.username) {
    // display a card and pass/score buttons
    return (
      <div>
        Am giving clues
        <div>Word: {props.deck[cardIndex].word}</div>
        <div>Explanation: {props.deck[cardIndex].explanation}</div>
        <Button onClick={() => handleScore} variant="success">
          Score!
        </Button>
        {/* <Button onClick={setCardIndex(cardIndex + 1)} variant="danger">
            Pass
          </Button> */}
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
