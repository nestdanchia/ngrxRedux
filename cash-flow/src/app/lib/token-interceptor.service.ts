import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StoreService } from "./store.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = "";

  constructor(private store: StoreService) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    this.store.getUserToken$().subscribe(this.setToken.bind(this));
  }
  private setToken(token) {
    this.token = token;
  }
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizationReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizationReq);
    return handledRequest;
  }
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authToken = `Bearer ${this.token}`;
    const headers = req.headers.set("Authorization", authToken);
    const authorizedReq = req.clone({ headers });
    return authorizedReq;
  }
}
