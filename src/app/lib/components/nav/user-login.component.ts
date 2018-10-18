import { Component, OnInit } from "@angular/core";
//import { StoreService } from "../../store.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../../Redux/app.state";
@Component({
  selector: "cf-user-login",
  template: `
  <a *ngIf="userIsAnonymous; else logged" routerLink="/credentials/login">Log In</a>
  <ng-template #logged><i>Hello!!!</i></ng-template>
  `,
  styles: []
})
export class UserLoginComponent implements OnInit {
  public userIsAnonymous;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select("userIsAnonymous").subscribe(resp => {
      this.userIsAnonymous = resp;
    });
  }
}
