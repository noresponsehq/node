# RiskSummaryPhone

## Example Usage

```typescript
import { RiskSummaryPhone } from "@noresponse/node/models";

let value: RiskSummaryPhone = {};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `lineType`                                                                                   | [models.LineType](../models/line-type.md)                                                    | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `country`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `reportCount`                                                                                | *number*                                                                                     | :heavy_minus_sign:                                                                           | Highest report count any source gave for the number.                                         |
| `carrier`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | Carrier-network metadata from privately weighted sources; not upstream provider attribution. |