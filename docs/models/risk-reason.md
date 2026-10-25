# RiskReason

## Example Usage

```typescript
import { RiskReason } from "@noresponse/node/models";

let value: RiskReason = {
  code: "shared_ip",
  weight: 702196,
};
```

## Fields

| Field                                                                                                                                                                         | Type                                                                                                                                                                          | Required                                                                                                                                                                      | Description                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`                                                                                                                                                                        | [models.ReasonCode](../models/reason-code.md)                                                                                                                                 | :heavy_check_mark:                                                                                                                                                            | A stable reason code. New codes may appear; ignore any you do not know.                                                                                                       |
| `weight`                                                                                                                                                                      | *number*                                                                                                                                                                      | :heavy_check_mark:                                                                                                                                                            | N/A                                                                                                                                                                           |
| `identifier`                                                                                                                                                                  | [models.ReasonIdentifier](../models/reason-identifier.md)                                                                                                                     | :heavy_minus_sign:                                                                                                                                                            | The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint. |