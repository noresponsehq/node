# CustomerExportList

List exports for one collection.

## Example Usage

```typescript
import { CustomerExportList } from "@noresponse/node/models";

let value: CustomerExportList = {
  items: [
    {
      id: "exp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      kind: "audit",
      environment: "live",
      responseMode: "detailed",
      status: "running",
      createdAt: "2026-01-01T00:00:00Z",
      snapshotAt: "2026-01-01T00:00:00Z",
      expiresAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:00Z",
      records: 598139,
      bytes: 180935,
      chunks: 513460,
      attempts: 841133,
      generation: 655130,
      errorCode: "artifact_too_large",
      requestSha256:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
  ],
  nextCursor: "eyJwYWdlIjoyfQ",
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             | Example                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `items`                                                 | [models.CustomerExport](../models/customer-export.md)[] | :heavy_check_mark:                                      | N/A                                                     |                                                         |
| `nextCursor`                                            | *string*                                                | :heavy_minus_sign:                                      | N/A                                                     | eyJwYWdlIjoyfQ                                          |