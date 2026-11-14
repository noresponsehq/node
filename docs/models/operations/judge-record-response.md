# JudgeRecordResponse

## Example Usage

```typescript
import { JudgeRecordResponse } from "@noresponse/node/models/operations";

let value: JudgeRecordResponse = {
  headers: {},
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