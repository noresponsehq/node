import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { AuditStream, AuditStream$inboundSchema } from "./audit-stream.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Read audit stream subscriptions.
 */
export type AuditStreamList = {
  items: Array<AuditStream>;
};

/** @internal */
export const AuditStreamList$inboundSchema: z.ZodMiniType<
  AuditStreamList,
  unknown
> = z.object({
  items: z.array(AuditStream$inboundSchema),
});

export function auditStreamListFromJSON(
  jsonString: string,
): SafeParseResult<AuditStreamList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditStreamList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditStreamList' from JSON`,
  );
}
