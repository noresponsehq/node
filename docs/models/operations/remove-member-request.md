# RemoveMemberRequest

## Example Usage

```typescript
import { RemoveMemberRequest } from "@noresponse/node/models/operations";

let value: RemoveMemberRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  memberId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `memberId`                                                                                                                         | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The member's mem_ id. A member of another workspace, or a removed one, answers 404.                                                | mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |