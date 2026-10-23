import { keyUsageRecord } from "../funcs/key-usage-record.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class KeyUsage extends ClientSDK {
  /**
   * Report requests made with API keys your signup gate issued.
   *
   * @remarks
   * Records requests made with API keys your signup gate issued to your accounts, one event per request: the key's SHA-256 (the issued_credential.sha256 the account's assessment carried), the client IP, the time and optionally the user agent, model and token counts. Most callers use the SDK's usage buffer, which batches events and sends them in the background. Sampling is allowed: sample_rate weights an event's request and token counts. Requires the assess scope. Idempotency-Key is required and handled as on POST /v1/assessments: a retry with the same key and body answers the same record with Idempotent-Replayed: true and counts nothing again; a different body answers 409. A batch holds 1 to 500 events and at most 256 KiB. No raw event is kept: usage is aggregated per key, and IPs, user agents and models are kept only as keyed digests, with the IP's country, for 24 hours. When one key is used from 20 or more IP addresses, or 3 or more countries, within 24 hours, every account whose assessment carried that key gets the shared_api_key reason for 30 days.
   */
  async record(
    request: operations.RecordKeyUsageRequest,
    options?: RequestOptions,
  ): Promise<operations.RecordKeyUsageResponse> {
    return unwrapAsync(keyUsageRecord(
      this,
      request,
      options,
    ));
  }
}
