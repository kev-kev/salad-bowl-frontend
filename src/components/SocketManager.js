import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const SocketManager = (props) => {
  const { updateRoom, setError } = useContext(GlobalContext);

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
  }, []);

  return null;
};

export default SocketManager;
