# ReviewResolveRequest

## Example Usage

```typescript
import { ReviewResolveRequest } from "@noresponse/node/models";

let value: ReviewResolveRequest = {
  expectedVersion: 383552,
  expectedRiskVersion: 294652,
  conclusion: "abuse",
  note: "Reviewed the retained account evidence and customer report.",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 | Example                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `expectedVersion`                                           | *number*                                                    | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `expectedRiskVersion`                                       | *number*                                                    | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `conclusion`                                                | [models.Conclusion](../models/conclusion.md)                | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `note`                                                      | *string*                                                    | :heavy_check_mark:                                          | N/A                                                         | Reviewed the retained account evidence and customer report. |