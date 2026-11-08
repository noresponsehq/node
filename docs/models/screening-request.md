# ScreeningRequest

Screens the event's attendees no screening has reached and everyone on watch or escalated.

## Example Usage

```typescript
import { ScreeningRequest } from "@noresponse/node/models";

let value: ScreeningRequest = {
  depth: "standard",
  platforms: [],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `depth`                                                                      | [models.ScreeningDepth](../models/screening-depth.md)                        | :heavy_check_mark:                                                           | N/A                                                                          |
| `platforms`                                                                  | [models.ScreeningRequestPlatform](../models/screening-request-platform.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |