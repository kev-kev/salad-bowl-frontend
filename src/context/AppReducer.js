export default (state, action) => {
  switch (action.type) {
    case "SET_ROOM_CODE":
      return {
        ...state,
        roomCode: action.payload,
      };
    case "SET_ROOM":
      return {
        ...state,
        room: action.payload,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "SET_PHASE":
      return {
        ...state,
        phase: action.payload,
      };
    case "CLEAR_STATE":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
