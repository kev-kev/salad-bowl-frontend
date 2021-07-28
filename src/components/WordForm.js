import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Form } from "react-bootstrap/";

const WordForm = (props) => {
  const { phase, deck } = useContext(GlobalContext);
  const [wordInput, setWordInput] = useState("");
  const [explanationInput, setExplanationInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const REGEX = /[\W_]/g;

  const handleWordSubmit = () => {
    if (wordInput && checkIfValidWord(wordInput)) {
      props.socket.emit("submit word", wordInput, explanationInput);
    }
    setWordInput("");
    setExplanationInput("");
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

  if (phase === "submitting") {
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
  }
  return null;
};

export default WordForm;
