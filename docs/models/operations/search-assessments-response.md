# SearchAssessmentsResponse

## Example Usage

```typescript
import { SearchAssessmentsResponse } from "@noresponse/node/models/operations";

let value: SearchAssessmentsResponse = {
  headers: {
    "key": [
      "example 1",
    ],
  },
  result: {
    schemaVersion: "1",
    items: [],
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