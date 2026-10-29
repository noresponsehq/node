# ListAuditEventsResponse

## Example Usage

```typescript
import { ListAuditEventsResponse } from "@noresponse/node/models/operations";

let value: ListAuditEventsResponse = {
  headers: {
    "key": [
      "example 1",
    ],
  },
  result: {
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    items: [
      {
        id: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "test",
        action: "member.role_changed",
        outcome: "denied",
        actor: {
          type: "api_key",
          keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        },
        target: {
          type: "invite",
          id: "mem_01JA2ZB4C5D6E7F8G9H0JKMNPQ",
        },
        detail: {
          "key": "test",
        },
        createdAt: "2026-10-23T09:10:00.000Z",
        requestId: "0123456789abcdef0123456789abcdef",
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `headers`                                                 | Record<string, *string*[]>                                | :heavy_check_mark:                                        | N/A                                                       |
| `result`                                                  | [models.AuditEventList](../../models/audit-event-list.md) | :heavy_check_mark:                                        | N/A                                                       |