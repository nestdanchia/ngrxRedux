import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../Redux/app.state";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
//import { StoreService } from "./store.service";
import { SetuserMessageAction } from "../Redux/userMessage/userMessage.actions";

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started;

  constructor(private router: Router, private store: Store<AppState>) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const successCallback = this.interceptResponse.bind(this);
    const errorCallback = this.catchError.bind(this);
    const interceptionOperator = tap<HttpEvent<any>>(
      successCallback,
      errorCallback
    );
    this.started = Date.now();
    const actionMessage = new SetuserMessageAction("Hola");
    this.store.dispatch(actionMessage);
    //this.store.emitUserMessage("");
    const handledRequest = next.handle(req);
    return handledRequest.pipe(interceptionOperator);
  }

  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.debug(`Request for ${event.url} took ${elapsed_ms} ms.`);
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
      const actionMessageError = new SetuserMessageAction(err.message);
      this.store.dispatch(actionMessageError);
      //this.store.emitUserMessage(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } else {
      console.warn(err.statusText);
      const actionMessageText = new SetuserMessageAction(err.statusText);
      this.store.dispatch(actionMessageText);
      //this.store.emitUserMessage(err.statusText);
    }
  }

  private catchUnauthorized() {
    console.log("Not authorized");
    const actionMessageNot = new SetuserMessageAction("Not authorized");
    this.store.dispatch(actionMessageNot);
    //this.store.emitUserMessage("Not authorized");
    this.navigateToLogin();
  }
  private navigateToLogin() {
    ///credentials/login se carga con su modulo en forma lazy
    this.router.navigateByUrl("/credentials/login");
  }
}
