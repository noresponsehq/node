import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ProfileLead, ProfileLead$inboundSchema } from "./profile-lead.js";
import {
  ProfileStatement,
  ProfileStatement$inboundSchema,
} from "./profile-statement.js";
import {
  WrittenProfileErrorCode,
  WrittenProfileErrorCode$inboundSchema,
} from "./written-profile-error-code.js";
import {
  WrittenProfileStatus,
  WrittenProfileStatus$inboundSchema,
} from "./written-profile-status.js";

export type WrittenProfile = {
  /**
   * queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.
   */
  status: WrittenProfileStatus;
  /**
   * The investigation whose evidence the profile is written from.
   */
  investigationId: string;
  /**
   * Present only when status is failed. no_writer: no profile writer serves this environment. refused: the model refused. not_written: the answer was not a profile, or no statement survived grounding. uncited_statement: a statement or lead cited a record the person does not hold. not_answered: the writer did not answer. worker_attempts_exhausted: the worker stopped retrying.
   */
  errorCode?: WrittenProfileErrorCode | undefined;
  queuedAt: string;
  finishedAt: string | null;
  /**
   * Present when written: a few plain sentences with the most useful picture first.
   */
  summary?: string | undefined;
  /**
   * Each fact or inference with its certainty and the evidence it cites. Statements that cited evidence the writer was not sent are dropped before storage.
   */
  statements: Array<ProfileStatement>;
  /**
   * Values worth searching next, each held by a linked record.
   */
  leads: Array<ProfileLead>;
};

/** @internal */
export const WrittenProfile$inboundSchema: z.ZodMiniType<
  WrittenProfile,
  unknown
> = z.pipe(
  z.object({
    status: WrittenProfileStatus$inboundSchema,
    investigation_id: types.string(),
    error_code: types.optional(WrittenProfileErrorCode$inboundSchema),
    queued_at: types.string(),
    finished_at: types.nullable(types.string()),
    summary: types.optional(types.string()),
    statements: z.array(ProfileStatement$inboundSchema),
    leads: z.array(ProfileLead$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "investigation_id": "investigationId",
      "error_code": "errorCode",
      "queued_at": "queuedAt",
      "finished_at": "finishedAt",
    });
  }),
);

export function writtenProfileFromJSON(
  jsonString: string,
): SafeParseResult<WrittenProfile, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WrittenProfile$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WrittenProfile' from JSON`,
  );
}
