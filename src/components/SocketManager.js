import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const SocketManager = (props) => {
  const { setError, clearState, updateTeam, setRoomOwner, setPhase } =
    useContext(GlobalContext);

  useEffect(() => {
    // props.socket.on("game started", (curRoom) => {
    //   console.log("Game Started! Updating room.");
    //   updateRoom(curRoom);
    // });

    // props.socket.on("user left room", (curRoom) => {
    //   updateRoom(curRoom);
    // });

    // props.socket.on("new user", (teamIndex) => {
    //   addUserToTeam(username, teamIndex);
    // });

    // props.socket.on("update room", (curRoom) => {
    //   updateRoom(curRoom);
    // });

    props.socket.on("set phase", (phase) => {
      setPhase(phase);
    });

    props.socket.on("set room owner", (username) => {
      setRoomOwner(username);
    });

    props.socket.on("update team", (teamArr, teamIndex) => {
      updateTeam(teamArr, teamIndex);
    });

    props.socket.on("error", (message) => {
      setError(message);
    });

    props.socket.on("clear state", () => {
      clearState();
    });

    props.socket.on("");
  }, []);

  return null;
};

export default SocketManager;
