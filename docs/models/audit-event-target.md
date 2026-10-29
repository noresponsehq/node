# AuditEventTarget

## Example Usage

```typescript
import { AuditEventTarget } from "@noresponse/node/models";

let value: AuditEventTarget = {
  type: "workspace",
  id: "mem_01JA2ZB4C5D6E7F8G9H0JKMNPQ",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `type`                                                              | [models.AuditEventTargetType](../models/audit-event-target-type.md) | :heavy_check_mark:                                                  | The kind of resource the change acted on.                           |                                                                     |
| `id`                                                                | *string*                                                            | :heavy_minus_sign:                                                  | The resource's id, when it has one.                                 | mem_01JA2ZB4C5D6E7F8G9H0JKMNPQ                                      |