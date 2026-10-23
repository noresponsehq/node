# WebhookEndpointCreated

The 201 answer of POST /v1/webhooks: the new endpoint, unverified, and its first signing secret, shown once. Store the secret where the receiver reads it, then send endpoint.verification with POST /v1/webhooks/{endpoint_id}/test.

## Example Usage

```typescript
import { WebhookEndpointCreated } from "@noresponse/node/models";

let value: WebhookEndpointCreated = {
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
};
```

## Fields

| Field                                                                                                                                                                                              | Type                                                                                                                                                                                               | Required                                                                                                                                                                                           | Description                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`                                                                                                                                                                                         | [models.WebhookEndpoint](../models/webhook-endpoint.md)                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                 | One of the workspace's registered webhook endpoints. Signing secrets are not part of it: a secret is shown once, when it is issued (POST /v1/webhooks and POST /v1/webhooks/{endpoint_id}/rotate). |
| `signingSecret`                                                                                                                                                                                    | [models.SigningSecret](../models/signing-secret.md)                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                 | A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.                              |