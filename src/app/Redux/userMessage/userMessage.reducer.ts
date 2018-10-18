import * as userMessageAction from "./userMessage.actions";

export function userMessageReducer(
  state: string = "No hay mensajes",
  action: userMessageAction.SetuserMessageAction
) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case userMessageAction.SET_userMessage: {
      return action.userMessage;
    }
    default: {
      return state;
    }
  }
}
