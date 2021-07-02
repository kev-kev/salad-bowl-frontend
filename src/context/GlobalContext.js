import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";
import history from "../history";

const serverUrl = "http://localhost:4001/";
const socket = socketIOClient(serverUrl);

const initialState = {
  roomCode: "",
  username: "",
  room: null,
  owner: null,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function joinRoom(code) {
    console.log("joining room: ", code);
    socket.emit("join room", code, (res) => {
      dispatch({
        type: "SET_ROOM",
        payload: res.room,
      });
      history.push(`/rooms/${code}`);
    });
  }

  function createUser(username, roomCode) {
    dispatch({
      type: "SET_USERNAME",
      payload: username,
    });
    socket.emit("create user", username, roomCode, (res) => {
      dispatch({
        type: "SET_ROOM",
        payload: res.room,
      });
    });
  }

  function startGame(code) {
    socket.emit("start game", code, (res) => {
      dispatch({
        type: "SET_ROOM",
        payload: res.room,
      });
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        roomCode: state.roomCode,
        joinRoom,
        username: state.username,
        createUser,
        startGame,
        room: state.room,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
