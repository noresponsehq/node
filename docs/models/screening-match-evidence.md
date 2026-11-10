# ScreeningMatchEvidence

One identifier that ties a profile to the attendee.

## Example Usage

```typescript
import { ScreeningMatchEvidence } from "@noresponse/node/models";

let value: ScreeningMatchEvidence = {
  kind: "supplied_handle",
  detail: "the email on the attendee row",
  resolver: "synthetic",
};
```

## Fields

| Field                                                                                                                | Type                                                                                                                 | Required                                                                                                             | Description                                                                                                          | Example                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `kind`                                                                                                               | [models.ScreeningMatchEvidenceKind](../models/screening-match-evidence-kind.md)                                      | :heavy_check_mark:                                                                                                   | What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. |                                                                                                                      |
| `detail`                                                                                                             | *string*                                                                                                             | :heavy_minus_sign:                                                                                                   | Where the match was seen, such as the profile field that carried it.                                                 | the email on the attendee row                                                                                        |
| `resolver`                                                                                                           | *string*                                                                                                             | :heavy_check_mark:                                                                                                   | The resolver, collector or analyser that produced a record, by its catalogue name.                                   | synthetic                                                                                                            |