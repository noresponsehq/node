import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The identifiers an assessment was sent: each member of the request's identifiers object exactly as received, before the server normalised it (the email domain keeps its case, the name its Unicode form). A member the request did not send is absent. NoResponse keeps them encrypted under the workspace's own key, does not index or log them, and deletes them with the assessment: on DELETE of the assessment or its account, at its expires_at, and with the workspace.
 */
export type SentIdentifiers = {
  /**
   * identifiers.email as the request sent it.
   */
  email?: string | undefined;
  /**
   * identifiers.username as the request sent it.
   */
  username?: string | undefined;
  /**
   * identifiers.phone as the request sent it.
   */
  phone?: string | undefined;
  /**
   * identifiers.name as the request sent it, before NFC normalisation.
   */
  name?: string | undefined;
  /**
   * identifiers.ip as the request sent it.
   */
  ip?: string | undefined;
};

/** @internal */
export const SentIdentifiers$inboundSchema: z.ZodMiniType<
  SentIdentifiers,
  unknown
> = z.object({
  email: types.optional(types.string()),
  username: types.optional(types.string()),
  phone: types.optional(types.string()),
  name: types.optional(types.string()),
  ip: types.optional(types.string()),
});
/** @internal */
export type SentIdentifiers$Outbound = {
  email?: string | undefined;
  username?: string | undefined;
  phone?: string | undefined;
  name?: string | undefined;
  ip?: string | undefined;
};

/** @internal */
export const SentIdentifiers$outboundSchema: z.ZodMiniType<
  SentIdentifiers$Outbound,
  SentIdentifiers
> = z.object({
  email: z.optional(z.string()),
  username: z.optional(z.string()),
  phone: z.optional(z.string()),
  name: z.optional(z.string()),
  ip: z.optional(z.string()),
});

export function sentIdentifiersToJSON(
  sentIdentifiers: SentIdentifiers,
): string {
  return JSON.stringify(SentIdentifiers$outboundSchema.parse(sentIdentifiers));
}
export function sentIdentifiersFromJSON(
  jsonString: string,
): SafeParseResult<SentIdentifiers, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SentIdentifiers$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SentIdentifiers' from JSON`,
  );
}
