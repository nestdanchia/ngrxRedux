import { CatchInterceptorService } from "./catch-interceptor.service";
import { ComponentsModule } from "./components/components.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { StoreService } from "./store.service";
import { TokenInterceptorService } from "./token-interceptor.service";
//!catch-interceptor detecta 401 redirecciona la la ruta del modulo credential
//! El emisor será el componente CredentialsComponent que envía las
//! credenciales al servidor y recibe el token lo envia al store
//.El subscriptor al cambio en el
//store será el
//! servicio de interceptación TokenInterceptorService que usará dicho
//!  token para identificar al usuario actual en todas las llamadas al
//!servidor.Y en el medio está el storeService que actúa de enlace entre
//! ambos.Este es el código necesario en el fichero bus.service.ts:
//! dos rutas posibles credentials/login credentials/
//? lib.module conoce a lo  interceptores
//?estos tanto detectaran errores como TAMBIEN van a redirigir a la pagina
//?de login cuando los errores sean de un tipo
//? cuando token este disponible enviarlo en cada peticion
//!A
//! TokenInterceptorService este recibe los cambios de estado
//! por medio de getUserToken$() del servicio sotore.service
//! TokenInterceptorService se suscribe a los cambios que emite store.service
//! lib.module exporta a ComponentsModule por lo cual conoce a FooterComponent, NavComponent

@NgModule({
  imports: [ComponentsModule, HttpClientModule],
  exports: [ComponentsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    },
    StoreService
  ]
})
export class LibModule {}
