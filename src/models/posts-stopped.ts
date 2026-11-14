import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.
 */
export const PostsStopped = {
  PlatformLimit: "platform_limit",
  PageLimit: "page_limit",
  RateLimited: "rate_limited",
  Unavailable: "unavailable",
} as const;
/**
 * Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.
 */
export type PostsStopped = OpenEnum<typeof PostsStopped>;

/** @internal */
export const PostsStopped$inboundSchema: z.ZodMiniType<PostsStopped, unknown> =
  openEnums.inboundSchema(PostsStopped);
