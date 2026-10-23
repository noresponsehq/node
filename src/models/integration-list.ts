import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Integration, Integration$inboundSchema } from "./integration.js";

/**
 * GET /v1/integrations: every integration of the workspace, oldest first, at most 10. No secret is ever listed.
 */
export type IntegrationList = {
  items: Array<Integration>;
};

/** @internal */
export const IntegrationList$inboundSchema: z.ZodMiniType<
  IntegrationList,
  unknown
> = z.object({
  items: z.array(Integration$inboundSchema),
});

export function integrationListFromJSON(
  jsonString: string,
): SafeParseResult<IntegrationList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => IntegrationList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'IntegrationList' from JSON`,
  );
}
