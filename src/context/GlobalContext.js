import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  username: "",
  roomCode: "",
  team1: { users: [], score: 0 },
  team2: { users: [], score: 0 },
  phase: "waiting",
  roomOwner: "",
  deck: [],
  discard: [],
  clueGiver: "",
  error: "",
  teamIndex: null,
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

  function setRoomCode(roomCode) {
    dispatch({
      type: "SET_ROOMCODE",
      payload: roomCode,
    });
  }

  function updateTeamUsers(teamArr, teamIndex) {
    dispatch({
      type: `UPDATE_TEAM${teamIndex + 1}_USERS`,
      payload: teamArr,
    });
  }

  function setTeamIndex(teamIndex) {
    dispatch({
      type: "SET_TEAM_INDEX",
      payload: teamIndex,
    });
  }

  function setPhase(phase) {
    dispatch({
      type: "SET_PHASE",
      payload: phase,
    });
  }

  function setRoomOwner(username) {
    dispatch({
      type: "SET_ROOM_OWNER",
      payload: username,
    });
  }

  function updateDeck(deck) {
    dispatch({
      type: "UPDATE_DECK",
      payload: deck,
    });
  }

  function updateDiscard(discard) {
    dispatch({
      type: "UPDATE_DISCARD",
      payload: discard,
    });
  }

  function setClueGiver(username) {
    dispatch({
      type: "SET_CLUE_GIVER",
      payload: username,
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
        username: state.username,
        setUsername,
        team1: state.team1,
        team2: state.team2,
        updateTeamUsers,
        teamIndex: state.teamIndex,
        setTeamIndex,
        roomCode: state.roomCode,
        setRoomCode,
        phase: state.phase,
        setPhase,
        roomOwner: state.roomOwner,
        setRoomOwner,
        deck: state.deck,
        updateDeck,
        discard: state.discard,
        updateDiscard,
        clueGiver: state.clueGiver,
        setClueGiver,
        clearState,
        error: state.error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
