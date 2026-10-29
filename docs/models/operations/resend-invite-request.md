# ResendInviteRequest

## Example Usage

```typescript
import { ResendInviteRequest } from "@noresponse/node/models/operations";

let value: ResendInviteRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  inviteId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {},
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `inviteId`                                                                                                                         | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The invite's inv_ id. An invite of another workspace, or one no longer pending, answers 404.                                       | inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `body`                                                                                                                             | [models.InviteResendRequest](../../models/invite-resend-request.md)                                                                | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |