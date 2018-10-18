import { Action } from "@ngrx/store";

export const SET_Anonymous = "[SET] Anonymous";

export class SetAnonymousAction implements Action {
  readonly type = SET_Anonymous;

  constructor(public Anonymous: boolean) {}
}
