import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import saladBowlSVG from "../assets/images/saladbowl.svg";

const serverUrl = "http://localhost:4001/";
const socket = socketIOClient(serverUrl);

function Homepage() {
  const { joinRoom } = useContext(GlobalContext);
  const [enteredRoomCode, setEnteredRoomCode] = useState("");

  const handleCreateRoom = () => {
    socket.emit("create room", (response) => {
      console.log("create room response code: ", response.room.code);
      joinRoom(response.room.code);
    });
  };

  const handleJoinRoom = (code) => {
    if (code.length !== 5) {
      console.log("Invalid room code");
    } else {
      code = code.toUpperCase();
      joinRoom(code);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <img
        src={saladBowlSVG}
        className="home-logo"
        alt="image of a dish containing greens and other veggies"
      />
      <h3 className="mb-5">Salad Bowl</h3>
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
          handleJoinRoom(enteredRoomCode);
        }}
      >
        <Form.Control
          className="mr-2"
          size="lg"
          type="text"
          placeholder="Enter Room Code"
          onChange={(e) => {
            setEnteredRoomCode(e.target.value);
          }}
        />
        <Button
          className="home-button mb-0"
          variant="outline-secondary"
          type="submit"
        >
          Join Room
        </Button>
      </Form>
      <br />
    </div>
  );
}

export default Homepage;
