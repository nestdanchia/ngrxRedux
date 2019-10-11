import { Global } from "./StateObject/global.model";
//import { GlobalActions } from './../../app/tools/global/state/global-store.actions';
//import { globalStoreReducer } from "@tools/global/state/global-store.reducer";
//import { globalStoreReducer } from "@tools/global/state/global-store.reducer";
//import { globalInitialState } from "./StateObject/global.model";
//import { Global } from "./StateObject/global.model";
import { globalStoreReducer } from "./global.reducer";
import {
	//	GlobalActions,
	//	ActionPayload,
	ShowUserMessage
} from "./global.action";
import {
	Action,
	ActionsSubject,
	Store
	//createStore
} from "@ngrx/store";

// el store incorpora los reducer y tiene estado
//https://github.com/Escuelait/redux-angular
class Storerx<Global> {
	private state;
	constructor(
		private store: Store<Global> //private reducer: globalStoreReducer<Global>, //	private initialState: Global
	) {
		this.send();
		//this.state = initialState;
	}
	private send() {
		this.store.subscribe(() => {
			console.log(
				"subscribe" + this.store.select("userMessage!!!!!!")
			);
		});
		this.store.dispatch(new ShowUserMessage("hola "));
	}
}
// ejecuta al reducer y lo guarda en el estado
/*public dispatch(action: ActionPayload): void {
		// la funcion reductora nos devuelve un nuevo estado
		// o el mismo
		// llamamos a la funcion reductora pasandole el estado actual
		this.state = this.reducer(this.state, action);
	}
}
let store: Store<Global> = createStore<Global>(
	globalStoreReducer
);
let action = new ShowUserMessage("hola ");
// despachamos acciones con argumentos que procesara el reducer
// el estado es de solo lectura para cambiar al estado enviar una accion
// cada accion es descriptible
store.subscribe(() => {
	console.log("subscribe", store.getState());
});
store.dispatch(action);
*/
