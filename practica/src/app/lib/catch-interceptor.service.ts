import { Injectable } from "@angular/core";
//! se subscribe a todas las peticiones
//! es el primero en interactuar con el usuario  recibe el codigo de no autorizado
//! lo reenvia a /credentials/login
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { StoreService } from "./store.service";

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started;

  constructor(private router: Router, private store: StoreService) {}

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
    this.store.emitUserMessage("");
    const handledRequest = next.handle(req);
    // es un observable con pipe nos suscribimos a el
    // pipe puede recibir cuando va bien va mal o termina
    // mas sencillo tap ejecuta algo ante cada evento
    return handledRequest.pipe(interceptionOperator);
  }
  // intercepcion de la respuesta
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
      this.store.emitUserMessage(err.message);
    }
  }
  /**
   *
   * !  Cuando me llegue un código 401 Unauthorized querrá decir que el servidor no acepta las actuales credenciales del usuario.
   */
  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      console.log("se inicio catch-interceptor!!!!!!!!!!!!!!!!!!!!!!!!");
      this.catchUnauthorized();
    } else {
      console.warn(err.statusText);
      this.store.emitUserMessage(err.statusText);
    }
  }

  private catchUnauthorized() {
    console.log("Not authorized");
    this.store.emitUserMessage("Not authorized");
    this.navigateToLogin();
  }
  private navigateToLogin() {
    //? redirigir a login esta dentro de carpeta view define 2 rutas Lazzy
    // ?que dispone de datos propios de acuerdo a la ruta
    //! en app.routing se definio el modulo a cargar para las dos lazzy
    // llevar al usuario a una página para que pueda registrarse o volver
    //a identificarse en el sistema.
    // /credentials/login ruta se carga en credential
    this.router.navigateByUrl("/credentials/login");
  }
}
