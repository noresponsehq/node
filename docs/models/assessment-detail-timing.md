# AssessmentDetailTiming

## Example Usage

```typescript
import { AssessmentDetailTiming } from "@noresponse/node/models";

let value: AssessmentDetailTiming = {
  deadlineMs: 3698,
  elapsedMs: 580970,
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `deadlineMs`                                                      | *number*                                                          | :heavy_check_mark:                                                | The budget the server applied to the synchronous answer.          |
| `elapsedMs`                                                       | *number*                                                          | :heavy_check_mark:                                                | Server time from HTTP ingress to this revision of the assessment. |