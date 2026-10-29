# RetryCustomerExportResponse

## Example Usage

```typescript
import { RetryCustomerExportResponse } from "@noresponse/node/models/operations";

let value: RetryCustomerExportResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    id: "exp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    kind: "audit",
    environment: "workspace",
    responseMode: "standard",
    status: "queued",
    createdAt: "2026-01-01T00:00:00Z",
    snapshotAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-01T00:00:00Z",
    records: 69798,
    bytes: 338777,
    chunks: 177669,
    attempts: 886076,
    generation: 459599,
    errorCode: "artifact_too_large",
    requestSha256:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.CustomerExport](../../models/customer-export.md) | :heavy_check_mark:                                       | N/A                                                      |