# AssessmentTiming

## Example Usage

```typescript
import { AssessmentTiming } from "@noresponse/node/models";

let value: AssessmentTiming = {
  deadlineMs: 224343,
  elapsedMs: 330616,
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `deadlineMs`                                                      | *number*                                                          | :heavy_check_mark:                                                | The budget the server applied to the synchronous answer.          |
| `elapsedMs`                                                       | *number*                                                          | :heavy_check_mark:                                                | Server time from HTTP ingress to this revision of the assessment. |