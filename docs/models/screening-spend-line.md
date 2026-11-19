# ScreeningSpendLine

What one implementation cost.

## Example Usage

```typescript
import { ScreeningSpendLine } from "@noresponse/node/models";

let value: ScreeningSpendLine = {
  implementation: "synthetic",
  role: "resolver",
  spendMinor: 827661,
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     | Example                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `implementation`                                                                                                | *string*                                                                                                        | :heavy_check_mark:                                                                                              | The resolver or collector that produced a record, by its catalogue name.                                        | synthetic                                                                                                       |
| `role`                                                                                                          | [models.ScreeningSpendLineRole](../models/screening-spend-line-role.md)                                         | :heavy_check_mark:                                                                                              | What the implementation did. analyser appears only on spend recorded before the engine stopped analysing posts. |                                                                                                                 |
| `spendMinor`                                                                                                    | *number*                                                                                                        | :heavy_check_mark:                                                                                              | N/A                                                                                                             |                                                                                                                 |