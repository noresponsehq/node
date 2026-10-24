# WebhookVerificationResponse

The body an endpoint returns, with status 200 and Content-Type application/json within 5 seconds, to an endpoint.verification event. A 2xx without the echoed challenge does not verify the endpoint.

## Example Usage

```typescript
import { WebhookVerificationResponse } from "@noresponse/node/models";

let value: WebhookVerificationResponse = {
  challenge: "q3Jt8mV0x2Yb7Lk9Pz4Rw6Hn1Sd5Fg8Ja0Tc3Ue7Wi4",
};
```

## Fields

| Field                                                                                                     | Type                                                                                                      | Required                                                                                                  | Description                                                                                               | Example                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `challenge`                                                                                               | *string*                                                                                                  | :heavy_check_mark:                                                                                        | Endpoint verification nonce: 32 random bytes, unpadded base64url (43 characters). Fresh per verification. | q3Jt8mV0x2Yb7Lk9Pz4Rw6Hn1Sd5Fg8Ja0Tc3Ue7Wi4                                                               |