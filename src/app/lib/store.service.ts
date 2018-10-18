/**import { Injectable } from "@angular/core";
import { Observable ,  BehaviorSubject ,  Subject } from "rxjs";

@Injectable()
export class StoreService {
  private state = {
    userToken: "",
    userIsAnonymous: true,
    userMessage: ""
  };

  private userToken$ = new Subject<string>();
  private userIsAnonymous$ = new BehaviorSubject<boolean>(
    this.state.userIsAnonymous
  );
  private userMessage$ = new Subject<string>();

  constructor() {}
  // para que otros componentes accedan al estado
  // lo USAMOS como obserbable
  public getUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }
  // para que otros componentes accedan al estado
  public getUserIsAnonymous$(): Observable<boolean> {
    return this.userIsAnonymous$.asObservable();
  }
  public emitUserToken(userToken: string) {
    if (userToken) {
      this.state.userToken = userToken;
      this.state.userIsAnonymous = false;
    } else {
      this.state.userToken = "";
      this.state.userIsAnonymous = true;
    }
    // como subject notifica al  cambio de estado
    // cualquiera subscripto mediante getUserToken$()
    // podra recibir esos cambios esta subscripto token-interceptor
    this.userToken$.next(this.state.userToken);
    this.userIsAnonymous$.next(this.state.userIsAnonymous);
  }
  public getUserMessage$(): Observable<string> {
    return this.userMessage$.asObservable();
  }
  public emitUserMessage(userMessage: string) {
    this.state.userMessage = userMessage;
    this.userMessage$.next(this.state.userMessage);
  }
}
*/
