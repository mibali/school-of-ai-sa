# School of AI SA

A free, open curriculum for the **AI Solutions Architect (AI SA)** role.

AI Solutions Architects sit at the intersection of software engineering, machine learning, and business strategy. While there are potentially infinite permutations of how models, data pipelines, cloud services, and applications can be put together to achieve an objective, focusing on foundational skills allows AI SAs to work with complex AI systems regardless of whether those systems use proprietary models, open-weight models, cloud AI services, or self-hosted infrastructure. In particular, it is important to gain a deep understanding of how these areas relate to each other and interact with each other.

## What is an AI Solutions Architect?

An AI SA owns the full picture of an AI system:

- **Translating business problems into architecture.** A vague goal like "use AI to reduce churn" becomes a concrete design: which data feeds the system, which model serves it, how predictions or generations reach the application, where guardrails sit, and what the cost profile looks like at scale.
- **Choosing build vs. buy.** Foundation model vendor vs. fine-tuned open-weight model, managed vector database vs. self-hosted pgvector, orchestration framework vs. plain code. The AI SA makes these calls with cost, capability, and risk scored.
- **Designing for production, not demos.** A proof-of-concept that works for ten inputs is easy. The AI SA designs the system that stays correct, fast, affordable, and compliant for millions of inputs.
- **Bridging teams.** Data scientists build models. ML engineers productionise them. AI engineers build the application layer. The AI SA designs the system all of these components live in, and explains it to both engineers and executives.

The role is distinct from its neighbours:

| Role | Primary focus |
| --- | --- |
| Data Scientist | Analyses data, builds and evaluates models |
| ML Engineer | Makes models production-ready: pipelines, serving, versioning |
| AI Engineer | Builds the application layer: LLM APIs, vector stores, product features |
| **AI Solutions Architect** | Designs the end-to-end system and makes the technology decisions everyone else builds within |

## Why this school exists

There are very few resources that guide someone on the basic skill sets an AI SA needs. Most material is either deep research content or shallow tool tutorials. The skills in between — model selection, retrieval design, evaluation strategy, cost modelling, governance, and stakeholder communication — are rarely taught together. Individuals have a tough time getting into open positions in the industry because of this gap.

We created the School of AI SA as a starting point for anyone wanting to build a career in this role. The curriculum focuses on building strong foundational skills, structured to provide real-life examples that show how each topic plays a part in the day-to-day responsibilities of an AI SA.

## The curriculum

### Level 101 — Foundations

| Course | What you will learn |
| --- | --- |
| [AI and Machine Learning Basics](level101/ai_ml_basics.md) | Supervised vs. unsupervised learning, model evaluation, common failure modes, and when ML is and is not the right tool |
| [LLM Fundamentals](level101/llm_fundamentals.md) | Tokens, context windows, sampling, prompting, and the failure modes unique to generative models |
| [Cloud and AI Services Landscape](level101/cloud_basics.md) | Cloud computing models and the AI service landscape across AWS, Azure, and GCP |
| [Data for AI](level101/data.md) | Relational data, embeddings, vector databases, and the data pipelines AI systems depend on |
| [Systems Design](level101/systems_design.md) | Scalability, availability, latency, and fault tolerance for AI-backed systems |
| [Security Fundamentals](level101/security.md) | Threats and defences for applications, with an eye on AI-specific attack surfaces |

### Level 102 — Applied AI Architecture

| Course | What you will learn |
| --- | --- |
| [RAG Architecture](level102/rag_architecture.md) | Retrieval-augmented generation end to end: chunking, embeddings, retrieval trade-offs, and evaluation |
| [Agents and Orchestration](level102/agents.md) | Agent patterns, tool use, orchestration frameworks, and knowing when not to use an agent |
| [MLOps and LLMOps](level102/llmops.md) | CI/CD for AI systems, model serving, drift detection, and repeatable releases |
| [Evaluation, Observability, and Guardrails](level102/evaluation.md) | Building eval suites, tracing AI systems in production, and designing guardrails |
| [Cost Engineering for AI](level102/cost_engineering.md) | Token economics, inference optimisation, and modelling spend before you build |
| [Governance, Safety, and Responsible AI](level102/governance.md) | Compliance, data protection, human oversight, and responsible deployment |
| [The Practice: Discovery to Production](level102/solution_architecture_practice.md) | Running discovery, writing architecture documents, evaluating vendors, and taking a PoC to production |

### [Capstone Projects](capstones.md)

Three end-to-end projects that exercise the full curriculum, from a vague brief to a production-ready architecture.

## How to use this school

Work through Level 101 in order if you are new to any of the topics. If you already ship AI features, start at Level 102 and dip back into 101 when you hit a gap. Every module ends with a hands-on lab and further reading. The labs favour free tiers and open tools so nobody needs a budget to learn.

We believe continuous learning helps in acquiring deeper knowledge and competencies. Every module lists references that can guide further learning. Our hope is that going through these modules builds the essential skills required for an AI Solutions Architect.

This curriculum is open. It is a starting point, and we hope the community helps refine and expand it. Check out [the contributing guide](CONTRIBUTING.md) to get started.

## Attribution and licence

School of AI SA is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). It includes modified material from [LinkedIn's School of SRE](https://github.com/linkedin/school-of-sre), copyright 2020 LinkedIn Corporation, which is also licensed under CC BY 4.0. This project is not affiliated with, endorsed by, or sponsored by LinkedIn. See the repository [NOTICE](https://github.com/mibali/school-of-ai-sa/blob/main/NOTICE) for the full attribution and modification notice.
