# MemberList

GET /v1/workspaces/{workspace_id}/members: the workspace's active members, oldest first, at most 100.

## Example Usage

```typescript
import { MemberList } from "@noresponse/node/models";

let value: MemberList = {
  items: [
    {
      id: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      externalUserId: "user_teammate",
      role: "investigator",
      status: "active",
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
      principalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      displayName: "Alex Example",
      unverifiedEmail: "alex@example.com",
    },
  ],
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `items`                                | [models.Member](../models/member.md)[] | :heavy_check_mark:                     | N/A                                    |