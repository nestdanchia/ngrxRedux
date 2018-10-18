import { Component, OnInit } from "@angular/core";
//import { StoreService } from "../../store.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../../Redux/app.state";
@Component({
  selector: "cf-user-message",
  template: `
    {{ userMessage }}
  `,
  styles: []
})
export class UserMessageComponent implements OnInit {
  public userMessage;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select("userMessage").subscribe(resp => {
      this.userMessage = resp;
    });
    //this.userMessage$ = this.store.getUserMessage$();
  }
}
