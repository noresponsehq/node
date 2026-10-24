import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The kind of data a breach table held beside the identifier. password means a plaintext password was present and password_hash means a hash, salt or token was present. The value itself is not stored or returned; the schema has no member for one.
 */
export const BreachExposed = {
  Email: "email",
  Username: "username",
  Name: "name",
  Password: "password",
  PasswordHash: "password_hash",
  Phone: "phone",
  Address: "address",
  Dob: "dob",
  Ip: "ip",
  Payment: "payment",
  SecurityQa: "security_qa",
} as const;
/**
 * The kind of data a breach table held beside the identifier. password means a plaintext password was present and password_hash means a hash, salt or token was present. The value itself is not stored or returned; the schema has no member for one.
 */
export type BreachExposed = OpenEnum<typeof BreachExposed>;

/** @internal */
export const BreachExposed$inboundSchema: z.ZodMiniType<
  BreachExposed,
  unknown
> = openEnums.inboundSchema(BreachExposed);
/** @internal */
export const BreachExposed$outboundSchema: z.ZodMiniType<
  string,
  BreachExposed
> = openEnums.outboundSchema(BreachExposed);
