# Agents and Orchestration

## Introduction

An agent is a language model connected to tools and run inside a decision loop.
The loop observes state, chooses an action, executes it, and checks the result.
This course covers tool calling, agent patterns, orchestration, multi-agent design, and safety.
Afterward, you can decide whether an agent is justified and bound its authority.

## Why this matters for the AI SA

Agents turn model output into system actions.
That raises the value and the risk of every response.
The AI Solutions Architect (AI SA) chooses tools, permissions, state, stop conditions, and approval points.
They also set latency and cost budgets for loops whose length varies.
The core design goal is useful autonomy with least blast radius.

## Key concepts

### Agent anatomy and tool calling

A tool is a typed operation such as search, database read, or ticket creation.
Tool calling, also called function calling, lets a model return a structured tool name and arguments.
Application code validates the arguments, runs the tool, and returns its result to the model.
The model does not directly execute code.

Use narrow schemas and clear descriptions.
Validate types, ranges, identity, and authorization outside the model.
Make read tools distinct from write tools.
Set maximum steps, timeouts, and token budgets.
Log every requested and completed action.

### Common reasoning loops

ReAct alternates reasoning with tool actions and observations.
It works well when the next action depends on the last result.
A planner-executor pattern first creates a plan, then delegates each step to an executor.
It helps with longer tasks but plans can become stale.
Reflection asks a model to critique and revise work.
It may improve quality, but it adds calls and can reinforce the same error.

Use deterministic workflow code when steps are known.
Reserve model choice for genuine ambiguity.
A state machine is often easier to test than an open-ended loop.

### Orchestration frameworks

An orchestration framework manages prompts, tools, state, retries, and traces.
Examples include LangChain, LangGraph, LlamaIndex, and provider agent SDKs.
They can speed prototypes and expose reusable connectors.
They also add abstractions, dependencies, and upgrade risk.

Start with direct API calls and ordinary functions for a two-step flow.
Add a framework when you need durable state, branching graphs, resumable runs, or many integrations.
Check whether framework retries can duplicate side effects.
Keep business rules outside framework-specific prompt objects.

### Multi-agent systems

A multi-agent system gives different models or prompts separate roles.
One agent may research while another reviews.
Coordination requires message formats, shared state, conflict handling, and termination rules.
Each handoff can lose context.
Three agents taking four calls each can turn one request into 12 model calls.

Use multiple agents only when roles need distinct tools, permissions, or parallel expertise.
Do not use personas as a substitute for modular software.
Benchmark against one agent with good tools before accepting coordination cost.

### Safety and least blast radius

Least blast radius means constraining what an agent can affect if it fails.
Give each tool the minimum permissions and scope.
Use allowlists, tenant boundaries, spending caps, and sandboxed execution.
Require human approval for irreversible actions such as deletion, payment, publication, or account changes.

Prefer preview-then-commit flows.
Use idempotency keys so retries do not repeat writes.
An idempotency key identifies repeated requests as one operation.
Provide a kill switch that stops new runs and revokes credentials.
Treat tool output as untrusted input because it may contain prompt injection.

## A worked example

A retailer wants an agent to resolve order complaints.
It receives 10,000 requests per month.
The target is 95% of responses within 8 seconds and less than $0.20 per case.
These values are illustrative.

The agent can read orders, search policy, draft refunds, and create support notes.
It cannot issue refunds directly.
Refunds under $50 require one-click staff approval; larger refunds follow the existing finance process.
The order tool can read only the authenticated customer's order.

The loop has at most six model calls and a 20-second timeout.
A typical case uses three calls with 18,000 input tokens and 1,200 output tokens.
At illustrative prices of $3 per million input tokens and $15 per million output tokens, model cost is $0.072.
Tool and platform costs bring the estimate to $0.09.

In a 200-case test, a simple state machine resolves 71% correctly.
A ReAct loop resolves 79% but doubles p95 latency.
The team keeps the loop only for ambiguous cases and routes simple cases through the state machine.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["Complaint in"] --> B["Classifier"]
      B -->|Simple| C["State machine 71% resolved"]
      B -->|Ambiguous| D["ReAct loop 79% higher latency"]
      D --> E["Loop limits max 6 calls 20 s"]
      C --> F["Scoped tools"]
      E --> F
      F --> G["Read authenticated customer orders"]
      F --> H["Search policy"]
      F --> I["Draft refund"]
      F --> J["Create notes"]
      I --> K["Under $50 one-click staff approval"]
      I --> L["Larger refund finance process"]
      G --> M["Audit log every step"]
      H --> M
      J --> M
      K --> M
      L --> M
    ```

## Lab

Build a least-privilege support agent with open tools.

1. Create a JSON file with 20 fictional orders and owners.
2. Define tools for `get_order`, `search_policy`, and `propose_refund`.
3. Give every tool a JSON Schema for its arguments.
4. Enforce the caller's customer ID inside `get_order`.
5. Make `propose_refund` return a preview, not execute a payment.
6. Add a human approval flag before recording an approved proposal.
7. Run a local tool-capable model, or use a provider's free allowance.
8. Cap each run at five tool calls and 10,000 generated tokens.
9. Test ten normal requests and five adversarial requests.
10. Include attempts to access another customer's order and to bypass approval.
11. Record tool calls, latency, tokens, and final status.
12. Compare the agent with a fixed workflow for three common request types.
13. Write down which complexity the agent actually removed.

!!! warning
    Use fictional data. Never connect a learning agent to payment or production systems.

## Check your understanding

1. What makes an agent different from a single model call?
2. When is a planner-executor pattern worth its extra calls?
3. Which controls implement least blast radius for a write tool?
4. Why can orchestration retries duplicate an action?
5. What evidence would justify a multi-agent design?

## Further reading

- [ReAct paper](https://arxiv.org/abs/2210.03629)
- [OpenAI function calling guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic tool use documentation](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)
- [LangGraph documentation](https://langchain-ai.github.io/langgraph/)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

## Conclusion

Agents are controlled loops around models and tools.
The AI SA should use the simplest viable workflow, measure autonomy, and make every powerful action bounded and reviewable.
