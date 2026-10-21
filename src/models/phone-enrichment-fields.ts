import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { smartUnion } from "../types/smart-union.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AlternateName = {};

export type AlternateNameUnion =
  | string
  | number
  | boolean
  | AlternateName
  | Array<any>;

export type NameCandidate = {};

export type NameCandidateUnion =
  | string
  | number
  | boolean
  | NameCandidate
  | Array<any>;

export type Timezone = {};

export type TimezoneUnion = string | number | boolean | Timezone | Array<any>;

export type Email = {};

export type EmailUnion = string | number | boolean | Email | Array<any>;

export type Website = {};

export type WebsiteUnion = string | number | boolean | Website | Array<any>;

export type Location = {};

export type LocationUnion = string | number | boolean | Location | Array<any>;

export type SocialProfile = {};

export type SocialProfileUnion =
  | string
  | number
  | boolean
  | SocialProfile
  | Array<any>;

export type PhoneEnrichmentFields = {
  phone?: string | undefined;
  name?: string | undefined;
  carrier?: string | undefined;
  lineType?: string | undefined;
  entityType?: string | undefined;
  countryCode?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  location?: string | undefined;
  nationalFormat?: string | undefined;
  jobTitle?: string | undefined;
  companyName?: string | undefined;
  email?: string | undefined;
  website?: string | undefined;
  firstCallAt?: string | undefined;
  lastCallAt?: string | undefined;
  matchedName?: string | undefined;
  alternateNames?:
    | Array<string | number | boolean | AlternateName | Array<any>>
    | undefined;
  nameCandidates?:
    | Array<string | number | boolean | NameCandidate | Array<any>>
    | undefined;
  timezones?:
    | Array<string | number | boolean | Timezone | Array<any>>
    | undefined;
  emails?: Array<string | number | boolean | Email | Array<any>> | undefined;
  websites?:
    | Array<string | number | boolean | Website | Array<any>>
    | undefined;
  locations?:
    | Array<string | number | boolean | Location | Array<any>>
    | undefined;
  socialProfiles?:
    | Array<string | number | boolean | SocialProfile | Array<any>>
    | undefined;
  reportCount?: number | undefined;
  tagCount?: number | undefined;
  totalCalls?: number | undefined;
  calls60Days?: number | undefined;
  reports60Days?: number | undefined;
  searches60Days?: number | undefined;
  commentCount?: number | undefined;
  namesCount?: number | undefined;
  spamReportCount?: number | undefined;
};

/** @internal */
export const AlternateName$inboundSchema: z.ZodMiniType<
  AlternateName,
  unknown
> = z.object({});

export function alternateNameFromJSON(
  jsonString: string,
): SafeParseResult<AlternateName, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AlternateName$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AlternateName' from JSON`,
  );
}

/** @internal */
export const AlternateNameUnion$inboundSchema: z.ZodMiniType<
  AlternateNameUnion,
  unknown
> = smartUnion([
  types.string(),
  types.number(),
  types.boolean(),
  z.lazy(() => AlternateName$inboundSchema),
  z.array(z.any()),
]);

export function alternateNameUnionFromJSON(
  jsonString: string,
): SafeParseResult<AlternateNameUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AlternateNameUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AlternateNameUnion' from JSON`,
  );
}

/** @internal */
export const NameCandidate$inboundSchema: z.ZodMiniType<
  NameCandidate,
  unknown
> = z.object({});

export function nameCandidateFromJSON(
  jsonString: string,
): SafeParseResult<NameCandidate, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => NameCandidate$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'NameCandidate' from JSON`,
  );
}

/** @internal */
export const NameCandidateUnion$inboundSchema: z.ZodMiniType<
  NameCandidateUnion,
  unknown
> = smartUnion([
  types.string(),
  types.number(),
  types.boolean(),
  z.lazy(() => NameCandidate$inboundSchema),
  z.array(z.any()),
]);

export function nameCandidateUnionFromJSON(
  jsonString: string,
): SafeParseResult<NameCandidateUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => NameCandidateUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'NameCandidateUnion' from JSON`,
  );
}

/** @internal */
export const Timezone$inboundSchema: z.ZodMiniType<Timezone, unknown> = z
  .object({});

export function timezoneFromJSON(
  jsonString: string,
): SafeParseResult<Timezone, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Timezone$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Timezone' from JSON`,
  );
}

/** @internal */
export const TimezoneUnion$inboundSchema: z.ZodMiniType<
  TimezoneUnion,
  unknown
> = smartUnion([
  types.string(),
  types.number(),
  types.boolean(),
  z.lazy(() => Timezone$inboundSchema),
  z.array(z.any()),
]);

export function timezoneUnionFromJSON(
  jsonString: string,
): SafeParseResult<TimezoneUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => TimezoneUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'TimezoneUnion' from JSON`,
  );
}

/** @internal */
export const Email$inboundSchema: z.ZodMiniType<Email, unknown> = z.object({});

export function emailFromJSON(
  jsonString: string,
): SafeParseResult<Email, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Email$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Email' from JSON`,
  );
}

/** @internal */
export const EmailUnion$inboundSchema: z.ZodMiniType<EmailUnion, unknown> =
  smartUnion([
    types.string(),
    types.number(),
    types.boolean(),
    z.lazy(() => Email$inboundSchema),
    z.array(z.any()),
  ]);

export function emailUnionFromJSON(
  jsonString: string,
): SafeParseResult<EmailUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => EmailUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'EmailUnion' from JSON`,
  );
}

/** @internal */
export const Website$inboundSchema: z.ZodMiniType<Website, unknown> = z.object(
  {},
);

export function websiteFromJSON(
  jsonString: string,
): SafeParseResult<Website, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Website$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Website' from JSON`,
  );
}

/** @internal */
export const WebsiteUnion$inboundSchema: z.ZodMiniType<WebsiteUnion, unknown> =
  smartUnion([
    types.string(),
    types.number(),
    types.boolean(),
    z.lazy(() => Website$inboundSchema),
    z.array(z.any()),
  ]);

export function websiteUnionFromJSON(
  jsonString: string,
): SafeParseResult<WebsiteUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebsiteUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebsiteUnion' from JSON`,
  );
}

/** @internal */
export const Location$inboundSchema: z.ZodMiniType<Location, unknown> = z
  .object({});

export function locationFromJSON(
  jsonString: string,
): SafeParseResult<Location, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Location$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Location' from JSON`,
  );
}

/** @internal */
export const LocationUnion$inboundSchema: z.ZodMiniType<
  LocationUnion,
  unknown
> = smartUnion([
  types.string(),
  types.number(),
  types.boolean(),
  z.lazy(() => Location$inboundSchema),
  z.array(z.any()),
]);

export function locationUnionFromJSON(
  jsonString: string,
): SafeParseResult<LocationUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => LocationUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'LocationUnion' from JSON`,
  );
}

/** @internal */
export const SocialProfile$inboundSchema: z.ZodMiniType<
  SocialProfile,
  unknown
> = z.object({});

export function socialProfileFromJSON(
  jsonString: string,
): SafeParseResult<SocialProfile, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SocialProfile$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SocialProfile' from JSON`,
  );
}

/** @internal */
export const SocialProfileUnion$inboundSchema: z.ZodMiniType<
  SocialProfileUnion,
  unknown
> = smartUnion([
  types.string(),
  types.number(),
  types.boolean(),
  z.lazy(() => SocialProfile$inboundSchema),
  z.array(z.any()),
]);

export function socialProfileUnionFromJSON(
  jsonString: string,
): SafeParseResult<SocialProfileUnion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SocialProfileUnion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SocialProfileUnion' from JSON`,
  );
}

/** @internal */
export const PhoneEnrichmentFields$inboundSchema: z.ZodMiniType<
  PhoneEnrichmentFields,
  unknown
> = z.pipe(
  z.object({
    phone: types.optional(types.string()),
    name: types.optional(types.string()),
    carrier: types.optional(types.string()),
    line_type: types.optional(types.string()),
    entity_type: types.optional(types.string()),
    country_code: types.optional(types.string()),
    country: types.optional(types.string()),
    state: types.optional(types.string()),
    city: types.optional(types.string()),
    location: types.optional(types.string()),
    national_format: types.optional(types.string()),
    job_title: types.optional(types.string()),
    company_name: types.optional(types.string()),
    email: types.optional(types.string()),
    website: types.optional(types.string()),
    first_call_at: types.optional(types.string()),
    last_call_at: types.optional(types.string()),
    matched_name: types.optional(types.string()),
    alternate_names: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => AlternateName$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    name_candidates: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => NameCandidate$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    timezones: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => Timezone$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    emails: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => Email$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    websites: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => Website$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    locations: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => Location$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    social_profiles: types.optional(
      z.array(
        smartUnion([
          types.string(),
          types.number(),
          types.boolean(),
          z.lazy(() => SocialProfile$inboundSchema),
          z.array(z.any()),
        ]),
      ),
    ),
    report_count: types.optional(types.number()),
    tag_count: types.optional(types.number()),
    total_calls: types.optional(types.number()),
    calls_60_days: types.optional(types.number()),
    reports_60_days: types.optional(types.number()),
    searches_60_days: types.optional(types.number()),
    comment_count: types.optional(types.number()),
    names_count: types.optional(types.number()),
    spam_report_count: types.optional(types.number()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "line_type": "lineType",
      "entity_type": "entityType",
      "country_code": "countryCode",
      "national_format": "nationalFormat",
      "job_title": "jobTitle",
      "company_name": "companyName",
      "first_call_at": "firstCallAt",
      "last_call_at": "lastCallAt",
      "matched_name": "matchedName",
      "alternate_names": "alternateNames",
      "name_candidates": "nameCandidates",
      "social_profiles": "socialProfiles",
      "report_count": "reportCount",
      "tag_count": "tagCount",
      "total_calls": "totalCalls",
      "calls_60_days": "calls60Days",
      "reports_60_days": "reports60Days",
      "searches_60_days": "searches60Days",
      "comment_count": "commentCount",
      "names_count": "namesCount",
      "spam_report_count": "spamReportCount",
    });
  }),
);

export function phoneEnrichmentFieldsFromJSON(
  jsonString: string,
): SafeParseResult<PhoneEnrichmentFields, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PhoneEnrichmentFields$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PhoneEnrichmentFields' from JSON`,
  );
}
