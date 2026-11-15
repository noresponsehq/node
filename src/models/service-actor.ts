import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type ServiceActor = {
  type: "service";
  /**
   * The NoResponse service that made the change with no person acting, such as replenisher, which replaces dead platform sessions in NoResponse's own workspace.
   */
  name: string;
};

/** @internal */
export const ServiceActor$inboundSchema: z.ZodMiniType<ServiceActor, unknown> =
  z.object({
    type: types.literal("service"),
    name: types.string(),
  });
/** @internal */
export type ServiceActor$Outbound = {
  type: "service";
  name: string;
};

/** @internal */
export const ServiceActor$outboundSchema: z.ZodMiniType<
  ServiceActor$Outbound,
  ServiceActor
> = z.object({
  type: z.literal("service"),
  name: z.string(),
});

export function serviceActorToJSON(serviceActor: ServiceActor): string {
  return JSON.stringify(ServiceActor$outboundSchema.parse(serviceActor));
}
export function serviceActorFromJSON(
  jsonString: string,
): SafeParseResult<ServiceActor, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ServiceActor$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ServiceActor' from JSON`,
  );
}
