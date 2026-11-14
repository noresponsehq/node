import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  HandlePlatform,
  HandlePlatform$inboundSchema,
} from "./handle-platform.js";
import {
  ScreeningDepth,
  ScreeningDepth$inboundSchema,
} from "./screening-depth.js";
import {
  ScreeningSpend,
  ScreeningSpend$inboundSchema,
} from "./screening-spend.js";
import {
  ScreeningStatus,
  ScreeningStatus$inboundSchema,
} from "./screening-status.js";

/**
 * A screening and its progress.
 */
export type Screening = {
  id: string;
  groupId: string;
  environment: AuditSettingsEnvironment;
  /**
   * partial finished with some people or platforms not covered; people_failed and people_partial count them.
   */
  status: ScreeningStatus;
  depth: ScreeningDepth;
  platforms: Array<HandlePlatform>;
  requestedBy: string;
  createdAt: string;
  startedAt?: string | undefined;
  finishedAt?: string | undefined;
  /**
   * A screening still running then fails with error_code expired.
   */
  expiresAt: string;
  /**
   * People selected when the screening started.
   */
  peopleTotal: number;
  /**
   * People screened so far, failed ones included.
   */
  peopleDone: number;
  peopleFlagged: number;
  peopleFailed: number;
  /**
   * People screened with some requested platform not covered; their coverage names which.
   */
  peoplePartial: number;
  /**
   * What the screening was estimated to cost when it started, in minor units of USD (cents): its people at its depth and platforms. Until the screening finishes, what it has not yet spent counts against the environment's screening_daily_cap.
   */
  estimatedSpend: number;
  /**
   * What the people it has screened recorded, in minor units of USD. Each counts toward the UTC day it was recorded on; a failed person records nothing.
   */
  spent: number;
  /**
   * What screening cost, in US cents, in total and per implementation.
   */
  spend: ScreeningSpend;
  /**
   * Why a failed or cancelled screening stopped.
   */
  errorCode?: string | undefined;
};

/** @internal */
export const Screening$inboundSchema: z.ZodMiniType<Screening, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      group_id: types.string(),
      environment: AuditSettingsEnvironment$inboundSchema,
      status: ScreeningStatus$inboundSchema,
      depth: ScreeningDepth$inboundSchema,
      platforms: z.array(HandlePlatform$inboundSchema),
      requested_by: types.string(),
      created_at: types.string(),
      started_at: types.optional(types.string()),
      finished_at: types.optional(types.string()),
      expires_at: types.string(),
      people_total: types.number(),
      people_done: types.number(),
      people_flagged: types.number(),
      people_failed: types.number(),
      people_partial: types.number(),
      estimated_spend: types.number(),
      spent: types.number(),
      spend: ScreeningSpend$inboundSchema,
      error_code: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "group_id": "groupId",
        "requested_by": "requestedBy",
        "created_at": "createdAt",
        "started_at": "startedAt",
        "finished_at": "finishedAt",
        "expires_at": "expiresAt",
        "people_total": "peopleTotal",
        "people_done": "peopleDone",
        "people_flagged": "peopleFlagged",
        "people_failed": "peopleFailed",
        "people_partial": "peoplePartial",
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
