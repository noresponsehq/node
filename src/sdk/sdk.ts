import { validateWebhook } from "../funcs/validate-webhook.js";
import { ClientSDK } from "../lib/sdks.js";
import * as models from "../models/index.js";
import { unwrapAsync } from "../types/fp.js";
import { WebhookSecrets } from "../webhooks.js";
import { Accounts } from "./accounts.js";
import { Assessments } from "./assessments.js";
import { Integrations } from "./integrations.js";
import { KeyUsage } from "./key-usage.js";
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

  private _keyUsage?: KeyUsage;
  get keyUsage(): KeyUsage {
    return (this._keyUsage ??= new KeyUsage(this._options));
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

  async validateWebhook({
    request,
    secret,
  }: {
    request: {
      body: string;
      headers: Record<string, string> | Headers;
      url: string;
      method: string;
    } | Request;
    secret: WebhookSecrets;
  }): Promise<models.WebhookEvent> {
    return unwrapAsync(validateWebhook(
      this,
      { request, secret },
    ));
  }
}
