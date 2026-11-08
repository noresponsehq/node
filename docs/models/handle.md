# Handle

An account the attendee is known to hold.

## Example Usage

```typescript
import { Handle } from "@noresponse/node/models";

let value: Handle = {
  platform: "linkedin",
  handle: "jordan_example",
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `platform`                                            | [models.HandlePlatform](../models/handle-platform.md) | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `handle`                                              | *string*                                              | :heavy_check_mark:                                    | The account's handle, without a leading @.            | jordan_example                                        |