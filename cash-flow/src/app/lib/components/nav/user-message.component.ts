import { Component, OnInit } from "@angular/core";
import { StoreService } from "../../store.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "cf-user-message",
  template: `
    {{ userMessage$ | async }}
  `,
  styles: []
})
export class UserMessageComponent implements OnInit {
  public userMessage$: Observable<string>;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.userMessage$ = this.store.getUserMessage$();
  }
}
