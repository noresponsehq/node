import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  ErasureReceiptKind,
  ErasureReceiptKind$inboundSchema,
} from "./erasure-receipt-kind.js";
import {
  ErasureReceiptTarget,
  ErasureReceiptTarget$inboundSchema,
} from "./erasure-receipt-target.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ListChangeState,
  ListChangeState$inboundSchema,
} from "./list-change-state.js";

/**
 * Acknowledged propagation of a retained erasure record in the calling environment. Pending means the target has not acknowledged completion. Completion covers these serving-system targets only; backup and point-in-time recovery copies expire according to their own retention policy. This receipt contains no subject id or digest. Workspace teardown revokes customer credentials, so obtain required receipts before teardown.
 */
export type ErasureReceipt = {
  /**
   * Opaque, server-issued erasure receipt id. It contains no subject identifier.
   */
  id: string;
  kind: ErasureReceiptKind;
  status: ListChangeState;
  assessmentsDeleted: number;
  requestedAt: string;
  completedAt?: string | undefined;
  targets: Array<ErasureReceiptTarget>;
  backupPolicy: string;
};

/** @internal */
export const ErasureReceipt$inboundSchema: z.ZodMiniType<
  ErasureReceipt,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    kind: ErasureReceiptKind$inboundSchema,
    status: ListChangeState$inboundSchema,
    assessments_deleted: types.number(),
    requested_at: types.string(),
    completed_at: types.optional(types.string()),
    targets: z.array(ErasureReceiptTarget$inboundSchema),
    backup_policy: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessments_deleted": "assessmentsDeleted",
      "requested_at": "requestedAt",
      "completed_at": "completedAt",
      "backup_policy": "backupPolicy",
    });
  }),
);

export function erasureReceiptFromJSON(
  jsonString: string,
): SafeParseResult<ErasureReceipt, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ErasureReceipt$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ErasureReceipt' from JSON`,
  );
}
