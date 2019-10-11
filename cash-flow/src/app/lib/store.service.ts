import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

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

  public getUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }
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
