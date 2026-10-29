# Resolution

## Example Usage

```typescript
import { Resolution } from "@noresponse/node/models";

let value: Resolution = {
  reviewVersion: 933094,
  riskVersion: 64996,
  assessmentVersion: 839161,
  assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  conclusion: "inconclusive",
  note: "Reviewed the retained account evidence and customer report.",
  createdBy: "usr_customer_admin",
  createdAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 | Example                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `reviewVersion`                                             | *number*                                                    | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `riskVersion`                                               | *number*                                                    | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `assessmentVersion`                                         | *number*                                                    | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `assessmentId`                                              | *string*                                                    | :heavy_check_mark:                                          | N/A                                                         | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                              |
| `conclusion`                                                | [models.Conclusion](../models/conclusion.md)                | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `note`                                                      | *string*                                                    | :heavy_check_mark:                                          | N/A                                                         | Reviewed the retained account evidence and customer report. |
| `createdBy`                                                 | *string*                                                    | :heavy_check_mark:                                          | N/A                                                         | usr_customer_admin                                          |
| `createdAt`                                                 | *string*                                                    | :heavy_check_mark:                                          | N/A                                                         | 2026-01-01T00:00:00Z                                        |