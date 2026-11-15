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

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `total`                                                                             | *number*                                                                            | :heavy_check_mark:                                                                  | How many other groups include this person, of which items lists the 20 most recent. |
| `items`                                                                             | [models.OtherGroup](../models/other-group.md)[]                                     | :heavy_check_mark:                                                                  | This person's memberships in the 20 most recent other groups, newest group first.   |