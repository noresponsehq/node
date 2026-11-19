# ScreeningCoverageTiming

How long this search's latest attempt took, stage by stage. started_at minus the investigation's creation is the time spent queued or retrying.

## Example Usage

```typescript
import { ScreeningCoverageTiming } from "@noresponse/node/models";

let value: ScreeningCoverageTiming = {
  startedAt: "2026-01-01T00:00:00Z",
  totalMs: 855449,
  stages: [],
};
```

## Fields

| Field                                                                                                                     | Type                                                                                                                      | Required                                                                                                                  | Description                                                                                                               | Example                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `startedAt`                                                                                                               | *string*                                                                                                                  | :heavy_check_mark:                                                                                                        | When the attempt that wrote this result started.                                                                          | 2026-01-01T00:00:00Z                                                                                                      |
| `totalMs`                                                                                                                 | *number*                                                                                                                  | :heavy_check_mark:                                                                                                        | Milliseconds from started_at to the end of the last stage listed.                                                         |                                                                                                                           |
| `stages`                                                                                                                  | [models.StageTime](../models/stage-time.md)[]                                                                             | :heavy_check_mark:                                                                                                        | Stages finished so far, in order. The result first written lists stages up to written; the settled result lists them all. |                                                                                                                           |