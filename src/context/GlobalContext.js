import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  roomCode: "",
  username: "",
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setRoomCode(code) {
    dispatch({
      type: "SET_ROOM_CODE",
      payload: code,
    });
  }

  function setUsername(username) {
    dispatch({
      type: "SET_USERNAME",
      payload: username,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        roomCode: state.roomCode,
        setRoomCode,
        username: state.username,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
