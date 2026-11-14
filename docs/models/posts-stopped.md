# PostsStopped

Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.

## Example Usage

```typescript
import { PostsStopped } from "@noresponse/node/models";

let value: PostsStopped = "page_limit";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"platform_limit" | "page_limit" | "rate_limited" | "unavailable" | Unrecognized<string>
```