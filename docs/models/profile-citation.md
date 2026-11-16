# ProfileCitation

## Example Usage

```typescript
import { ProfileCitation } from "@noresponse/node/models";

let value: ProfileCitation = {
  kind: "record",
  id: "rec_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                                                             | Type                                                                                                              | Required                                                                                                          | Description                                                                                                       | Example                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `kind`                                                                                                            | [models.ProfileCitationKind](../models/profile-citation-kind.md)                                                  | :heavy_check_mark:                                                                                                | record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks. |                                                                                                                   |
| `id`                                                                                                              | *string*                                                                                                          | :heavy_check_mark:                                                                                                | The record or post id. For a check, c followed by its 1-based position in lookup.checks.                          | rec_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                    |