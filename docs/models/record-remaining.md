# RecordRemaining

Rows one search matched in one source that the lookup's records leave out, so no answer is cut short in silence.

## Example Usage

```typescript
import { RecordRemaining } from "@noresponse/node/models";

let value: RecordRemaining = {
  source: {
    connector: "bluesky",
    kind: "platform",
    site: "bsky.app",
    table: "users",
    date: "2019-03",
  },
  by: "email",
  search: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  rows: 419785,
};
```

## Fields

| Field                                                                                                                    | Type                                                                                                                     | Required                                                                                                                 | Description                                                                                                              | Example                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `source`                                                                                                                 | [models.RecordSource](../models/record-source.md)                                                                        | :heavy_check_mark:                                                                                                       | Where a record came from.                                                                                                |                                                                                                                          |
| `by`                                                                                                                     | *string*                                                                                                                 | :heavy_check_mark:                                                                                                       | The kind of searched value whose search matched the rows, as a record's matched names it.                                | email                                                                                                                    |
| `search`                                                                                                                 | *string*                                                                                                                 | :heavy_minus_sign:                                                                                                       | The search a person started that matched the rows. Searching the same field again with this source's table fetches them. | srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                           |
| `rows`                                                                                                                   | *number*                                                                                                                 | :heavy_check_mark:                                                                                                       | How many rows of the source that search matched beyond the records the lookup carries.                                   |                                                                                                                          |