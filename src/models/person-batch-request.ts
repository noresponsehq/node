import * as z from "zod/v4-mini";
import {
  PersonIdentity,
  PersonIdentity$Outbound,
  PersonIdentity$outboundSchema,
} from "./person-identity.js";

/**
 * Adds 1 to 500 workspace people to the group. Reuses an explicit person_id or external_id. Matching email or phone values only suggest people; automatic merging is disabled.
 */
export type PersonBatchRequest = {
  people: Array<PersonIdentity>;
};

/** @internal */
export type PersonBatchRequest$Outbound = {
  people: Array<PersonIdentity$Outbound>;
};

/** @internal */
export const PersonBatchRequest$outboundSchema: z.ZodMiniType<
  PersonBatchRequest$Outbound,
  PersonBatchRequest
> = z.object({
  people: z.array(PersonIdentity$outboundSchema),
});

export function personBatchRequestToJSON(
  personBatchRequest: PersonBatchRequest,
): string {
  return JSON.stringify(
    PersonBatchRequest$outboundSchema.parse(personBatchRequest),
  );
}
