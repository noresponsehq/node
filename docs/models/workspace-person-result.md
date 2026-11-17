# WorkspacePersonResult

Create or reuse a workspace person.

## Example Usage

```typescript
import { WorkspacePersonResult } from "@noresponse/node/models";

let value: WorkspacePersonResult = {
  person: {
    externalId: "case-person-1042",
    name: "Jordan Example",
    email: "jordan@example.com",
    phone: "+14155550100",
    company: "Example Ltd",
    city: "Melbourne",
    username: "jordan_example",
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
  created: true,
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `person`                                                | [models.WorkspacePerson](../models/workspace-person.md) | :heavy_check_mark:                                      | N/A                                                     |
| `suggestedMatches`                                      | [models.PersonMatch](../models/person-match.md)[]       | :heavy_check_mark:                                      | N/A                                                     |
| `created`                                               | *boolean*                                               | :heavy_check_mark:                                      | N/A                                                     |