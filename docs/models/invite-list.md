# InviteList

GET /v1/workspaces/{workspace_id}/invites: the workspace's pending invites, oldest first, at most 50, with no token.

## Example Usage

```typescript
import { InviteList } from "@noresponse/node/models";

let value: InviteList = {
  items: [
    {
      id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      role: "admin",
      email: "alex@example.com",
      externalUserId: "user_teammate",
      createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      createdAt: "2026-01-01T00:00:00Z",
      expiresAt: "2026-01-08T00:00:00Z",
      token:
        "nrinv_01JA2Z8K6Q4V7W9XBCDEFGHJKM_k3Yx8pQ2mN7vR4tW6zB9cD1eF5gH0jL4sP9uV2wX7yA",
      reissuedAt: "2026-01-02T00:00:00Z",
    },
  ],
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `items`                                | [models.Invite](../models/invite.md)[] | :heavy_check_mark:                     | N/A                                    |