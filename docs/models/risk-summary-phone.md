# RiskSummaryPhone

## Example Usage

```typescript
import { RiskSummaryPhone } from "@noresponse/node/models";

let value: RiskSummaryPhone = {
  country: "AU",
  carrier: "Telstra",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `lineType`                                                                                   | [models.LineType](../models/line-type.md)                                                    | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `country`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          | AU                                                                                           |
| `reportCount`                                                                                | *number*                                                                                     | :heavy_minus_sign:                                                                           | Highest report count any source gave for the number.                                         |                                                                                              |
| `carrier`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | Carrier-network metadata from privately weighted sources; not upstream provider attribution. | Telstra                                                                                      |