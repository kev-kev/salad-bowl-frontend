import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  roomCode: "",
  username: "",
  room: null,
  owner: null,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function joinRoom(code, roomData) {
    console.log("joining room: ", code);

    dispatch({
      type: "SET_ROOM",
      payload: roomData,
    });
  }

  function setUsername(username) {
    dispatch({
      type: "SET_USERNAME",
      payload: username,
    });
  }

  function updateRoom(room) {
    console.log("UpdateRoom running");
    dispatch({
      type: "SET_ROOM",
      payload: room,
    });
  }

  function clearState(initialState) {
    dispatch({
      type: "CLEAR_STATE",
      payload: initialState,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        roomCode: state.roomCode,
        joinRoom,
        username: state.username,
        setUsername,
        room: state.room,
        error: state.error,
        updateRoom,
        clearState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
