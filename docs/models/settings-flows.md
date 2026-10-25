# SettingsFlows

## Example Usage

```typescript
import { SettingsFlows } from "@noresponse/node/models";

let value: SettingsFlows = {
  accountCreation: {
    stepUp: 630555,
    review: 62705,
    defaultDepth: "quick",
    inheritsAccountCreation: false,
    admission: "immediate",
    holdSeconds: 580362,
    onExpiry: "review",
  },
  login: {
    stepUp: 930785,
    review: 521557,
    defaultDepth: "quick",
    inheritsAccountCreation: false,
    admission: "immediate",
    holdSeconds: 131973,
    onExpiry: "block",
  },
  purchase: {
    stepUp: 207860,
    review: 558525,
    defaultDepth: "quick",
    inheritsAccountCreation: false,
    admission: "immediate",
    holdSeconds: 466586,
    onExpiry: "block",
  },
};
```

## Fields

| Field                                                                                                                                                                                                        | Type                                                                                                                                                                                                         | Required                                                                                                                                                                                                     | Description                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accountCreation`                                                                                                                                                                                            | [models.FlowSettings](../models/flow-settings.md)                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                           | One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final. |
| `login`                                                                                                                                                                                                      | [models.FlowSettings](../models/flow-settings.md)                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                           | One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final. |
| `purchase`                                                                                                                                                                                                   | [models.FlowSettings](../models/flow-settings.md)                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                           | One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final. |