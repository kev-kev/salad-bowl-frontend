import socketIOClient from "socket.io-client";
import { Button, Form } from "react-bootstrap/";
import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext, GlobalProvider } from "../context/GlobalContext";
import saladBowlSVG from "../assets/images/saladbowl.svg";

const serverUrl = "http://localhost:4001/";
const socket = socketIOClient(serverUrl);

function createRoomCode() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function Homepage(props) {
  const [enteredRoomCode, setEnteredRoomCode] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [shouldShowLogo, setShouldShowLogo] = useState(true);
  // const { setRoomCode, socket, setSocket } = useContext(GlobalContext);

  useEffect(() => {
    socket.on("receive toggle logo", () => {
      console.log("toggled in frontend");
      setShouldShowLogo(false);
    });
  }, []);

  const createNewRoom = () => {
    const roomCode = createRoomCode();
    // setRoomCode(roomCode);
    socket.emit("create room", roomCode);
    socket.emit("join room", roomCode);
    setEnteredRoomCode(roomCode);
  };

  const joinRoom = (code) => {
    if (code.length != 5) {
      console.log("Invalid room code");
    } else {
      socket.emit("join room", code);
      setEnteredRoomCode(code);
    }
  };

  const handleTest = (enteredRoomCode) => {
    console.log("entered room code: ", enteredRoomCode);
    socket.emit("toggle logo", enteredRoomCode);
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      {shouldShowLogo && <img src={saladBowlSVG} className="home-logo" />}
      <h3 className="mb-5">Salad Bowl</h3>
      <Button
        className="home-button mb-4"
        variant="outline-primary"
        size="lg"
        onClick={() => createNewRoom()}
      >
        Create Room
      </Button>
      <span className="mb-4">- or -</span>
      <Form className="d-flex">
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
          onClick={() => joinRoom(enteredRoomCode)}
        >
          Join Room
        </Button>
      </Form>
      <br />
      <Button
        className="home-button mb-0"
        variant="outline-danger"
        onClick={() => handleTest(enteredRoomCode)}
      >
        Test
      </Button>
    </div>
  );
}

export default Homepage;
