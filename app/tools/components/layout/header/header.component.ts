import { Component, OnInit } from "@angular/core";
//import { GlobalStore } from "@tools/global/state/global-store.state";
//import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Global } from "../../../../redux/global/StateObject/global.model";
import { ShowUserMessage } from "../../../../redux/global/global.action";
import { Observable } from "../../../../../../node_modules/rxjs";

@Component({
	selector: "ab-header",
	template: `
    <header class="container">
      <a class="button button-clear" routerLink="">Kakebo</a>
      <a class="button button-clear" routerLink="about">About</a>
      <a *ngIf="isAnonymous;else welcome" class="button button-clear" routerLink="credentials/login">Login</a>
      <ng-template #welcome>Hello</ng-template>
      <span [ngClass]="['float-right']">1.{{ message }}</span>

    </header>

  `,
	styles: []
})
export class HeaderComponent implements OnInit {
	public isAnonymous = true;
	public message: string;
	toke$: Observable<string>;
	constructor(private store: Store<Global>) {}

	ngOnInit() {
		this.store
			.select("	stateApp.userToken")
			.subscribe(
				(res: string) => (this.isAnonymous = res === "")
			);
		this.toke$ = this.store.select(state => state.userToken);

		const action = new ShowUserMessage(
			"Desde Header dice  hola"
		);
		this.store.dispatch(action);
		this.store
			.select("	stateApp.userMessage")
			.subscribe((resp: string) => (this.message = resp));
		console.log("hola" + this.message);
	}
}
