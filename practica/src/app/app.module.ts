import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { HomeModule } from "./views/home/home.module";
import { NgModule } from "@angular/core";
import { NotFoundModule } from "./views/not-found/not-found.module";
import { LibModule } from "./lib/lib.module";
//npm i -g @angular/cli@latest
//ng new cash-flow -p cf --minimal true --routing true
//ng g m lib/components
//ng g c lib/components/nav
//ng g c lib/components/footer --export
//ng g c lib/components/nav/title --flat
//
/**
 * dentro de lib common shared tools van los componentes de infraestructura
 visible dentro del módulo que lo declara, pero no lo és 
 fuera de él (no lleva --export). Usando el atributo
  --flat además le pides no cree una carpeta específica.

  en wiews los del negocio pages o rutas tambien llamados
 */
// modulo funcional muestra contenido pagina principal
/**
 ng g m views/home
ng g c views/home/home --export --flat
 */

//! https://compodoc.github.io/website/guides/tutorial.html 
// npm run doc:buildandserve
//! credencial generada por el servidor llamada token
//! Con esto el servidor será capaz de autentificar las llamadas
//y responder adecuadamente.
// 1.se inicia operacion 2.se inicia token-interceptor
// 3. se inicia store notifica token
// 4. token-interceptor envia token nulo en la peticion
//5. catch-interceptor detecta 401 envia a modulo credential
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
