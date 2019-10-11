import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ShowUserMessage } from "@tools/global/state/global-store.actions";
import { Global } from "@tools/global/state/models/global.model";
import { Store } from "@ngrx/store";
// se susbcribe a todas las peticiones maneja el error
@Injectable()
export class CatchInterceptorService
	implements HttpInterceptor {
	private started;

	constructor(
		private router: Router,
		private store: Store<Global>
	) {}

	public intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// el operador tap ejecutara ante cada evento
		// esta entubado en la respuesta para caso de exito o de error
		const interceptionOperator = tap<HttpEvent<any>>(
			this.logResponse,
			this.catchError
		);
		this.started = Date.now();
		this.store.dispatch(
			new ShowUserMessage("CatchInterceptorService")
		);
		// obtenemos un observable
		const handledRequest = next.handle(req);
		// operamos sobre el observable que esta circulando
		// con el operador pipe
		return handledRequest.pipe(interceptionOperator);
	}

	private logResponse = (event: HttpEvent<any>) => {
		if (event instanceof HttpResponse) {
			//Duracion de las llamadas
			const elapsed_ms = Date.now() - this.started;
			console.log(
				`Request for ${event.url} took ${elapsed_ms} ms.`
			);
			this.store.dispatch(
				new ShowUserMessage(
					"CatchInterceptorService OK!!!!!!!!"
				)
			);
		}
	};

	private catchError = err => {
		if (err instanceof HttpErrorResponse) {
			this.catchHttpError(err);
		} else {
			console.error(err.message);
			this.store.dispatch(new ShowUserMessage(err.message));
		}
	};

	private catchHttpError(err: HttpErrorResponse) {
		if (err.status === 401) {
			this.catchUnauthorized();
		} else {
			console.warn(err.statusText);
			this.store.dispatch(new ShowUserMessage(err.statusText));
		}
	}

	private catchUnauthorized() {
		console.log("Not authorized");
		this.store.dispatch(
			new ShowUserMessage(
				"CatchInterceptorService Not authorized"
			)
		);
		this.navigateToLogin();
	}
	private navigateToLogin() {
		this.router.navigateByUrl("/credentials/login");
	}
}
