# AssessmentRequestPolicyContext

## Example Usage

```typescript
import { AssessmentRequestPolicyContext } from "@noresponse/node/models";

let value: AssessmentRequestPolicyContext = {
  region: "AU",
};
```

## Fields

| Field                                                                                                                                                   | Type                                                                                                                                                    | Required                                                                                                                                                | Description                                                                                                                                             | Example                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flow`                                                                                                                                                  | [models.Flow](../models/flow.md)                                                                                                                        | :heavy_minus_sign:                                                                                                                                      | The provider flow the assessment gates. Use the top-level flow instead; this member is ignored when the top-level flow is present. Absent means signup. |                                                                                                                                                         |
| `region`                                                                                                                                                | *string*                                                                                                                                                | :heavy_minus_sign:                                                                                                                                      | ISO 3166-1 alpha-2 region of the signup, as the provider determines it.                                                                                 | AU                                                                                                                                                      |