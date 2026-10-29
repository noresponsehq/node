import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Account, Account$inboundSchema } from "./account.js";
import {
  AssessmentRevision,
  AssessmentRevision$inboundSchema,
} from "./assessment-revision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  IdentifierMatch,
  IdentifierMatch$inboundSchema,
} from "./identifier-match.js";

export const WaitingFor = {
  Outcome: "outcome",
  Review: "review",
} as const;
export type WaitingFor = OpenEnum<typeof WaitingFor>;

export type AccountDirectoryPageItem = {
  /**
   * Present for needs_action searches. outcome means a current review/block decision lacks a retained effective outcome; review means a retained open or in-progress review. Both can apply.
   */
  waitingFor?: Array<WaitingFor> | undefined;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * Retrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply.
   */
  latest: AssessmentRevision;
  /**
   * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
   */
  current?: Account | undefined;
  /**
   * Count of admitted retained assessments belonging to this account, not just the returned page.
   */
  assessments: number;
  /**
   * Why this result matched a typed identifier search. value is the original value submitted in assessment_id. Provenance records a customer submission, not a source discovery or verified ownership. Equality is deterministic and has no inferred confidence score. An account result names its newest retained matching assessment, which can differ from latest.
   */
  matchedIdentifier?: IdentifierMatch | undefined;
};

/** @internal */
export const WaitingFor$inboundSchema: z.ZodMiniType<WaitingFor, unknown> =
  openEnums.inboundSchema(WaitingFor);

/** @internal */
export const AccountDirectoryPageItem$inboundSchema: z.ZodMiniType<
  AccountDirectoryPageItem,
  unknown
> = z.pipe(
  z.object({
    waiting_for: types.optional(z.array(WaitingFor$inboundSchema)),
    account_id: types.string(),
    latest: AssessmentRevision$inboundSchema,
    current: types.optional(Account$inboundSchema),
    assessments: types.number(),
    matched_identifier: types.optional(IdentifierMatch$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "waiting_for": "waitingFor",
      "account_id": "accountId",
      "matched_identifier": "matchedIdentifier",
    });
  }),
);

export function accountDirectoryPageItemFromJSON(
  jsonString: string,
): SafeParseResult<AccountDirectoryPageItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDirectoryPageItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDirectoryPageItem' from JSON`,
  );
}
