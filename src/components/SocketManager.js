import React, { useContext, useEffect } from "react";

const SocketManager = (props) => {
  const { username, room, updateRoom, setUsername } = useContext(GlobalContext);

  useEffect(() => {
    props.socket.on(
      "new user created",
      (curRoom) => {
        console.log("User created. Updating room.");
        updateRoom(curRoom);
      },
      [room]
    );
  });

  return;
};

export default SocketManager;
