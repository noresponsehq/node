# DeleteWebhookEndpointRequest

## Example Usage

```typescript
import { DeleteWebhookEndpointRequest } from "@noresponse/node/models/operations";

let value: DeleteWebhookEndpointRequest = {
  endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `endpointId`                                                                                 | *string*                                                                                     | :heavy_check_mark:                                                                           | The endpoint's whe_ id. An id that is unknown, malformed or another workspace's answers 404. | whe_01JA2ZD0E1F2G3H4J5K6M7N8P9                                                               |