# AuditStreamReplayRequest

## Example Usage

```typescript
import { AuditStreamReplayRequest } from "@noresponse/node/models";

let value: AuditStreamReplayRequest = {
  eventId: "evt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                                                                                | Type                                                                                                                                 | Required                                                                                                                             | Description                                                                                                                          | Example                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `eventId`                                                                                                                            | *string*                                                                                                                             | :heavy_check_mark:                                                                                                                   | Opaque, workspace-scoped webhook event id. A redelivery of the same event carries the same event_id, so consumers deduplicate on it. | evt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                       |