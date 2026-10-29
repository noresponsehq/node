# SummarizeWorkspaceOperationsRequest

## Example Usage

```typescript
import { SummarizeWorkspaceOperationsRequest } from "@noresponse/node/models/operations";

let value: SummarizeWorkspaceOperationsRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    environment: "test",
    from: "2026-01-01T00:00:00Z",
    to: "2026-01-02T00:00:00Z",
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `body`                                                                                                                             | [models.WorkspaceOperationsSummaryRequest](../../models/workspace-operations-summary-request.md)                                   | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |