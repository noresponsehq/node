# KeyUsageBatchRequest

POST /v1/key_usage/batches body: facts about requests made with API keys your platform issued to your accounts, one event per request. Each event names the key by the SHA-256 that the assessment's issued_credential.sha256 carried, not the key itself. The SDKs buffer events and send them in the background. A batch holds 1 to 500 events and at most 256 KiB. Idempotency-Key is required and binds the body as on POST /v1/assessments, so a retried batch is counted once.

## Example Usage

```typescript
import { KeyUsageBatchRequest } from "@noresponse/node/models";

let value: KeyUsageBatchRequest = {
  events: [],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `events`                                               | [models.KeyUsageEvent](../models/key-usage-event.md)[] | :heavy_check_mark:                                     | N/A                                                    |