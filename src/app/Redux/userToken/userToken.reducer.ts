import * as userTokenAction from "./userToken.actions";

export function userTokenReducer(
  state: string = "vacio",
  action: userTokenAction.SetuserTokenAction
) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case userTokenAction.SET_userToken: {
      return action.userToken;
    }
    default: {
      return state;
    }
  }
}
