# RotateWebhookSigningKeyResponse

## Example Usage

```typescript
import { RotateWebhookSigningKeyResponse } from "@noresponse/node/models/operations";

let value: RotateWebhookSigningKeyResponse = {
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
    "key2": [],
  },
  result: {
    endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
    signingSecret: {
      keyId: "whk_01JA2ZD1M2N3P4Q5R6S7T8V9W0",
      secret: "Zm9yLWRvY3Mtb25seS1ub3QtYS1yZWFsLXNlY3JldDA",
      createdAt: "2026-10-22T09:00:00.000Z",
    },
    previousKeyId: "whk_01JA2Z9A1B2C3D4E5F6G7H8J9K",
    previousKeyExpiresAt: "2026-10-29T10:00:00.000Z",
  },
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `headers`                                                         | Record<string, *string*[]>                                        | :heavy_check_mark:                                                | N/A                                                               |
| `result`                                                          | [models.WebhookKeyRotation](../../models/webhook-key-rotation.md) | :heavy_check_mark:                                                | N/A                                                               |