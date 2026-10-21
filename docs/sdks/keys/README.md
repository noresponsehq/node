# Keys

## Overview

Your own API keys.

### Available Operations

* [rotate](#rotate) - Rotate the API key that signs the request.

## rotate

Mints a new key with the same scopes as the key that signs the request and returns it once. The presented key keeps working for overlap_seconds (default 24 hours, from 60 seconds to 7 days), then answers 401. A key accepts one rotation: rotating again with a key already in its overlap answers 409 key_rotation_in_progress, so rotate with the new key. Rotation is not idempotent: a retry after a lost answer mints another key.

### Example Usage: default

<!-- UsageSnippet language="typescript" operationID="rotateApiKey" method="post" path="/v1/keys/rotate" example="default" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.keys.rotate({});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { keysRotate } from "@noresponse/node/funcs/keys-rotate.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await keysRotate(noResponse, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("keysRotate failed:", res.error);
  }
}

run();
```
### Example Usage: one_hour

<!-- UsageSnippet language="typescript" operationID="rotateApiKey" method="post" path="/v1/keys/rotate" example="one_hour" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.keys.rotate({
    overlapSeconds: 3600,
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { keysRotate } from "@noresponse/node/funcs/keys-rotate.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await keysRotate(noResponse, {
    overlapSeconds: 3600,
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("keysRotate failed:", res.error);
  }
}

run();
```
### Example Usage: rotated

<!-- UsageSnippet language="typescript" operationID="rotateApiKey" method="post" path="/v1/keys/rotate" example="rotated" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.keys.rotate({});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { keysRotate } from "@noresponse/node/funcs/keys-rotate.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await keysRotate(noResponse, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("keysRotate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.KeyRotationRequest](../../models/key-rotation-request.md)                                                                                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |

### Response

**Promise\<[operations.RotateApiKeyResponse](../../models/operations/rotate-api-key-response.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.BadRequestError       | 400                          | application/problem+json     |
| errors.AuthenticationError   | 401                          | application/problem+json     |
| errors.PermissionDeniedError | 403                          | application/problem+json     |
| errors.NotFoundError         | 404                          | application/problem+json     |
| errors.ConflictError         | 409                          | application/problem+json     |
| errors.RateLimitError        | 429                          | application/problem+json     |
| errors.APIStatusError        | 4XX, 5XX                     | \*/\*                        |