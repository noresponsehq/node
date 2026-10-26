# FootprintTimeline

One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.

## Example Usage

```typescript
import { FootprintTimeline } from "@noresponse/node/models";

let value: FootprintTimeline = {
  firstSeenYear: 15963,
  lastSeenYear: 648483,
  spanYears: 890911,
  sites: 874356,
  families: [],
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `firstSeenYear`                                           | *number*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `lastSeenYear`                                            | *number*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `spanYears`                                               | *number*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `lastActiveYear`                                          | *number*                                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `sites`                                                   | *number*                                                  | :heavy_check_mark:                                        | N/A                                                       |
| `families`                                                | [models.FootprintFamily](../models/footprint-family.md)[] | :heavy_check_mark:                                        | N/A                                                       |