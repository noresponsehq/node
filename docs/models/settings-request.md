# SettingsRequest

PATCH /v1/workspaces/{workspace_id}/settings/{environment} body. Changes only what it names, in one transaction; a policy change is one new policy_version. Needs the admin or owner role, or an API key with the management scope for its own environment.

## Example Usage

```typescript
import { SettingsRequest } from "@noresponse/node/models";

let value: SettingsRequest = {};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `retentionDays`                                                                                     | *number*                                                                                            | :heavy_minus_sign:                                                                                  | N/A                                                                                                 |
| `refusedSources`                                                                                    | [models.SourceId](../models/source-id.md)[]                                                         | :heavy_minus_sign:                                                                                  | Replaces the refused sources; [] refuses none. A change applies to new assessments within a minute. |
| `flows`                                                                                             | [models.SettingsRequestFlows](../models/settings-request-flows.md)                                  | :heavy_minus_sign:                                                                                  | Use account_creation or its deprecated alias signup, not both.                                      |