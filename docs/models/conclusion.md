# Conclusion

## Example Usage

```typescript
import { Conclusion } from "@noresponse/node/models";

let value: Conclusion = "inconclusive";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"benign" | "abuse" | "inconclusive" | Unrecognized<string>
```