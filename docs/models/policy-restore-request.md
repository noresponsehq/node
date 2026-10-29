# PolicyRestoreRequest

Publish a captured configuration as a new version. Version checks and publication are atomic. Longer retention does not revive expired records, and restored policy does not undo customer enforcement.

## Example Usage

```typescript
import { PolicyRestoreRequest } from "@noresponse/node/models";

let value: PolicyRestoreRequest = {
  version: 845995,
  expectedPolicyVersion: 738781,
  changeReason: "Adjust thresholds after reviewing retained evidence",
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         | Example                                             |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `version`                                           | *number*                                            | :heavy_check_mark:                                  | N/A                                                 |                                                     |
| `expectedPolicyVersion`                             | *number*                                            | :heavy_check_mark:                                  | N/A                                                 |                                                     |
| `changeReason`                                      | *string*                                            | :heavy_check_mark:                                  | N/A                                                 | Adjust thresholds after reviewing retained evidence |