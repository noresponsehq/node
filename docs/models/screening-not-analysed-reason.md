# ScreeningNotAnalysedReason

Why an item read was not analysed. video: a video, whose caption alone is read. image_unavailable: the image could not be fetched from the platform. image_unsupported: not a JPEG, PNG, GIF or WebP image, or too large to send. image_limit: past the most images one person's analysis reads. refused: the model declined to read it. unfinished: the model cut its batch short or answered outside the schema, or the request was rejected. unverified: a finding cited it with words it does not contain or an image it did not describe. unspecified: the analyser gave no reason.

## Example Usage

```typescript
import { ScreeningNotAnalysedReason } from "@noresponse/node/models";

let value: ScreeningNotAnalysedReason = "image_unavailable";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"video" | "image_unavailable" | "image_unsupported" | "image_limit" | "refused" | "unfinished" | "unverified" | "unspecified" | Unrecognized<string>
```