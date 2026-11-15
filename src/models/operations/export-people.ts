import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ExportPeopleRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  groupId: string;
  /**
   * At most this many people.
   */
  limit?: number | undefined;
  /**
   * Read people after this one.
   */
  after?: string | undefined;
  /**
   * Only people whose highest finding has this band; none for people with no finding.
   */
  band?: models.ListPeopleBand | undefined;
  /**
   * Only people with this decision; undecided for none yet.
   */
  decision?: models.ListPeopleDecision | undefined;
  /**
   * Only people with this role; unstated for people whose role was not given.
   */
  role?: models.ListPeopleRole | undefined;
};

export type ExportPeopleResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonList;
};

/** @internal */
export type ExportPeopleRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  limit: number;
  after?: string | undefined;
  band?: string | undefined;
  decision?: string | undefined;
  role?: string | undefined;
};

/** @internal */
export const ExportPeopleRequest$outboundSchema: z.ZodMiniType<
  ExportPeopleRequest$Outbound,
  ExportPeopleRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    limit: z._default(z.int(), 100),
    after: z.optional(z.string()),
    band: z.optional(models.ListPeopleBand$outboundSchema),
    decision: z.optional(models.ListPeopleDecision$outboundSchema),
    role: z.optional(models.ListPeopleRole$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
    });
  }),
);

export function exportPeopleRequestToJSON(
  exportPeopleRequest: ExportPeopleRequest,
): string {
  return JSON.stringify(
    ExportPeopleRequest$outboundSchema.parse(exportPeopleRequest),
  );
}

/** @internal */
export const ExportPeopleResponse$inboundSchema: z.ZodMiniType<
  ExportPeopleResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PersonList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function exportPeopleResponseFromJSON(
  jsonString: string,
): SafeParseResult<ExportPeopleResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ExportPeopleResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ExportPeopleResponse' from JSON`,
  );
}
