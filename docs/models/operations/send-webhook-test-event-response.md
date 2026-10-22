# SendWebhookTestEventResponse

## Example Usage

```typescript
import { SendWebhookTestEventResponse } from "@noresponse/node/models/operations";

let value: SendWebhookTestEventResponse = {
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
    deliveryId: "evt_01JA2ZD3K4M5N6P7Q8R9S0T1V2",
    endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
    event: "assessment.updated",
    state: "verified",
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `headers`                                          | Record<string, *string*[]>                         | :heavy_check_mark:                                 | N/A                                                |
| `result`                                           | [models.WebhookTest](../../models/webhook-test.md) | :heavy_check_mark:                                 | N/A                                                |