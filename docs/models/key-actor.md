# KeyActor

## Example Usage

```typescript
import { KeyActor } from "@noresponse/node/models";

let value: KeyActor = {
  type: "api_key",
  keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `type`                                                       | *"api_key"*                                                  | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `keyId`                                                      | *string*                                                     | :heavy_check_mark:                                           | The public id of the workspace API key that made the change. | 01JA2Z8K6Q4V7W9XBCDEFGHJKM                                   |