# CreateGroupRequest

## Example Usage

```typescript
import { CreateGroupRequest } from "@noresponse/node/models/operations";

let value: CreateGroupRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "live",
  body: {
    name: "Annual shareholder meeting",
    startsAt: "2026-01-01T00:00:00Z",
    endsAt: "2026-01-02T00:00:00Z",
    venue: "Example Convention Centre",
    host: "Example Holdings",
    principals: [
      {
        name: "Alex Principal",
        aliases: [
          "Alex P",
        ],
      },
    ],
    topics: [
      "executive pay",
    ],
  },
};
```

## Fields

| Field                                                                                                                                                                  | Type                                                                                                                                                                   | Required                                                                                                                                                               | Description                                                                                                                                                            | Example                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                                                          | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.                                     | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                         |
| `environment`                                                                                                                                                          | [models.KeyEnvironment](../../models/key-environment.md)                                                                                                               | :heavy_check_mark:                                                                                                                                                     | The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404. |                                                                                                                                                                        |
| `body`                                                                                                                                                                 | [models.GroupRequest](../../models/group-request.md)                                                                                                                   | :heavy_check_mark:                                                                                                                                                     | N/A                                                                                                                                                                    |                                                                                                                                                                        |