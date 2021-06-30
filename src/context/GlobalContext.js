import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const serverUrl = "http://localhost:4001/";
const socket = socketIOClient(serverUrl);

const initialState = {
  roomCode: "",
  username: "",
  room: null,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function joinRoom(code) {
    console.log("joining room: ", code);
    socket.emit("join room", code, (response) => {
      dispatch({
        type: "SET_ROOM",
        payload: response.room,
      });
    });
  }

  function createUser(username) {
    dispatch({
      type: "SET_USERNAME",
      payload: username,
    });
    socket.emit("create user", username, state.roomCode);
  }

  function startGame(code) {
    socket.emit("start game", code);
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
