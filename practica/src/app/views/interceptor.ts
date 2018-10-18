import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

export class LogInterceptor implements HttpInterceptor {
  iintercept(
    // le llega una peticion req en curso
    req: HttpRequest<any>,
    // y el  puntero al siguiente handler
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // los argumentos de pipe deben ser operadores de rxjs
    // el mas sencillo es tap antes conocido como do
    // lo que hace es ejecutar algo ante cada evento
    // tap es como un subscriber a un observable
    // tendra una funcion para caso se succses otra error y otra CUANDO TERMINEEL OBSERVABLE

    return next
      .handle(req)
      .pipe(tap<HttpEvent<any>>(event => console.log(event)));
  }
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    // siempre poner return next.handle(req) para que continue
    return next.handle(req).pipe(
      // la funcion pipe puede recibir n operadores
      // que se ejecutaran durante el flujo de ese observable
      // tap ejecuta la funcion en caso de exito
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      })
    );
  }
}

