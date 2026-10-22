# CreateWebhookEndpointResponse

## Example Usage

```typescript
import { CreateWebhookEndpointResponse } from "@noresponse/node/models/operations";

let value: CreateWebhookEndpointResponse = {
  headers: {
    "key": [],
  },
  result: {
    endpoint: {
      endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
      url: "https://hooks.example.com/noresponse",
      state: "disabled",
      responseMode: "standard",
      createdAt: "2026-10-22T09:00:00.000Z",
      verifiedAt: "2026-10-22T09:00:05.000Z",
      signingKeys: [
        {
          keyId: "whk_01JA2ZD1M2N3P4Q5R6S7T8V9W0",
          createdAt: "2026-10-22T09:00:00.000Z",
          expiresAt: "2026-10-29T10:00:00.000Z",
        },
      ],
    },
    signingSecret: {
      keyId: "whk_01JA2ZD1M2N3P4Q5R6S7T8V9W0",
      secret: "Zm9yLWRvY3Mtb25seS1ub3QtYS1yZWFsLXNlY3JldDA",
      createdAt: "2026-10-22T09:00:00.000Z",
    },
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `headers`                                                                 | Record<string, *string*[]>                                                | :heavy_check_mark:                                                        | N/A                                                                       |
| `result`                                                                  | [models.WebhookEndpointCreated](../../models/webhook-endpoint-created.md) | :heavy_check_mark:                                                        | N/A                                                                       |