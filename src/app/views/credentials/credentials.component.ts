import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "./credentials.service";
import { ActivatedRoute, Router } from "@angular/router";
//import { StoreService } from "../../lib/store.service";
import { Store } from "@ngrx/store";

import { AppState } from "../../Redux/app.state";
import { SetuserTokenAction } from "../../Redux/userToken/userToken.actions";
import { SetAnonymousAction } from "../../Redux/Anonymous/Anonymous.actions";
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
export class CredentialsComponent implements OnInit {
  public pageData: any;
  public errorMessage = "";
  //private store: StoreService
  constructor(
    private activatedRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    this.obtainPageDataFromRoute();
  }
  private obtainPageDataFromRoute() {
    // lo obtiene como datos internos
    this.pageData = this.activatedRoute.snapshot.data;
  }
  public sendCredential() {
    this.errorMessage = "";
    // la credendial puede estar vacia para registro o completa para login
    const credential = this.pageData.credential;
    const service = this.pageData.title;
    // enviamos las credendiales mediante el servicio credendial.service
    this.credentialsService
      .sendCredential(credential, service)
      .subscribe(
        this.acceptedCredentials.bind(this),
        this.invalidCredentials.bind(this)
      );
  }
  // si las credenciales son correctas nos envian un token de seguridad
  private acceptedCredentials(responseData) {
    if (responseData && responseData.token) {
      // el store emitira el token paar todo aquel que este subscripto
      const action = new SetuserTokenAction(responseData.token);
      this.store.dispatch(action);
      const actionAnonimo = new SetAnonymousAction(false);
      this.store.dispatch(actionAnonimo);
      //this.store.emitUserToken(responseData.token);
      this.router.navigateByUrl("/operations");
    } else {
      this.invalidCredentials();
    }
  }
  private invalidCredentials() {
    const action = new SetuserTokenAction(null);
    this.store.dispatch(action);
    // this.store.emitUserToken(null);
    this.errorMessage = "Invalid Credentials";
  }
}
