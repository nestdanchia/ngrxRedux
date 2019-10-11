import { Global } from "./StateObject/global.model";
import { ActionReducerMap } from "@ngrx/store";
import { globalStoreReducer } from "./global.reducer";
export const AppReducer = {
	userToken: globalStoreReducer,
	userMessage: globalStoreReducer
};
