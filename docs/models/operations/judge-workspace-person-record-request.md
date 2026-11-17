# JudgeWorkspacePersonRecordRequest

## Example Usage

```typescript
import { JudgeWorkspacePersonRecordRequest } from "@noresponse/node/models/operations";

let value: JudgeWorkspacePersonRecordRequest = {
  personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
    verdict: "rejected",
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           | Example                                                               |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `personId`                                                            | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                        |
| `body`                                                                | [models.RecordVerdictRequest](../../models/record-verdict-request.md) | :heavy_check_mark:                                                    | N/A                                                                   |                                                                       |