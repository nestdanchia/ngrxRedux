import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { HomeModule } from "./views/home/home.module";
import { NgModule } from "@angular/core";
import { NotFoundModule } from "./views/not-found/not-found.module";
import { LibModule } from "./lib/lib.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { Reducer } from "./Redux/app.reducer";
//https://alligator.io/angular/angular-6/
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HomeModule,
    LibModule,
    NotFoundModule,
    StoreModule.forRoot(Reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
      //logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
