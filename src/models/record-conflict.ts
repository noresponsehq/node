import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  RecordConflictSignal,
  RecordConflictSignal$inboundSchema,
} from "./record-conflict-signal.js";

export const Between = {
  Email: "email",
  Phone: "phone",
} as const;
export type Between = OpenEnum<typeof Between>;

/**
 * Two identifiers you gave that lead to records of different people.
 */
export type RecordConflict = {
  /**
   * anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.
   */
  signal: RecordConflictSignal;
  /**
   * The kind of value that clashes: person_name or born.
   */
  kind: string;
  /**
   * The two identifiers you gave whose records disagree.
   */
  between: Array<Between>;
  /**
   * The ids of the two records that clash, in the order of between.
   */
  records: Array<string>;
};

/** @internal */
export const Between$inboundSchema: z.ZodMiniType<Between, unknown> = openEnums
  .inboundSchema(Between);

/** @internal */
export const RecordConflict$inboundSchema: z.ZodMiniType<
  RecordConflict,
  unknown
> = z.object({
  signal: RecordConflictSignal$inboundSchema,
  kind: types.string(),
  between: z.array(Between$inboundSchema),
  records: z.array(types.string()),
});

export function recordConflictFromJSON(
  jsonString: string,
): SafeParseResult<RecordConflict, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordConflict$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordConflict' from JSON`,
  );
}
