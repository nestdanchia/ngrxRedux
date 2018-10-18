import { Action } from "@ngrx/store";

export const SET_userToken = "[SET] userToken";

export class SetuserTokenAction implements Action {
  readonly type = SET_userToken;

  constructor(public userToken: string) {}
}
