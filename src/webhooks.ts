import * as models from "./models/index.js";

/** How far, in seconds, the NR-Webhook-Timestamp header may be from the receiver's clock. */
export const DEFAULT_TOLERANCE_SECONDS = 300;

/** Why a webhook delivery was refused. */
export type WebhookErrorCode =
  | "missing_header"
  | "duplicate_header"
  | "invalid_timestamp"
  | "unknown_key"
  | "invalid_signature"
  | "invalid_payload";

/** Thrown by constructEvent: answer the delivery with a 400 and do not process it. */
export class WebhookVerificationError extends Error {
  override name = "WebhookVerificationError";
  readonly code: WebhookErrorCode;

  constructor(code: WebhookErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

/** Fetch Headers, Node's IncomingHttpHeaders, a plain object or [name, value] entries; names match in any letter case. */
export type HeaderInput =
  | Headers
  | Iterable<readonly [string, string]>
  | Readonly<Record<string, string | string[] | undefined>>;

/** Each key id, sent in NR-Webhook-Key-Id, mapped to its secret; hold two during a rotation. */
export type WebhookSecrets = Readonly<Record<string, string>>;

export type ConstructEventOptions = {
  /** Replaces DEFAULT_TOLERANCE_SECONDS. */
  toleranceSeconds?: number;
  /** The receiver's clock in Unix seconds; defaults to now. */
  now?: number;
};

function fail(code: WebhookErrorCode, message: string): never {
  throw new WebhookVerificationError(code, message);
}

/**
 * Verifies a webhook delivery and parses its body.
 *
 * `payload` is the raw request body exactly as received: re-encoding parsed JSON breaks the signature.
 * A header repeated in any letter case, or sent as a comma-joined list, is refused.
 */
export async function constructEvent(
  payload: Uint8Array | string,
  headers: HeaderInput,
  secrets: WebhookSecrets,
  options: ConstructEventOptions = {},
): Promise<models.WebhookEvent> {
  const tolerance = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
  const now = options.now ?? Math.floor(Date.now() / 1000);

  const header = headerReader(headers);
  const id = header("NR-Webhook-Id");
  const timestamp = header("NR-Webhook-Timestamp");
  const keyId = header("NR-Webhook-Key-Id");
  const signature = header("NR-Webhook-Signature");

  if (!/^[0-9]{1,12}$/.test(timestamp)) {
    fail(
      "invalid_timestamp",
      "NR-Webhook-Timestamp is not a Unix time in seconds",
    );
  }
  if (Math.abs(now - Number(timestamp)) > tolerance) {
    fail("invalid_timestamp", "NR-Webhook-Timestamp is outside the tolerance");
  }
  if (!Object.prototype.hasOwnProperty.call(secrets, keyId)) {
    fail(
      "unknown_key",
      "NR-Webhook-Key-Id names a key this receiver does not hold",
    );
  }
  const secret = secrets[keyId];
  if (!secret) {
    fail("invalid_signature", "the webhook secret is empty");
  }

  const prefix = "v1=";
  const received = signature.startsWith(prefix)
    ? decodeSignature(signature.slice(prefix.length))
    : undefined;
  if (!received) {
    fail("invalid_signature", "NR-Webhook-Signature is malformed");
  }

  const subtle = globalThis?.crypto?.subtle;
  if (!subtle) {
    throw new Error(
      "Verifying webhooks needs WebCrypto (globalThis.crypto.subtle)",
    );
  }
  const encoder = new TextEncoder();
  const substitute = (text: string) =>
    text.replaceAll("{timestamp}", timestamp).replaceAll("{id}", id);
  const body = typeof payload === "string" ? encoder.encode(payload) : payload;
  const signed = concatBytes(
    encoder.encode(substitute("{timestamp}.")),
    body,
  );
  const key = await subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  if (!(await subtle.verify("HMAC", key, received, signed))) {
    fail("invalid_signature", "NR-Webhook-Signature does not match");
  }

  const text = new TextDecoder().decode(body);
  let envelope: unknown;
  try {
    envelope = JSON.parse(text);
  } catch {
    fail("invalid_payload", "the body is not JSON");
  }
  if (
    typeof envelope !== "object"
    || envelope === null
    || Array.isArray(envelope)
    || (envelope as Record<string, unknown>)["id"] !== id
  ) {
    fail("invalid_payload", "the body's id does not equal NR-Webhook-Id");
  }
  const event = models.webhookEventFromJSON(text);
  if (!event.ok) {
    fail("invalid_payload", "the body is not a known webhook event");
  }
  return event.value;
}

function headerReader(headers: HeaderInput): (name: string) => string {
  const entries: ReadonlyArray<
    readonly [string, string | string[] | undefined]
  > = Symbol.iterator in headers
    ? [...(headers as Iterable<readonly [string, string]>)]
    : Object.entries(headers);
  return (name) => {
    const wanted = name.toLowerCase();
    const [value, ...rest] = entries
      .filter(([key]) => key.toLowerCase() === wanted)
      .flatMap(([, values]) => values ?? []);
    if (rest.length > 0 || value?.includes(",")) {
      fail("duplicate_header", `${name} is repeated`);
    }
    if (!value) {
      fail("missing_header", `${name} is missing`);
    }
    return value;
  };
}

function decodeSignature(text: string): Uint8Array<ArrayBuffer> | undefined {
  if (!/^(?:[0-9a-fA-F]{2})*$/.test(text)) {
    return undefined;
  }
  return Uint8Array.from(text.match(/../g) ?? [], (byte) => parseInt(byte, 16));
}

function concatBytes(...parts: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(
    parts.reduce((length, part) => length + part.length, 0),
  );
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
