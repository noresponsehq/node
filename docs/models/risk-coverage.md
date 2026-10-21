# RiskCoverage

Sources counted by state, not named.

## Example Usage

```typescript
import { RiskCoverage } from "@noresponse/node/models";

let value: RiskCoverage = {
  answered: 617215,
  failed: 210507,
  pending: 529549,
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `answered`                           | *number*                             | :heavy_check_mark:                   | Sources that gave a definite answer. |
| `failed`                             | *number*                             | :heavy_check_mark:                   | Sources that could not answer.       |
| `pending`                            | *number*                             | :heavy_check_mark:                   | Sources still being asked.           |