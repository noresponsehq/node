# WebhookEndpointState

unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.

## Example Usage

```typescript
import { WebhookEndpointState } from "@noresponse/node/models";

let value: WebhookEndpointState = "verified";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unverified" | "verified" | "disabled" | Unrecognized<string>
```