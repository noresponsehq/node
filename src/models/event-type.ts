import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const EventType = {
  AssessmentUpdated: "assessment.updated",
} as const;
export type EventType = OpenEnum<typeof EventType>;

/** @internal */
export const EventType$inboundSchema: z.ZodMiniType<EventType, unknown> =
  openEnums.inboundSchema(EventType);
