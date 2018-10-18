import { Injectable } from "@angular/core";
//! los interceptores son para llamadas HTTP
//! como token-interceptor es responsable de enviar la cabecera de la llamada es el
// ! primero que actua
//! credential emite el token store lo recibe como token- interceptor
// ! esta subscripto a sus cambios lo envi en cada cabecera de una nueva peticion
//! catch-interceptor cualquier peticion sin token redirige a pagina de login
//! dependencia comun storeService en lib.module se definen los interceptores
//! el modulo lib.module conoce a components.module sin acoplar usando observables
//! clonando la peticion actual para que angular detecte el cambio y lo pases al siguiente manejador

//! con el creamos un comando de actualizacion de la peticion 37 minutos
//! operations minuto 41
// INICIA LA peticion ENVIANDO TOKEN VACIO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// SERVIDOR RESPONDE 401
// CATCH INTERCEPTOR REDIRIGE A LOGIN
// USUARIO POST EMAIL+PASS
// la respuesta que recibe CREDENTIAL COMPONENT es un token que ENVIA  A store.service
// este lo almacena y notifica a token-interceptor.service
//  el cual para cada nueva peticion lo coloca en la cabecerA
// y las nuevas peticiones estaran autorizadas
//! al arrancarlo este recibe los cambios de estado
//! por medio de getUserToken$() del servicio sotore.service
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StoreService } from "./store.service";
/** Modificara a la peticion en curso la cabecera
 * el TokenInterceptorService se encargará de
 *  enviar al  token actual en todas las llamadas.
 * Para ello implementa la interfaz HttpInterceptor en
 * su método intercept() con la lógica suficiente para enviar
 * el token en una
 *  cabecera acordada con el API modificara a la cabecera
 * En este caso uso la estándar Authorization.
 */
//! TokenInterceptorService modifica la cabecera de la peticionse suscribe a cambios en el -->StoreService cuando este emite cambios--> TokenInterceptorService GUARDA EL token en memoria
//! TokenInterceptorService  GUARDA EL token en memoria
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  // TokenInterceptorService interceptor en la primer llamada envia un
  // token vacio
  // servidor responde 401
  // catch-interceptor detecta al 401 y envia al usuario a login
  //  usuario ingresa datos en  credentials.component se hace
  // post del email+password
  // la respuesta recibida del servidor sera un token entonces
  //credentials.component
  // lo envia a StoreService  mediante this.store.emitUserToken(responseData.token);
  // StoreService comunica el cambio this.userToken$.next(this.state.userToken)
  //y lo almacena en el estado
  // TokenInterceptorService se suscribio a estos cambios     this.store.getUserToken$().subscribe(this.setToken.bind(this));
  // TokenInterceptorService modifica la cabecera de la peticion
  private token: string = "";

  constructor(private store: StoreService) {
    //? suscribirse a los cambios en el token
    this.subscribeToTokenChanges();
  }
  /**
   consumimos al Observable emitido por store.service.ts
   en el servicio interceptor
    token-interceptor.service.ts. 
    Para ello me suscribo a los cambios
    emitidos desde el store.service.ts y guardo el
     token que me envíen para su uso posterior.
   */
  //! TODA PETICION SALIENTE SERA MODIFICADA CON EL VALOR ACTUAL DEL TOKEN
  //! EL STORE CONOCE ESE VALOR POR MEDIO DE CREDENTIAL
  private subscribeToTokenChanges() {
    console.log(
      "1.se inicio token-interceptor para configurar cabecera http!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    // !8 se suscribio a los cambios emitidos por el  store.service
    //! como lo emite como un observable nos suscribimos a el solo el sucses
    this.store.getUserToken$().subscribe(this.setToken.bind(this));
  }
  // actualizamos el token de acuerdo al estado de store.service
  private setToken(token) {
    console.log(
      "3. token-interceptor guarda en memoria al token!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    this.token = token;
  }
  public intercept(
    //! manejar la request en uso clonandola
    req: HttpRequest<any>,
    // next es el manejador de la peticion
    // cualquier interceptor debe manejar la req clonada si no no se hace
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizationReq = this.setAuthHeader(req);
    // proxima peticion sera manejada con nuevo authorizedReq por el interceptor
    // next es el siguiente manejador de la peticion http lo unico que puede recibir es
    // una peticion que ahora manipulamos creando una nueva handledRequest
    //!2.EL INTERCEPTOR MANEJARA A LA PETICION CLONADA
    // ! Y LA PASARA AL SIGUIENTE MANEJADOR
    const handledRequest = next.handle(authorizationReq);
    return handledRequest;
  }
  //! toda peticion en curso sera modificada va a pasar por aca se le colocara el valor actual del token
  //! asi creamos una nueva peticion clonada que sera la que se envia
  //! 1.MODIFICANDO LA PETICION ACTUAL en curso
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authToken = `Bearer ${this.token}`;
    // a la peticion actual asignar en su cabecera en Authorization
    // a authToken
    const headers = req.headers.set("Authorization", authToken);
    //! si no le damos a angular un objeto nuevo continua el puntero al  original
    const authorizedReq = req.clone({ headers });
    /**
     * En Angular promueven el uso de funciones y datos
     * inmutables de ahí
     *  que nos obliguen a clonar las cabeceras para modificarlas.
     */
    console.log("Desde token-interceptor.service authorizedReq:" + req);
    return authorizedReq;
  }
  private guardarLocalStore() {
    if (window.localStorage) {
      localStorage.setItem("token", this.token);

      this.token = localStorage.getItem("token");

      localStorage.removeItem("token");
    } else {
      throw new Error("Tu Browser no soporta LocalStorage!");
    }
  }
}
