import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  roomCode: "",
  username: "",
  room: null,
  error: "",
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  function setError(message) {
    dispatch({
      type: "SET_ERROR",
      payload: message,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        roomCode: state.roomCode,
        username: state.username,
        setUsername,
        room: state.room,
        error: state.error,
        updateRoom,
        clearState,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
