# KeyAccessRequest

## Example Usage

```typescript
import { KeyAccessRequest } from "@noresponse/node/models";

let value: KeyAccessRequest = {
  deniedActions: [],
};
```

## Fields

| Field                                                                                                                                              | Type                                                                                                                                               | Required                                                                                                                                           | Description                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deniedActions`                                                                                                                                    | [models.KeyAccessRequestDeniedAction](../models/key-access-request-denied-action.md)[]                                                             | :heavy_check_mark:                                                                                                                                 | Explicit restrictions that override scope grants. An empty list restores the access supplied by the scopes. Rotation preserves these restrictions. |