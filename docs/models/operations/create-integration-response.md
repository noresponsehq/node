# CreateIntegrationResponse

## Example Usage

```typescript
import { CreateIntegrationResponse } from "@noresponse/node/models/operations";

let value: CreateIntegrationResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
    ],
  },
  result: {
    integrationId: "int_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    platform: "workos",
    hookPoints: [
      "post_login",
    ],
    url: "https://api.noresponse.org/hooks/int_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    secret: "nri_k3Yx8pQ2mN7vR4tW6zB9cD1eF5gH0jL4sP9uV2wX7yA",
    createdAt: "2026-10-14T09:00:00.000Z",
    rotatedAt: "2026-10-15T09:00:00.000Z",
    previousSecretExpiresAt: "2026-10-16T09:00:00.000Z",
  },
};
```

## Fields

| Field                                             | Type                                              | Required                                          | Description                                       |
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `headers`                                         | Record<string, *string*[]>                        | :heavy_check_mark:                                | N/A                                               |
| `result`                                          | [models.Integration](../../models/integration.md) | :heavy_check_mark:                                | N/A                                               |