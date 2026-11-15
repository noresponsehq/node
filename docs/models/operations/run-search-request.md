# RunSearchRequest

## Example Usage

```typescript
import { RunSearchRequest } from "@noresponse/node/models/operations";

let value: RunSearchRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  searchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {},
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `groupId`                                                                 | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                            |
| `personId`                                                                | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                            |
| `searchId`                                                                | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       | srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                            |
| `body`                                                                    | [models.ScreeningCancelRequest](../../models/screening-cancel-request.md) | :heavy_check_mark:                                                        | N/A                                                                       |                                                                           |