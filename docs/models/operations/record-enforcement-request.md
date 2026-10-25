# RecordEnforcementRequest

## Example Usage

```typescript
import { RecordEnforcementRequest } from "@noresponse/node/models/operations";

let value: RecordEnforcementRequest = {
  accountId: "acct_7f3a9c",
  body: {
    riskVersion: 255844,
    flow: "purchase",
    action: "fail_onboarding",
    stateBefore: "provisional",
    status: "failed",
    provider: "workos",
    errorCode: "clerk.rate_limited",
  },
};
```

## Fields

| Field                                                                                                                                                                                                              | Type                                                                                                                                                                                                               | Required                                                                                                                                                                                                           | Description                                                                                                                                                                                                        | Example                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accountId`                                                                                                                                                                                                        | *string*                                                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                                 | The account_id the workspace sends with its assessments, as one path segment (percent-encode '\|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request. | acct_7f3a9c                                                                                                                                                                                                        |
| `body`                                                                                                                                                                                                             | [models.EnforcementRequest](../../models/enforcement-request.md)                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                 | N/A                                                                                                                                                                                                                |                                                                                                                                                                                                                    |