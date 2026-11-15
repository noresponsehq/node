import assert from "node:assert/strict";
import test from "node:test";
import { inspect } from "node:util";
import { NoResponse, RecordKind, RecordRole } from "../dist/esm/index.js";
import { fixture, fakeFetch, json } from "./helpers.mjs";

// The contract's worked person report: a platform account and a leaked row
// as records, with every member a record has.
const report = fixture("valid/person-report-records.json");
const key = "nrk_0TESTKEY00000000000000000_" + "s".repeat(43);

test("a person's report returns typed records: kinds, roles, ratings and likelihood", async () => {
  const { fetcher, calls } = fakeFetch([json(report)]);
  const nr = new NoResponse({ apiKey: key, baseUrl: "https://example.com", fetch: fetcher });
  const { result } = await nr.groups.getPerson({

    groupId: report.person.group_id,
    personId: report.person.id,
  });
  assert.equal(new URL(calls[0].url).pathname,
    `/v1/groups/${report.person.group_id}/people/${report.person.id}`);

  const [account, row] = result.lookup.records;
  assert.equal(account.source.kind, "platform");
  assert.equal(account.source.site, "github.com");
  assert.equal(account.matched[0].by, "username");
  assert.equal(new Date(account.observedAt).toISOString(), "2026-11-14T10:01:40.000Z");
  const handle = account.fields.find((field) => field.role === RecordRole.Handle);
  assert.equal(handle.kind, RecordKind.Username);
  assert.equal(handle.value, "jordan-ellis");
  assert.equal(handle.distinctive.rating, "distinctive");
  const name = account.fields.find((field) => field.role === RecordRole.DisplayName);
  assert.equal(name.original, "Jordan  Ellis");
  assert.equal(name.value, "Jordan Ellis");
  const hireable = account.fields.find((field) => field.field === "hireable");
  assert.equal(hireable.role, undefined, "a field only its source returns has no role");
  assert.equal(account.likelihood, 0.74);
  assert.deepEqual(account.agreed, ["name", "twitter_username"]);
  assert.equal(account.joined, true);
  assert.equal(account.verdict, "joined");

  assert.equal(row.source.kind, "site_breach");
  assert.equal(row.source.table, "FORUM_EXAMPLE_NET_2019");
  assert.equal(row.source.date, "2019-03");
  assert.equal(row.matched[0].field, "email");
  const byField = Object.fromEntries(row.fields.map((field) => [field.field, field]));
  assert.equal(byField.password.kind, RecordKind.Password);
  assert.equal(byField.password.value, "Leeds1990!");
  assert.equal(byField.password_hash.detail, "bcrypt");
  assert.equal(byField.lastip.role, RecordRole.LastIp);
  assert.equal(byField.lastip.value, "203.0.113.5");
  assert.equal(byField.birthday.value, undefined, "an ambiguous date keeps its original and no value");
  assert.equal(byField.birthday.original, "07/03/1990");
  assert.equal(byField.email.distinctive.rating, "unique");
  assert.equal(row.likelihood, 0.99);
  assert.equal(row.verdict, undefined);

  const [remaining] = result.lookup.remaining;
  assert.equal(remaining.source.kind, "credential_list");
  assert.equal(remaining.by, "username");
  assert.equal(remaining.rows, 37);
});

test("the client exposes every generated group beside the wrapped ones", () => {
  const nr = new NoResponse({ apiKey: key, baseUrl: "https://example.com" });
  for (const group of ["people", "investigations", "groups", "reviews", "members", "invites", "audit", "usage", "lists", "erasures", "exports", "evaluations", "operations"]) {
    assert.equal(nr[group], nr.core[group], group);
  }
  for (const method of ["create", "addPeople", "startScreening", "getScreening", "listPeople", "getPerson", "startSearch", "runSearch", "reviewPerson", "judgeRecord"]) {
    assert.equal(typeof nr.groups[method], "function", method);
  }
});

test("printing a generated group never shows the key", () => {
  const nr = new NoResponse({ apiKey: key, baseUrl: "https://example.com" });
  for (const group of [nr.people, nr.investigations, nr.groups, nr.reviews, nr.usage, nr.members, nr.assessments, nr.accounts, nr.webhookEndpoints]) {
    for (const rendered of [inspect(group), JSON.stringify(group), JSON.stringify({ group })]) {
      assert.ok(!rendered.includes(key), rendered);
    }
  }
});
