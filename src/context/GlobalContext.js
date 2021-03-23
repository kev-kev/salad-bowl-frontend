import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  socket: null,
  roomCode: "",
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

  function setSocket(socket) {
    dispatch({
      type: "SET_SOCKET",
      payload: socket,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        socket: state.socket,
        roomCode: state.roomCode,
        setSocket,
        setRoomCode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
