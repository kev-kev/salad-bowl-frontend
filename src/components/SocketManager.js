import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const SocketManager = (props) => {
  const { updateRoom, setError, clearState, username, addUserToTeam } =
    useContext(GlobalContext);

  useEffect(() => {
    // props.socket.on("new user created", (curRoom) => {
    //   console.log("User created. Updating room.");
    //   updateRoom(curRoom);
    // });

    // props.socket.on("game started", (curRoom) => {
    //   console.log("Game Started! Updating room.");
    //   updateRoom(curRoom);
    // });

    // props.socket.on("user left room", (curRoom) => {
    //   updateRoom(curRoom);
    // });

    props.socket.on("update room", (curRoom) => {
      updateRoom(curRoom);
    });

    props.socket.on("error", (message) => {
      setError(message);
    });

    props.socket.on("clear state", () => {
      clearState();
    });

    props.socket.on("new user", (teamIndex) => {
      addUserToTeam(username, teamIndex);
    });
  }, []);

  return null;
};

export default SocketManager;
