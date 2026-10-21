import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * Normalized multi-factor evidence from a verified provider session.
 */
export type AuthContextMfa = {
  present?: boolean | undefined;
  methods?: Array<string> | undefined;
  ageSeconds?: number | undefined;
};

/** @internal */
export type AuthContextMfa$Outbound = {
  present?: boolean | undefined;
  methods?: Array<string> | undefined;
  age_seconds?: number | undefined;
};

/** @internal */
export const AuthContextMfa$outboundSchema: z.ZodMiniType<
  AuthContextMfa$Outbound,
  AuthContextMfa
> = z.pipe(
  z.object({
    present: z.optional(z.boolean()),
    methods: z.optional(z.array(z.string())),
    ageSeconds: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      ageSeconds: "age_seconds",
    });
  }),
);

export function authContextMfaToJSON(authContextMfa: AuthContextMfa): string {
  return JSON.stringify(AuthContextMfa$outboundSchema.parse(authContextMfa));
}
