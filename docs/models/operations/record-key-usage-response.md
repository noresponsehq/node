# RecordKeyUsageResponse

## Example Usage

```typescript
import { RecordKeyUsageResponse } from "@noresponse/node/models/operations";

let value: RecordKeyUsageResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
  },
  result: {
    id: "kub_01JA2ZE4M5N6P7Q8R9S0T1V2W3",
    receivedAt: "2026-10-23T09:14:12.000Z",
    accepted: 946750,
    ignored: 491804,
  },
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `headers`                                               | Record<string, *string*[]>                              | :heavy_check_mark:                                      | N/A                                                     |
| `result`                                                | [models.KeyUsageBatch](../../models/key-usage-batch.md) | :heavy_check_mark:                                      | N/A                                                     |