import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  CustomerExportRequestFilter,
  CustomerExportRequestFilter$Outbound,
  CustomerExportRequestFilter$outboundSchema,
} from "./customer-export-request-filter.js";
import {
  CustomerExportRequestKind,
  CustomerExportRequestKind$outboundSchema,
} from "./customer-export-request-kind.js";
import { Environment, Environment$outboundSchema } from "./environment.js";
import { ResponseMode, ResponseMode$outboundSchema } from "./response-mode.js";

export type CustomerExportRequest = {
  kind: CustomerExportRequestKind;
  environment: Environment;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId?: string | undefined;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode?: ResponseMode | undefined;
  filter?: CustomerExportRequestFilter | undefined;
};

/** @internal */
export type CustomerExportRequest$Outbound = {
  kind: string;
  environment: string;
  account_id?: string | undefined;
  response_mode?: string | undefined;
  filter?: CustomerExportRequestFilter$Outbound | undefined;
};

/** @internal */
export const CustomerExportRequest$outboundSchema: z.ZodMiniType<
  CustomerExportRequest$Outbound,
  CustomerExportRequest
> = z.pipe(
  z.object({
    kind: CustomerExportRequestKind$outboundSchema,
    environment: Environment$outboundSchema,
    accountId: z.optional(z.string()),
    responseMode: z.optional(ResponseMode$outboundSchema),
    filter: z.optional(CustomerExportRequestFilter$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      responseMode: "response_mode",
    });
  }),
);

export function customerExportRequestToJSON(
  customerExportRequest: CustomerExportRequest,
): string {
  return JSON.stringify(
    CustomerExportRequest$outboundSchema.parse(customerExportRequest),
  );
}
