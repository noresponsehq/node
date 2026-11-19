# ProfileLead

## Example Usage

```typescript
import { ProfileLead } from "@noresponse/node/models";

let value: ProfileLead = {
  value: "jordan.example@example.net",
  kind: "email",
  why: "A linked record holds an older address.",
  evidence: [
    {
      kind: "check",
      id: "rec_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
  ],
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `value`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | A value copied exactly from a linked record that the person was not searched by. | jordan.example@example.net                                                       |
| `kind`                                                                           | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              | email                                                                            |
| `why`                                                                            | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              | A linked record holds an older address.                                          |
| `evidence`                                                                       | [models.ProfileCitation](../models/profile-citation.md)[]                        | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |