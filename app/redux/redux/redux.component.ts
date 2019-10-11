import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Global } from "../global/StateObject/global.model";
import { AppReducer } from "../global/combina.reducer";
import { ShowUserMessage } from "../global/global.action";
import { Observable } from "rxjs";
// Global define al arbol de estado
@Component({
	selector: "ab-reduxComponent",
	templateUrl: "./redux.component.html",
	styleUrls: ["./reduxComponent.component.scss"]
})
export class ReduxComponent {
	public usertoken: String;
	public userMessage$: Observable<string>;
	public userMessage: String;
	// no teenmos que esperar un ngonInit()

	constructor(private store: Store<Global>) {
		// nos suscribimos a los cambios seleccionados en una parte del store
		this.store.select("userToken").subscribe(userTokenState => {
			this.usertoken = userTokenState;
			console.log("initStateToken", userTokenState);
		});
		this.store
			.select("userMessage")
			.subscribe(userMessageState => {
				this.userMessage = userMessageState;
				console.log("initStateMessage", this.userMessage);
			});
	}
	showUserMessage() {
		// enviamos las acciones
		const action = new ShowUserMessage("hola");
		this.store.dispatch(action);
	}
}
