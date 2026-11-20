import assert from "node:assert/strict";
import test from "node:test";
import { NoResponse } from "../dist/esm/index.js";
import { fakeFetch, fixture, json, problem } from "./helpers.mjs";

const groupReport = fixture("valid/person-report-records.json");
const person = {
  id: groupReport.person.id,
  name: "Jordan Example",
  email: "jordan@example.com",
  created_at: "2026-11-15T10:00:00Z",
  updated_at: "2026-11-15T10:00:00Z",
  expires_at: "2026-12-15T10:00:00Z",
};
const investigation = {
  id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  person_id: person.id,
  group_id: null,
  status: "completed",
  depth: "standard",
  platforms: ["x"],
  match_state: "confirmed",
  coverage: groupReport.person.coverage,
  spend: groupReport.person.spend,
  created_at: person.created_at,
  expires_at: person.expires_at,
  deadline_at: "2026-11-15T10:15:00Z",
};
const apiKey = "nrk_0TESTKEY00000000000000000_" + "s".repeat(43);
const retryConfig = { strategy: "backoff", backoff: { initialInterval: 1, maxInterval: 5, maxElapsedTime: 2000, exponent: 1.1 } };

function client(answers) {
  const { fetcher, calls } = fakeFetch(answers);
  return { nr: new NoResponse({ apiKey, fetch: fetcher, retryConfig }), calls };
}

test("a workspace person is created without a group and exposes retention and suggestions", async () => {
  const { nr, calls } = client([json({ person, created: true, suggested_matches: [{ person_id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKN", matched_on: ["email"] }] }, { status: 201 })]);
  const result = await nr.people.create({ body: { name: person.name, email: person.email }, idempotencyKey: "person-create-example-1" });
  assert.equal(new URL(calls[0].url).pathname, "/v1/people");
  assert.deepEqual(calls[0].body, { name: person.name, email: person.email });
  assert.equal(calls[0].headers["idempotency-key"], "person-create-example-1");
  assert.equal(result.result.person.id, person.id);
  assert.equal(result.result.person.expiresAt, person.expires_at);
  assert.equal(result.result.suggestedMatches[0].matchedOn[0], "email");
});

test("investigation retries keep the same key and person", async () => {
  const { nr, calls } = client([problem(503, "service_unavailable"), json(investigation, { status: 202, headers: { "retry-after": "1" } })]);
  const key = "investigation-example-1";
  const result = await nr.investigations.create({ idempotencyKey: key, body: { personId: person.id, depth: "standard" } });
  assert.equal(result.result.id, investigation.id);
  assert.equal(calls.length, 2);
  for (const call of calls) {
    assert.equal(new URL(call.url).pathname, "/v1/investigations");
    assert.equal(call.headers["idempotency-key"], key);
    assert.deepEqual(call.body, { person_id: person.id, depth: "standard" });
  }
});

test("workspace person and investigation reads retain complete structured records", async () => {
  const { profiles, posts, media, lookup } = groupReport;
  const change = { id: "chg_01JAAAAAAAAAAAAAAAAAAAAAAA", kind: "account_added", significance: "high", source: "github", investigation_id: investigation.id, previous_investigation_id: investigation.id, created_at: "2026-11-15T10:05:11Z", reviewed_at: null };
  const { nr, calls } = client([
    json({ ...person, evidence_investigation: investigation, profiles, posts, media, lookup, suggested_searches: [], changes: [change], schedule: { period: "weekly", next_run_at: "2026-01-09T00:00:00Z", last_investigation_id: null, last_error: null, updated_at: "2026-01-02T00:00:00Z", updated_by: "Jane Analyst" }, groups: [{ group_id: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM", group_name: "Annual shareholder meeting", group_starts_at: null, role: "crew", added_at: "2026-11-15T10:00:00Z" }] }),
    json({ person, investigation, profiles, posts, media, lookup }),
  ]);
  const latest = (await nr.people.get({ personId: person.id })).result;
  const history = (await nr.investigations.get({ investigationId: investigation.id })).result;
  assert.equal(latest.evidenceInvestigation.id, investigation.id);
  assert.equal(latest.lookup.records[1].fields.find(field => field.field === "password_hash").detail, "bcrypt");
  assert.equal(latest.changes[0].significance, "high");
  assert.equal(latest.changes[0].reviewedAt, null);
  assert.equal(latest.schedule.period, "weekly");
  assert.equal(latest.groups[0].groupId, "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  assert.equal(latest.groups[0].role, "crew");
  assert.equal(latest.groups[0].groupStartsAt, null);
  assert.equal(history.investigation.groupId, null);
  assert.equal(history.lookup.records[0].source.site, "github.com");
  assert.deepEqual(calls.map(call => new URL(call.url).pathname), [`/v1/people/${person.id}`, `/v1/investigations/${investigation.id}`]);
});

test("create person does not retry an uncertain mutation", async () => {
  const { nr, calls } = client([problem(503, "service_unavailable"), problem(400, "invalid_request")]);
  await assert.rejects(nr.people.create({ body: { name: person.name } }));
  assert.equal(calls.length, 1);
});

test("ongoing groups retain null dates and PATCH distinguishes omission from clearing", async () => {
  const group = { id: "grp_example", environment: "test", name: "Harbour building", type: "event", attribute: "", starts_at: null, ends_at: null, principals: [], topics: [], people: 0, version: 1, created_by: "test", created_at: person.created_at, updated_at: person.created_at };
  const { nr, calls } = client([json(group, { status: 201 }), json(group), json(group), json(group)]);
  const created = (await nr.groups.create({ body: { name: group.name } })).result;
  assert.equal(created.startsAt, null);
  assert.equal(created.endsAt, null);
  await nr.groups.update({ groupId: group.id, body: { name: "Harbour organization" } });
  await nr.groups.update({ groupId: group.id, body: { startsAt: "2026-12-03T09:00:00Z", endsAt: "2026-12-03T17:00:00Z" } });
  await nr.groups.update({ groupId: group.id, body: { startsAt: null, endsAt: null } });
  assert.deepEqual(calls.map(call => call.body), [{ name: group.name }, { name: "Harbour organization" }, { starts_at: "2026-12-03T09:00:00Z", ends_at: "2026-12-03T17:00:00Z" }, { starts_at: null, ends_at: null }]);
});

test("related ongoing groups decode null event starts", async () => {
  const { OtherGroup$inboundSchema } = await import("../dist/esm/models/other-group.js");
  const group = OtherGroup$inboundSchema.parse({"group_id":"grp_building","group_name":"Harbour building","group_starts_at":null,"person_id":"per_example","matched_on":["person_id"],"match_state":"unscreened","decision":null});
  assert.equal(group.groupStartsAt, null);
});
