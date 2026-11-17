# JudgeWorkspacePersonRecordResponse

## Example Usage

```typescript
import { JudgeWorkspacePersonRecordResponse } from "@noresponse/node/models/operations";

let value: JudgeWorkspacePersonRecordResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
    verdict: "joined",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.RecordVerdict](../../models/record-verdict.md) | :heavy_check_mark:                                     | N/A                                                    |