# SearchAssessmentsResponse

## Example Usage

```typescript
import { SearchAssessmentsResponse } from "@noresponse/node/models/operations";

let value: SearchAssessmentsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
    "key2": [],
  },
  result: {
    schemaVersion: "1",
    items: [],
    total: 396158,
    totalCapped: true,
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `headers`                                                             | Record<string, *string*[]>                                            | :heavy_check_mark:                                                    | N/A                                                                   |
| `result`                                                              | [models.AssessmentSearchPage](../../models/assessment-search-page.md) | :heavy_check_mark:                                                    | N/A                                                                   |