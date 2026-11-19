import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const LastError = {
  ScreeningCapExceeded: "screening_cap_exceeded",
  ScreeningUnavailable: "screening_unavailable",
  PersonNotFound: "person_not_found",
  IdempotencyKeyReused: "idempotency_key_reused",
} as const;
export type LastError = OpenEnum<typeof LastError>;

/** @internal */
export const LastError$inboundSchema: z.ZodMiniType<LastError, unknown> =
  openEnums.inboundSchema(LastError);
