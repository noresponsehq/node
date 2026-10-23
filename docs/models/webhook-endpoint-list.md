# WebhookEndpointList

GET /v1/webhooks answer: every endpoint of the calling workspace, in every state, ordered by endpoint_id. A workspace holds at most 5, so there is no page.

## Example Usage

```typescript
import { WebhookEndpointList } from "@noresponse/node/models";

let value: WebhookEndpointList = {
  items: [],
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `items`                                                   | [models.WebhookEndpoint](../models/webhook-endpoint.md)[] | :heavy_check_mark:                                        | N/A                                                       |