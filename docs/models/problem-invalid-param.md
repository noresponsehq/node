# ProblemInvalidParam

## Example Usage

```typescript
import { ProblemInvalidParam } from "@noresponse/node/models";

let value: ProblemInvalidParam = {
  field: "identifiers",
  reason: "at least one of email, username or phone is required",
  example: "new.user@example.com",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `field`                                              | *string*                                             | :heavy_check_mark:                                   | N/A                                                  | identifiers                                          |
| `reason`                                             | *string*                                             | :heavy_check_mark:                                   | N/A                                                  | at least one of email, username or phone is required |
| `example`                                            | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  | new.user@example.com                                 |