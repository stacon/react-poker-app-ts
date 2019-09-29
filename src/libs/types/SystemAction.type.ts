import { Action } from "redux";

class SystemAction {
  constructor(
    public payload: Action,
    public type = 'TO_SERVER',
  ) {
    this.payload = payload;
  }
}

export default SystemAction;