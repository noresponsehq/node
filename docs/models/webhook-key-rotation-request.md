# WebhookKeyRotationRequest

POST /v1/webhooks/{endpoint_id}/rotate body: an empty object. The old key keeps verifying for 7 days.

## Example Usage

```typescript
import { WebhookKeyRotationRequest } from "@noresponse/node/models";

let value: WebhookKeyRotationRequest = {};
```

## Fields

| Field       | Type        | Required    | Description |
| ----------- | ----------- | ----------- | ----------- |