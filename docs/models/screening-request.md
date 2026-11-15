# ScreeningRequest

Screens the group's people no screening has reached and everyone on watch or escalated.

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

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `depth`                                               | [models.ScreeningDepth](../models/screening-depth.md) | :heavy_check_mark:                                    | N/A                                                   |
| `platforms`                                           | *string*[]                                            | :heavy_check_mark:                                    | N/A                                                   |