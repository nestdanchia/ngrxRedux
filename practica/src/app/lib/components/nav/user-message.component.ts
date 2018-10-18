import { Component, OnInit, OnDestroy } from "@angular/core";
import { StoreService } from "../../store.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { map } from "rxjs/operators";
//! minuto 48
@Component({
  selector: "cf-user-message",
  template: `
    {{ userMessage$ | async |uppercase}}
    {{userMessage}}
  `,
  styles: []
})
export class UserMessageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public userMessage$: Observable<string>;
  public userMessage: String;
  private subscription: Subscription;
  constructor(private store: StoreService) {}

  ngOnInit() {
    //! dos formas usamos ngondestroy para evitar que se instancien varias veces
    this.subscription = this.store
      .getUserMessage$()
      .subscribe(data => (this.userMessage = data));
    //! al usar async no tengo necesidad de subscribirme a el
    //! podemos usarlo tambien asi porque el observable  no viene de una peticion http
    this.userMessage$ = this.store.getUserMessage$();
    //.pipe(map(data => data + "------------ok-----"));
  }
}
