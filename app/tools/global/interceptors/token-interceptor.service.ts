import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Global } from "@tools/global/state/models/global.model";
// modifica las peticiones salientes modificando su cabecera
// con el valor actual del token para cada peticion
@Injectable()
export class TokenInterceptorService
	implements HttpInterceptor {
	private token = "";

	constructor(private store: Store<Global>) {
		this.subscribeToTokenChanges();
	}
	// credential.component emitio al token
	private subscribeToTokenChanges() {
		this.store
			.select("userToken")
			.subscribe((token: string) => {
				this.token = token;
				console.log("token+" + this.token);
			});
	}

	/**private setToken = (token: string) => {
		this.token = token;
		console.log(this.token);
	};*/
	// implementa al metodo intercept que retorna un observable
	// de un evento http
	public intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const authorizedReq = this.setAuthHeader(req);
		// maneja a la siguiente peticion para mantener el flujo
		const handledRequest = next.handle(authorizedReq);
		return handledRequest;
	}
	private setAuthHeader(
		req: HttpRequest<any>
	): HttpRequest<any> {
		const authToken = `Bearer ${this.token}`;
		const headers = req.headers.set("Authorization", authToken);
		const authorizedReq = req.clone({ headers });
		return authorizedReq;
	}
}
