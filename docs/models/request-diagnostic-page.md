# RequestDiagnosticPage

Authenticated attempts in a bounded interval, newest first. Keep the same filters when paging.

## Example Usage

```typescript
import { RequestDiagnosticPage } from "@noresponse/node/models";

let value: RequestDiagnosticPage = {
  items: [],
  nextCursor:
    "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `items`                                                                    | [models.RequestDiagnostic](../models/request-diagnostic.md)[]              | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `nextCursor`                                                               | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ |