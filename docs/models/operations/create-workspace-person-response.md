# CreateWorkspacePersonResponse

## Example Usage

```typescript
import { CreateWorkspacePersonResponse } from "@noresponse/node/models/operations";

let value: CreateWorkspacePersonResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [
      "example 1",
    ],
  },
  result: {
    person: {
      externalId: "case-person-1042",
      name: "Jordan Example",
      email: "jordan@example.com",
      phone: "+14155550100",
      company: "Example Ltd",
      city: "Melbourne",
      handles: [
        {
          platform: "bluesky",
          handle: "jordan_example",
        },
      ],
      id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
      expiresAt: "2026-02-01T00:00:00Z",
    },
    suggestedMatches: [
      {
        personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        matchedOn: [
          "email",
        ],
      },
    ],
    created: false,
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `headers`                                                               | Record<string, *string*[]>                                              | :heavy_check_mark:                                                      | N/A                                                                     |
| `result`                                                                | [models.WorkspacePersonResult](../../models/workspace-person-result.md) | :heavy_check_mark:                                                      | N/A                                                                     |