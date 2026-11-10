# ScreeningCoverage

The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.

## Example Usage

```typescript
import { ScreeningCoverage } from "@noresponse/node/models";

let value: ScreeningCoverage = {
  accountsFound: 537663,
  accountsAccessible: 310229,
  itemsRead: 863915,
  periodFrom: "2026-01-01T00:00:00Z",
  periodTo: "2026-01-02T00:00:00Z",
  platforms: [],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    | Example                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `accountsFound`                                                                | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |                                                                                |
| `accountsAccessible`                                                           | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |                                                                                |
| `itemsRead`                                                                    | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |                                                                                |
| `periodFrom`                                                                   | *string*                                                                       | :heavy_minus_sign:                                                             | The oldest item read on any platform.                                          | 2026-01-01T00:00:00Z                                                           |
| `periodTo`                                                                     | *string*                                                                       | :heavy_minus_sign:                                                             | The newest item read on any platform.                                          | 2026-01-02T00:00:00Z                                                           |
| `platforms`                                                                    | [models.ScreeningPlatformCoverage](../models/screening-platform-coverage.md)[] | :heavy_check_mark:                                                             | N/A                                                                            |                                                                                |