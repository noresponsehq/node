<!-- Start SDK Example Usage [usage] -->
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
<!-- End SDK Example Usage [usage] -->