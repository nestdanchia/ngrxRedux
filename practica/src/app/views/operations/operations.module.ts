import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// 1. usario requiere operaciones
// 2.  produce llamada HTTP al Servidor con Token vacio
// 3. el Token vacio esta configurado asi en la cabecera de la peticion
// por medio de
// 4. interceptor token-interceptor.service   se produce  error
// 5. 401 Resuelve el error el interceptor catch-interceptor.service
// 6. redirigiendo al usuario  a  la ruta /credentials/login
// 7. credential.component dispone por defecto del path login y puede redireccionar
// 8. al path registration por lo cual Este componente credential.component
// 9. sirve para a).registrar o b).identificar usuarios
// 10.Cambiara su comportamiento según el valor "data" de la ruta
// 11.REUTILizamos asi UN MiSMO COMPONENTE PARA DOS RUTAS DISTINTAS
// 12. Si Nos autenticamos  si las credenciales fueron aceptadas  el servidor nos envia un Token
// 13. credential.component notifica del nuevo estado del Token a store.service
// 14. este lo almacena en memoria y notifica a token-interceptor.service quien esta subscripto  al cambio de Token
// 15. token-interceptor.service actualiza el valor de su propiedad token
// 16. modificara la cabecera de la peticion HTTP saliente con el valor actualizado del token
// 17.catch-interceptor.service responde ahora por consola mostrando datos

import { OperationsRoutingModule } from "./operations.routing";
import { OperationsComponent } from "./operations.component";
import { NewComponent } from "./new.component";
import { ListComponent } from "./list.component";
import { ItemComponent } from "./item.component";
import { OperationsService } from "./operations.service";

@NgModule({
  imports: [CommonModule, FormsModule, OperationsRoutingModule],
  declarations: [
    OperationsComponent,
    NewComponent,
    ListComponent,
    ItemComponent
  ],
  providers: [OperationsService]
})
export class OperationsModule {}
