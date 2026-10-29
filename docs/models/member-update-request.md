# MemberUpdateRequest

PATCH /v1/workspaces/{workspace_id}/members/{member_id} body: the member's new role. The workspace's last owner cannot be demoted.

## Example Usage

```typescript
import { MemberUpdateRequest } from "@noresponse/node/models";

let value: MemberUpdateRequest = {
  role: "viewer",
  environments: [
    "test",
  ],
};
```

## Fields

| Field                                                                                                                                                                             | Type                                                                                                                                                                              | Required                                                                                                                                                                          | Description                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `role`                                                                                                                                                                            | [models.Role](../models/role.md)                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                | A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.                                      |
| `environments`                                                                                                                                                                    | [models.MemberUpdateRequestEnvironment](../models/member-update-request-environment.md)[]                                                                                         | :heavy_minus_sign:                                                                                                                                                                | Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.                                                     |
| `deniedActions`                                                                                                                                                                   | [models.MemberUpdateRequestDeniedAction](../models/member-update-request-denied-action.md)[]                                                                                      | :heavy_minus_sign:                                                                                                                                                                | Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions. |