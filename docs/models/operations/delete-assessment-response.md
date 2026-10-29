# DeleteAssessmentResponse

## Example Usage

```typescript
import { DeleteAssessmentResponse } from "@noresponse/node/models/operations";

let value: DeleteAssessmentResponse = {
  headers: {},
  result: {
    schemaVersion: "1",
    id: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    deleted: true,
    account: {
      id: "acct_7f3a9c",
      currentAssessmentId: "asm_01JB3C4D5E6F7G8H9JKMNPQRST",
    },
    deletedAt: "2026-10-23T09:00:00.000Z",
    erasureId: "0123456789abcdef0123456789abcdef",
  },
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `headers`                                                        | Record<string, *string*[]>                                       | :heavy_check_mark:                                               | N/A                                                              |
| `result`                                                         | [models.AssessmentDeletion](../../models/assessment-deletion.md) | :heavy_check_mark:                                               | N/A                                                              |