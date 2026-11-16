import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Topic = {
  Identity: "identity",
  Location: "location",
  Movement: "movement",
  Timeline: "timeline",
  Interests: "interests",
  Relationships: "relationships",
  Work: "work",
  Education: "education",
  Accounts: "accounts",
  Credentials: "credentials",
  Devices: "devices",
  Absence: "absence",
} as const;
export type Topic = OpenEnum<typeof Topic>;

/** @internal */
export const Topic$inboundSchema: z.ZodMiniType<Topic, unknown> = openEnums
  .inboundSchema(Topic);
