import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { HomeModule } from "./views/home/home.module";
import { NgModule } from "@angular/core";
import { NotFoundModule } from "./views/not-found/not-found.module";
import { LibModule } from "./lib/lib.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HomeModule,
    LibModule,
    NotFoundModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
