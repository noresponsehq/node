# CreateAssessmentRequest

## Example Usage

```typescript
import { CreateAssessmentRequest } from "@noresponse/node/models/operations";

let value: CreateAssessmentRequest = {
  idempotencyKey: "signup-7f3a9c-0001",
  body: {
    accountId: "acct_7f3a9c",
    identifiers: {
      email: "new.user@example.com",
      username: "new.user",
      phone: "+61412345678",
      name: "Alex Example",
      ip: "203.0.113.45",
    },
    policyContext: {
      region: "AU",
    },
    requestId: "req-2026-10-14-0001",
    clientContext: {
      timezone: "Australia/Sydney",
      locale: "en-AU",
      appVersion: "4.12.0",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
      deviceId: "dev_5c1e8a",
      sessionId: "sess_9b2d41",
      clientObservedAt: "2026-10-14T08:59:58.000Z",
    },
    authContext: {
      provider: "clerk",
      issuer: "https://example-app.clerk.accounts.dev",
      audience: "https://app.example.com",
      audiences: [
        "https://app.example.com",
      ],
      subject: "user_2EXAMPLE",
      sessionId: "sess_2EXAMPLE",
      organizationId: "org_2EXAMPLE",
      tenantId: "tenant_2EXAMPLE",
      tokenId: "2EXAMPLEJTI",
      issuedAt: "2026-10-14T08:59:40.000Z",
      expiresAt: "2026-10-14T09:00:40.000Z",
      sessionCreatedAt: "2026-10-14T08:57:00.000Z",
      authTime: "2026-10-14T08:55:00.000Z",
      accountCreatedAt: "2026-10-14T08:56:00.000Z",
      verified: false,
      mfa: {
        methods: [
          "totp",
        ],
      },
      roles: [
        "admin",
      ],
      scopes: [
        "org:sys_profile:manage",
      ],
    },
    issuedCredential: {
      sha256:
        "2bdbf5c72f2a36df0ef40fb92203612274d4546f56dba946070a6a79c2401a1b",
    },
  },
};
```

## Fields

| Field                                                                                                                                                          | Type                                                                                                                                                           | Required                                                                                                                                                       | Description                                                                                                                                                    | Example                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idempotencyKey`                                                                                                                                               | *string*                                                                                                                                                       | :heavy_check_mark:                                                                                                                                             | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours. | signup-7f3a9c-0001                                                                                                                                             |
| `body`                                                                                                                                                         | [models.AssessmentRequest](../../models/assessment-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                             | N/A                                                                                                                                                            |                                                                                                                                                                |