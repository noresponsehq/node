import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListPeopleRequest = {
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
   * Only people with this decision; undecided for none yet.
   */
  decision?: models.ListPeopleDecision | undefined;
  /**
   * Only people with this role; unstated for people whose role was not given.
   */
  role?: models.ListPeopleRole | undefined;
};

export type ListPeopleResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonList;
};

/** @internal */
export type ListPeopleRequest$Outbound = {
  group_id: string;
  limit: number;
  after?: string | undefined;
  decision?: string | undefined;
  role?: string | undefined;
};

/** @internal */
export const ListPeopleRequest$outboundSchema: z.ZodMiniType<
  ListPeopleRequest$Outbound,
  ListPeopleRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    limit: z._default(z.int(), 100),
    after: z.optional(z.string()),
    decision: z.optional(models.ListPeopleDecision$outboundSchema),
    role: z.optional(models.ListPeopleRole$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
    });
  }),
);

export function listPeopleRequestToJSON(
  listPeopleRequest: ListPeopleRequest,
): string {
  return JSON.stringify(
    ListPeopleRequest$outboundSchema.parse(listPeopleRequest),
  );
}

/** @internal */
export const ListPeopleResponse$inboundSchema: z.ZodMiniType<
  ListPeopleResponse,
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

export function listPeopleResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListPeopleResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListPeopleResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListPeopleResponse' from JSON`,
  );
}
