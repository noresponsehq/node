import { NoResponseCore } from "../core.js";
import * as models from "../models/index.js";
import { ERR, OK, Result } from "../types/fp.js";
import {
  constructEvent,
  WebhookSecrets,
  WebhookVerificationError,
} from "../webhooks.js";

export async function validateWebhook(
  _client: NoResponseCore,
  {
    request: rawRequest,
    secret,
  }: {
    request: {
      body: BodyInit;
      method: string;
      url: string;
      headers: Record<string, string> | Headers;
    } | Request;
    secret: WebhookSecrets;
  },
): Promise<Result<models.WebhookEvent, WebhookVerificationError>> {
  const request = normalizeRequest(rawRequest);
  try {
    return OK(
      await constructEvent(
        new Uint8Array(await request.arrayBuffer()),
        request.headers,
        secret,
      ),
    );
  } catch (e) {
    if (e instanceof WebhookVerificationError) {
      return ERR(e);
    }
    throw e;
  }
}

function normalizeRequest(
  request: {
    body: BodyInit;
    method: string;
    url: string;
    headers: Record<string, string> | Headers;
  } | Request,
): Request {
  if (request instanceof Request) {
    return request;
  }
  return new Request(request.url, request);
}
