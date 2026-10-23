# IntegrationList

GET /v1/integrations: every integration of the workspace, oldest first, at most 10. No secret is ever listed.

## Example Usage

```typescript
import { IntegrationList } from "@noresponse/node/models";

let value: IntegrationList = {
  items: [],
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `items`                                          | [models.Integration](../models/integration.md)[] | :heavy_check_mark:                               | N/A                                              |