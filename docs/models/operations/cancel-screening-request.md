# CancelScreeningRequest

## Example Usage

```typescript
import { CancelScreeningRequest } from "@noresponse/node/models/operations";

let value: CancelScreeningRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  screeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {},
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `groupId`                                                                 | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                            |
| `screeningId`                                                             | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       | scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                            |
| `body`                                                                    | [models.ScreeningCancelRequest](../../models/screening-cancel-request.md) | :heavy_check_mark:                                                        | N/A                                                                       |                                                                           |