import { Component } from "@angular/core";
// mediante    <router-outlet></router-outlet> carga inicialmente Homecomponent
// muestra el menu de navegacion nav el cual mediante  <router-outlet></router-outlet>
// cargara de acuerdo al componente seleccionado su vista correspondiente
// nav esta dentro de la carpeta components y muestra mediante    <a routerLink
// las distintas vistas mapeadas en app.routing
//
@Component({
  selector: "cf-root",
  template: `
    <cf-nav></cf-nav>
    <router-outlet></router-outlet>
    <cf-footer></cf-footer>  
  `,
  styles: []
})
export class AppComponent {}
