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
    case "UPDATE_TEAM1_USERS":
      return {
        ...state,
        team1: {
          ...state.team1,
          users: action.payload,
        },
      };
    case "UPDATE_TEAM2_USERS":
      return {
        ...state,
        team2: {
          ...state.team2,
          users: action.payload,
        },
      };
    case "SET_TEAM_INDEX":
      return {
        ...state,
        teamIndex: action.payload,
      };
    case "SET_ROOM_OWNER":
      return {
        ...state,
        roomOwner: action.payload,
      };
    case "SET_CLUE_GIVER":
      return {
        ...state,
        clueGiver: action.payload,
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
