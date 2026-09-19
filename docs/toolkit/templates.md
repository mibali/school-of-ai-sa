# Architecture and delivery templates

## How to use these templates

These are copyable Markdown templates. Fill them before a build starts, then refine them as evidence arrives. Copy any fenced block into a working document, replace every `[placeholder]`, and remove sections that genuinely do not apply with a recorded reason.

The templates are complete enough to use directly without downloads. Keep them versioned beside the decisions and evidence they describe.

## Template map

| Template | Delivery playbook phase | Relevant course page |
|---|---|---|
| AI opportunity brief | Discovery and feasibility | [The Practice: Discovery to Production](../level102/solution_architecture_practice.md) |
| Feasibility and data-readiness review | Discovery; Data readiness and solution selection | [Data for AI](../level101/data.md) |
| Architecture decision record | Data readiness and solution selection | [The Practice: Discovery to Production](../level102/solution_architecture_practice.md) |
| Model/vendor evaluation matrix | Data readiness and solution selection | [Cost Engineering for AI](../level102/cost_engineering.md) |
| Cost model | Data readiness and solution selection; Prototype and evidence | [Cost Engineering for AI](../level102/cost_engineering.md) |
| Risk register | All phases | [Governance, Safety, and Responsible AI](../level102/governance.md) |
| Prototype experiment report | Prototype and evidence | [Evaluation, Observability, and Guardrails](../level102/evaluation.md) |
| Deployment and UAT sign-off | Production, adoption, and evolution | [MLOps and LLMOps](../level102/llmops.md) |
| Monitoring/support handover | Production, adoption, and evolution | [Systems Design](../level101/systems_design.md) |

## One-page AI opportunity brief

```markdown
# AI opportunity: [short name]

**Owner:** [name/role]
**Sponsor:** [name/role]
**Date/version:** [YYYY-MM-DD / v0.1]
**Decision needed:** [pursue / reshape / pause / stop] by [date]

## User and problem
- Primary user: [who]
- Job or decision: [what they need to accomplish]
- Current workflow: [3–5 steps]
- Problem and impact: [observable problem; who is affected]
- Current baseline: [time, quality, cost, volume, risk]

## Proposed outcome
- Smallest useful outcome: [measurable change]
- Success measures: [metric + target + period + data source]
- Guardrail measures: [what must not worsen]
- Non-goals: [explicit exclusions]

## Why AI, if at all?
- Candidate capability:
  [classification / extraction / generation / retrieval / other]
- Simpler alternatives considered: [rules / search / process change / no change]
- Reason to investigate AI: [evidence, not novelty]

## Context and constraints
- Users/volume/peak: [figures and forecast]
- Data needed and owner: [sources, owner, permission status]
- Security/privacy/regulatory needs: [classification and obligations]
- Quality/latency/availability/cost boundaries: [targets or unknowns]
- Human oversight: [who reviews what and when]

## Risks and unknowns
1. [assumption or risk] — test with [cheap experiment] — owner [role]
2. [assumption or risk] — test with [cheap experiment] — owner [role]

## Next step
[timeboxed activity], costing [range], to decide [specific decision].
```

## Feasibility and data-readiness review

```markdown
# Feasibility and data-readiness review: [initiative]

**Reviewer(s):** [roles]
**Date/version:** [date/version]
**Scope:** [use case, users, region, data boundary]

## Feasibility summary
| Dimension | Rating [Ready/Conditional/Not ready] | Evidence | Gap/action | Owner/date |
|---|---|---|---|---|
| Problem and baseline | [rating] | [evidence] | [action] | [owner/date] |
| Technical approach | [rating] | [evidence] | [action] | [owner/date] |
| Skills and operations | [rating] | [evidence] | [action] | [owner/date] |
| Security and governance | [rating] | [evidence] | [action] | [owner/date] |
| Economics and schedule | [rating] | [evidence] | [action] | [owner/date] |

## Data inventory
| Source/owner | Purpose | Format/volume | Quality/coverage | Freshness | Classification | Access/region | Retention/deletion |
|---|---|---|---|---|---|---|---|
| [source/owner] | [purpose] | [details] | [measured result] | [SLA] | [class] | [controls] | [rule] |

## Data tests
- Representative sample inspected: [what, period, size]
- Missing, duplicate, invalid, or biased records: [findings]
- Labels or expected answers: [availability and reviewer agreement]
- Leakage and time-order risks: [findings]
- Permissions preserved through retrieval/training: [test/evidence]
- Lineage, consent, licence, and permitted AI use: [status]
- Production refresh and deletion path: [design/status]

## Solution fit
- Non-AI baseline: [approach and result]
- Candidate patterns: [rules/search/ML/RAG/agent]
- Critical dependency tests: [model/API/data/integration]
- Failure and fallback: [expected behaviour]

## Recommendation
**Decision:** [Proceed / Proceed with conditions / Stop]
**Conditions:** [measurable conditions, owners, dates]
**Evidence still needed:** [items]
**Next review:** [date and participants]
```

## Architecture decision record (ADR)

```markdown
# ADR-[number]: [decision title]

**Status:** [Proposed / Accepted / Superseded / Rejected]
**Date:** [YYYY-MM-DD]
**Owners/approvers:** [roles]
**Related decisions:** [ADR links or none]

## Context
[Problem, users, current state, and why a decision is needed now.]

## Decision drivers
- [measurable requirement or hard constraint]
- [security, data, quality, latency, availability, cost, skill, or portability driver]

## Options considered
| Option | Benefits | Costs/risks | Evidence | Meets hard constraints? |
|---|---|---|---|---|
| [A] | [benefits] | [trade-offs] | [test/reference] | [Yes/No] |
| [B] | [benefits] | [trade-offs] | [test/reference] | [Yes/No] |

## Decision
We will [specific choice] because [reason tied to drivers and evidence].

## Consequences
- Positive: [outcomes]
- Negative/trade-offs: [accepted costs and limitations]
- Controls and follow-up: [actions, owners, due dates]
- Revisit trigger: [metric, provider change, scale, incident, or date]

## Validation
[How implementation and operation will prove the decision remains sound.]
```

## Model/vendor evaluation matrix

Use a 1–5 score, where 1 is unacceptable and 5 is strong. Weights must total 100. Calculate `weighted points = score × weight`; the maximum total is 500. Define minimum gates separately so a high total cannot hide a critical failure.

```text
Evaluation: [use case]                         Date/version: [date/version]
Evaluators: [product, SME, engineering, security, data, procurement]
Candidates: [A], [B], [C]

| Criterion and measurement method | Weight | A score | A evidence | B score | B evidence | C score | C evidence |
|---|---:|---:|---|---:|---|---:|---|
| Task quality on versioned eval set [metric] | 25 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| Safety/security/privacy controls [tests] | 20 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| Latency/reliability at expected load | 15 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| Unit and total cost at forecast demand | 15 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| Integration and operational fit | 10 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| Data location, retention, and auditability | 10 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| Portability, contract, support, and exit | 5 | [1-5] | [result] | [1-5] | [result] | [1-5] | [result] |
| TOTAL | 100 | [sum score×weight] |  | [sum] |  | [sum] |  |

Minimum gates: [for example, no security score below 3; quality metric >= target]
Disqualifications: [candidate + failed gate + evidence]
Sensitivity check: [does winner change if key weight/forecast changes?]
Recommendation: [candidate and why]
Commercial assumptions requiring confirmation: [price, quota, term, data use]
Approvers and date: [roles/date]
```

## Cost model assumptions and outputs

```markdown
# Cost model: [solution and scenario]

**Currency/price date:** [currency / YYYY-MM-DD]
**Period:** [monthly/annual]
**Scenarios:** [low/base/high]
**Owner:** [role]

## Demand assumptions
| Input | Low | Base | High | Source/confidence |
|---|---:|---:|---:|---|
| Active users | [n] | [n] | [n] | [source / L-M-H] |
| Requests per user per period | [n] | [n] | [n] | [source] |
| Input/output tokens per request | [n/n] | [n/n] | [n/n] | [measurement] |
| Peak requests per second | [n] | [n] | [n] | [source] |
| Retrieval/storage volume and growth | [n] | [n] | [n] | [source] |
| Retry/cache-hit rate | [%/%] | [%/%] | [%/%] | [source] |

## Unit-price assumptions
| Cost item | Unit | Price | Quantity formula | Source/date |
|---|---|---:|---|---|
| Model input/output | [1M tokens] | [amount] | [requests × tokens] | [quote/date] |
| Embeddings/reranking | [unit] | [amount] | [documents/queries] | [quote/date] |
| Compute/platform | [unit] | [amount] | [hours/capacity] | [quote/date] |
| Storage/database/network | [unit] | [amount] | [GB/operations/transfer] | [quote/date] |
| Monitoring/evaluation/security | [unit] | [amount] | [events/runs/seats] | [quote/date] |
| People/support/licences | [unit] | [amount] | [effort/seats] | [estimate/date] |

## Outputs
| Output | Low | Base | High |
|---|---:|---:|---:|
| One-off build and migration | [amount] | [amount] | [amount] |
| Recurring platform/model cost | [amount] | [amount] | [amount] |
| Recurring people/support cost | [amount] | [amount] | [amount] |
| Contingency | [amount] | [amount] | [amount] |
| Total cost per period | [amount] | [amount] | [amount] |
| Cost per request/successful outcome/user | [amount] | [amount] | [amount] |

Formula checks: [show core formulas and avoid double counting]
Excluded costs: [tax, integration, support, exit, or none]
Largest sensitivities: [input and effect of ± change]
Budget threshold and action: [threshold; route/cache/redesign/stop]
Actual-versus-forecast review: [cadence, owner, data source]
```

## Risk register

Use agreed 1–5 likelihood and impact scales. `Inherent score = likelihood × impact` before treatment; record residual ratings after controls.

```markdown
# Risk register: [initiative]

**Risk owner accountable for register:** [role]
**Review cadence:** [cadence]
**Scales/acceptance rule:** [definitions and approval threshold]

| ID | Risk: cause → event → impact | Category | Affected users/assets | Inherent L×I | Prevent/detect/respond controls | Evidence/control owner | Residual L×I | Treatment/action/due | Risk owner | Status/review |
|---|---|---|---|---:|---|---|---:|---|---|---|
| R-01 | [cause] may cause [event], resulting in [impact] | [quality/security/privacy/safety/ops/vendor/cost] | [who/what] | [L×I=score] | [controls] | [evidence/owner] | [L×I=score] | [avoid/reduce/transfer/accept; action/date] | [accountable role] | [open/date] |

## Escalation and acceptance
- Escalation trigger: [score, incident, control failure, or trend]
- Accepted residual risk: [ID, rationale, accountable approver, expiry date]
- Dependencies and emerging risks: [items]
- Next review: [date and participants]
```

## Prototype experiment report

```markdown
# Prototype experiment: [name]

**Decision supported:** [specific proceed/redesign/stop decision]
**Owner/date/version:** [details]
**Timebox/budget:** [limits]
**Candidate versions:** [code, prompt, model, data/index, parameters]

## Hypothesis and gates
If [change], then [outcome] will [target] for [user/slice], measured by [method].

| Metric | Baseline | Gate | Guardrail | Result | Pass? |
|---|---:|---:|---:|---:|---|
| [quality metric] | [value] | [target] | [limit] | [value + CI if used] | [Y/N] |
| [latency/cost/safety metric] | [value] | [target] | [limit] | [value] | [Y/N] |

## Method
- Evaluation set: [source, size, period, slices, permissions, version]
- Procedure: [steps, environment, repetitions, randomisation/blinding]
- Review rubric and reviewers: [criteria and agreement method]
- Known limitations/confounders: [items]

## Results and failures
- Results by slice: [table or summary]
- Representative successes: [case IDs]
- Failure categories and rates: [taxonomy and evidence]
- Security/abuse/fallback findings: [results]
- Observed unit cost and performance: [results]

## Conclusion
**Decision:** [Proceed / Redesign and retest / Stop]
**Reason:** [evidence against gates]
**Residual uncertainty:** [what is not proven]
**Actions:** [owner/date]
**Reproduction location:** [repository/report path]
```

## Deployment and UAT sign-off

```markdown
# Deployment and UAT sign-off: [release]

**Release/version:** [application/model/prompt/data/index versions]
**Environment/date/window:** [details]
**Release owner:** [role]
**Scope and excluded features:** [details]

## Readiness checklist
| Area | Evidence/target | Status [Pass/Conditional/Fail] | Owner | Exception/expiry |
|---|---|---|---|---|
| Functional and AI evaluation | [report + gate result] | [status] | [role] | [details] |
| Security/privacy/governance | [reviews + accepted risks] | [status] | [role] | [details] |
| Performance/capacity/cost | [load result + forecast] | [status] | [role] | [details] |
| Reliability/recovery/rollback | [tested result] | [status] | [role] | [details] |
| Monitoring, alerts, runbooks | [links and test] | [status] | [role] | [details] |
| User training and support | [materials/coverage] | [status] | [role] | [details] |

## UAT
- Users and workflows tested: [roles, scenarios, accessibility needs]
- Test data and environment: [details]
- Acceptance criteria: [measurable list]
- Results and defects: [passed/failed; severity; owner/date]
- Known limitations communicated: [how and to whom]
- Business owner decision: [Accept / Conditional / Reject]

## Release controls
- Rollout stages and feature flag: [plan]
- Go/no-go measures and approvers: [targets/roles]
- Stop/rollback triggers: [specific signals]
- Rollback steps and latest proof: [location/date]
- Communications and support coverage: [plan]

## Sign-off
| Accountability | Name/role | Decision | Date | Conditions |
|---|---|---|---|---|
| Product/service owner | [role] | [decision] | [date] | [conditions] |
| Technical/architecture | [role] | [decision] | [date] | [conditions] |
| Security/privacy/risk | [role] | [decision] | [date] | [conditions] |
| Operations/support | [role] | [decision] | [date] | [conditions] |
```

## Monitoring and support handover

```markdown
# Monitoring and support handover: [service]

**Service owner:** [role]
**Technical owner:** [role/team]
**Support contacts/hours:** [route and coverage]
**Version/date:** [details]

## Service definition
- Users and critical journeys: [details]
- Architecture and dependencies: [diagram/location; providers; data flows]
- Data/model/prompt/index versions: [how identified]
- SLOs and error budget: [availability, latency, useful-response targets]
- Known limitations and approved residual risks: [items/expiry]

## Signals and actions
| Signal | SLI/threshold by slice | Source/dashboard | Alert route | First action/runbook | Owner |
|---|---|---|---|---|---|
| Availability/errors | [target] | [location] | [route] | [action] | [role] |
| Latency/capacity | [target] | [location] | [route] | [action] | [role] |
| AI quality/grounding/safety | [target] | [location] | [route] | [action] | [role] |
| Data/retrieval freshness/drift | [target] | [location] | [route] | [action] | [role] |
| Cost/usage/adoption | [target] | [location] | [route] | [action] | [role] |
| Security/privacy events | [trigger] | [location] | [route] | [action] | [role] |

## Operating procedures
- Triage severity and escalation: [definitions and contacts]
- Safe disable, fallback, and rollback: [steps/permissions]
- Incident evidence and audit logs: [location, access, retention]
- Provider outage/quota response: [steps]
- Data correction/deletion and index refresh: [steps]
- User feedback and harmful-output report path: [route]

## Change and review
- Release/change approval: [process]
- Evaluation refresh triggers: [model/prompt/data change, drift, incident]
- Access, risk, supplier, cost, and SLO review cadence: [cadence/owners]
- End-of-life/export/deletion plan: [trigger and steps]

## Handover acceptance
- Dashboard and alert tested on [date] by [role]
- Rollback/fallback tested on [date] by [role]
- Support simulation completed on [date]; gaps: [items]
- Documentation/training accepted by [role] on [date]
- Open actions: [action, owner, due date]
- Final operational acceptance: [name/role/date/conditions]
```
