# SharedIdentifier

## Example Usage

```typescript
import { SharedIdentifier } from "@noresponse/node/models";

let value: SharedIdentifier = {
  kind: "email",
  matchBasis: "canonical",
  provenance: "submitted",
  account: {
    value: "Jane.Doe+case@EXAMPLE.COM",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    submittedAt: "2026-01-01T00:00:00Z",
  },
  linkedAccount: {
    value: "Jane.Doe+case@EXAMPLE.COM",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    submittedAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                                                                                                                                               | Type                                                                                                                                                                | Required                                                                                                                                                            | Description                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`                                                                                                                                                              | [models.IdentifierSearchKind](../models/identifier-search-kind.md)                                                                                                  | :heavy_check_mark:                                                                                                                                                  | N/A                                                                                                                                                                 |
| `matchBasis`                                                                                                                                                        | [models.Match](../models/match.md)                                                                                                                                  | :heavy_check_mark:                                                                                                                                                  | exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.      |
| `provenance`                                                                                                                                                        | [models.Provenance](../models/provenance.md)                                                                                                                        | :heavy_check_mark:                                                                                                                                                  | Customer-submitted input. It does not mean the customer or NoResponse verified ownership.                                                                           |
| `namespace`                                                                                                                                                         | [models.Namespace](../models/namespace.md)                                                                                                                          | :heavy_minus_sign:                                                                                                                                                  | Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone. |
| `account`                                                                                                                                                           | [models.IdentifierSubmission](../models/identifier-submission.md)                                                                                                   | :heavy_check_mark:                                                                                                                                                  | N/A                                                                                                                                                                 |
| `linkedAccount`                                                                                                                                                     | [models.IdentifierSubmission](../models/identifier-submission.md)                                                                                                   | :heavy_check_mark:                                                                                                                                                  | N/A                                                                                                                                                                 |