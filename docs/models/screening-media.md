# ScreeningMedia

One image or video a collector read, with the post that carried it.

## Example Usage

```typescript
import { ScreeningMedia } from "@noresponse/node/models";

let value: ScreeningMedia = {
  id: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  kind: "media",
  postId: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  mediaType: "video",
  mediaUrl: "https://synthetic.invalid/media/jordanexample42/p1.jpg",
  text: "A photo",
  profileId: "prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  permalink: "https://synthetic.invalid/synthetic/jordanexample42/p1",
  postedAt: "2026-01-01T00:00:00Z",
  screenshotSha256:
    "9c56cc51b374c3ba189210d5b6d4bf57790d351c96c47c02190ecf1e430635ab",
  capturedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                                                             | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                   |
| `kind`                                                           | *"media"*                                                        | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `postId`                                                         | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              | itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                   |
| `mediaType`                                                      | [models.MediaType](../models/media-type.md)                      | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `mediaUrl`                                                       | *string*                                                         | :heavy_check_mark:                                               | Where the platform serves the image or video.                    | https://synthetic.invalid/media/jordanexample42/p1.jpg           |
| `text`                                                           | *string*                                                         | :heavy_minus_sign:                                               | The caption or alt text.                                         | A photo                                                          |
| `profileId`                                                      | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                   |
| `permalink`                                                      | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | https://synthetic.invalid/synthetic/jordanexample42/p1           |
| `postedAt`                                                       | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | 2026-01-01T00:00:00Z                                             |
| `screenshotSha256`                                               | *string*                                                         | :heavy_minus_sign:                                               | SHA-256 of the screenshot taken of a flagged item.               | 9c56cc51b374c3ba189210d5b6d4bf57790d351c96c47c02190ecf1e430635ab |
| `capturedAt`                                                     | *string*                                                         | :heavy_minus_sign:                                               | When the screenshot was taken.                                   | 2026-01-01T00:00:00Z                                             |