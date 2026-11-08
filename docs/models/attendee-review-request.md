# AttendeeReviewRequest

Records a decision on an attendee.

## Example Usage

```typescript
import { AttendeeReviewRequest } from "@noresponse/node/models";

let value: AttendeeReviewRequest = {
  decision: "escalated",
  note: "Known to the venue team.",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               | Example                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `decision`                                                | [models.AttendeeDecision](../models/attendee-decision.md) | :heavy_check_mark:                                        | N/A                                                       |                                                           |
| `note`                                                    | *string*                                                  | :heavy_minus_sign:                                        | Why, for the venue team and later reviewers.              | Known to the venue team.                                  |