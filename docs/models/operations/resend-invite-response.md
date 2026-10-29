# ResendInviteResponse

## Example Usage

```typescript
import { ResendInviteResponse } from "@noresponse/node/models/operations";

let value: ResendInviteResponse = {
  headers: {},
  result: {
    id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    role: "developer",
    email: "alex@example.com",
    externalUserId: "user_teammate",
    createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    createdAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-01-08T00:00:00Z",
    token:
      "nrinv_01JA2Z8K6Q4V7W9XBCDEFGHJKM_k3Yx8pQ2mN7vR4tW6zB9cD1eF5gH0jL4sP9uV2wX7yA",
    reissuedAt: "2026-01-02T00:00:00Z",
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Invite](../../models/invite.md) | :heavy_check_mark:                      | N/A                                     |