# Capstone Projects

Each capstone takes a vague brief — the kind an AI SA actually receives — to a production-ready architecture. Do them in order. Each one exercises a different part of the curriculum. For every capstone, produce the same four deliverables:

1. **Architecture document** — components, data flows, model choices, and the alternatives you rejected.
2. **Cost model** — expected monthly spend at 10x, 100x, and 1000x current volume, with the assumptions written down.
3. **Evaluation plan** — what you measure, on what dataset, and the pass thresholds before launch.
4. **Risk register** — the top five risks, each with a mitigation and an owner.

## Capstone 1: Enterprise Knowledge Assistant (RAG)

**Brief:** "Our support engineers spend hours searching internal documentation. Build something that answers questions from our docs. It must never leak customer data."

**You will exercise:** [Data for AI](level101/data.md), [RAG Architecture](level102/rag_architecture.md), [Security Fundamentals](level101/security.md), [Governance](level102/governance.md).

**Minimum scope:** A retrieval pipeline over 1,000+ documents with access control filters, a grounded generation step with citations, and an evaluation suite of at least 50 question/answer pairs with a measured answer-accuracy threshold.

**The interesting decisions:** Where does the permission check happen — at retrieval time, at ingestion time, or both? What do you do when retrieval finds nothing confident? How do you stop the model from answering from its own weights when the docs are silent?

??? note "Reference solution: architecture and reasoning"
    Attempt your own architecture document first. Use this to check your reasoning, not to replace it.

    ```mermaid
    flowchart TB
      subgraph Ingestion["Ingestion path (nightly)"]
        DOCS["Internal docs + manuals"] --> PII["PII scrubber"]
        PII --> CHUNK["Chunker: structure-aware, 400-token chunks"]
        CHUNK --> EMB["Embedding model (768-dim)"]
        EMB --> IDX["Vector index + ACL metadata"]
      end
      subgraph Query["Query path (p95 under 800 ms)"]
        USER["Support engineer"] --> SSO["SSO: identity + access groups"]
        SSO --> RETRIEVE["Hybrid retrieval, ACL filter applied pre-search, top 20"]
        RETRIEVE --> RERANK["Reranker to top 5"]
        RERANK --> GATE["Confidence gate"]
        GATE -->|confident| LLM["Grounded generation, citations required"]
        GATE -->|not confident| ESC["Escalate to human or offer search"]
        LLM --> ANSWER["Answer with citations"]
      end
      EVALS["Eval set: 50+ question/answer pairs"] -.->|release gate| LLM
    ```

    Decisions to check against your write-up:

    - **Permissions at both times.** Access-group filters are stored as index metadata and applied during retrieval, and a second check runs at the document store. Filtering only at ingestion fails when permissions change after indexing.
    - **Abstention is a feature.** When no retrieved chunk clears the relevance threshold, the system says so and offers the human path. It never falls back to the model's own weights.
    - **Citations are forced.** Every claim must reference a retrieved chunk, which makes faithfulness testable in the eval suite.
    - **Common failure to catch:** grounding the model on the vector store but sending retrieved chunks without the ACL check, so one user can retrieve another user's documents through a crafted question.

## Capstone 2: Multi-Step Workflow Agent

**Brief:** "When a customer emails us about a billing dispute, we want the system to classify the issue, look up their account, draft a resolution following policy, and hand it to a human for approval. It must be auditable."

**You will exercise:** [LLM Fundamentals](level101/llm_fundamentals.md), [Agents and Orchestration](level102/agents.md), [Evaluation, Observability, and Guardrails](level102/evaluation.md), [MLOps and LLMOps](level102/llmops.md).

**Minimum scope:** An agent that completes the workflow with tool calls against stubbed systems, a full trace of every step logged for audit, a guardrail that blocks any action outside the approved policy, and a human-approval gate with a clean escalation path.

**The interesting decisions:** Is this one agent with several tools, or a deterministic pipeline with LLM steps? What is the blast radius if the model hallucinates a policy? What happens when the email is ambiguous — does it guess, ask, or escalate?

??? note "Reference solution: architecture and reasoning"
    Attempt your own architecture document first. Use this to check your reasoning, not to replace it.

    ```mermaid
    flowchart TB
      EMAIL["Customer email"] --> CLASSIFY["LLM classifier + confidence score"]
      CLASSIFY -->|simple, confident| FLOW["Deterministic pipeline: fixed steps"]
      CLASSIFY -->|ambiguous| AGENT["ReAct loop: max 6 calls, 20 s timeout"]
      subgraph Tools["Tools, each least-privilege"]
        ACCT["Account lookup: read-only, scoped to customer"]
        POLICY["Policy search: versioned policy store"]
        DRAFT["Refund drafter: proposes, never executes"]
        NOTE["Case note writer"]
      end
      FLOW --> GATE["Policy guardrail: allowed actions only"]
      AGENT --> GATE
      GATE --> HUMAN["Human approval before any refund"]
      HUMAN -->|approved| EXECUTE["Execute via payment system"]
      HUMAN -->|rejected or escalated| QUEUE["Human case queue"]
      TRACE["Trace log of every step, immutable"] -.-> AUDIT["Audit review"]
      FLOW -.-> TRACE
      AGENT -.-> TRACE
    ```

    Decisions to check against your write-up:

    - **A hybrid, not one pattern.** A deterministic state machine handles the majority of cases cheaply and predictably; the ReAct loop runs only for ambiguous ones. The page on [Agents and Orchestration](level102/agents.md) shows this trade-off with numbers.
    - **The model proposes, the system disposes.** The drafter can only produce a refund proposal. Execution happens after human approval, behind a policy guardrail that validates the action against the approved policy list. This is the "least blast radius" rule: constrain what the agent can do, and make irreversible actions require a human.
    - **Auditability comes from tracing, not memory.** Every tool call, prompt, and decision lands in an immutable trace that audit can replay. "The model decided" is not an audit answer.
    - **Common failure to catch:** letting the agent call a refund-execution tool directly and relying on a prompt instruction like "never refund without approval". Prompts are not guardrails.

## Capstone 3: Model Selection and Migration Strategy

**Brief:** "We currently use a single premium model for everything and our bill is doubling every quarter. Cut the cost without breaking quality, and stop us being locked into one vendor."

**You will exercise:** [Cloud and AI Services Landscape](level101/cloud_basics.md), [Cost Engineering for AI](level102/cost_engineering.md), [Evaluation, Observability, and Guardrails](level102/evaluation.md), [The Practice](level102/solution_architecture_practice.md).

**Minimum scope:** A written routing strategy (which requests go to which model tier and why), a benchmark comparison of at least three models on a task-specific eval set, a cost model showing the projected savings with its assumptions, and a migration plan that can be rolled back.

**The interesting decisions:** Which quality regression is acceptable for which workload, and who signs off on that? Do you route by task type, by observed difficulty, or by user tier? What is your exit plan from each provider, including self-hosting?

??? note "Reference solution: architecture and reasoning"
    Attempt your own architecture document first. Use this to check your reasoning, not to replace it.

    ```mermaid
    flowchart LR
      REQ["Incoming request"] --> ROUTER["Router: task type + measured difficulty"]
      ROUTER -->|routine, 80 percent| CHEAP["Small model: one-third price"]
      ROUTER -->|complex| PREMIUM["Premium model"]
      CHEAP --> SPOT["Quality spot checks on routed output"]
      SPOT -.->|regression detected| PREMIUM
      CHEAP --> CACHE["Prompt + semantic cache"]
      PREMIUM --> CACHE
      BENCH["Task-specific eval set, 3+ models benchmarked"] -.->|routing rules, reviewed quarterly| ROUTER
      subgraph Exit["Exit plan per provider"]
        ABSTRACT["Provider-neutral API layer"]
        EVALS["Portable eval suite"]
        SELFHOST["Documented self-host fallback"]
      end
      BILL["Monthly cost model with assumptions"] -.-> REVIEW["Finance + engineering sign-off"]

    ```

    Decisions to check against your write-up:

    - **Route by task type first, difficulty second.** Task type is stable and cheap to detect; routing on model-observed difficulty requires a classifier or a first-pass model, which adds its own cost and failure mode. Tier-based routing rarely matches real value.
    - **Quality has a named owner.** Each workload gets an owner who signs off on its acceptable regression, backed by the benchmark eval set — not a general "quality feels fine".
    - **Savings are a model, not a measurement.** The write-up must show the cost model with its assumptions (cache hit rate, routing share, price changes) so finance can challenge it.
    - **Portability is an architecture, not a wish.** A provider-neutral abstraction layer, a portable eval suite, and a documented self-host fallback are what make "no lock-in" real. Without the evals you cannot prove a migrated model is as good.
    - **Common failure to catch:** optimizing tokens but ignoring that output tokens are priced several times higher than input. Cutting output length usually beats cutting input.

## After the capstones

Write up your architecture documents and share them. Reviewing other people's architecture decisions — and defending your own — is the core skill of the role. The best next step is a real system: volunteer to design one, or refactor an existing AI feature and write down what you would change and why.
