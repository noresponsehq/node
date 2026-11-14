# OtherGroups

Where else in the environment the person appears, read live from those groups: deleting one removes it here.

## Example Usage

```typescript
import { OtherGroups } from "@noresponse/node/models";

let value: OtherGroups = {
  total: 81830,
  items: [],
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `total`                                                                         | *number*                                                                        | :heavy_check_mark:                                                              | How many people of other groups match, of which items lists the 20 most recent. |
| `items`                                                                         | [models.OtherGroup](../models/other-group.md)[]                                 | :heavy_check_mark:                                                              | The 20 people of the most recent other groups, newest group first.              |