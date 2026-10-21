# KeyRotationRequest

POST /v1/keys/rotate body. The tenant and the key being rotated are the API key that signs the request, so neither is a body member. An empty object takes the default overlap.

## Example Usage

```typescript
import { KeyRotationRequest } from "@noresponse/node/models";

let value: KeyRotationRequest = {};
```

## Fields

| Field                                                                                                                                                                               | Type                                                                                                                                                                                | Required                                                                                                                                                                            | Description                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `overlapSeconds`                                                                                                                                                                    | *number*                                                                                                                                                                            | :heavy_minus_sign:                                                                                                                                                                  | How long the presented key keeps working beside the new one, from 60 seconds to 7 days. Default 86400 (24 hours). At the end of the overlap the presented key stops authenticating. |