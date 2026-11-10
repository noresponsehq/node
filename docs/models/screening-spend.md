# ScreeningSpend

What screening cost, in US cents, in total and per implementation.

## Example Usage

```typescript
import { ScreeningSpend } from "@noresponse/node/models";

let value: ScreeningSpend = {
  totalMinor: 740581,
  byImplementation: [],
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `totalMinor`                                                     | *number*                                                         | :heavy_check_mark:                                               | The total, in US cents.                                          |
| `byImplementation`                                               | [models.ScreeningSpendLine](../models/screening-spend-line.md)[] | :heavy_check_mark:                                               | N/A                                                              |