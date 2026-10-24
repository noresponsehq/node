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
/** @internal */
export type AlternateName$Outbound = {};

/** @internal */
export const AlternateName$outboundSchema: z.ZodMiniType<
  AlternateName$Outbound,
  AlternateName
> = z.object({});

export function alternateNameToJSON(alternateName: AlternateName): string {
  return JSON.stringify(AlternateName$outboundSchema.parse(alternateName));
}
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
/** @internal */
export type AlternateNameUnion$Outbound =
  | string
  | number
  | boolean
  | AlternateName$Outbound
  | Array<any>;

/** @internal */
export const AlternateNameUnion$outboundSchema: z.ZodMiniType<
  AlternateNameUnion$Outbound,
  AlternateNameUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => AlternateName$outboundSchema),
  z.array(z.any()),
]);

export function alternateNameUnionToJSON(
  alternateNameUnion: AlternateNameUnion,
): string {
  return JSON.stringify(
    AlternateNameUnion$outboundSchema.parse(alternateNameUnion),
  );
}
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
/** @internal */
export type NameCandidate$Outbound = {};

/** @internal */
export const NameCandidate$outboundSchema: z.ZodMiniType<
  NameCandidate$Outbound,
  NameCandidate
> = z.object({});

export function nameCandidateToJSON(nameCandidate: NameCandidate): string {
  return JSON.stringify(NameCandidate$outboundSchema.parse(nameCandidate));
}
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
/** @internal */
export type NameCandidateUnion$Outbound =
  | string
  | number
  | boolean
  | NameCandidate$Outbound
  | Array<any>;

/** @internal */
export const NameCandidateUnion$outboundSchema: z.ZodMiniType<
  NameCandidateUnion$Outbound,
  NameCandidateUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => NameCandidate$outboundSchema),
  z.array(z.any()),
]);

export function nameCandidateUnionToJSON(
  nameCandidateUnion: NameCandidateUnion,
): string {
  return JSON.stringify(
    NameCandidateUnion$outboundSchema.parse(nameCandidateUnion),
  );
}
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
/** @internal */
export type Timezone$Outbound = {};

/** @internal */
export const Timezone$outboundSchema: z.ZodMiniType<
  Timezone$Outbound,
  Timezone
> = z.object({});

export function timezoneToJSON(timezone: Timezone): string {
  return JSON.stringify(Timezone$outboundSchema.parse(timezone));
}
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
/** @internal */
export type TimezoneUnion$Outbound =
  | string
  | number
  | boolean
  | Timezone$Outbound
  | Array<any>;

/** @internal */
export const TimezoneUnion$outboundSchema: z.ZodMiniType<
  TimezoneUnion$Outbound,
  TimezoneUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Timezone$outboundSchema),
  z.array(z.any()),
]);

export function timezoneUnionToJSON(timezoneUnion: TimezoneUnion): string {
  return JSON.stringify(TimezoneUnion$outboundSchema.parse(timezoneUnion));
}
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
/** @internal */
export type Email$Outbound = {};

/** @internal */
export const Email$outboundSchema: z.ZodMiniType<Email$Outbound, Email> = z
  .object({});

export function emailToJSON(email: Email): string {
  return JSON.stringify(Email$outboundSchema.parse(email));
}
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
/** @internal */
export type EmailUnion$Outbound =
  | string
  | number
  | boolean
  | Email$Outbound
  | Array<any>;

/** @internal */
export const EmailUnion$outboundSchema: z.ZodMiniType<
  EmailUnion$Outbound,
  EmailUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Email$outboundSchema),
  z.array(z.any()),
]);

export function emailUnionToJSON(emailUnion: EmailUnion): string {
  return JSON.stringify(EmailUnion$outboundSchema.parse(emailUnion));
}
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
/** @internal */
export type Website$Outbound = {};

/** @internal */
export const Website$outboundSchema: z.ZodMiniType<Website$Outbound, Website> =
  z.object({});

export function websiteToJSON(website: Website): string {
  return JSON.stringify(Website$outboundSchema.parse(website));
}
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
/** @internal */
export type WebsiteUnion$Outbound =
  | string
  | number
  | boolean
  | Website$Outbound
  | Array<any>;

/** @internal */
export const WebsiteUnion$outboundSchema: z.ZodMiniType<
  WebsiteUnion$Outbound,
  WebsiteUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Website$outboundSchema),
  z.array(z.any()),
]);

export function websiteUnionToJSON(websiteUnion: WebsiteUnion): string {
  return JSON.stringify(WebsiteUnion$outboundSchema.parse(websiteUnion));
}
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
/** @internal */
export type Location$Outbound = {};

/** @internal */
export const Location$outboundSchema: z.ZodMiniType<
  Location$Outbound,
  Location
> = z.object({});

export function locationToJSON(location: Location): string {
  return JSON.stringify(Location$outboundSchema.parse(location));
}
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
/** @internal */
export type LocationUnion$Outbound =
  | string
  | number
  | boolean
  | Location$Outbound
  | Array<any>;

/** @internal */
export const LocationUnion$outboundSchema: z.ZodMiniType<
  LocationUnion$Outbound,
  LocationUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Location$outboundSchema),
  z.array(z.any()),
]);

export function locationUnionToJSON(locationUnion: LocationUnion): string {
  return JSON.stringify(LocationUnion$outboundSchema.parse(locationUnion));
}
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
/** @internal */
export type SocialProfile$Outbound = {};

/** @internal */
export const SocialProfile$outboundSchema: z.ZodMiniType<
  SocialProfile$Outbound,
  SocialProfile
> = z.object({});

export function socialProfileToJSON(socialProfile: SocialProfile): string {
  return JSON.stringify(SocialProfile$outboundSchema.parse(socialProfile));
}
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
/** @internal */
export type SocialProfileUnion$Outbound =
  | string
  | number
  | boolean
  | SocialProfile$Outbound
  | Array<any>;

/** @internal */
export const SocialProfileUnion$outboundSchema: z.ZodMiniType<
  SocialProfileUnion$Outbound,
  SocialProfileUnion
> = smartUnion([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => SocialProfile$outboundSchema),
  z.array(z.any()),
]);

export function socialProfileUnionToJSON(
  socialProfileUnion: SocialProfileUnion,
): string {
  return JSON.stringify(
    SocialProfileUnion$outboundSchema.parse(socialProfileUnion),
  );
}
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
/** @internal */
export type PhoneEnrichmentFields$Outbound = {
  phone?: string | undefined;
  name?: string | undefined;
  carrier?: string | undefined;
  line_type?: string | undefined;
  entity_type?: string | undefined;
  country_code?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  location?: string | undefined;
  national_format?: string | undefined;
  job_title?: string | undefined;
  company_name?: string | undefined;
  email?: string | undefined;
  website?: string | undefined;
  first_call_at?: string | undefined;
  last_call_at?: string | undefined;
  matched_name?: string | undefined;
  alternate_names?:
    | Array<string | number | boolean | AlternateName$Outbound | Array<any>>
    | undefined;
  name_candidates?:
    | Array<string | number | boolean | NameCandidate$Outbound | Array<any>>
    | undefined;
  timezones?:
    | Array<string | number | boolean | Timezone$Outbound | Array<any>>
    | undefined;
  emails?:
    | Array<string | number | boolean | Email$Outbound | Array<any>>
    | undefined;
  websites?:
    | Array<string | number | boolean | Website$Outbound | Array<any>>
    | undefined;
  locations?:
    | Array<string | number | boolean | Location$Outbound | Array<any>>
    | undefined;
  social_profiles?:
    | Array<string | number | boolean | SocialProfile$Outbound | Array<any>>
    | undefined;
  report_count?: number | undefined;
  tag_count?: number | undefined;
  total_calls?: number | undefined;
  calls_60_days?: number | undefined;
  reports_60_days?: number | undefined;
  searches_60_days?: number | undefined;
  comment_count?: number | undefined;
  names_count?: number | undefined;
  spam_report_count?: number | undefined;
};

/** @internal */
export const PhoneEnrichmentFields$outboundSchema: z.ZodMiniType<
  PhoneEnrichmentFields$Outbound,
  PhoneEnrichmentFields
> = z.pipe(
  z.object({
    phone: z.optional(z.string()),
    name: z.optional(z.string()),
    carrier: z.optional(z.string()),
    lineType: z.optional(z.string()),
    entityType: z.optional(z.string()),
    countryCode: z.optional(z.string()),
    country: z.optional(z.string()),
    state: z.optional(z.string()),
    city: z.optional(z.string()),
    location: z.optional(z.string()),
    nationalFormat: z.optional(z.string()),
    jobTitle: z.optional(z.string()),
    companyName: z.optional(z.string()),
    email: z.optional(z.string()),
    website: z.optional(z.string()),
    firstCallAt: z.optional(z.string()),
    lastCallAt: z.optional(z.string()),
    matchedName: z.optional(z.string()),
    alternateNames: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => AlternateName$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    nameCandidates: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => NameCandidate$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    timezones: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => Timezone$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    emails: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => Email$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    websites: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => Website$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    locations: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => Location$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    socialProfiles: z.optional(
      z.array(smartUnion([
        z.string(),
        z.number(),
        z.boolean(),
        z.lazy(() => SocialProfile$outboundSchema),
        z.array(z.any()),
      ])),
    ),
    reportCount: z.optional(z.int()),
    tagCount: z.optional(z.int()),
    totalCalls: z.optional(z.int()),
    calls60Days: z.optional(z.int()),
    reports60Days: z.optional(z.int()),
    searches60Days: z.optional(z.int()),
    commentCount: z.optional(z.int()),
    namesCount: z.optional(z.int()),
    spamReportCount: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      lineType: "line_type",
      entityType: "entity_type",
      countryCode: "country_code",
      nationalFormat: "national_format",
      jobTitle: "job_title",
      companyName: "company_name",
      firstCallAt: "first_call_at",
      lastCallAt: "last_call_at",
      matchedName: "matched_name",
      alternateNames: "alternate_names",
      nameCandidates: "name_candidates",
      socialProfiles: "social_profiles",
      reportCount: "report_count",
      tagCount: "tag_count",
      totalCalls: "total_calls",
      calls60Days: "calls_60_days",
      reports60Days: "reports_60_days",
      searches60Days: "searches_60_days",
      commentCount: "comment_count",
      namesCount: "names_count",
      spamReportCount: "spam_report_count",
    });
  }),
);

export function phoneEnrichmentFieldsToJSON(
  phoneEnrichmentFields: PhoneEnrichmentFields,
): string {
  return JSON.stringify(
    PhoneEnrichmentFields$outboundSchema.parse(phoneEnrichmentFields),
  );
}
export function phoneEnrichmentFieldsFromJSON(
  jsonString: string,
): SafeParseResult<PhoneEnrichmentFields, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PhoneEnrichmentFields$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PhoneEnrichmentFields' from JSON`,
  );
}
