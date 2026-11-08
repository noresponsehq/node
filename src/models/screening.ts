import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningDepth,
  ScreeningDepth$inboundSchema,
} from "./screening-depth.js";
import {
  ScreeningStatus,
  ScreeningStatus$inboundSchema,
} from "./screening-status.js";

export const ScreeningPlatform = {
  Instagram: "instagram",
  X: "x",
  Bluesky: "bluesky",
  Youtube: "youtube",
  Tiktok: "tiktok",
  Facebook: "facebook",
  Threads: "threads",
  Reddit: "reddit",
  Telegram: "telegram",
  Linkedin: "linkedin",
} as const;
export type ScreeningPlatform = OpenEnum<typeof ScreeningPlatform>;

/**
 * A screening and its progress.
 */
export type Screening = {
  id: string;
  eventId: string;
  environment: AuditSettingsEnvironment;
  /**
   * partial finished with some attendees not covered; attendees_failed counts them.
   */
  status: ScreeningStatus;
  depth: ScreeningDepth;
  platforms: Array<ScreeningPlatform>;
  requestedBy: string;
  createdAt: string;
  startedAt?: string | undefined;
  finishedAt?: string | undefined;
  /**
   * A screening still running then fails with error_code expired.
   */
  expiresAt: string;
  /**
   * Attendees selected when the screening started.
   */
  attendeesTotal: number;
  /**
   * Attendees screened so far, failed ones included.
   */
  attendeesDone: number;
  attendeesFlagged: number;
  attendeesFailed: number;
  /**
   * What the screening was estimated to cost when it started, in minor units of USD (cents): its attendees at its depth and platforms. Until the screening finishes, what it has not yet spent counts against the environment's screening_daily_cap.
   */
  estimatedSpend: number;
  /**
   * What the attendees it has screened recorded, in minor units of USD. Each counts toward the UTC day it was recorded on; a failed attendee records nothing.
   */
  spent: number;
  /**
   * Why a failed or cancelled screening stopped.
   */
  errorCode?: string | undefined;
};

/** @internal */
export const ScreeningPlatform$inboundSchema: z.ZodMiniType<
  ScreeningPlatform,
  unknown
> = openEnums.inboundSchema(ScreeningPlatform);

/** @internal */
export const Screening$inboundSchema: z.ZodMiniType<Screening, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      event_id: types.string(),
      environment: AuditSettingsEnvironment$inboundSchema,
      status: ScreeningStatus$inboundSchema,
      depth: ScreeningDepth$inboundSchema,
      platforms: z.array(ScreeningPlatform$inboundSchema),
      requested_by: types.string(),
      created_at: types.string(),
      started_at: types.optional(types.string()),
      finished_at: types.optional(types.string()),
      expires_at: types.string(),
      attendees_total: types.number(),
      attendees_done: types.number(),
      attendees_flagged: types.number(),
      attendees_failed: types.number(),
      estimated_spend: types.number(),
      spent: types.number(),
      error_code: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "event_id": "eventId",
        "requested_by": "requestedBy",
        "created_at": "createdAt",
        "started_at": "startedAt",
        "finished_at": "finishedAt",
        "expires_at": "expiresAt",
        "attendees_total": "attendeesTotal",
        "attendees_done": "attendeesDone",
        "attendees_flagged": "attendeesFlagged",
        "attendees_failed": "attendeesFailed",
        "estimated_spend": "estimatedSpend",
        "error_code": "errorCode",
      });
    }),
  );

export function screeningFromJSON(
  jsonString: string,
): SafeParseResult<Screening, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Screening$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Screening' from JSON`,
  );
}
