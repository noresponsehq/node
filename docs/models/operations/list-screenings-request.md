# ListScreeningsRequest

## Example Usage

```typescript
import { ListScreeningsRequest } from "@noresponse/node/models/operations";

let value: ListScreeningsRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `groupId`                            | *string*                             | :heavy_check_mark:                   | N/A                                  | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM       |
| `limit`                              | *number*                             | :heavy_minus_sign:                   | At most this many items.             |                                      |
| `before`                             | *string*                             | :heavy_minus_sign:                   | Read screenings older than this one. |                                      |