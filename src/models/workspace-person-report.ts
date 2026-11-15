import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Handle, Handle$inboundSchema } from "./handle.js";
import { Investigation, Investigation$inboundSchema } from "./investigation.js";
import {
  ScreeningFinding,
  ScreeningFinding$inboundSchema,
} from "./screening-finding.js";
import {
  ScreeningLookup,
  ScreeningLookup$inboundSchema,
} from "./screening-lookup.js";
import {
  ScreeningMedia,
  ScreeningMedia$inboundSchema,
} from "./screening-media.js";
import {
  ScreeningPost,
  ScreeningPost$inboundSchema,
} from "./screening-post.js";
import {
  ScreeningProfile,
  ScreeningProfile$inboundSchema,
} from "./screening-profile.js";

/**
 * Read a workspace person.
 */
export type WorkspacePersonReport = {
  /**
   * Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.
   */
  externalId?: string | undefined;
  name?: string | undefined;
  /**
   * The person's email.
   */
  email?: string | undefined;
  /**
   * The person's phone in E.164 form.
   */
  phone?: string | undefined;
  /**
   * Where the person works.
   */
  company?: string | undefined;
  /**
   * Where the person lives.
   */
  city?: string | undefined;
  /**
   * Accounts the person is known to hold, at most 20.
   */
  handles?: Array<Handle> | undefined;
  id: string;
  createdAt: string;
  updatedAt: string;
  /**
   * The time the workspace retention policy removes this person, their evidence and investigation history. Shortening workspace retention can move this time earlier.
   */
  expiresAt: string;
  /**
   * The accounts this result matched, with how each was matched.
   */
  profiles: Array<ScreeningProfile>;
  /**
   * What this result flagged, most severe first, each citing its evidence.
   */
  findings: Array<ScreeningFinding>;
  /**
   * All posts retained for this result, including posts that no finding cites.
   */
  posts: Array<ScreeningPost>;
  /**
   * All images and videos retained for this result, including media that no finding cites.
   */
  media: Array<ScreeningMedia>;
  /**
   * What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.
   */
  lookup?: ScreeningLookup | undefined;
  /**
   * True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.
   */
  evidenceRestricted?: boolean | undefined;
  /**
   * The most recent retained completed or partial investigation, or a migrated result whose original per-person status is unknown. The evidence below belongs to this investigation. Read investigation history for earlier results and pending jobs.
   */
  evidenceInvestigation: Investigation | null;
};

/** @internal */
export const WorkspacePersonReport$inboundSchema: z.ZodMiniType<
  WorkspacePersonReport,
  unknown
> = z.pipe(
  z.object({
    external_id: types.optional(types.string()),
    name: types.optional(types.string()),
    email: types.optional(types.string()),
    phone: types.optional(types.string()),
    company: types.optional(types.string()),
    city: types.optional(types.string()),
    handles: types.optional(z.array(Handle$inboundSchema)),
    id: types.string(),
    created_at: types.string(),
    updated_at: types.string(),
    expires_at: types.string(),
    profiles: z.array(ScreeningProfile$inboundSchema),
    findings: z.array(ScreeningFinding$inboundSchema),
    posts: z.array(ScreeningPost$inboundSchema),
    media: z.array(ScreeningMedia$inboundSchema),
    lookup: types.optional(ScreeningLookup$inboundSchema),
    evidence_restricted: types.optional(types.boolean()),
    evidence_investigation: types.nullable(Investigation$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "external_id": "externalId",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
      "expires_at": "expiresAt",
      "evidence_restricted": "evidenceRestricted",
      "evidence_investigation": "evidenceInvestigation",
    });
  }),
);

export function workspacePersonReportFromJSON(
  jsonString: string,
): SafeParseResult<WorkspacePersonReport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspacePersonReport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspacePersonReport' from JSON`,
  );
}
