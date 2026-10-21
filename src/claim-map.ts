// A copy of contracts/api/v1/fixtures/assessment-contract/auth-context-claim-map.json without its prose;
// tests/auth.test.mjs fails when the two differ.
export const CLAIM_MAP = {
  "version": 1,
  "kinds": {
    "id": {
      "pattern": "[A-Za-z0-9._:@/|+=~-]+",
      "maxLength": 256
    },
    "audience": {
      "pattern": "[A-Za-z0-9._:/-]+",
      "maxLength": 256
    },
    "role": {
      "pattern": "[A-Za-z0-9._:@/-]+",
      "maxLength": 64
    },
    "method": {
      "pattern": "[A-Za-z0-9._:-]+",
      "maxLength": 32
    },
    "issuer": {
      "pattern": "https://[\\x21-\\x7e]+",
      "maxLength": 256
    },
    "time": {
      "pattern": "[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]+)?(Z|[+-]([01][0-9]|2[0-3]):[0-5][0-9])",
      "maxLength": 64
    }
  },
  "slug": "[a-z0-9][a-z0-9._-]{1,31}",
  "constants": {
    "verified": true,
    "transport": "backend"
  },
  "base": {
    "issuer": {
      "op": "id",
      "kind": "issuer",
      "claims": [
        "iss"
      ],
      "required": true
    },
    "subject": {
      "op": "id",
      "kind": "id",
      "claims": [
        "sub"
      ],
      "required": true
    },
    "audiences": {
      "op": "list",
      "kind": "audience",
      "claims": [
        "aud"
      ],
      "split": "whitespace",
      "max": 8
    },
    "issued_at": {
      "op": "time",
      "claims": [
        "iat"
      ]
    },
    "expires_at": {
      "op": "time",
      "claims": [
        "exp"
      ]
    },
    "auth_time": {
      "op": "time",
      "claims": [
        "auth_time"
      ]
    },
    "session_id": {
      "op": "id",
      "kind": "id",
      "claims": [
        "sid"
      ]
    },
    "token_id": {
      "op": "id",
      "kind": "id",
      "claims": [
        "jti"
      ]
    }
  },
  "providers": {
    "workos": {
      "fields": {
        "organization_id": {
          "op": "id",
          "kind": "id",
          "claims": [
            "org_id"
          ]
        },
        "roles": {
          "op": "list",
          "kind": "role",
          "claims": [
            "roles",
            "role"
          ],
          "split": "whitespace",
          "max": 32
        },
        "scopes": {
          "op": "list",
          "kind": "role",
          "claims": [
            "permissions"
          ],
          "split": "whitespace",
          "max": 32
        },
        "impersonated": {
          "op": "actor",
          "claims": [
            "act"
          ]
        }
      }
    },
    "clerk": {
      "disable": [
        "issued_at"
      ],
      "fields": {
        "organization_id": {
          "op": "id",
          "kind": "id",
          "claims": [
            "o.id",
            "org_id"
          ]
        },
        "roles": {
          "op": "list",
          "kind": "role",
          "claims": [
            "o.rol",
            "org_role"
          ],
          "split": "none",
          "max": 32
        },
        "scopes": {
          "op": "list",
          "kind": "role",
          "claims": [
            "o.per",
            "org_permissions"
          ],
          "split": "comma_whitespace",
          "max": 32
        },
        "impersonated": {
          "op": "actor",
          "claims": [
            "act"
          ]
        },
        "mfa": {
          "op": "mfa_factor_age",
          "claim": "fva",
          "index": 1,
          "unitSeconds": 60,
          "maxSeconds": 315360000
        }
      }
    },
    "auth0": {
      "fields": {
        "organization_id": {
          "op": "id",
          "kind": "id",
          "claims": [
            "org_id"
          ]
        },
        "scopes": {
          "op": "list",
          "kind": "role",
          "claims": [
            "scope",
            "permissions"
          ],
          "split": "whitespace",
          "max": 32
        },
        "email_verified": {
          "op": "bool",
          "claims": [
            "email_verified"
          ]
        },
        "phone_verified": {
          "op": "bool",
          "claims": [
            "phone_number_verified"
          ]
        },
        "impersonated": {
          "op": "actor",
          "claims": [
            "act"
          ]
        },
        "mfa": {
          "op": "mfa_methods",
          "kind": "method",
          "claim": "amr",
          "max": 8,
          "mfaValue": "mfa",
          "ignore": [
            "pwd"
          ]
        }
      }
    },
    "oidc": {
      "slugArgument": true,
      "fields": {}
    }
  }
} as const;
