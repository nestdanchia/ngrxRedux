import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "@environments/environment";
// BUSCA EN NODE_MODULES A RXJS
import { Observable } from "rxjs";

@Injectable()
export class CredentialsService {
	private url = environment.apiUrl + "pub/credentials/";
	constructor(private http: HttpClient) {}
	// este metodo retorna un observable
	public sendCredential(
		credential,
		service: string
	): Observable<any> {
		const credentialsUrl = this.url + service.toLowerCase();
		// enviamos al objeto credential va json y lo serializa el frame y lo envia
		return this.http.post(credentialsUrl, credential);
	}
}
