import dotenv from "dotenv";
dotenv.config();
/**
 * Example usage of the @noresponse/node SDK
 *
 * To run this example from the examples directory:
 * npm run build && npx tsx assessmentsCreate.example.ts
 */

import { NoResponse } from "@noresponse/node";

const noResponse = new NoResponse({
  apiKey: process.env["NORESPONSE_API_KEY"] ?? "",
});

async function main() {
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

main().catch(console.error);
