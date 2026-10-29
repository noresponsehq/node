# UpdateMemberResponse

## Example Usage

```typescript
import { UpdateMemberResponse } from "@noresponse/node/models/operations";

let value: UpdateMemberResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key2": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    id: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    externalUserId: "user_teammate",
    role: "admin",
    status: "active",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    principalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    displayName: "Alex Example",
    unverifiedEmail: "alex@example.com",
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Member](../../models/member.md) | :heavy_check_mark:                      | N/A                                     |