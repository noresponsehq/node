# KeyRotation

The 201 answer of POST /v1/keys/rotate: the new key, shown once, and when the key that was presented stops working. The new key has the scopes of the presented key.

## Example Usage

```typescript
import { KeyRotation } from "@noresponse/node/models";

let value: KeyRotation = {
  key: "<key>",
  keyId: "<id>",
  scopes: [
    "assess",
  ],
  createdAt: "1710015460234",
  previousKeyId: "<id>",
  previousKeyExpiresAt: "<value>",
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `key`                                                                                     | *string*                                                                                  | :heavy_check_mark:                                                                        | The new credential, nrk_<key id>_<secret>. It is shown only in this answer; store it now. |
| `keyId`                                                                                   | *string*                                                                                  | :heavy_check_mark:                                                                        | The public id of the new key.                                                             |
| `scopes`                                                                                  | [models.Scope](../models/scope.md)[]                                                      | :heavy_check_mark:                                                                        | The scopes of the new key: those of the presented key.                                    |
| `createdAt`                                                                               | *string*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `previousKeyId`                                                                           | *string*                                                                                  | :heavy_check_mark:                                                                        | The id of the key that signed this request.                                               |
| `previousKeyExpiresAt`                                                                    | *string*                                                                                  | :heavy_check_mark:                                                                        | When the previous key stops authenticating. Until then both keys work.                    |