# Build an AI SA portfolio

## Show decisions, not screenshots

An AI Solutions Architect portfolio demonstrates how you turn ambiguity into a defensible system decision. It is not a collection of prompts, polished model responses, or model screenshots. A strong case study shows alternatives, architecture, evidence, trade-offs, risks, operational thinking, and what changed after learning from results.

Use the [capstones](../capstones.md) as source projects and [Solution architecture practice](../level102/solution_architecture_practice.md) as a guide to communicating decisions. Remove confidential information, secrets, personal data, and employer-owned material. Synthetic or open data is acceptable when clearly labelled.

## Repeatable eight-section case study

### 1. Problem

State the decision to be made, current workflow, desired outcome, scope, and a measurable definition of success. Separate observed facts from assumptions.

### 2. Users and constraints

Name primary and affected users. Capture accessibility, data, policy, security, budget, latency, skills, integration, and timeline constraints.

### 3. Options

Compare at least two credible approaches, including a non-AI or simpler baseline. Explain the criteria, rejected options, and reversibility of the choice.

### 4. Architecture

Show system context, components, trust boundaries, data flows, failure paths, and human decision points. Annotate key interfaces and ownership rather than drawing a model in isolation.

### 5. Evidence and evaluations

Describe evaluation-set construction, baseline, metrics, slices, acceptance gates, results, and uncertainty. Include failure examples and evidence that changed a decision.

### 6. Cost, risk, and security

Show assumptions and unit economics at more than one scale. Include a prioritized risk register, privacy and threat analysis, controls, residual risk, and named owners.

### 7. Rollout and operations

Explain UAT, pilot or canary, telemetry, SLOs, support, incident response, versioning, rollback, and triggers for reassessment.

### 8. Reflection

State what worked, what did not, what you would change with more time or evidence, and what remains unknown. Distinguish your contribution from the team's work.

## Capstone-to-portfolio mapping

| Existing capstone | Portfolio story to emphasize | Proof to include |
| --- | --- | --- |
| Knowledge assistant | Secure, grounded retrieval across access-controlled documents | Context and data-flow diagrams, ACL tests, retrieval and groundedness evals, abstention examples, cost model |
| Workflow agent | Bounded autonomy in an auditable business workflow | Agent-versus-workflow comparison, tool schemas, approval gate, adversarial tests, traces, blast-radius analysis |
| Model migration | Quality-preserving cost reduction and portability | Three-model benchmark, routing decision, sensitivity analysis, abstraction boundary, canary and rollback plan |

Do not present the capstone brief as completed production work. Label prototypes, simulated results, assumptions, and illustrative costs honestly.

## Interview walk-through: architect's STAR

Adapt STAR into a decision narrative:

1. **Situation:** What user or business problem existed, and why did it matter?
2. **Constraints:** Which technical, organizational, legal, cost, and time boundaries shaped the solution?
3. **Options:** Which credible alternatives and baseline did you compare?
4. **Decision:** What did you choose, where are the boundaries, and who accepted the trade-off?
5. **Evidence:** Which evaluation, prototype, cost model, or risk test supported or challenged the choice?
6. **Result:** What measured outcome followed? If unlaunched, what did the prototype establish and not establish?
7. **Reflection:** What would you change, and which new evidence could reverse the decision?

Aim for a five-minute overview, then let the interviewer choose a branch. Keep diagrams readable and be ready to trace one request, one failure, and one operational incident end to end.

### Tough questions and proof to show

| Tough question | Proof to show |
| --- | --- |
| Why use AI at all? | Non-AI baseline, option matrix, and measured incremental value |
| Why this model or architecture? | Task-specific benchmark, constraints, architecture decision record, and rejected options |
| How do you know it is safe and fair enough? | Threat model, misuse tests, slice metrics, human-review design, and residual-risk owner |
| What happens when retrieval or the model is wrong? | Failure-path diagram, abstention tests, escalation flow, and user-facing error behaviour |
| Will it work at ten times the volume? | Load evidence, capacity assumptions, unit-cost model, rate limits, and scaling plan |
| How do you change or leave a provider? | Interface contract, portable eval suite, data export plan, versioning, and rollback rehearsal |
| What did you personally do? | Decision log, authored artefacts, commits or review history where shareable, and clear team attribution |
| Which result do you distrust? | Confidence interval or sample limitation, error analysis, and next experiment |

## Portfolio quality rubric

Score each dimension from **1 (missing or asserted)** to **4 (clear, evidenced, and reproducible)**.

| Dimension | A score of 4 demonstrates |
| --- | --- |
| Problem framing | Users, outcome, scope, baseline, and success measure are explicit |
| Decision quality | Credible options use stated criteria; trade-offs and reversibility are clear |
| Architecture | Boundaries, data, identity, failure paths, and human controls are coherent |
| Evidence | Versioned evaluation method, results, slices, failures, and uncertainty support the claims |
| Cost and risk | Assumptions, scale sensitivity, security, privacy, mitigations, and owners are visible |
| Production thinking | UAT, telemetry, SLOs, support, incidents, rollout, and rollback are actionable |
| Communication | The case is concise, accessible, honest, and understandable without narration |
| Reflection | Limits, contribution, learning, and next decisions are specific |

A high total does not compensate for fabricated evidence, exposed confidential data, or a critical security gap. Treat those as release blockers for publication.

## Thirty-minute self-review

### Minutes 0–5: audience and claim

- [ ] Can a reader identify the problem, users, your role, and the main decision in one minute?
- [ ] Are prototype, production, measured, projected, and illustrative claims labelled correctly?

### Minutes 5–10: architecture

- [ ] Can you trace a successful request and a failed request through the diagram?
- [ ] Are trust boundaries, data stores, identity checks, human gates, and external services visible?

### Minutes 10–15: evidence

- [ ] Does every important claim point to a metric, test, source, or clearly marked assumption?
- [ ] Are baseline, acceptance criteria, slices, failure examples, and limitations present?

### Minutes 15–20: cost, risk, and security

- [ ] Can another person recalculate cost from your volume and pricing assumptions?
- [ ] Do top risks have controls, residual risk, owner, and escalation or stop condition?

### Minutes 20–25: production readiness

- [ ] Are UAT, canary, monitoring, support, incident response, rollback, and change triggers covered?
- [ ] Is accessibility considered, and has all sensitive or employer-owned content been removed?

### Minutes 25–30: interview rehearsal

- [ ] Can you deliver the architect's STAR in five minutes without reading the page?
- [ ] Can you defend one rejected option, one uncertain result, and one decision you would reverse?
- [ ] Do all links, diagrams, captions, and evidence references work for an unfamiliar reader?
