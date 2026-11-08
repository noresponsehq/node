# ListScreeningsResponse

## Example Usage

```typescript
import { ListScreeningsResponse } from "@noresponse/node/models/operations";

let value: ListScreeningsResponse = {
  headers: {},
  result: {
    items: [],
    nextBefore: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.ScreeningList](../../models/screening-list.md) | :heavy_check_mark:                                     | N/A                                                    |