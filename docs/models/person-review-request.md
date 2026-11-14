# PersonReviewRequest

Records a decision on a person.

## Example Usage

```typescript
import { PersonReviewRequest } from "@noresponse/node/models";

let value: PersonReviewRequest = {
  decision: "escalated",
  note: "Known to the venue team.",
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `decision`                                            | [models.PersonDecision](../models/person-decision.md) | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `note`                                                | *string*                                              | :heavy_minus_sign:                                    | Why, for the venue team and later reviewers.          | Known to the venue team.                              |