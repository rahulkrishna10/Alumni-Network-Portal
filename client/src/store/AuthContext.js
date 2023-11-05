import { createContext } from "react";

const initialState = {
  isAuthenticated: false,
  userState: {},
  login() {},
  logout() {},
  dispatch: () => {},
};

export const AuthContext = createContext(initialState);
