# WebhookTestRequestEvent

endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.

## Example Usage

```typescript
import { WebhookTestRequestEvent } from "@noresponse/node/models";

let value: WebhookTestRequestEvent = "assessment.updated";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"endpoint.verification" | "assessment.updated" | Unrecognized<string>
```