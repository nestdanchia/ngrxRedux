import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../Redux/app.state";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
//import { StoreService } from "./store.service";
// credential emite el token que recibio el store lo recibe
// el servicio hace de hab no se conocen credential ni token-interceptor
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = "";
  //private store: StoreService)
  constructor(private store: Store<AppState>) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    this.store.select("userToken").subscribe(this.setToken.bind(this));
    //this.store.getUserToken$().subscribe(this.setToken.bind(this));
  }
  // guaramos el token
  private setToken(token) {
    this.token = token;
  }
  // usamos al token
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modificara a las peticiones para que tengan el valor actual del token
    const authorizationReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizationReq);
    return handledRequest;
  }
  // modifica la cabecera de la peticion en CURSO
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authToken = `Bearer ${this.token}`;
    const headers = req.headers.set("Authorization", authToken);
    const authorizedReq = req.clone({ headers });
    return authorizedReq;
  }
}
