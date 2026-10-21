# Assessments

## Overview

Signup and gateway assessments.

### Available Operations

* [create](#create) - Assess identifiers for a signup or gateway decision.
* [get](#get) - Poll the authoritative assessment of one assessment.
* [recordOutcome](#recordoutcome) - Report what was later learned about an assessed account.
* [query](#query) - Page through one account's unexpired assessments.

## create

Returns within the deadline (500 ms at most) with a complete, partial or pending assessment: 200 carries complete or partial, 202 carries pending with Location and Retry-After. A pending answer has no recommendation; apply your own fallback for pending, 429, 503 or a timeout. Requires the assess scope. Idempotency-Key is required and is bound to the body for 24 hours: the same key with the same body replays the latest assessment with Idempotent-Replayed: true and starts no new work; the same key with a different body answers 409 idempotency_key_reused. response_mode defaults to standard; detailed needs the detailed scope.

### Example Usage: complete

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="complete" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```
### Example Usage: detailed

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="detailed" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```
### Example Usage: full

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="full" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "acct_7f3a9c",
      identifiers: {
        email: "new.user@example.com",
        username: "new_user_42",
        phone: "+447700900123",
      },
      policyContext: {
        flow: "signup",
        region: "GB",
      },
      requestId: "req-2026-10-14-0001",
      deadlineMs: 300,
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "acct_7f3a9c",
      identifiers: {
        email: "new.user@example.com",
        username: "new_user_42",
        phone: "+447700900123",
      },
      policyContext: {
        flow: "signup",
        region: "GB",
      },
      requestId: "req-2026-10-14-0001",
      deadlineMs: 300,
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```
### Example Usage: minimal

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="minimal" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "acct_7f3a9c",
      identifiers: {
        email: "new.user@example.com",
      },
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "acct_7f3a9c",
      identifiers: {
        email: "new.user@example.com",
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```
### Example Usage: name_and_ip

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="name_and_ip" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "acct_8412",
      identifiers: {
        email: "jane.doe@example.com",
        username: "janedoe",
        phone: "+14155550123",
        name: "Jane A. Doe",
        ip: "73.162.18.45",
      },
      policyContext: {
        flow: "signup",
        region: "US",
      },
      requestId: "req_01",
      deadlineMs: 500,
      responseMode: "standard",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "acct_8412",
      identifiers: {
        email: "jane.doe@example.com",
        username: "janedoe",
        phone: "+14155550123",
        name: "Jane A. Doe",
        ip: "73.162.18.45",
      },
      policyContext: {
        flow: "signup",
        region: "US",
      },
      requestId: "req_01",
      deadlineMs: 500,
      responseMode: "standard",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```
### Example Usage: partial

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="partial" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```
### Example Usage: standard

<!-- UsageSnippet language="typescript" operationID="createAssessment" method="post" path="/v1/assessments" example="standard" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.create({
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsCreate(noResponse, {
    idempotencyKey: "<value>",
    body: {
      accountId: "<id>",
      identifiers: {},
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsCreate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateAssessmentRequest](../../models/operations/create-assessment-request.md)                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateAssessmentResponse](../../models/operations/create-assessment-response.md)\>**

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

## get

Returns the highest assessment_version. Requires the assess or history scope. While status is pending, or partial with a source still running, the response carries Retry-After; poll no faster than it says. Another tenant's assessment, an unknown or expired assessment and a malformed assessment_id all answer 404 not_found. response_mode=detailed needs the detailed scope.

### Example Usage: complete

<!-- UsageSnippet language="typescript" operationID="getAssessment" method="get" path="/v1/assessments/{assessment_id}" example="complete" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.get({
    assessmentId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsGet } from "@noresponse/node/funcs/assessments-get.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsGet(noResponse, {
    assessmentId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsGet failed:", res.error);
  }
}

run();
```
### Example Usage: detailed

<!-- UsageSnippet language="typescript" operationID="getAssessment" method="get" path="/v1/assessments/{assessment_id}" example="detailed" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.get({
    assessmentId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsGet } from "@noresponse/node/funcs/assessments-get.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsGet(noResponse, {
    assessmentId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsGet failed:", res.error);
  }
}

run();
```
### Example Usage: partial

<!-- UsageSnippet language="typescript" operationID="getAssessment" method="get" path="/v1/assessments/{assessment_id}" example="partial" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.get({
    assessmentId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsGet } from "@noresponse/node/funcs/assessments-get.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsGet(noResponse, {
    assessmentId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsGet failed:", res.error);
  }
}

run();
```
### Example Usage: pending

<!-- UsageSnippet language="typescript" operationID="getAssessment" method="get" path="/v1/assessments/{assessment_id}" example="pending" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.get({
    assessmentId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsGet } from "@noresponse/node/funcs/assessments-get.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsGet(noResponse, {
    assessmentId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsGet failed:", res.error);
  }
}

run();
```
### Example Usage: standard

<!-- UsageSnippet language="typescript" operationID="getAssessment" method="get" path="/v1/assessments/{assessment_id}" example="standard" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.get({
    assessmentId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsGet } from "@noresponse/node/funcs/assessments-get.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsGet(noResponse, {
    assessmentId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetAssessmentRequest](../../models/operations/get-assessment-request.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetAssessmentResponse](../../models/operations/get-assessment-response.md)\>**

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

## recordOutcome

Records what you later learned about an assessed account: confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw your earlier report; unknown is recorded only. Outcomes are append-only and the latest one wins. Requires the assess scope. Idempotency-Key is required and handled as on POST /v1/assessments: a retry with the same key and body answers the same record with Idempotent-Replayed: true; a different body answers 409. An unknown, expired or foreign assessment answers 404 not_found.

### Example Usage: abuse

<!-- UsageSnippet language="typescript" operationID="recordAssessmentOutcome" method="post" path="/v1/assessments/{assessment_id}/outcomes" example="abuse" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.recordOutcome({
    assessmentId: "<id>",
    idempotencyKey: "<value>",
    body: {
      outcome: "confirmed_abuse",
      observedAt: "2026-10-20T05:00:00Z",
      externalRef: "case-123",
      notes: "Card testing from this account; closed by trust and safety.",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsRecordOutcome } from "@noresponse/node/funcs/assessments-record-outcome.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsRecordOutcome(noResponse, {
    assessmentId: "<id>",
    idempotencyKey: "<value>",
    body: {
      outcome: "confirmed_abuse",
      observedAt: "2026-10-20T05:00:00Z",
      externalRef: "case-123",
      notes: "Card testing from this account; closed by trust and safety.",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsRecordOutcome failed:", res.error);
  }
}

run();
```
### Example Usage: recorded

<!-- UsageSnippet language="typescript" operationID="recordAssessmentOutcome" method="post" path="/v1/assessments/{assessment_id}/outcomes" example="recorded" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.recordOutcome({
    assessmentId: "<id>",
    idempotencyKey: "<value>",
    body: {
      outcome: "legitimate",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsRecordOutcome } from "@noresponse/node/funcs/assessments-record-outcome.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsRecordOutcome(noResponse, {
    assessmentId: "<id>",
    idempotencyKey: "<value>",
    body: {
      outcome: "legitimate",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsRecordOutcome failed:", res.error);
  }
}

run();
```
### Example Usage: withdrawn

<!-- UsageSnippet language="typescript" operationID="recordAssessmentOutcome" method="post" path="/v1/assessments/{assessment_id}/outcomes" example="withdrawn" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.recordOutcome({
    assessmentId: "<id>",
    idempotencyKey: "<value>",
    body: {
      outcome: "false_positive",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsRecordOutcome } from "@noresponse/node/funcs/assessments-record-outcome.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsRecordOutcome(noResponse, {
    assessmentId: "<id>",
    idempotencyKey: "<value>",
    body: {
      outcome: "false_positive",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("assessmentsRecordOutcome failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.RecordAssessmentOutcomeRequest](../../models/operations/record-assessment-outcome-request.md)                                                                      | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.RecordAssessmentOutcomeResponse](../../models/operations/record-assessment-outcome-response.md)\>**

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

## query

History is a POST with account_id in the body so an account identifier stays out of URLs and access logs. Requires the history scope. Read-only and safe to retry. Newest first, each at its latest assessment_version. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your tenant and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope.

### Example Usage: firstPage

<!-- UsageSnippet language="typescript" operationID="queryAccountAssessments" method="post" path="/v1/assessments/query" example="firstPage" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.query({
    accountId: "acct_7f3a9c",
  });

  for await (const page of result) {
    console.log(page);
  }
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsQuery } from "@noresponse/node/funcs/assessments-query.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsQuery(noResponse, {
    accountId: "acct_7f3a9c",
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const page of result) {
    console.log(page);
  }
  } else {
    console.log("assessmentsQuery failed:", res.error);
  }
}

run();
```
### Example Usage: page

<!-- UsageSnippet language="typescript" operationID="queryAccountAssessments" method="post" path="/v1/assessments/query" example="page" -->
```typescript
import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const result = await noResponse.assessments.query({
    accountId: "<id>",
  });

  for await (const page of result) {
    console.log(page);
  }
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { NoResponseCore } from "@noresponse/node/core.js";
import { assessmentsQuery } from "@noresponse/node/funcs/assessments-query.js";

// Use `NoResponseCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const noResponse = new NoResponseCore({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function run() {
  const res = await assessmentsQuery(noResponse, {
    accountId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const page of result) {
    console.log(page);
  }
  } else {
    console.log("assessmentsQuery failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.AssessmentQuery](../../models/assessment-query.md)                                                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.QueryAccountAssessmentsResponse](../../models/operations/query-account-assessments-response.md)\>**

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