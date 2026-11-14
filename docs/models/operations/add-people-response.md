# AddPeopleResponse

## Example Usage

```typescript
import { AddPeopleResponse } from "@noresponse/node/models/operations";

let value: AddPeopleResponse = {
  headers: {},
  result: {
    created: 324642,
    updated: 825849,
    items: [],
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `headers`                                          | Record<string, *string*[]>                         | :heavy_check_mark:                                 | N/A                                                |
| `result`                                           | [models.PersonBatch](../../models/person-batch.md) | :heavy_check_mark:                                 | N/A                                                |