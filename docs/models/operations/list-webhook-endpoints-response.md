# ListWebhookEndpointsResponse

## Example Usage

```typescript
import { ListWebhookEndpointsResponse } from "@noresponse/node/models/operations";

let value: ListWebhookEndpointsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    items: [
      {
        endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
        url: "https://hooks.example.com/noresponse",
        state: "verified",
        responseMode: "standard",
        createdAt: "2026-10-22T09:00:00.000Z",
        verifiedAt: "2026-10-22T09:00:05.000Z",
        failingSince: "2026-10-20T09:58:31.000Z",
        lastFailureAt: "2026-10-23T10:00:00.000Z",
        disabledAt: "2026-10-23T10:00:00.000Z",
        signingKeys: [],
      },
    ],
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `headers`                                                           | Record<string, *string*[]>                                          | :heavy_check_mark:                                                  | N/A                                                                 |
| `result`                                                            | [models.WebhookEndpointList](../../models/webhook-endpoint-list.md) | :heavy_check_mark:                                                  | N/A                                                                 |