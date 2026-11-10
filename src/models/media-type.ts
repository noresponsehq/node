import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const MediaType = {
  Image: "image",
  Video: "video",
} as const;
export type MediaType = OpenEnum<typeof MediaType>;

/** @internal */
export const MediaType$inboundSchema: z.ZodMiniType<MediaType, unknown> =
  openEnums.inboundSchema(MediaType);
