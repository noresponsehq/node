# Exclusion

## Example Usage

```typescript
import { Exclusion } from "@noresponse/node/models";

let value: Exclusion = "cross_customer_data";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"expired_or_erased_records" | "secrets_and_credential_digests" | "private_source_and_work_payloads" | "cross_customer_data" | "legacy_outcome_notes" | "uncaptured_historical_decisions" | Unrecognized<string>
```