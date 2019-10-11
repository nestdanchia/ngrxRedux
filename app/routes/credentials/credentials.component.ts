import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CredentialsService } from "@routes/credentials/credentials.service";
import { GlobalStore } from "@tools/global/state/global-store.state";
import {
	ShowUserMessage,
	SetUserToken
} from "@tools/global/state/global-store.actions";
import { Store, select } from "@ngrx/store";
import { Global } from "@tools/global/state/models/global.model";
import { Observable } from "../../../../node_modules/rxjs";

@Component({
	selector: "ab-login",
	template: `
 <div>Current Token: {{ token$ | async }}</div>
  <ab-widget-header mode="h1" caption="{{pageData.title}}" value="Wellcome"></ab-widget-header>
  <ab-credentials-form [pageData]="pageData" (submitCredentials)="submitCredentials($event)" ><ab-credentials-form>
  `,
	providers: [CredentialsService],
	styles: []
})
export class CredentialsComponent implements OnInit {
	public pageData: any;
	token$: Observable<string>;
	constructor(
		private activatedRoute: ActivatedRoute,
		private credentialsService: CredentialsService,
		private router: Router,
		private store: Store<Global>
	) {}

	public ngOnInit() {
		this.obtainPageDataFromRoute();
		this.token$ = this.store.select("stateApp.userToken");
	}
	//datos vienen con la ruta lo uamos para comunicarnos entre componentes
	// al cambiar de url se activa el mismo componente para el caso login o registration

	private obtainPageDataFromRoute() {
		this.pageData = this.activatedRoute.snapshot.data;
	}
	public submitCredentials(credentials) {
		this.store.dispatch(
			new ShowUserMessage(
				"CredentialsComponent Validating credentials..."
			)
		);
		// service puede venir  login o registration
		// credencial es el form.value
		const service = this.pageData.title;
		// enviamos las credenciales con el servicio
		this.credentialsService
			.sendCredential(credentials, service)
			.subscribe(
				responseData => this.acceptedCredentials(responseData),
				error => this.invalidCredentials(error)
			);
		// si no nos subscribimos la llamada no se produce
	}
	// credenciales aceptadas enviamos la accion el reducer setea al token
	private acceptedCredentials(responseData) {
		//this.store.emitUserToken(responseData.token)
		this.store.dispatch(new SetUserToken(responseData.token));

		this.store.dispatch(
			new ShowUserMessage(
				"CredentialsComponent Wellcome!!!!!!!"
			)
		);
		this.router.navigateByUrl("/");
	}
	private invalidCredentials(error) {
		//this.store.emitUserToken(null)
		this.store.dispatch(new SetUserToken(""));
		this.store.dispatch(
			new ShowUserMessage(
				"CredentialsComponent Bad Credentials"
			)
		);
	}
}
