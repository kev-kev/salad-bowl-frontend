import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const SocketManager = (props) => {
  const {
    setError,
    clearState,
    updateTeamUsers,
    setRoomOwner,
    setPhase,
    updateDeck,
    updateDiscard,
    setClueGiver,
    setGuessingTeamIndex,
    setTeamScore,
  } = useContext(GlobalContext);

  useEffect(() => {
    props.socket.on("set phase", (phase) => {
      setPhase(phase);
    });

    props.socket.on("set room owner", (username) => {
      setRoomOwner(username);
    });

    props.socket.on("set clue giver", (username) => {
      setClueGiver(username);
    });

    props.socket.on("update team users", (teamArr, teamIndex) => {
      updateTeamUsers(teamArr, teamIndex);
    });

    props.socket.on("set team score", (teamIndex, score) => {
      setTeamScore(teamIndex, score);
    });

    props.socket.on("set guessing team index", (teamIndex) => {
      setGuessingTeamIndex(teamIndex);
    });

    props.socket.on("update deck", (deckArr) => {
      console.log("updating deck!");
      updateDeck(deckArr);
    });

    props.socket.on("update discard", (discardArr) => {
      updateDiscard(discardArr);
    });

    props.socket.on("error", (message) => {
      setError(message);
    });

    props.socket.on("clear state", () => {
      clearState();
    });
  }, []);

  return null;
};

export default SocketManager;
