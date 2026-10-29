import { validateWebhook } from "../funcs/validate-webhook.js";
import { ClientSDK } from "../lib/sdks.js";
import * as models from "../models/index.js";
import { unwrapAsync } from "../types/fp.js";
import { WebhookSecrets } from "../webhooks.js";
import { Accounts } from "./accounts.js";
import { Assessments } from "./assessments.js";
import { Audit } from "./audit.js";
import { Erasures } from "./erasures.js";
import { Evaluations } from "./evaluations.js";
import { Exports } from "./exports.js";
import { Integrations } from "./integrations.js";
import { Invites } from "./invites.js";
import { KeyUsage } from "./key-usage.js";
import { Keys } from "./keys.js";
import { Lists } from "./lists.js";
import { Members } from "./members.js";
import { Operations } from "./operations.js";
import { Requests } from "./requests.js";
import { Reviews } from "./reviews.js";
import { Settings } from "./settings.js";
import { Usage } from "./usage.js";
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

  private _members?: Members;
  get members(): Members {
    return (this._members ??= new Members(this._options));
  }

  private _audit?: Audit;
  get audit(): Audit {
    return (this._audit ??= new Audit(this._options));
  }

  private _usage?: Usage;
  get usage(): Usage {
    return (this._usage ??= new Usage(this._options));
  }

  private _invites?: Invites;
  get invites(): Invites {
    return (this._invites ??= new Invites(this._options));
  }

  private _settings?: Settings;
  get settings(): Settings {
    return (this._settings ??= new Settings(this._options));
  }

  private _requests?: Requests;
  get requests(): Requests {
    return (this._requests ??= new Requests(this._options));
  }

  private _lists?: Lists;
  get lists(): Lists {
    return (this._lists ??= new Lists(this._options));
  }

  private _reviews?: Reviews;
  get reviews(): Reviews {
    return (this._reviews ??= new Reviews(this._options));
  }

  private _erasures?: Erasures;
  get erasures(): Erasures {
    return (this._erasures ??= new Erasures(this._options));
  }

  private _exports?: Exports;
  get exports(): Exports {
    return (this._exports ??= new Exports(this._options));
  }

  private _evaluations?: Evaluations;
  get evaluations(): Evaluations {
    return (this._evaluations ??= new Evaluations(this._options));
  }

  private _operations?: Operations;
  get operations(): Operations {
    return (this._operations ??= new Operations(this._options));
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
