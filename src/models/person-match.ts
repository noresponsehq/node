import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export const PersonMatchMatchedOn = {
  Email: "email",
  Phone: "phone",
} as const;
export type PersonMatchMatchedOn = OpenEnum<typeof PersonMatchMatchedOn>;

export type PersonMatch = {
  personId: string;
  matchedOn: Array<PersonMatchMatchedOn>;
};

/** @internal */
export const PersonMatchMatchedOn$inboundSchema: z.ZodMiniType<
  PersonMatchMatchedOn,
  unknown
> = openEnums.inboundSchema(PersonMatchMatchedOn);

/** @internal */
export const PersonMatch$inboundSchema: z.ZodMiniType<PersonMatch, unknown> = z
  .pipe(
    z.object({
      person_id: types.string(),
      matched_on: z.array(PersonMatchMatchedOn$inboundSchema),
    }),
    z.transform((v) => {
      return remap$(v, {
        "person_id": "personId",
        "matched_on": "matchedOn",
      });
    }),
  );

export function personMatchFromJSON(
  jsonString: string,
): SafeParseResult<PersonMatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonMatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonMatch' from JSON`,
  );
}
