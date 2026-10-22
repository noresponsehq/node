# SendWebhookTestEventRequest

## Example Usage

```typescript
import { SendWebhookTestEventRequest } from "@noresponse/node/models/operations";

let value: SendWebhookTestEventRequest = {
  endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
  body: {
    event: "endpoint.verification",
  },
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               | Example                                                                                   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `endpointId`                                                                              | *string*                                                                                  | :heavy_check_mark:                                                                        | The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404. | whe_01JA2ZD0E1F2G3H4J5K6M7N8P9                                                            |
| `body`                                                                                    | [models.WebhookTestRequest](../../models/webhook-test-request.md)                         | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |