import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import saladBowlSVG from "../assets/images/saladbowl.svg";
import history from "../history";

function Homepage(props) {
  const { clearState, error, setRoomCode } = useContext(GlobalContext);
  const [roomCodeInput, setRoomCodeInput] = useState("");

  // Reset to initial state on render.
  useEffect(() => {
    clearState();
  }, []);

  const handleCreateRoom = () => {
    props.socket.emit("create room", (res) => {
      handleJoinRoom(res.roomCode);
    });
  };

  const handleJoinRoom = (roomCode) => {
    roomCode = roomCode.toUpperCase();
    setRoomCode(roomCode);
    props.socket.emit("join room", roomCode, () => {
      history.push(`/rooms/${roomCode}`);
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <img src={saladBowlSVG} className="home-logo" />
      <h3 className="mb-5">Salad Bowl</h3>
      {error && <div>YOU GOOFED UP, CAUSE {error}</div>}
      <Button
        className="home-button mb-4"
        variant="outline-primary"
        size="lg"
        onClick={() => handleCreateRoom()}
      >
        Create Room
      </Button>
      <span className="mb-4">- or -</span>
      <Form
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleJoinRoom(roomCodeInput);
        }}
      >
        <Form.Control
          className="mr-2"
          size="lg"
          type="text"
          placeholder="Enter Room Code"
          onChange={(e) => {
            setRoomCodeInput(e.target.value);
          }}
          value={roomCodeInput}
          maxLength="5"
        />
        <Button
          className="home-button mb-0"
          variant="outline-secondary"
          type="submit"
          disabled={roomCodeInput.length !== 5}
        >
          Join Room
        </Button>
      </Form>
      <br />
    </div>
  );
}

export default Homepage;
