# GroupRequest

Creates a group.

## Example Usage

```typescript
import { GroupRequest } from "@noresponse/node/models";

let value: GroupRequest = {
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
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `name`                                                              | *string*                                                            | :heavy_check_mark:                                                  | The group's name.                                                   | Annual shareholder meeting                                          |
| `startsAt`                                                          | *string*                                                            | :heavy_check_mark:                                                  | When the group starts.                                              | 2026-01-01T00:00:00Z                                                |
| `endsAt`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | When the group ends, at or after its start; the start when omitted. | 2026-01-02T00:00:00Z                                                |
| `venue`                                                             | *string*                                                            | :heavy_minus_sign:                                                  | Where the group is held.                                            | Example Convention Centre                                           |
| `host`                                                              | *string*                                                            | :heavy_minus_sign:                                                  | The organisation hosting the group.                                 | Example Holdings                                                    |
| `principals`                                                        | [models.Principal](../models/principal.md)[]                        | :heavy_minus_sign:                                                  | The people the group protects, at most 20.                          |                                                                     |
| `topics`                                                            | *string*[]                                                          | :heavy_minus_sign:                                                  | Sensitive topics the screening reads posts against, at most 50.     |                                                                     |