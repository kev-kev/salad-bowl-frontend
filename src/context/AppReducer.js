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
    // case "ADD_USER_TO_TEAM":
    //   console.log(action.payload);
    //   if (action.payload.teamIndex === 0) {
    //     return {
    //       ...state,
    //       team1: [...state.team1, action.payload.username],
    //     };
    //   } else if (action.payload.teamIndex === 1) {
    //     return {
    //       ...state,
    //       team2: [...state.team2, action.payload.username],
    //     };
    //   }
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
