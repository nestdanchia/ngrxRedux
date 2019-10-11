import { Action } from "@ngrx/store";
// enumerado de  acciones con domieo de la accion
// son las ctes
export enum GlobalActions {
	ShowUserMessage = "[Global] ShowUserMessage",
	SetUserToken = "[Global] SetUserToken"
}
//https://github.com/ngrx
export interface ActionPayload extends Action {
	// el tipo esta determinado a partir de un enumerado de acciones potenciales
	// definidas por el enumerado con verbos en un espacio de nombres este tiene el nombre
	// del almacen
	readonly type: GlobalActions;
	readonly payload: string;
}
// patron action creator crear clases que se encarguen de las acciones
// clase que conocera la cte a agregar
// asi la clase construira la estructura adecuada de la acion cuando
// la enviemos acciones de tipo type ShowUserMessage y SetUserToken
export class ShowUserMessage implements ActionPayload {
	// tipo describe lo que la accion va a hacer
	public readonly type = GlobalActions.ShowUserMessage;
	// argumento del tipo de accion payload datos para cambiar el estado
	constructor(public payload: string) {}
}
//let a=new ShowUserMessage('hola');

export class SetUserToken implements ActionPayload {
	public readonly type = GlobalActions.SetUserToken;
	constructor(public readonly payload: string) {}
}

export type ActionsUnion = ShowUserMessage | SetUserToken;
