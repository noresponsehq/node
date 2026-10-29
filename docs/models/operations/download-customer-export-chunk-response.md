# DownloadCustomerExportChunkResponse

## Example Usage

```typescript
import { DownloadCustomerExportChunkResponse } from "@noresponse/node/models/operations";

let value: DownloadCustomerExportChunkResponse = {
  headers: {
    "key": [
      "example 1",
    ],
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
    exportId: "exp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    index: 192167,
    generation: 773186,
    sha256: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    data:
      "eyJ0eXBlIjoiYXVkaXQiLCJkYXRhIjp7ImFjdGlvbiI6InBvbGljeS51cGRhdGVkIn19Cg==",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `headers`                                                           | Record<string, *string*[]>                                          | :heavy_check_mark:                                                  | N/A                                                                 |
| `result`                                                            | [models.CustomerExportChunk](../../models/customer-export-chunk.md) | :heavy_check_mark:                                                  | N/A                                                                 |