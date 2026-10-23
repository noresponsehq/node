# KeyUsageBatch

The 202 answer of POST /v1/key_usage/batches. A replay with the same Idempotency-Key and body answers the same record and counts nothing again.

## Example Usage

```typescript
import { KeyUsageBatch } from "@noresponse/node/models";

let value: KeyUsageBatch = {
  id: "kub_01JA2ZE4M5N6P7Q8R9S0T1V2W3",
  receivedAt: "2026-10-23T09:14:12.000Z",
  accepted: 91231,
  ignored: 931452,
};
```

## Fields

| Field                                                                                                                                   | Type                                                                                                                                    | Required                                                                                                                                | Description                                                                                                                             | Example                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                    | *string*                                                                                                                                | :heavy_check_mark:                                                                                                                      | Opaque, server-assigned id of the batch: 'kub_' and a 26-character Crockford base32 ULID.                                               | kub_01JA2ZE4M5N6P7Q8R9S0T1V2W3                                                                                                          |
| `receivedAt`                                                                                                                            | *string*                                                                                                                                | :heavy_check_mark:                                                                                                                      | When NoResponse first recorded the batch.                                                                                               | 2026-10-23T09:14:12.000Z                                                                                                                |
| `accepted`                                                                                                                              | *number*                                                                                                                                | :heavy_check_mark:                                                                                                                      | Events counted.                                                                                                                         |                                                                                                                                         |
| `ignored`                                                                                                                               | *number*                                                                                                                                | :heavy_check_mark:                                                                                                                      | Events that added nothing: a private, reserved or unreadable ip, or an occurred_at more than 24 hours old or more than 5 minutes ahead. |                                                                                                                                         |