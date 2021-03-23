export default (state, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_ROOM_CODE":
      return {
        ...state,
        roomCode: action.payload,
      };
    default:
      return state;
  }
};
