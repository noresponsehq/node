# ScreeningRequest

Screens the group's people no screening has reached.

## Example Usage

```typescript
import { ScreeningRequest } from "@noresponse/node/models";

let value: ScreeningRequest = {
  depth: "standard",
  platforms: [
    "bluesky",
  ],
};
```

## Fields

| Field                                                                                                                                                                    | Type                                                                                                                                                                     | Required                                                                                                                                                                 | Description                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `depth`                                                                                                                                                                  | [models.ScreeningDepth](../models/screening-depth.md)                                                                                                                    | :heavy_check_mark:                                                                                                                                                       | N/A                                                                                                                                                                      |
| `platforms`                                                                                                                                                              | *string*[]                                                                                                                                                               | :heavy_minus_sign:                                                                                                                                                       | The platforms to search. Leave it out for a full search: every platform a connector serves in the environment when the screening starts, which the screening then lists. |