# Governance, Safety, and Responsible AI

## Introduction

AI governance assigns rules, evidence, and accountability across an AI system's life cycle.
Safety reduces the chance and impact of harm.
Responsible AI connects technical choices to people, rights, and social outcomes.
This course covers data protection, frameworks, documentation, oversight, suppliers, fairness, and accessibility.
Afterward, you can turn policy obligations into architecture controls.

## Why this matters for the AI SA

An AI Solutions Architect (AI SA) places controls where data and decisions flow.
They classify use cases, minimize data, design approval gates, and collect audit evidence.
They must understand legal and policy requirements without pretending to provide legal advice.
Their architecture affects whether a system can be explained, stopped, changed, or replaced.
Governance designed late becomes paperwork; governance designed early becomes system behaviour.

## Key concepts

### Data protection and retention

Personally identifiable information, or PII, can identify a person directly or indirectly.
Map where PII enters, moves, is stored, and leaves the system.
Collect only data needed for a stated purpose.
Separate customer content from telemetry and model improvement datasets.

The General Data Protection Regulation, or GDPR, governs personal data in the European Economic Area.
Its principles include purpose limitation, data minimization, accuracy, security, and storage limitation.
Define retention periods and deletion workflows for prompts, outputs, traces, backups, and vector indexes.
Support access and deletion requests where applicable.
Use regional processing and encryption when requirements demand them.

### Risk and compliance frameworks

The EU AI Act uses risk-based obligations.
It prohibits certain practices, imposes strong duties on high-risk systems, and adds transparency duties for some AI.
General-purpose AI models have separate obligations.
Classification depends on intended use and deployment context.

The NIST AI Risk Management Framework, or AI RMF, is voluntary guidance.
Its functions are Govern, Map, Measure, and Manage.
Govern establishes accountability.
Map defines context and harms.
Measure assesses risk.
Manage prioritizes and treats risk.
Use frameworks to structure evidence, not as a substitute for legal review.

### Documentation and model cards

A model card is a structured document describing a model's purpose, performance, limits, and testing.
Also document datasets, prompts, retrieval sources, and human workflows.
Record intended users and prohibited uses.
Report performance by relevant slices, not only one average.

Maintain a system inventory with owner, risk level, model supplier, release, and review date.
Link architecture decisions, eval reports, incidents, and approvals.
Documentation must follow the deployed version.
Automate evidence capture where possible.

### Human oversight and operational safety

An approval gate pauses a workflow until an authorized person accepts it.
Place gates before high-impact or irreversible actions.
Show reviewers source evidence, uncertainty, and the proposed action.
Avoid confirmation-only interfaces that encourage blind approval.

A kill switch stops new decisions or actions quickly.
Test it in exercises and define who can use it.
Provide manual fallback and appeal paths.
Log overrides and review patterns without punishing appropriate intervention.

### Third-party risk, fairness, and accessibility

Review supplier terms, data usage, retention, subprocessors, regions, security, and incident commitments.
Check whether prompts train provider models by default.
Concentration risk is dependence on one supplier, region, or model family.
Plan export formats and a tested fallback for critical workloads.

Fairness means harms and benefits should not be unjustly distributed.
Measure outcomes across relevant groups with domain experts.
Accessibility means people with disabilities can use the system.
Support keyboard navigation, screen readers, captions, clear language, and non-chat alternatives.
Do not infer sensitive traits merely to create a fairness dashboard.

## A worked example

A recruitment company proposes AI-assisted candidate ranking for 200,000 applications each year.
The system processes names, employment history, and assessment results.
The use can materially affect access to work, so the team treats it as high impact.
Figures and thresholds below are illustrative.

The architect removes names and photos before scoring.
Raw applications are retained for 12 months under the business policy; prompts and traces retain identifiers for only 30 days.
The system never makes a final rejection.
Recruiters review ranked evidence and can search all candidates outside the ranking.

An eval set contains 2,000 historical, lawfully usable examples.
The team reports recall by job family and monitored demographic groups.
A release is blocked if any reviewed group's recall differs by more than 10 percentage points without a documented investigation.
Every decision records model version, evidence, recruiter action, and reason for override.

The supplier contract prohibits training on submitted data and lists subprocessors.
A rules-based search remains available during provider failure.
Quarterly exercises test the kill switch and manual process.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["Application in"] --> B["Strip names and photos"] --> C["Ranking model"] --> D["Recruiter reviews ranked evidence"] --> E["Human decision no automated rejection"]
      A --> F["Raw applications retained 12 months"]
      C --> G["Prompts and traces retained 30 days"]
      H["2,000-example eval"] --> I["Recall by job family and monitored groups"] --> C
      A --> J["Human appeal outside ranking"] --> E
    ```

## Lab

Create a governance pack for a fictional loan-document assistant.

1. Write its intended use, users, and prohibited uses.
2. Draw a data-flow diagram from upload through deletion.
3. Mark PII, storage locations, subprocessors, and cross-border transfers.
4. Set retention periods for documents, prompts, outputs, logs, and backups.
5. Classify the use with EU AI Act questions and record uncertainty.
6. Map ten risks to the NIST AI RMF functions.
7. Create a one-page system card with limits and evaluation results.
8. Design an approval gate before any customer-facing decision.
9. Define a kill switch, owner, invocation method, and test schedule.
10. Build a supplier checklist covering terms, data use, regions, and exit.
11. Add three accessibility checks using WCAG guidance.
12. Define two fairness slices without collecting unnecessary sensitive data.
13. Ask a peer to find missing owners or evidence.

!!! warning
    Regulatory classification is context-specific. Treat this lab as architecture practice, not legal advice.

## Check your understanding

1. Which AI artifacts need retention rules beyond the original source data?
2. How do the four NIST AI RMF functions support architecture work?
3. What makes an approval gate meaningful rather than ceremonial?
4. Which contract terms affect third-party model risk?
5. How can fairness monitoring itself create privacy risk?

## Further reading

- [EU AI Act text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [GDPR text](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993)
- [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG22/)

## Conclusion

Governance turns accountability into retention, documentation, oversight, and exit controls.
The AI SA makes those controls practical, testable, and visible throughout the deployed system.
