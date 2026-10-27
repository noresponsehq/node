# IpSummary

Facts about the submitted IP from the offline database and this workspace's own recent assessments. Every member is optional; absent makes no claim.

## Example Usage

```typescript
import { IpSummary } from "@noresponse/node/models";

let value: IpSummary = {
  country: "AU",
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         | Example                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `country`                                                                                                           | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | ISO 3166-1 alpha-2 country of the address.                                                                          | AU                                                                                                                  |
| `type`                                                                                                              | [models.IpSummaryType](../models/ip-summary-type.md)                                                                | :heavy_minus_sign:                                                                                                  | The address's network type.                                                                                         |                                                                                                                     |
| `asn`                                                                                                               | *number*                                                                                                            | :heavy_minus_sign:                                                                                                  | Autonomous system number of the network that announces the address, from the offline database. Absent when unknown. |                                                                                                                     |
| `seenInWorkspace`                                                                                                   | *number*                                                                                                            | :heavy_minus_sign:                                                                                                  | Assessments in this workspace with the same IP in the last 24 hours, this one included. A count only.               |                                                                                                                     |