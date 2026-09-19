# The Practice: Discovery to Production

## Introduction

Solution architecture turns a business need into a system that can operate safely and economically.
The work begins before choosing a model or vendor.
This course covers discovery, decisions, vendor evaluation, proofs of concept, production readiness, and communication.
Afterward, you can lead an AI initiative from its first question to a defensible production plan.

## Why this matters for the AI SA

An AI Solutions Architect (AI SA) reduces uncertainty in the right order.
They expose weak assumptions before expensive implementation.
They translate goals into quality, latency, scale, risk, and cost requirements.
They keep experiments tied to decisions and production constraints.
Their main deliverable is shared clarity, supported by evidence.

## Key concepts

### Discovery before design

Start with users and the decision or task they need to complete.
Ask how work happens today and what failure costs.
Define volume, peak concurrency, seasonality, and growth.
Ask for median and tail latency needs; tail latency is the slow end of the distribution.

Identify risk tolerance, required human oversight, and irreversible actions.
Inspect the data reality: ownership, quality, formats, languages, permissions, freshness, and labels.
Ask whether source data may leave its region or enter a provider service.
Define the baseline and the smallest useful outcome.
If no one owns the process or data, architecture cannot repair that gap.

### From requirements to decisions

Translate each requirement into an architecture consequence.
Sub-second latency may require a smaller model, caching, or asynchronous enrichment.
Fresh private knowledge may require retrieval with permission filters.
Exact calculations require code or database queries, not model memory.
High-impact actions require approval and audit trails.

Separate hard constraints from preferences.
Write measurable quality, availability, recovery, security, and budget targets.
Trace components back to requirements.
Remove any component with no clear requirement.
Document assumptions and the event that would invalidate each one.

### Architecture decision records

An architecture decision record, or ADR, captures one important decision and its context.
Include status, date, problem, constraints, options, decision, and consequences.
Record rejected options fairly.
Link evidence such as benchmark results and cost models.

Keep ADRs short and immutable after acceptance.
Supersede an old ADR with a new one rather than rewriting history.
Useful ADRs explain why, not every implementation detail.
Examples include model hosting, retrieval strategy, or human approval policy.

### Vendor evaluation

A scored matrix compares suppliers against weighted criteria.
Define criteria before demonstrations.
Typical criteria include task quality, latency, cost, regions, security, contracts, portability, and operations.
Use mandatory pass/fail gates before weighted scores.

Test vendors with the same private benchmark and workload shape.
Validate claims in contracts and technical trials.
Score evidence quality as well as feature availability.
Run sensitivity analysis because weights can hide stakeholder disagreement.
Include exit cost and concentration risk.

### Proof of concept to production

A proof of concept, or PoC, tests a risky assumption with limited scope.
Define success criteria and a deadline in advance.
Include a baseline, representative data, and a clear decision after the test.
A PoC is not a small production system.

The PoC-to-production gap includes identity, permissions, bad data, peak load, retries, observability, evaluation, support, and cost controls.
Integration and operating ownership often break before the model does.
Plan failure modes, rollback, incident response, and change management.
Budget for data work and user adoption.

### Communicating architecture

Executives need outcomes, risks, cost ranges, timing, and decisions required.
Use one diagram and state assumptions plainly.
Engineers need interfaces, data flows, failure modes, capacity, security boundaries, and acceptance tests.
Give them ADRs and detailed sequence diagrams.

Do not present false precision.
Separate facts, estimates, and unknowns.
Tailor depth, not truth.
End every review with owners, decisions, and next evidence.

## A worked example

A legal team wants an assistant for 800 staff and 2 million documents.
Discovery finds 15,000 daily questions, a 5-second p95 latency target, and strict matter-level permissions.
Answers must cite source paragraphs.
The business target is 25% less research time without increasing reviewed factual errors.
These figures are illustrative.

The architect compares plain search, retrieval-augmented generation, or RAG, and fine-tuning.
An ADR selects hybrid RAG because sources change daily and exact legal terms matter.
A vendor matrix weights quality 30%, security 25%, operations 15%, cost 15%, latency 10%, and portability 5%.
Any vendor without permission filtering or acceptable data terms fails before scoring.

The six-week PoC uses 20,000 documents and 200 labelled questions.
Success requires 90% retrieval hit rate at 5, 95% citation correctness, p95 below 5 seconds, and projected cost below $0.30 per question.
The candidate meets quality but fails p95 at 7.2 seconds.
Reranking only the top 20 candidates reduces p95 to 4.6 seconds.

The production plan adds single sign-on, permission synchronization, deletion workflows, tracing, canary releases, and support ownership.
The executive review shows expected time saved and three unresolved risks.
The engineering review includes identity flows, index update semantics, and rollback tests.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      subgraph discovery["Discovery and selection"]
        A["15,000 questions per day 5 s p95 matter permissions"] --> B["Compare plain search hybrid RAG fine-tuning"] --> C["ADR selects hybrid RAG"]
      end
      subgraph delivery["PoC and production"]
        C --> D["6-week PoC 20,000 docs 200 labelled questions"] --> E["90% hit rate at 5"] --> F["95% citation correctness"] --> G["p95 under 5 s"] --> H["Under $0.30 per question"] --> I["Production"]
        I --> J["SSO and permission sync"]
        I --> K["Deletion workflows and tracing"]
        I --> L["Canary releases and support ownership"]
      end
    ```

## Lab

Run a paper architecture exercise using only free tools.

1. Choose a real process such as support triage or policy search.
2. Interview one user or role-play from an existing process document.
3. Write ten discovery questions covering users, volume, latency, risk, and data.
4. Record answers as facts, estimates, or unknowns.
5. Define five measurable requirements and the current baseline.
6. Sketch two architecture options with Mermaid or diagrams.net.
7. Map each component to a requirement.
8. Write one ADR choosing between the options.
9. Build a matrix for three real or fictional vendors with weighted criteria.
10. Add two pass/fail gates and perform weight sensitivity analysis.
11. Define a two-week PoC with a fixed dataset and success thresholds.
12. List ten PoC-to-production gaps and assign an owner to each.
13. Create a one-slide executive summary.
14. Create a technical page with data flow, failures, and acceptance tests.
15. Ask a peer whether both documents tell the same truth.

!!! note
    A PoC that misses a pre-agreed threshold is useful evidence, not a failed project.

## Check your understanding

1. Which discovery answers would rule out a managed model API?
2. What makes an ADR different from meeting notes?
3. Why should vendor criteria and weights precede demonstrations?
4. Which production concerns are most often absent from a PoC?
5. How should one architecture decision be explained differently to executives and engineers?

## Further reading

- [Architectural Decision Records](https://adr.github.io/)
- [AWS Well-Architected Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/welcome.html)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
- [Microsoft Azure Well-Architected Framework: AI workloads](https://learn.microsoft.com/en-us/azure/well-architected/ai/)
- [NIST AI Risk Management Framework Playbook](https://airc.nist.gov/airmf-resources/playbook/)

## Conclusion

Strong AI architecture starts with discovery and ends with an operable, explainable system.
The AI SA creates the evidence, decisions, and communication that carry an idea safely into production.
