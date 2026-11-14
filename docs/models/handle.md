# Handle

An account the person is known to hold.

## Example Usage

```typescript
import { Handle } from "@noresponse/node/models";

let value: Handle = {
  platform: "synthetic",
  handle: "jordan_example",
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform`                                                                                                                                        | [models.HandlePlatform](../models/handle-platform.md)                                                                                             | :heavy_check_mark:                                                                                                                                | A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network. |                                                                                                                                                   |
| `handle`                                                                                                                                          | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | The account's handle, without a leading @.                                                                                                        | jordan_example                                                                                                                                    |