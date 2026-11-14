import * as z from "zod/v4-mini";
import {
  PersonIdentity,
  PersonIdentity$Outbound,
  PersonIdentity$outboundSchema,
} from "./person-identity.js";

/**
 * Adds or updates 1 to 500 people. A row naming an existing person of the group (the same external_id, else the same email, else the same phone) updates it.
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
