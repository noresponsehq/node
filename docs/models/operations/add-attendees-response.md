# AddAttendeesResponse

## Example Usage

```typescript
import { AddAttendeesResponse } from "@noresponse/node/models/operations";

let value: AddAttendeesResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [],
  },
  result: {
    created: 345055,
    updated: 625650,
    items: [
      {
        index: 688880,
        id: "att_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        outcome: "unchanged",
      },
    ],
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.AttendeeBatch](../../models/attendee-batch.md) | :heavy_check_mark:                                     | N/A                                                    |