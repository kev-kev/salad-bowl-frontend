import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  username: "",
  room: null,
  roomCode: "",
  team1: [],
  team2: [],
  phase: "waiting",
  roomOwner: "",
  deck: [],
  discard: [],
  clueGiver: "",
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

  function addUserToTeam(username, teamIndex) {
    console.log("adding user to team");
    dispatch({
      type: "ADD_USER_TO_TEAM",
      payload: { username, teamIndex },
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        username: state.username,
        setUsername,
        room: state.room,
        error: state.error,
        updateRoom,
        clearState,
        setError,
        addUserToTeam,
        team1: state.team1,
        team2: state.team2,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
