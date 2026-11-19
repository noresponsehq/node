# RecordConflict

Two identifiers you gave that lead to records of different people.

## Example Usage

```typescript
import { RecordConflict } from "@noresponse/node/models";

let value: RecordConflict = {
  signal: "anchors_disagree",
  kind: "person_name",
  between: [],
  records: [
    "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
  ],
};
```

## Fields

| Field                                                                                                                                          | Type                                                                                                                                           | Required                                                                                                                                       | Description                                                                                                                                    | Example                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `signal`                                                                                                                                       | [models.RecordConflictSignal](../models/record-conflict-signal.md)                                                                             | :heavy_check_mark:                                                                                                                             | anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people. |                                                                                                                                                |
| `kind`                                                                                                                                         | *string*                                                                                                                                       | :heavy_check_mark:                                                                                                                             | The kind of value that clashes: person_name or born.                                                                                           | person_name                                                                                                                                    |
| `between`                                                                                                                                      | [models.Between](../models/between.md)[]                                                                                                       | :heavy_check_mark:                                                                                                                             | The two identifiers you gave whose records disagree.                                                                                           |                                                                                                                                                |
| `records`                                                                                                                                      | *string*[]                                                                                                                                     | :heavy_check_mark:                                                                                                                             | The ids of the two records that clash, in the order of between.                                                                                |                                                                                                                                                |