import { ClientSDK } from "../lib/sdks.js";
import { Assessments } from "./assessments.js";
import { Keys } from "./keys.js";

export class NoResponse extends ClientSDK {
  private _assessments?: Assessments;
  get assessments(): Assessments {
    return (this._assessments ??= new Assessments(this._options));
  }

  private _keys?: Keys;
  get keys(): Keys {
    return (this._keys ??= new Keys(this._options));
  }
}
