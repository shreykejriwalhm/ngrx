import * as Auth from "./auth.actions";

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: Auth.AuthActions) {
  switch (action.type) {
    case Auth.SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case Auth.SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
