import * as AnonymousAction from "./Anonymous.actions";

export function AnonymousReducer(
  state: boolean = true,
  action: AnonymousAction.SetAnonymousAction
) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case AnonymousAction.SET_Anonymous: {
      return action.Anonymous;
    }
    default: {
      return state;
    }
  }
}
