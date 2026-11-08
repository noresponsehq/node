# EventUpdate

Changes the fields it names; at least one besides expected_version.

## Example Usage

```typescript
import { EventUpdate } from "@noresponse/node/models";

let value: EventUpdate = {
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

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 | Example                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `name`                                                                                                      | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | The event's name.                                                                                           | Annual shareholder meeting                                                                                  |
| `startsAt`                                                                                                  | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | When the event starts.                                                                                      | 2026-01-01T00:00:00Z                                                                                        |
| `endsAt`                                                                                                    | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | When the event ends, at or after its start; the start when omitted.                                         | 2026-01-02T00:00:00Z                                                                                        |
| `venue`                                                                                                     | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | Where the event is held.                                                                                    | Example Convention Centre                                                                                   |
| `host`                                                                                                      | *string*                                                                                                    | :heavy_minus_sign:                                                                                          | The organisation hosting the event.                                                                         | Example Holdings                                                                                            |
| `principals`                                                                                                | [models.Principal](../models/principal.md)[]                                                                | :heavy_minus_sign:                                                                                          | The people the event protects, at most 20.                                                                  |                                                                                                             |
| `topics`                                                                                                    | *string*[]                                                                                                  | :heavy_minus_sign:                                                                                          | Sensitive topics the screening reads posts against, at most 50.                                             |                                                                                                             |
| `expectedVersion`                                                                                           | *number*                                                                                                    | :heavy_minus_sign:                                                                                          | When present, the change applies only if the event is still at this version (409 event_conflict otherwise). |                                                                                                             |