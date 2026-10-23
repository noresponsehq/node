# WebhookDeliveryAttemptStatus

delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.

## Example Usage

```typescript
import { WebhookDeliveryAttemptStatus } from "@noresponse/node/models";

let value: WebhookDeliveryAttemptStatus = "delivered";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"delivered" | "failed" | Unrecognized<string>
```