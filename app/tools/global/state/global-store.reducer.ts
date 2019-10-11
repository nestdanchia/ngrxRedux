import {
	Global,
	globalInitialState
} from "@tools/global/state/models/global.model";
import {
	GlobalActions,
	ActionPayload,
	ActionsUnion
} from "@tools/global/state/global-store.actions";

export function globalStoreReducer(
	state: Global = globalInitialState,
	action: ActionsUnion
): Global {
	switch (action.type) {
		case GlobalActions.SetUserToken:
			return { ...state, userToken: action.payload };
		case GlobalActions.ShowUserMessage:
			return { ...state, userMessage: action.payload };
		default:
			return state;
	}
}
