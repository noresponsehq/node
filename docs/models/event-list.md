# EventList

Events, newest first.

## Example Usage

```typescript
import { EventList } from "@noresponse/node/models";

let value: EventList = {
  items: [],
  nextBefore: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `items`                                      | [models.Event](../models/event.md)[]         | :heavy_check_mark:                           | N/A                                          |                                              |
| `nextBefore`                                 | *string*                                     | :heavy_minus_sign:                           | Pass as before to read the next, older page. | evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM               |