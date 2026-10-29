# UpdateMemberRequest

## Example Usage

```typescript
import { UpdateMemberRequest } from "@noresponse/node/models/operations";

let value: UpdateMemberRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  memberId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    role: "viewer",
    environments: [
      "test",
    ],
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `memberId`                                                                                                                         | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The member's mem_ id. A member of another workspace, or a removed one, answers 404.                                                | mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `body`                                                                                                                             | [models.MemberUpdateRequest](../../models/member-update-request.md)                                                                | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                | {<br/>"role": "viewer",<br/>"environments": [<br/>"test"<br/>]<br/>}                                                               |