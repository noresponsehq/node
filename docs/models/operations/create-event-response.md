# CreateEventResponse

## Example Usage

```typescript
import { CreateEventResponse } from "@noresponse/node/models/operations";

let value: CreateEventResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
    "key2": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    id: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
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
    attendees: 301542,
    version: 507414,
    purgeAfter: "2026-02-01T00:00:00Z",
    createdBy: "user_2abc",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `headers`                             | Record<string, *string*[]>            | :heavy_check_mark:                    | N/A                                   |
| `result`                              | [models.Event](../../models/event.md) | :heavy_check_mark:                    | N/A                                   |