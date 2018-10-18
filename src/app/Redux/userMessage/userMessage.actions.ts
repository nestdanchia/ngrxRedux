import { Action } from "@ngrx/store";

export const SET_userMessage = "[SET] userMessage";

export class SetuserMessageAction implements Action {
  readonly type = SET_userMessage;

  constructor(public userMessage: string) {}
}
