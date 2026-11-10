# ScreeningPlatformCoverageStatus

covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.

## Example Usage

```typescript
import { ScreeningPlatformCoverageStatus } from "@noresponse/node/models";

let value: ScreeningPlatformCoverageStatus = "covered";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"covered" | "none_found" | "inaccessible" | "failed" | "unavailable" | Unrecognized<string>
```