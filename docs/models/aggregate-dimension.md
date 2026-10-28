# AggregateDimension

decision, recommendation and band: the first answer's. flow: the assessment's. list_match: the action of the list entry that decided the account when it was first answered. reason: a reason the first answer fired, with its impact band. lane: an evidence lane the first answer listed in incomplete_sources. country and asn: the submitted IP's, from the IP data.

## Example Usage

```typescript
import { AggregateDimension } from "@noresponse/node/models";

let value: AggregateDimension = "flow";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"decision" | "flow" | "recommendation" | "band" | "reason" | "lane" | "country" | "asn" | "list_match" | Unrecognized<string>
```