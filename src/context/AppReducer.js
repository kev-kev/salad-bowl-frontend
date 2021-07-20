export default (state, action) => {
  switch (action.type) {
    case "SET_ROOMCODE":
      return {
        ...state,
        roomCode: action.payload,
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
    case "UPDATE_TEAM1":
      return {
        ...state,
        team1: action.payload,
      };
    case "UPDATE_TEAM2":
      return {
        ...state,
        team2: action.payload,
      };
    case "SET_ROOM_OWNER":
      return {
        ...state,
        roomOwner: action.payload,
      };
    case "UPDATE_DECK":
      return {
        ...state,
        deck: action.payload,
      };
    case "UPDATE_DISCARD":
      return {
        ...state,
        discard: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_STATE":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
