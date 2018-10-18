import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { userTokenReducer } from "./userToken/userToken.reducer";
import { AnonymousReducer } from "./Anonymous/Anonymous.reducer";
import { userMessageReducer } from "./userMessage/userMessage.reducer";
export const Reducer: ActionReducerMap<AppState> = {
  userToken: userTokenReducer,
  userIsAnonymous: AnonymousReducer,

  userMessage: userMessageReducer
};
