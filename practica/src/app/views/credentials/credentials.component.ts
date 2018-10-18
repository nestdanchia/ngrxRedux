import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "./credentials.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../lib/store.service";
//1 error 401 lo detecta
//  catch-interceptor detecta error 401  mediante navigateToLogin()
//{ this.router.navigateByUrl("/credentials/login");} envia al modulo de credential a login
// corresponde a la ruta de credential.routing lazzy por defecto carga credenciales
// no validas para que su componente use
//! El emisor será el componente CredentialsComponent que envía las
//! credenciales al servidor y recibe el token.El subscriptor será el
//! servicio de interceptación TokenInterceptorService que usará dicho
//!  token para identificar al usuario actual en todas las llamadas al
//!servidor.Y en el medio está el storeService que actúa de enlace entre
//! ambos.Este es el código necesario en el fichero bus.service.ts:
//! dos rutas posibles credentials/login credentials/
//? credential component emite el token store.service lo recibe y
//token-interceptor.service
// ? modifica la cabecera de la peticion saliente
//? sin conocerse mutuamente

//!C se comunican entre si sin conocerse token-interceptor credential.component
// y store.service
//! credential.component comunica a store.service el token este emite una señal
//! avisando de que el string cambio
//! TokenInterceptorService modifica la cabecera de la peticion
//!se porque se suscribio a
//! cambios en el -->StoreService cuando este emite cambios-->
//! TokenInterceptorService GUARDA EL token en memoria
/**
 *? Al renderizarse recibe mediante la ruta datos para mostrarse 
 como una ruta de
 *? login o una ruta de registracion
 *? comunicamos  este componente de las credenciales con el interceptor
 *  TokenInterceptorService, que se encargará de
 * enviar dicho token en todas las llamadas TokenInterceptorService
 *  se suscribio
 * a los cambios
 * sin acoplarlos he
 *  decidido usar un servicio intermedio: el storeService.
 */
/**
 * Este componente sirve para registrar o identificar usuarios.
 *  Cambia su comportamiento
 * según el valor de this.pageData que viene determinado
 * desde el enrutador credentials.routing.ts
 */
// !pregunto al usuario los datos de identificación estándar:
//! email y password.
// !se envían al servidor para que registre un usuario
//! nuevo o valide a uno existente según el caso
@Component({
  selector: "cf-login",
  template: `
  <h2>{{pageData.title}}</h2>
  <form class="container">
    <label for="email">Email</label>
    <input name="email"
      [(ngModel)]="pageData.credential.email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      [(ngModel)]="pageData.credential.password"
      type="password"/>
    <button (click)="sendCredential()">{{ pageData.title }}</button>
    <a [routerLink]="['..',pageData.alternate | lowercase]">{{ pageData.alternate }}</a>
  </form>
  <i>{{ errorMessage }}</i>
  `,
  styles: []
})
/**
 * El almacenamiento recomendado del token en los navegadores es el localStorage
 * en este tutorial se almacena en memoria
 */
export class CredentialsComponent implements OnInit {
  //? podemos obtener los datos de la ruta que vienen con su foto
  public pageData: any;
  public errorMessage = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
    private router: Router,
    private store: StoreService
  ) {
    console.log("se inicio credentials.component!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  /*
  **al iniciar carga los datos que vienen con la ruta de forma no visible
  asi podemos usar estos datos entre comonentes sin relacion entre ellos
  Asi podemos obtener datos que vienen de la ruta
  */
  public ngOnInit() {
    this.obtainPageDataFromRoute();
  }
  //podemos obtener los datos de la ruta que vienen con su foto en forma no visible
  // datos internos de la ruta porqu eel ruter puede cambiar en forma interna sus datos
  private obtainPageDataFromRoute() {
    //! guardamos llos datos de la ruta en page.data
    console.log("se inicio credential!!!!!!!!!!!!!!!!!!!!!!!!");
    this.pageData = this.activatedRoute.snapshot.data;
  }
  public sendCredential() {
    //!Envio de credenciales por http a traves de un servicio
    this.errorMessage = "";
    const credential = this.pageData.credential;
    const service = this.pageData.title;

    /**las credenciales se envian por http a travez del servicio
     *? public sendCredential(credential, service: string): Observable<any> {
       puede ser login o registro segun el valor de service
    const credentialsUrl = this.url + service.toLowerCase();
    return this.http.post(credentialsUrl, credential);
  }
     */
    //! Envia las credenciales al  SERVIDOR!!!!! ESTE SI NOS AUTENTICAMOS
    //! NOS DEVUELVE UN TOKEN lo envia a
    //!  STORE SERVICE  este LO ALMACENA EN MEMORIA y emite el cambio
    //! COMO TOKEN INTERCEPTOR ESTA SUBSCRIPTO AL CAMBIO DE TOKEN
    //! SERA EL ENCARGADO DE ENVIARLO luego para  CADA PETICION y actualizar su propio valor
    // ! Hacemos un post en credential service y nos suscribimos a su respuesta
    this.credentialsService.sendCredential(credential, service).subscribe(
      // ! 1.Acepta credenciales  servidor genera token de seguridad
      //! vino el token lo ENVIAMOS COMO UN PARAMETRO
      this.acceptedCredentials.bind(this),
      //! No acepta credenciales no vino el token de seguridad
      this.invalidCredentials.bind(this)
    );
  }
  // comunica al store el nuevo token las credenciales fueron aceptadas
  private acceptedCredentials(responseData) {
    if (responseData && responseData.token) {
      // ?Si se aceptan las credenciales el servidor nos devolverá un objeto con el token de la sesión para el usuario
      // ! 2.trabajamos con la propiedad token mediante store.service
      //console.log("credential comunica al store el token!!!!!!!!!!!!!!!!!!!!!!!!");
      this.store.emitUserToken(responseData.token);
      this.store.emitUserMessage("token enviado al store");
      this.router.navigateByUrl("/");
      console.log("Token:" + responseData.token);
    } else {
      this.invalidCredentials();
    }
  }
  private invalidCredentials() {
    this.store.emitUserToken(null);
    this.errorMessage = "Invalid Credentials";
  }
}
