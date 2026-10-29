# OutcomesByOutcome

Current customer-reported labels, not independently established ground truth. Missing keys mean zero. Unknown is an explicit report; absent or expired feedback is unreported.

## Example Usage

```typescript
import { OutcomesByOutcome } from "@noresponse/node/models";

let value: OutcomesByOutcome = {};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `confirmedAbuse`   | *number*           | :heavy_minus_sign: | N/A                |
| `accountTakeover`  | *number*           | :heavy_minus_sign: | N/A                |
| `chargeback`       | *number*           | :heavy_minus_sign: | N/A                |
| `falsePositive`    | *number*           | :heavy_minus_sign: | N/A                |
| `legitimate`       | *number*           | :heavy_minus_sign: | N/A                |
| `unknown`          | *number*           | :heavy_minus_sign: | N/A                |