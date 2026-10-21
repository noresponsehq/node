# AssessmentRequestPolicyContext

## Example Usage

```typescript
import { AssessmentRequestPolicyContext } from "@noresponse/node/models";

let value: AssessmentRequestPolicyContext = {};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `flow`                                                                  | [models.Flow](../models/flow.md)                                        | :heavy_minus_sign:                                                      | The provider flow the assessment gates. Absent means signup.            |
| `region`                                                                | *string*                                                                | :heavy_minus_sign:                                                      | ISO 3166-1 alpha-2 region of the signup, as the provider determines it. |