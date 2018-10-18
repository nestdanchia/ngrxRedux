import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from "./nav/nav.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TitleComponent } from "./nav/title.component";
import { UserLoginComponent } from "./nav/user-login.component";
import { UserMessageComponent } from "./nav/user-message.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    FooterComponent,
    NavComponent,
    TitleComponent,
    UserLoginComponent,
    UserMessageComponent
  ],
  exports: [FooterComponent, NavComponent]
})
export class ComponentsModule {}
