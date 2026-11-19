# StageTime

## Example Usage

```typescript
import { StageTime } from "@noresponse/node/models";

let value: StageTime = {
  stage: "late_lookup",
  ms: 329060,
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `stage`                                                                                              | [models.Stage](../models/stage.md)                                                                   | :heavy_check_mark:                                                                                   | ai_typing and analysis appear only on searches recorded before the engine stopped analysing results. |
| `ms`                                                                                                 | *number*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |