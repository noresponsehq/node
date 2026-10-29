import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const RequestAggregateRequestBucket = {
  Hour: "hour",
  Day: "day",
} as const;
export type RequestAggregateRequestBucket = OpenEnum<
  typeof RequestAggregateRequestBucket
>;

/** @internal */
export const RequestAggregateRequestBucket$inboundSchema: z.ZodMiniType<
  RequestAggregateRequestBucket,
  unknown
> = openEnums.inboundSchema(RequestAggregateRequestBucket);
/** @internal */
export const RequestAggregateRequestBucket$outboundSchema: z.ZodMiniType<
  string,
  RequestAggregateRequestBucket
> = openEnums.outboundSchema(RequestAggregateRequestBucket);
