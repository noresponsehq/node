import assert from "node:assert/strict";
import test from "node:test";
import { NoResponse } from "../dist/esm/index.js";
import { fakeFetch, fixture, problem } from "./helpers.mjs";

const report = fixture("valid/person-report-records.json");
const target = {

  groupId: report.person.group_id,
  personId: report.person.id,
};

for (const idempotencyKey of [undefined, "request-01JA2Z8K6Q4V7W9XBCDEFGHJKM"]) {
  for (const operation of ["create", "startSearch"]) {
    test(`${operation} sends its request key and does not retry an uncertain write (${idempotencyKey ? "keyed" : "unkeyed"})`, async () => {
      const { fetcher, calls } = fakeFetch([problem(503, "service_unavailable"), problem(400, "invalid_request")]);
      const nr = new NoResponse({ apiKey: "nrk_0TESTKEY00000000000000000_" + "s".repeat(43), fetch: fetcher });
      const body = operation === "create"
        ? { name: "Retry test", startsAt: "2026-12-03T09:30:00Z" }
        : { recordId: report.lookup.records[0].id, field: report.lookup.records[0].fields[0].field };
      await assert.rejects(nr.groups[operation]({ ...target, body, idempotencyKey }));
      assert.equal(calls.length, 1, "an uncertain creation must not repeat automatically");
      assert.equal(calls[0].headers["idempotency-key"], idempotencyKey);
    });
  }
}
