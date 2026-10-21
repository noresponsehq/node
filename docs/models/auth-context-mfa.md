# AuthContextMfa

Normalized multi-factor evidence from a verified provider session.

## Example Usage

```typescript
import { AuthContextMfa } from "@noresponse/node/models";

let value: AuthContextMfa = {};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `present`          | *boolean*          | :heavy_minus_sign: | N/A                |
| `methods`          | *string*[]         | :heavy_minus_sign: | N/A                |
| `ageSeconds`       | *number*           | :heavy_minus_sign: | N/A                |