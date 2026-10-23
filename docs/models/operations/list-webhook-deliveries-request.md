# ListWebhookDeliveriesRequest

## Example Usage

```typescript
import { ListWebhookDeliveriesRequest } from "@noresponse/node/models/operations";

let value: ListWebhookDeliveriesRequest = {
  endpointId: "whe_01JA2ZD0E1F2G3H4J5K6M7N8P9",
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               | Example                                                                                   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `endpointId`                                                                              | *string*                                                                                  | :heavy_check_mark:                                                                        | The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404. | whe_01JA2ZD0E1F2G3H4J5K6M7N8P9                                                            |
| `limit`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Attempts per page.                                                                        |                                                                                           |
| `cursor`                                                                                  | *string*                                                                                  | :heavy_minus_sign:                                                                        | next_cursor from the previous page, unchanged.                                            |                                                                                           |