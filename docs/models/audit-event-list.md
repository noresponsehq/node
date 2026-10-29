# AuditEventList

GET /v1/workspaces/{workspace_id}/audit_events: one page of the workspace's audit log, both environments, newest first. Events are kept for as long as the workspace exists and are deleted with it. next_cursor is present only when another page exists.

## Example Usage

```typescript
import { AuditEventList } from "@noresponse/node/models";

let value: AuditEventList = {
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
};
```

## Fields

| Field                                                                                                                                                                                                  | Type                                                                                                                                                                                                   | Required                                                                                                                                                                                               | Description                                                                                                                                                                                            | Example                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `workspaceId`                                                                                                                                                                                          | *string*                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                     | The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.   | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                                                         |
| `items`                                                                                                                                                                                                | [models.AuditEvent](../models/audit-event.md)[]                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                                                     | N/A                                                                                                                                                                                                    |                                                                                                                                                                                                        |
| `nextCursor`                                                                                                                                                                                           | *string*                                                                                                                                                                                               | :heavy_minus_sign:                                                                                                                                                                                     | Opaque cursor for the next page, MAC'd by the server and bound to the workspace it was issued for. Pass it back unchanged as cursor; a tampered, foreign or expired cursor answers 400 invalid_cursor. | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ                                                                                                                             |