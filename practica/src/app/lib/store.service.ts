import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

// usando la tecnologia observable creamos este servicio para
// comunicar componentes entre si que no tengan una relacion de dependencia este servicio emitira datos
/**
 Se basa en utilizar la librería RxJs para emitir cambios 
 en el estado de un modelo; y que otro servicio 
 pueda subscribirse para ser notificado de dichos cambios.
 */
/*
El emisor es   el componente CredentialsComponent que envía
 las credenciales al servidor y recibe el token.
  El subscriptor será el servicio de interceptación TokenInterceptorService 
  que usará dicho token para identificar al usuario actual
   en todas las llamadas al servidor. 
   Y en el medio está el StoreService que actúa de enlace entre ambos. 
Este es el código necesario en el fichero store.service.ts:
 */
@Injectable()
// servicio que maneja el store
export class StoreService {
  // el estado para comunicar datos sera este
  // almacena en el estado en este caso en memoria al token
  //?para acceder a el usaremos A LOS emisores Subject
  private state = {
    userToken: "",
    // flag usuario anonimo o registrado
    userIsAnonymous: true,
    // mensaje a mostrar al usuario
    userMessage: "ningun mensaje todabia"
  };
  //! accederemos al estado mediante estas tres propiedades emisoras de estados
  private userToken$ = new Subject<string>();
  private userIsAnonymous$ = new BehaviorSubject<boolean>(
    //! podemos darle un valor origen que notificara
    //! enviara el estado original o si muto el mutado
    this.state.userIsAnonymous
  );
  private userMessage$ = new Subject<string>();

  constructor() {}
  // ! 5.AL SUBJECT PUEDO USARLO COMO SOLO LECTURA PARA PUBLICARLO:
  // ! asi estara disponible para ser consumido por un componente
  // ! la parte observable de este subject
  //! se suscribio a el token-interceptor.service.ts
  //! con lo cual este recibe los cambios de estado
  //? permite leer el token por todo el que este subscripto
  public getUserToken$(): Observable<string> {
    console.log("se inicio store notifica token!!!!!!!!!!!!!!!!!!!!!!!!");
    return this.userToken$.asObservable();
  }
  public getUserIsAnonymous$(): Observable<boolean> {
    return this.userIsAnonymous$.asObservable();
  }
  //! Emite los cambios recibe el token DE USUARIO desde CredentialsComponent
  // ? permite emitir el token  a todo el que este subscripto

  //! estos metodos en ngrx son reductores que tienen por encima acciones
  //! la accion llama al reductor y este clona el estado y lo emite a quien este subscripto
  //! con select en lugar de getUserToken$() select usertoken etc
  public emitUserToken(userToken: string) {
    if (userToken) {
      //!3 almacena un nuevo  estado
      this.state.userToken = userToken;
      this.state.userIsAnonymous = false;
    } else {
      this.state.userToken = "";
      this.state.userIsAnonymous = true;
    }
    // ! 4.avisamos emitimos una señal avisamos del estado del usertoken
    // ! token-interceptor esta subscripto mediante getUserIsAnonymous$()
    // ! al estado del token
    this.userToken$.next(this.state.userToken);
    //? cualquier suscriptor recibira lo que este dentro del next
    this.userIsAnonymous$.next(this.state.userIsAnonymous);
  }
  // permite leer el mensaje
  public getUserMessage$(): Observable<string> {
    return this.userMessage$.asObservable();
  }
  // permite emitir el mensaje a todo el que este subscripto
  public emitUserMessage(userMessage: string) {
    console.log("Mensaje al usuario:" + userMessage);

    this.state.userMessage = userMessage;
    this.userMessage$.next(this.state.userMessage);
  }
}
