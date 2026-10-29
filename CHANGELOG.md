# Changelog

## 9.1.0

* `sdk.usage.get()`:  `response.consoleLookups` **Added**

## 9.0.0

* `sdk.accounts.listOutcomes()`: 
  *  `response.items[].actor` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed**
* `sdk.accounts.recordOutcome()`: 
  *  `response.actor` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed**
* `sdk.accounts.export()`: 
  *  `response` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed**
* `sdk.keys.create()`: 
  *  `request.body` **Changed**
  *  `response` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed**
* `sdk.accounts.listEnforcements()`: **Added**
* `sdk.accounts.listDecisions()`: **Added**
* `sdk.webhookEndpoints.aggregate()`: **Added**
* `sdk.members.list()`: **Added**
* `sdk.members.remove()`: **Added**
* `sdk.members.update()`: **Added**
* `sdk.audit.list()`: **Added**
* `sdk.audit.getRetention()`: **Added**
* `sdk.audit.updateRetention()`: **Added**
* `sdk.audit.listStreams()`: **Added**
* `sdk.audit.configureStream()`: **Added**
* `sdk.audit.removeStream()`: **Added**
* `sdk.audit.replayStream()`: **Added**
* `sdk.usage.get()`: **Added**
* `sdk.invites.list()`: **Added**
* `sdk.invites.create()`: **Added**
* `sdk.invites.revoke()`: **Added**
* `sdk.invites.resend()`: **Added**
* `sdk.settings.listHistory()`: **Added**
* `sdk.settings.restore()`: **Added**
* `sdk.settings.preview()`: **Added**
* `sdk.requests.aggregate()`: **Added**
* `sdk.lists.preview()`: **Added**
* `sdk.lists.change()`: **Added**
* `sdk.lists.getChange()`: **Added**
* `sdk.reviews.list()`: **Added**
* `sdk.reviews.create()`: **Added**
* `sdk.reviews.get()`: **Added**
* `sdk.reviews.update()`: **Added**
* `sdk.reviews.resolve()`: **Added**
* `sdk.reviews.listComments()`: **Added**
* `sdk.reviews.comment()`: **Added**
* `sdk.reviews.listResolutions()`: **Added**
* `sdk.reviews.listViews()`: **Added**
* `sdk.reviews.createView()`: **Added**
* `sdk.reviews.deleteView()`: **Added**
* `sdk.reviews.updateView()`: **Added**
* `sdk.reviews.export()`: **Added**
* `sdk.reviews.listSubjects()`: **Added**
* `sdk.reviews.addSubject()`: **Added**
* `sdk.reviews.deleteSubject()`: **Added**
* `sdk.erasures.get()`: **Added**
* `sdk.exports.list()`: **Added**
* `sdk.exports.create()`: **Added**
* `sdk.exports.get()`: **Added**
* `sdk.exports.cancel()`: **Added**
* `sdk.exports.retry()`: **Added**
* `sdk.exports.downloadChunk()`: **Added**
* `sdk.evaluations.list()`: **Added**
* `sdk.evaluations.create()`: **Added**
* `sdk.evaluations.get()`: **Added**
* `sdk.evaluations.getResult()`: **Added**
* `sdk.evaluations.cancel()`: **Added**
* `sdk.evaluations.publish()`: **Added**
* `sdk.operations.summarize()`: **Added**
* `sdk.assessments.create()`:  `error.code` **Changed**
* `sdk.assessments.get()`:  `error.code` **Changed**
* `sdk.assessments.delete()`: 
  *  `response.erasureId` **Added**
  *  `error.code` **Changed**
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed**
* `sdk.assessments.query()`:  `error.code` **Changed**
* `sdk.assessments.aggregate()`: 
  *  `request` **Changed**
  *  `response` **Changed**
  *  `error.code` **Changed**
* `sdk.assessments.search()`: 
  *  `request` **Changed**
  *  `error.code` **Changed**
* `sdk.assessments.retrieveVersion()`:  `error.code` **Changed**
* `sdk.assessments.bindAccount()`:  `error.code` **Changed**
* `sdk.accounts.listChanged()`:  `error.code` **Changed**
* `sdk.accounts.get()`:  `error.code` **Changed**
* `sdk.accounts.delete()`: 
  *  `response.erasureId` **Added**
  *  `error.code` **Changed**
* `sdk.accounts.listAssessments()`:  `error.code` **Changed**
* `sdk.accounts.recordEnforcement()`:  `error.code` **Changed**
* `sdk.accounts.retrieveDecision()`:  `error.code` **Changed**
* `sdk.accounts.listCredentials()`:  `error.code` **Changed**
* `sdk.accounts.associateCredential()`:  `error.code` **Changed**
* `sdk.accounts.retireCredential()`:  `error.code` **Changed**
* `sdk.keyUsage.record()`:  `error.code` **Changed**
* `sdk.keys.rotate()`:  `error.code` **Changed**
* `sdk.keys.list()`: 
  *  `response.items[]` **Changed**
  *  `error.code` **Changed**
* `sdk.keys.revoke()`: 
  *  `response` **Changed**
  *  `error.code` **Changed**
* `sdk.integrations.list()`:  `error.code` **Changed**
* `sdk.integrations.create()`:  `error.code` **Changed**
* `sdk.integrations.delete()`:  `error.code` **Changed**
* `sdk.integrations.rotate()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.list()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.create()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.delete()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code` **Changed**
* `sdk.settings.get()`:  `error.code` **Changed**
* `sdk.settings.update()`: 
  *  `request.body` **Changed**
  *  `error.code` **Changed**
* `sdk.requests.list()`: 
  *  `request.apiKeyId` **Added**
  *  `response.items[].apiKeyId` **Added**
  *  `error.code` **Changed**
* `sdk.lists.list()`: 
  *  `request` **Changed**
  *  `response` **Changed**
  *  `error.code` **Changed**
* `sdk.lists.create()`: 
  *  `request.body.expiresAt` **Added**
  *  `response.expiresAt` **Added**
  *  `error.code` **Changed**
* `sdk.lists.delete()`:  `error.code` **Changed**

## 8.4.1

No changes detected.

## 8.4.0

* `sdk.assessments.aggregate()`: 
  *  `request.metrics[].enum(scoreOutcomes)` **Added**
  *  `response` **Changed**

## 8.3.0

* `sdk.assessments.aggregate()`: **Added**
* `sdk.assessments.search()`: 
  *  `request.revision` **Added**

## 8.2.1

* `sdk.assessments.create()`:  `response.detail.identifiers` **Added**
* `sdk.assessments.get()`:  `response.detail.identifiers` **Added**
* `sdk.assessments.query()`:  `response.items[].identifiers` **Added**
* `sdk.assessments.search()`:  `response.items[].detail.identifiers` **Added**
* `sdk.assessments.retrieveVersion()`:  `response.detail.identifiers` **Added**
* `sdk.accounts.listAssessments()`:  `response.items[].identifiers` **Added**
* `sdk.accounts.export()`:  `response.assessments[].detail.identifiers` **Added**

## 8.2.0

* `sdk.assessments.search()`: **Added**
* `sdk.assessments.retrieveVersion()`: **Added**
* `sdk.assessments.bindAccount()`: **Added**
* `sdk.accounts.recordOutcome()`: **Added**
* `sdk.accounts.listOutcomes()`: **Added**
* `sdk.accounts.retrieveDecision()`: **Added**
* `sdk.accounts.associateCredential()`: **Added**
* `sdk.accounts.listCredentials()`: **Added**
* `sdk.accounts.retireCredential()`: **Added**
* `sdk.accounts.export()`: **Added**
* `sdk.requests.list()`: **Added**
* `sdk.assessments.create()`: 
  *  `response.account.risk.reasons[].code.enum(reportedAccountAbuse)` **Added**
  *  `error.code` **Changed**
* `sdk.assessments.get()`: 
  *  `response.account.risk.reasons[].code.enum(reportedAccountAbuse)` **Added**
  *  `error.code` **Changed**
* `sdk.assessments.delete()`:  `error.code` **Changed**
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed**
* `sdk.assessments.query()`: 
  *  `response.items[].risk.reasons[].code.enum(reportedAccountAbuse)` **Added**
  *  `error.code` **Changed**
* `sdk.accounts.listChanged()`: 
  *  `response.items[].risk.reasons[].code.enum(reportedAccountAbuse)` **Added**
  *  `error.code` **Changed**
* `sdk.accounts.get()`: 
  *  `response.risk.reasons[].code.enum(reportedAccountAbuse)` **Added**
  *  `error.code` **Changed**
* `sdk.accounts.delete()`:  `error.code` **Changed**
* `sdk.accounts.listAssessments()`: 
  *  `response.items[].risk.reasons[].code.enum(reportedAccountAbuse)` **Added**
  *  `error.code` **Changed**
* `sdk.accounts.recordEnforcement()`:  `error.code` **Changed**
* `sdk.keyUsage.record()`:  `error.code` **Changed**
* `sdk.keys.rotate()`:  `error.code` **Changed**
* `sdk.keys.create()`:  `error.code` **Changed**
* `sdk.keys.list()`:  `error.code` **Changed**
* `sdk.keys.revoke()`:  `error.code` **Changed**
* `sdk.integrations.create()`:  `error.code` **Changed**
* `sdk.integrations.list()`:  `error.code` **Changed**
* `sdk.integrations.delete()`:  `error.code` **Changed**
* `sdk.integrations.rotate()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.list()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.create()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.delete()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code` **Changed**
* `sdk.settings.get()`:  `error.code` **Changed**
* `sdk.settings.update()`:  `error.code` **Changed**
* `sdk.lists.list()`:  `error.code` **Changed**
* `sdk.lists.create()`:  `error.code` **Changed**
* `sdk.lists.delete()`:  `error.code` **Changed**

## 8.1.3

* `sdk.assessments.create()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.assessments.get()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.assessments.delete()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.assessments.recordOutcome()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.assessments.query()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.accounts.listChanged()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.accounts.get()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.accounts.delete()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.accounts.listAssessments()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.accounts.recordEnforcement()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.keyUsage.record()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.keys.rotate()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.keys.create()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.keys.list()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.keys.revoke()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.integrations.create()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.integrations.list()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.integrations.delete()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.integrations.rotate()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.list()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.create()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.delete()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.settings.get()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.settings.update()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.lists.list()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.lists.create()`:  `error.code.enum(listEntryTooBroad)` **Added**
* `sdk.lists.delete()`:  `error.code.enum(listEntryTooBroad)` **Added**

## 8.1.2

* `sdk.lists.list()`: **Added**
* `sdk.lists.create()`: **Added**
* `sdk.lists.delete()`: **Added**
* `sdk.assessments.create()`: 
  *  `response` **Changed**
  *  `error.code` **Changed**
* `sdk.assessments.get()`: 
  *  `response` **Changed**
  *  `error.code` **Changed**
* `sdk.assessments.delete()`:  `error.code` **Changed**
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed**
* `sdk.assessments.query()`: 
  *  `response.items[].risk.reasons[]` **Changed**
  *  `error.code` **Changed**
* `sdk.accounts.listChanged()`: 
  *  `response.items[].risk.reasons[]` **Changed**
  *  `error.code` **Changed**
* `sdk.accounts.get()`: 
  *  `response.risk.reasons[]` **Changed**
  *  `error.code` **Changed**
* `sdk.accounts.delete()`:  `error.code` **Changed**
* `sdk.accounts.listAssessments()`: 
  *  `response.items[].risk.reasons[]` **Changed**
  *  `error.code` **Changed**
* `sdk.accounts.recordEnforcement()`:  `error.code` **Changed**
* `sdk.keyUsage.record()`:  `error.code` **Changed**
* `sdk.keys.rotate()`:  `error.code` **Changed**
* `sdk.keys.create()`:  `error.code` **Changed**
* `sdk.keys.list()`:  `error.code` **Changed**
* `sdk.keys.revoke()`:  `error.code` **Changed**
* `sdk.integrations.create()`:  `error.code` **Changed**
* `sdk.integrations.list()`:  `error.code` **Changed**
* `sdk.integrations.delete()`:  `error.code` **Changed**
* `sdk.integrations.rotate()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.list()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.create()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.delete()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code` **Changed**
* `sdk.settings.get()`:  `error.code` **Changed**
* `sdk.settings.update()`:  `error.code` **Changed**

## 8.1.1

* `sdk.webhookEndpoints.list()`:  `response.items[]` **Changed**
* `sdk.webhookEndpoints.create()`:  `response.endpoint` **Changed**

## 8.1.0

No changes detected.

## 8.0.3

* `sdk.assessments.create()`:  `response.detail.risk.summary.ip.asn` **Added**
* `sdk.assessments.get()`:  `response.detail.risk.summary.ip.asn` **Added**
* `sdk.assessments.query()`:  `response.items[].risk.summary.ip.asn` **Added**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.summary.ip.asn` **Added**

## 8.0.2

No changes detected.

## 8.0.1

No changes detected.

## 8.0.0

* `sdk.assessments.create()`:  `response` **Changed** (Breaking ⚠️)
* `sdk.assessments.get()`:  `response` **Changed** (Breaking ⚠️)
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].weight` **Removed** (Breaking ⚠️)
* `sdk.accounts.listChanged()`:  `response.items[].risk.reasons[].weight` **Removed** (Breaking ⚠️)
* `sdk.accounts.get()`:  `response.risk.reasons[].weight` **Removed** (Breaking ⚠️)
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].weight` **Removed** (Breaking ⚠️)

## 7.2.2

No changes detected.

## 7.2.1

No changes detected.

## 7.2.0

No changes detected.

## 7.1.8

* `sdk.assessments.create()`:  `response` **Changed**
* `sdk.assessments.get()`:  `response` **Changed**
* `sdk.assessments.query()`:  `response.items[].risk` **Changed**
* `sdk.accounts.listChanged()`:  `response.items[].risk.reasons[]` **Changed**
* `sdk.accounts.get()`:  `response.risk.reasons[]` **Changed**
* `sdk.accounts.listAssessments()`:  `response.items[].risk` **Changed**

## 7.1.7

* `sdk.assessments.create()`:  `response.account.risk.reasons[].code` **Changed**
* `sdk.assessments.get()`:  `response.account.risk.reasons[].code` **Changed**
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed**
* `sdk.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed**
* `sdk.accounts.get()`:  `response.risk.reasons[].code` **Changed**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed**

## 7.1.6

* `sdk.integrations.create()`: 
  *  `request.platform.enum(supabase)` **Added**
  *  `response.platform.enum(supabase)` **Added**
* `sdk.integrations.list()`:  `response.items[].platform.enum(supabase)` **Added**
* `sdk.integrations.rotate()`:  `response.platform.enum(supabase)` **Added**

## 7.1.5

* `sdk.assessments.create()`:  `response.account.risk.reasons[].code` **Changed**
* `sdk.assessments.get()`:  `response.account.risk.reasons[].code` **Changed**
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed**
* `sdk.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed**
* `sdk.accounts.get()`:  `response.risk.reasons[].code` **Changed**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed**

## 7.1.4

No changes detected.

## 7.1.3

No changes detected.

## 7.1.2

No changes detected.

## 7.1.1

* `sdk.accounts.recordEnforcement()`: 
  *  `request.body.action.enum(activate)` **Added**
  *  `response.action.enum(activate)` **Added**

## 7.1.0

* `sdk.keys.create()`: **Added**
* `sdk.keys.list()`: **Added**
* `sdk.keys.revoke()`: **Added**
* `sdk.settings.get()`: **Added**
* `sdk.settings.update()`: **Added**
* `sdk.assessments.create()`:  `error.code` **Changed**
* `sdk.assessments.get()`:  `error.code` **Changed**
* `sdk.assessments.delete()`:  `error.code` **Changed**
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed**
* `sdk.assessments.query()`:  `error.code` **Changed**
* `sdk.accounts.listChanged()`:  `error.code` **Changed**
* `sdk.accounts.get()`:  `error.code` **Changed**
* `sdk.accounts.delete()`:  `error.code` **Changed**
* `sdk.accounts.listAssessments()`:  `error.code` **Changed**
* `sdk.accounts.recordEnforcement()`:  `error.code` **Changed**
* `sdk.keyUsage.record()`:  `error.code` **Changed**
* `sdk.keys.rotate()`: 
  *  `response.scopes[].enum(management)` **Added**
  *  `error.code` **Changed**
* `sdk.integrations.create()`:  `error.code` **Changed**
* `sdk.integrations.list()`:  `error.code` **Changed**
* `sdk.integrations.delete()`:  `error.code` **Changed**
* `sdk.integrations.rotate()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.list()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.create()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.delete()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code` **Changed**
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code` **Changed**

## 7.0.5

No changes detected.

## 7.0.4

* `sdk.assessments.create()`:  `response.account.risk.reasons[].code` **Changed**
* `sdk.assessments.get()`:  `response.account.risk.reasons[].code` **Changed**
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].code` **Changed**
* `sdk.accounts.listChanged()`:  `response.items[].risk.reasons[].code` **Changed**
* `sdk.accounts.get()`:  `response.risk.reasons[].code` **Changed**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].code` **Changed**

## 7.0.3

* `sdk.assessments.create()`:  `response.detail.incompleteSources[].lane.enum(domain)` **Added**
* `sdk.assessments.get()`:  `response.detail.incompleteSources[].lane.enum(domain)` **Added**
* `sdk.assessments.query()`:  `response.items[].incompleteSources[].lane.enum(domain)` **Added**
* `sdk.accounts.listAssessments()`:  `response.items[].incompleteSources[].lane.enum(domain)` **Added**

## 7.0.2

No changes detected.

## 7.0.1

* `sdk.assessments.create()`:  `response.account.risk.decision.enum(held)` **Added**
* `sdk.assessments.get()`:  `response.account.risk.decision.enum(held)` **Added**
* `sdk.accounts.listChanged()`:  `response.items[].risk.decision.enum(held)` **Added**
* `sdk.accounts.get()`:  `response.risk.decision.enum(held)` **Added**

## 7.0.0

No changes detected.

## 6.0.2

* `sdk.accounts.listChanged()`: **Added**
* `sdk.accounts.recordEnforcement()`: **Added**
* `sdk.assessments.create()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.assessments.get()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.assessments.delete()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.assessments.recordOutcome()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.assessments.query()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.accounts.get()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.accounts.delete()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.accounts.listAssessments()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.keyUsage.record()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.keys.rotate()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.integrations.create()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.integrations.list()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.integrations.delete()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.integrations.rotate()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.list()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.create()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.delete()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code.enum(riskVersionAhead)` **Added**
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code.enum(riskVersionAhead)` **Added**

## 6.0.1

No changes detected.

## 6.0.0

No changes detected.

## 5.1.2

* `sdk.assessments.create()`:  `response.account.riskVersion` **Added**
* `sdk.assessments.get()`:  `response.account.riskVersion` **Added**
* `sdk.accounts.get()`:  `response.riskVersion` **Added**

## 5.1.1

No changes detected.

## 5.1.0

* `sdk.keys.rotate()`:  `response.scopes[].enum(delete)` **Added**

## 5.0.2

No changes detected.

## 5.0.1

No changes detected.

## 5.0.0

* `sdk.assessments.create()`: 
  *  `request.body.flow` **Changed** (Breaking ⚠️)
  *  `response` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed** (Breaking ⚠️)
* `sdk.assessments.get()`: 
  *  `response` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed** (Breaking ⚠️)
* `sdk.assessments.delete()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.assessments.query()`: 
  *  `response.items[].risk` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed** (Breaking ⚠️)
* `sdk.accounts.get()`: 
  *  `response` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed** (Breaking ⚠️)
* `sdk.accounts.delete()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.accounts.listAssessments()`: 
  *  `response.items[].risk` **Changed** (Breaking ⚠️)
  *  `error.code` **Changed** (Breaking ⚠️)
* `sdk.keyUsage.record()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.keys.rotate()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.integrations.create()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.integrations.list()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.integrations.delete()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.integrations.rotate()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.list()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.create()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.delete()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.rotateSigningKey()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.sendTestEvent()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.listDeliveries()`:  `error.code` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.replayDelivery()`:  `error.code` **Changed** (Breaking ⚠️)

## 4.0.1

No changes detected.

## 4.0.0

* `sdk.webhookEndpoints.listDeliveries()`:  `response.items[].eventType` **Changed** (Breaking ⚠️)
* `sdk.webhookEndpoints.replayDelivery()`:  `response.eventType` **Changed** (Breaking ⚠️)

## 3.0.8

No changes detected.

## 3.0.7

No changes detected.

## 3.0.6

No changes detected.

## 3.0.5

No changes detected.

## 3.0.4

No changes detected.

## 3.0.3

* `sdk.keyUsage.record()`: **Added**
* `sdk.assessments.create()`:  `response.account.risk.reasons[].code.enum(sharedApiKey)` **Added**
* `sdk.assessments.get()`:  `response.account.risk.reasons[].code.enum(sharedApiKey)` **Added**
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].code.enum(sharedApiKey)` **Added**
* `sdk.accounts.get()`:  `response.risk.reasons[].code.enum(sharedApiKey)` **Added**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].code.enum(sharedApiKey)` **Added**

## 3.0.2

No changes detected.

## 3.0.1

No changes detected.

## 3.0.0

* `sdk.assessments.create()`: 
  *  `request.body` **Changed** (Breaking ⚠️)
  *  `response` **Changed** (Breaking ⚠️)
* `sdk.assessments.get()`:  `response` **Changed** (Breaking ⚠️)

## 2.0.36

* `sdk.assessments.delete()`: **Added**

## 2.0.35

No changes detected.

## 2.0.34

No changes detected.

## 2.0.33

No changes detected.

## 2.0.32

* `sdk.accounts.delete()`: **Added**

## 2.0.31

* `sdk.assessments.create()`: 
  *  `request.body` **Changed**

## 2.0.30

No changes detected.

## 2.0.29

* `sdk.webhookEndpoints.listDeliveries()`: **Added**
* `sdk.webhookEndpoints.replayDelivery()`: **Added**

## 2.0.28

No changes detected.

## 2.0.27

No changes detected.

## 2.0.26

No changes detected.

## 2.0.25

* `sdk.assessments.create()`:  `response.risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.assessments.get()`:  `response.risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.accounts.get()`:  `response.risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].code.enum(testScenario)` **Added**

## 2.0.24

No changes detected.

## 2.0.23

No changes detected.

## 2.0.22

No changes detected.

## 2.0.21

No changes detected.

## 2.0.20

* `sdk.accounts.get()`: **Added**
* `sdk.accounts.listAssessments()`: **Added**

## 2.0.19

No changes detected.

## 2.0.18

No changes detected.

## 2.0.17

No changes detected.

## 2.0.16

* `sdk.assessments.create()`:  `response.authContext` **Added**
* `sdk.assessments.get()`:  `response.authContext` **Added**
* `sdk.assessments.query()`:  `response.items[].authContext` **Added**

## 2.0.15

No changes detected.

## 2.0.14

* `sdk.webhookEndpoints.list()`: **Added**
* `sdk.webhookEndpoints.create()`: **Added**
* `sdk.webhookEndpoints.delete()`: **Added**
* `sdk.webhookEndpoints.rotateSigningKey()`: **Added**
* `sdk.webhookEndpoints.sendTestEvent()`: **Added**
* `sdk.assessments.create()`:  `error.code` **Changed**
* `sdk.assessments.get()`:  `error.code` **Changed**
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed**
* `sdk.assessments.query()`:  `error.code` **Changed**
* `sdk.keys.rotate()`:  `error.code` **Changed**
* `sdk.integrations.create()`:  `error.code` **Changed**
* `sdk.integrations.list()`:  `error.code` **Changed**
* `sdk.integrations.delete()`:  `error.code` **Changed**
* `sdk.integrations.rotate()`:  `error.code` **Changed**

## 2.0.13

* `sdk.integrations.create()`: **Added**
* `sdk.integrations.list()`: **Added**
* `sdk.integrations.delete()`: **Added**
* `sdk.integrations.rotate()`: **Added**
* `sdk.assessments.create()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.assessments.get()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.assessments.recordOutcome()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.assessments.query()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.keys.rotate()`: 
  *  `response.scopes[].enum(integrations)` **Added**
  *  `error.code.enum(tooManyIntegrations)` **Added**

## 2.0.12

* `sdk.assessments.create()`: 
  *  `request.body.issuedCredential` **Added**
  *  `response.risk` **Changed**
* `sdk.assessments.get()`:  `response.risk` **Changed**
* `sdk.assessments.query()`:  `response.items[].risk` **Changed**

## 2.0.11

No changes detected.

## 2.0.10

No changes detected.

## 2.0.9

* `sdk.assessments.create()`: 
  *  `request.body.authContext` **Changed**

## 2.0.8

No changes detected.

## 2.0.7

No changes detected.

## 2.0.6

No changes detected.

## 2.0.5

No changes detected.

## 2.0.4

No changes detected.

## 2.0.3

No changes detected.

## 2.0.2

API changes since the previous release are not listed: no earlier document was recorded.

All notable changes to `@noresponse/node`. The format follows Keep a Changelog and the package follows Semantic Versioning.

## 2.0.0

The client is now generated from the NoResponse OpenAPI document, with hand-written webhooks, auth adapters and wait helper. Every call site changes.

### Breaking changes

- Construction: `new NoResponse({ apiKey, baseUrl, timeoutMs, fetch, logger, retryConfig })`. `apiKey` defaults to `NORESPONSE_API_KEY` and `baseUrl` to `NORESPONSE_BASE_URL`, then `https://api.noresponse.org`; both options were required before and the environment was not read. The default timeout is 10 s (was 5 s). `maxRetries` and `retryBaseDelayMs` are replaced by `retryConfig`.
- Methods moved under resources: `assess()` is `assessments.create(params, options)`, `getAssessment()` is `assessments.get(id, options)`, `waitForAssessment()` is `assessments.wait(id, options)`, `queryAssessments()` is `assessments.query(params)` and `recordOutcome()` is `assessments.recordOutcome(id, params, options)`. `keys.rotate()` is new.
- Request bodies use the API's field names in camelCase: `create` takes `{ accountId, identifiers: { email, username, phone, name, ip }, policyContext: { flow, region }, requestId, deadlineMs, responseMode, clientContext, authContext }` instead of a flat object. Client-side checks of ids, the deadline, the outcome vocabulary and note lengths are gone; the API answers 400 with `invalidParams`.
- The idempotency key is an option (`{ idempotencyKey }`), is generated when omitted, and is reused on every retry of that call.
- Every model is camelCase (`assessmentId`, `assessmentVersion`, `expiresAt`, `risk.reasons[].code`). Dates stay RFC 3339 strings.
- Returned objects carry `meta` (`requestId`, `retryAfter`, `location`, `idempotentReplayed`); `query` returns a page with `items`, `hasMore`, `next()` and an async iterator over every item.
- Errors: one class per status (`BadRequestError`, `AuthenticationError`, `PermissionDeniedError`, `NotFoundError`, `ConflictError`, `RateLimitError`, `APIStatusError`), all extending `NoResponseError`, each with `status`, `type`, `title`, `detail`, `code`, `requestId`, `retryAfter` and `invalidParams`. Connection failures and timeouts are `APIConnectionError` and `APITimeoutError` instead of raw `TypeError` and `DOMException`. `retryable` is replaced by `isRetryable(error)`.
- Retries cover connection errors, 408, 429 and every 5xx (before: network errors, 429 and 503), with jittered backoff from 500 ms to 8 s for at most 30 s in all. `Retry-After` is honoured and capped at 8 s; before, a `Retry-After: 3600` made the client sleep for an hour.
- `wait` polls no faster than once a second and throws `APITimeoutError` (was a plain `Error`).
- Webhooks: `verifyWebhook(rawBody, headerPairs, secrets, nowSeconds)` is `constructEvent(payload, headers, secrets, { toleranceSeconds, now })`, which also accepts a string body, a Fetch `Headers` object and Node headers. `webhookAssessment()` is gone: an `assessment.updated` event's `data` is already the typed assessment, and `isExpiredEvent()` picks out the terminal expiry event. `webhookVerificationResponse()` is `verificationResponse()`. Failures throw `WebhookVerificationError` with a `code`.
- Auth adapters return and accept camelCase (`sessionCreatedAt`, `emailVerified`, `mfa.ageSeconds`); their outputs are unchanged on the wire.
- Packaging: dual ESM and CommonJS builds, `zod` as a runtime dependency, package metadata pointing at https://docs.noresponse.org and https://github.com/noresponsehq/node.

### Added

- `keys.rotate({ overlapSeconds })`.
- `nr.webhooks` and `NoResponse.webhooks` with `constructEvent` and `verificationResponse`.
- `NORESPONSE_LOG=debug` and the `logger` option: one line per request and response, without headers or bodies.
- A `User-Agent` of `noresponse-node/<version> (<runtime>)` on every request.
- Standalone per-operation functions under `@noresponse/node/funcs/*` and a `NoResponseCore` client for them.
- Node 20 and 22 in CI.

## 1.0.1

Hand-written client: `assess`, `getAssessment`, `waitForAssessment`, `queryAssessments`, `recordOutcome`, `verifyWebhook` and the four auth adapters.
