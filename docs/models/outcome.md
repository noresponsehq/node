# Outcome

What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.

## Example Usage

```typescript
import { Outcome } from "@noresponse/node/models";

let value: Outcome = "confirmed_abuse";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"confirmed_abuse" | "account_takeover" | "chargeback" | "false_positive" | "legitimate" | "unknown" | Unrecognized<string>
```