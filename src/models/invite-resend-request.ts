import * as z from "zod/v4-mini";

export type InviteResendRequest = {};

/** @internal */
export type InviteResendRequest$Outbound = {};

/** @internal */
export const InviteResendRequest$outboundSchema: z.ZodMiniType<
  InviteResendRequest$Outbound,
  InviteResendRequest
> = z.object({});

export function inviteResendRequestToJSON(
  inviteResendRequest: InviteResendRequest,
): string {
  return JSON.stringify(
    InviteResendRequest$outboundSchema.parse(inviteResendRequest),
  );
}
