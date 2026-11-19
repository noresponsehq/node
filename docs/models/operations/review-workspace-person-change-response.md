# ReviewWorkspacePersonChangeResponse

## Example Usage

```typescript
import { ReviewWorkspacePersonChangeResponse } from "@noresponse/node/models/operations";

let value: ReviewWorkspacePersonChangeResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
    ],
  },
  result: {
    id: "chg_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    kind: "identifier_added",
    significance: "high",
    source: "github",
    field: "email",
    before: "jane@example.com",
    after: "jane.doe@example.com",
    investigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
    previousInvestigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    createdAt: "2026-01-02T00:00:00Z",
    reviewedAt: "2026-01-02T00:05:00Z",
    reviewedBy: "Jane Analyst",
  },
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `headers`                                            | Record<string, *string*[]>                           | :heavy_check_mark:                                   | N/A                                                  |
| `result`                                             | [models.PersonChange](../../models/person-change.md) | :heavy_check_mark:                                   | N/A                                                  |