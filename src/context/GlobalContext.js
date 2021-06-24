import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const serverUrl = "http://localhost:4001/";
const socket = socketIOClient(serverUrl);

const initialState = {
  roomCode: "",
  username: "",
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function joinRoom(code) {
    dispatch({
      type: "SET_ROOM_CODE",
      payload: code,
    });
    socket.emit("join room", code);
  }

  function createUser(username) {
    dispatch({
      type: "SET_USERNAME",
      payload: username,
    });
    socket.emit("create user", username, state.roomCode);
  }

  return (
    <GlobalContext.Provider
      value={{
        roomCode: state.roomCode,
        joinRoom,
        username: state.username,
        createUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
