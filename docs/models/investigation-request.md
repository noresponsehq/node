# InvestigationRequest

Runs a new investigation against one retained workspace person.

## Example Usage

```typescript
import { InvestigationRequest } from "@noresponse/node/models";

let value: InvestigationRequest = {
  depth: "standard",
  platforms: [
    "x",
  ],
  personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `depth`                                               | [models.ScreeningDepth](../models/screening-depth.md) | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `platforms`                                           | *string*[]                                            | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `personId`                                            | *string*                                              | :heavy_check_mark:                                    | N/A                                                   | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                        |