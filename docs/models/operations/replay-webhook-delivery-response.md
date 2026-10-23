# ReplayWebhookDeliveryResponse

## Example Usage

```typescript
import { ReplayWebhookDeliveryResponse } from "@noresponse/node/models/operations";

let value: ReplayWebhookDeliveryResponse = {
  headers: {
    "key": [],
    "key1": [],
  },
  result: {
    endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
    eventId: "evt_01JA2ZD3K4M5N6P7Q8R9S0T1V2",
    eventType: "assessment.updated",
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.WebhookReplay](../../models/webhook-replay.md) | :heavy_check_mark:                                     | N/A                                                    |