import { Action } from "@ngrx/store";
// enumerado de  acciones con domieo de la accion
// son las ctes
//export enum GlobalActions {
export const Show_UserMessage = "[Global] ShowUserMessage";
export const Set_UserToken = "[Global] SetUserToken";
//}
//https://github.com/ngrx
/*export interface ActionPayload extends Action {
	// el tipo esta determinado a partir de un enumerado de acciones potenciales
	// definidas por el enumerado con verbos en un espacio de nombres este tiene el nombre
	// del almacen
	readonly type: GlobalActions;
	readonly payload: string;
}*/
// patron action creator crear clases que se encarguen de las acciones
// clase que conocera la cte a agregar
// asi la clase construira la estructura adecuada de la acion cuando
// la enviemos acciones de tipo type ShowUserMessage y SetUserToken
export class ShowUserMessage implements Action {
	// tipo describe lo que la accion va a hacer
	public readonly type = Show_UserMessage;
	// argumento del tipo de accion payload datos para cambiar el estado
	constructor(public payload: string) {}
}
//let a=new ShowUserMessage('hola');

export class SetUserToken implements Action {
	public readonly type = Set_UserToken;
	constructor(public payload: string) {}
}
export type AppActions = ShowUserMessage | SetUserToken;
//export type Actions = ShowUserMessage | SetUserToken;
