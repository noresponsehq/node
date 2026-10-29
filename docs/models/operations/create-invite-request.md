# CreateInviteRequest

## Example Usage

```typescript
import { CreateInviteRequest } from "@noresponse/node/models/operations";

let value: CreateInviteRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    role: "viewer",
    email: "alex@example.com",
    externalUserId: "user_teammate",
    environments: [
      "test",
    ],
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `body`                                                                                                                             | [models.InviteRequest](../../models/invite-request.md)                                                                             | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                | {<br/>"role": "viewer",<br/>"email": "alex@example.com",<br/>"external_user_id": "user_teammate",<br/>"environments": [<br/>"test"<br/>]<br/>} |