import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { LoginComponent } from "./login.component";
// import { RegistrationComponent } from "./registration.component";
import { CredentialsModule } from "./credentials.module";
import { CredentialsComponent } from "./credentials.component";
//! catch-interceptor detecta 401 redirije a la ruta del modulo de credential login
//! El emisor será el componente CredentialsComponent que envía las
//! credenciales al servidormediante boton de envio  y recibe el token
//el cual lo envia al store .El subscriptor a los cambios será el
//! servicio de interceptación TokenInterceptorService que usará dicho
//!  token para identificar al usuario actual en todas las llamadas al
//!servidor.Y en el medio está el storeService que actúa de enlace entre
//! ambos.Este es el código necesario en el fichero bus.service.ts:
//! dos rutas posibles credentials/login credentials/
//? DoS FORMAS DE REUTILAR UN MiSMO COMPONENTE PARA DOS RUTAS DISTINTAS
//? podemos pasar datos distintos segun sea la ruta
//! B
/**
 * ? CredentialsComponent muestra por defecto Login y permite redireccionar
 * ?de acuerdo al path a Registration
 * ? recibe datos internos distintos  de acuerdo al path
 * ? CredentialsComponent se comunica con  CredentialsService para  realizar
 * ? la peticion post
 * ? CredentialsComponent Envia 2 parametros el servicio CredentialsService  (Login o Registration) y
 * ? las credenciales
 * ? CredentialsComponent se suscribe al observable generado por la peticion post
 * ? Si el servidor acepto las  credenciales habra  emitido un token
 * ? CredentialsComponent  comunica el token recibido a
 * ? StoreService este mediante la tecnologia
 * ? rxjs permite comunicar los cambios en el estado de la aplicacion a
 * ? cualquier componente
 * ? que se suscriba a esos cambios
 * ? TokenInterceptorService se suscribe a los cambios emitidos por StoreService
 * ? guardando en su propiedad token el token recibido
 * ? y lo usa para que toda peticion saliente pueda modificarse la cabecera de la peticion
 * ? refrescando al valor actual del token
 * ? TokenInterceptorService implementa la interfaz HttpInterceptor en
 * ? su método intercept() tiene  la lógica suficiente para enviar el token actual
 * ? en todas las llamadas  y conoce el estado actual mediante su metodo subscribeToTokenChanges()
 */
const routes: Routes = [
  {
    path: "login",
    component: CredentialsComponent,
    data: {
      alternate: "Registration",
      credential: { email: "nd@gmail.com", password: "1234" },
      title: "LogIn"
    }
  },
  {
    path: "registration",
    component: CredentialsComponent,
    data: {
      alternate: "LogIn",
      credential: { email: "", password: "" },
      title: "Registration"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsRoutingModule {}
