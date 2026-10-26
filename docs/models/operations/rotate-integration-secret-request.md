# RotateIntegrationSecretRequest

## Example Usage

```typescript
import { RotateIntegrationSecretRequest } from "@noresponse/node/models/operations";

let value: RotateIntegrationSecretRequest = {
  integrationId: "int_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    signingSecret: undefined,
  },
};
```

## Fields

| Field                                                                                                                                 | Type                                                                                                                                  | Required                                                                                                                              | Description                                                                                                                           | Example                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `integrationId`                                                                                                                       | *string*                                                                                                                              | :heavy_check_mark:                                                                                                                    | Path segment, matched case-sensitively. A value that does not match the integration_id shape, or another workspace's id, answers 404. | int_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                        |
| `body`                                                                                                                                | [models.IntegrationRotationRequest](../../models/integration-rotation-request.md)                                                     | :heavy_check_mark:                                                                                                                    | N/A                                                                                                                                   |                                                                                                                                       |