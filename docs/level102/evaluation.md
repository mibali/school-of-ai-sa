# Evaluation, Observability, and Guardrails

## Introduction

Evaluation measures whether an AI system is good enough for a defined task.
Observability explains what the system did in production.
Guardrails constrain accepted inputs and outputs.
This course covers offline and online evaluation, tracing, and runtime controls.
Afterward, you can build evidence before launch and detect failures after launch.

## Why this matters for the AI SA

An AI Solutions Architect (AI SA) turns vague quality goals into measurable release gates.
They choose test data, metrics, traces, and alert thresholds.
They decide where deterministic controls must surround probabilistic models.
These choices determine whether teams can launch safely and diagnose incidents.
Use the rule: evals before launch, monitors after.

## Key concepts

### Building an evaluation set

An evaluation set is a fixed collection of inputs with expected outcomes or scoring guidance.
Start from real user tasks and known failure modes.
Include common cases, edge cases, unsafe requests, multiple languages, and empty or malformed input.
Define slices, which are meaningful groups such as region or customer type.

Write expected evidence and a scoring rubric before testing models.
A rubric describes observable criteria and score levels.
Use at least 100–300 examples for an early product comparison as an illustrative range.
Keep a hidden holdout set to reduce tuning to the test.
Version examples, labels, and rubric changes.

### Offline evaluation

Offline evaluation runs without exposing candidate output to users.
Exact match works for values with one correct representation.
Precision, recall, and F1 suit extraction and classification.
Rubric scoring suits summaries, explanations, and conversations.

LLM-as-judge uses a language model to score another model's output.
It scales, but it can favour verbosity, ordering, or models similar to itself.
Calibrate it against two independent human reviewers.
Randomize answer order and remove model names.
Do not let a judge replace expert review for high-risk decisions.

### Online evaluation

Online evaluation measures behaviour with real users.
An A/B test randomly assigns users to variants and compares outcomes.
Use sticky assignment and a predeclared primary metric.
Track guardrail metrics such as complaints, latency, and escalation rate.

User feedback includes explicit ratings and implicit signals such as correction or abandonment.
Both are biased.
Sample transcripts for structured review, with privacy controls.
Canary releases reduce exposure but do not remove the need for offline gates.

### Traces and spans

A trace records one request across components.
A span records one timed operation within that trace.
An LLM trace may include retrieval, reranking, model calls, tools, and validation.
Record model and prompt versions, token counts, latency, status, and safe error details.

OpenTelemetry is a vendor-neutral standard for traces, metrics, and logs.
LangSmith and provider tools add LLM-specific views.
Redact personal data and secrets before export.
Use sampling to control telemetry cost, while retaining errors and high-risk events.

### Guardrails

Input filtering rejects or routes unsafe, irrelevant, or oversized requests.
Output validation checks format, policy, and required evidence.
Schema enforcement requires structured output to match types and allowed values.
Use a JSON Schema validator in application code.

Guardrails can fail and must be evaluated like models.
Layer deterministic checks, model classifiers, and human escalation according to risk.
Fail closed for dangerous actions.
Failing closed means blocking an action when validation is uncertain.

## A worked example

A health insurer builds a service that summarizes claim letters for staff.
The team creates 300 de-identified examples across 12 document types.
Two reviewers score factuality, omission, and clarity from 1 to 5.
Critical factual errors must occur in fewer than 1% of examples.
All figures are illustrative.

The candidate scores 4.4 for clarity but 3.7 for factuality.
Tracing shows that 70% of factual errors follow failed table extraction.
The team adds a table parser and blocks generation when extraction confidence is low.
Factuality rises to 4.5, with 0.7% critical errors.

A 5% canary tracks correction rate, p95 latency, and blocked requests.
Each trace contains extraction and model spans, but not raw claim text.
The release stops automatically if critical corrections exceed 1.5% over 100 reviewed cases.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      subgraph quality["Quality gate"]
        A["300 de-identified examples 12 types"] --> B["Dual human review"] --> C["Factuality omission clarity"] --> D["Critical errors under 1%"] --> E["Deploy"]
      end
      subgraph production["Production"]
        E --> F["Trace every summarisation"] --> G["70% of errors from table extraction"] --> H["Add table parser"] --> I["Extraction confidence gate"]
        I -->|Low| J["Block generation"]
        I -->|Pass| K["5% canary"] --> L["Track correction rate p95 latency blocked requests"]
      end
    ```

## Lab

Build a local evaluation and tracing harness with open tools.

1. Choose a small summarization or extraction task.
2. Create 30 examples, including 10 edge or adversarial cases.
3. Define a three-level rubric before generating answers.
4. Add exact checks for required fields and JSON Schema validity.
5. Score outputs manually without seeing the model name.
6. Optionally compare those scores with an open LLM judge.
7. Calculate agreement and inspect every disagreement.
8. Instrument the application with OpenTelemetry spans.
9. Add spans for preprocessing, model inference, and validation.
10. Record latency, tokens, version IDs, and status without raw personal data.
11. Add one input length limit and one output schema guardrail.
12. Run all 30 examples and save an aggregate report.
13. Define a release gate and two production alerts.
14. State what your small sample cannot prove.

!!! note
    Never improve a score by silently removing hard examples. Version the set and explain exclusions.

## Check your understanding

1. Why should a rubric be written before comparing models?
2. Which biases can affect LLM-as-judge results?
3. What belongs in an LLM trace, and what should be redacted?
4. How do schema enforcement and content safety differ?
5. What does “evals before launch, monitors after” require in practice?

## Further reading

- [OpenTelemetry traces](https://opentelemetry.io/docs/concepts/signals/traces/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OpenAI evaluation guide](https://platform.openai.com/docs/guides/evals)
- [Anthropic evaluation tool](https://docs.anthropic.com/en/docs/test-and-evaluate/eval-tool)
- [JSON Schema specification](https://json-schema.org/specification)

## Conclusion

Quality requires pre-launch evidence, production visibility, and enforceable boundaries.
The AI SA connects all three so that model changes become measurable engineering decisions.
