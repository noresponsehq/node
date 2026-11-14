# RecordT

One answer from one source: where it came from, what found it and every field it holds.

## Example Usage

```typescript
import { RecordT } from "@noresponse/node/models";

let value: RecordT = {
  id: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
  source: {
    connector: "bluesky",
    kind: "platform",
    site: "bsky.app",
    table: "users",
    date: "2019-03",
  },
  matched: [
    {
      by: "handle",
      field: "username",
    },
  ],
  fields: [
    {
      field: "creation_date",
      original: "2019-01-01T00:00:00Z",
      kind: "date_time",
      role: "joined",
      value: "2019-01-01T00:00:00Z",
    },
  ],
  observedAt: "2026-01-02T00:00:00Z",
};
```

## Fields

| Field                                                                                                                                                                                                             | Type                                                                                                                                                                                                              | Required                                                                                                                                                                                                          | Description                                                                                                                                                                                                       | Example                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                                                                                              | *string*                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                | Made from the source and the fields' names and original values, so the same answer found twice is one record with the same id.                                                                                    | rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7                                                                                                                                                                              |
| `source`                                                                                                                                                                                                          | [models.RecordSource](../models/record-source.md)                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                | Where a record came from.                                                                                                                                                                                         |                                                                                                                                                                                                                   |
| `matched`                                                                                                                                                                                                         | [models.RecordMatch](../models/record-match.md)[]                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                | Each kind of searched value that found the record.                                                                                                                                                                |                                                                                                                                                                                                                   |
| `fields`                                                                                                                                                                                                          | [models.RecordField](../models/record-field.md)[]                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                | Every field the source returned, in the order the source's connector lists them; a breach row's columns in name order. Nothing is withheld: a breach row's passwords, hashes and salts are fields like any other. |                                                                                                                                                                                                                   |
| `observedAt`                                                                                                                                                                                                      | *string*                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                | When the source last gave this answer.                                                                                                                                                                            | 2026-01-02T00:00:00Z                                                                                                                                                                                              |