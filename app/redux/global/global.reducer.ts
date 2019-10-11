//import { Global } from "./../../app/tools/global/state/models/global.model";
import {
	globalInitialState,
	Global
} from "./StateObject/global.model";
import * as Kaebo from "./global.action";
//import { Reducer } from "@ngrx/store/@ngrx/store";
//import { Action, ActionReducerMap } from "@ngrx/store";
// funcion pura  que muta el estado a uno nuevo nuevo clon
// depenen solo de sus argumentos
export function globalStoreReducer(
	state: Global = globalInitialState,
	action: Kaebo.AppActions
): Global {
	switch (action.type) {
		case Kaebo.Set_UserToken:
			return { ...state, userToken: action.payload };
		case Kaebo.Show_UserMessage:
			return { ...state, userMessage: action.payload };
		default:
			return state;
	}
}

/*export function globalStoreReducer1(
	state = globalInitialState,
	action: ActionPayload
): Global {
	switch (action.type) {
		case GlobalActions.SetUserToken:
			return {
				...state,
				userToken: (<ActionPayload>action).payload
			};
		case GlobalActions.ShowUserMessage:
			return {
				...state,
				userMessage: (<ActionPayload>action).payload
			};
		default:
			return state;
	}
}*/
