import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FailureReason,
  FailureReason$inboundSchema,
} from "./failure-reason.js";
import { Freshness, Freshness$inboundSchema } from "./freshness.js";
import {
  IdentifierKind,
  IdentifierKind$inboundSchema,
} from "./identifier-kind.js";
import {
  PhoneEnrichment,
  PhoneEnrichment$inboundSchema,
} from "./phone-enrichment.js";
import {
  SignalOutcome,
  SignalOutcome$inboundSchema,
} from "./signal-outcome.js";

export type Signal = {
  /**
   * Signal kind, for example account_presence or breach_exposure. New kinds may appear; ignore any you do not know.
   */
  type: string;
  /**
   * Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.
   */
  identifier: IdentifierKind;
  /**
   * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
   */
  outcome: SignalOutcome;
  /**
   * Opaque, tenant-scoped projection of the source that produced a signal. It stays stable for your tenant while the projection key is unchanged and reveals no upstream provider, feed, breach table or source record.
   */
  sourceId: string;
  /**
   * Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.
   */
  reason?: FailureReason | undefined;
  /**
   * Opaque pointer to evidence NoResponse holds for this signal. It carries no breach value, credential or page body.
   */
  evidenceRef?: string | undefined;
  /**
   * When the evidence was first observed.
   */
  observedAt?: string | undefined;
  /**
   * When the source was last queried for this identifier.
   */
  lastCheckedAt?: string | undefined;
  /**
   * Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.
   */
  freshness: Freshness;
  /**
   * Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.
   */
  enrichment?: PhoneEnrichment | undefined;
};

/** @internal */
export const Signal$inboundSchema: z.ZodMiniType<Signal, unknown> = z.pipe(
  z.object({
    type: types.string(),
    identifier: IdentifierKind$inboundSchema,
    outcome: SignalOutcome$inboundSchema,
    source_id: types.string(),
    reason: types.optional(FailureReason$inboundSchema),
    evidence_ref: types.optional(types.string()),
    observed_at: types.optional(types.string()),
    last_checked_at: types.optional(types.string()),
    freshness: Freshness$inboundSchema,
    enrichment: types.optional(PhoneEnrichment$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "source_id": "sourceId",
      "evidence_ref": "evidenceRef",
      "observed_at": "observedAt",
      "last_checked_at": "lastCheckedAt",
    });
  }),
);

export function signalFromJSON(
  jsonString: string,
): SafeParseResult<Signal, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Signal$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Signal' from JSON`,
  );
}
