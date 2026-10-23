import { ClientSDK } from "../lib/sdks.js";
import { Accounts } from "./accounts.js";
import { Assessments } from "./assessments.js";
import { Integrations } from "./integrations.js";
import { Keys } from "./keys.js";
import { WebhookEndpoints } from "./webhook-endpoints.js";

export class NoResponse extends ClientSDK {
  private _assessments?: Assessments;
  get assessments(): Assessments {
    return (this._assessments ??= new Assessments(this._options));
  }

  private _accounts?: Accounts;
  get accounts(): Accounts {
    return (this._accounts ??= new Accounts(this._options));
  }

  private _keys?: Keys;
  get keys(): Keys {
    return (this._keys ??= new Keys(this._options));
  }

  private _integrations?: Integrations;
  get integrations(): Integrations {
    return (this._integrations ??= new Integrations(this._options));
  }

  private _webhookEndpoints?: WebhookEndpoints;
  get webhookEndpoints(): WebhookEndpoints {
    return (this._webhookEndpoints ??= new WebhookEndpoints(this._options));
  }
}
