# ListWebhookDeliveriesResponse

## Example Usage

```typescript
import { ListWebhookDeliveriesResponse } from "@noresponse/node/models/operations";

let value: ListWebhookDeliveriesResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
  },
  result: {
    endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
    items: [
      {
        eventId: "evt_01JA2ZD3K4M5N6P7Q8R9S0T1V2",
        eventType: "assessment.updated",
        attempt: 978524,
        replay: true,
        status: "failed",
        latencyMs: 531290,
        attemptedAt: "2026-10-22T09:00:00.951Z",
      },
    ],
    nextCursor: "eyJvIjoyMH0",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `headers`                                                           | Record<string, *string*[]>                                          | :heavy_check_mark:                                                  | N/A                                                                 |
| `result`                                                            | [models.WebhookDeliveryList](../../models/webhook-delivery-list.md) | :heavy_check_mark:                                                  | N/A                                                                 |