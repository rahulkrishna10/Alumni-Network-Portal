const initialState = {
  isAuthenticated: false,
  userState: {},
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        userState: action.payload,
      };
    case "AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
        userState: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
