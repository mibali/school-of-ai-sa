# Cloud and AI Services Landscape

## Introduction

Cloud computing supplies technology resources on demand over a network.

This course explains cloud service models, locations, managed AI categories, and major providers.

It also compares managed model APIs with self-hosted models.

After this course, you can sketch a cloud AI platform and explain its main trade-offs.

## Why this matters for the AI SA

An AI SA decides where models, data, and application components run.

That choice affects security, latency, availability, portability, operations, and cost.

Data location may be constrained by law or contract.

Managed services reduce operational work but can increase dependency on one provider.

Architecture starts with requirements, not a preferred product.

## Key concepts

### IaaS, PaaS, and SaaS

Infrastructure as a Service (IaaS) provides virtual machines, networks, and storage.

You manage the operating system, runtime, application, and data.

Platform as a Service (PaaS) provides a managed runtime or deployment platform.

You focus more on application code and less on servers.

Software as a Service (SaaS) provides a complete application through a browser or API.

The shared responsibility model divides security duties between provider and customer.

The customer always retains responsibility for data, identities, and configuration choices.

### Regions and availability zones

A region is a provider-defined geographic area containing cloud infrastructure.

An availability zone is an isolated location within a region.

Using two zones can protect against one data-centre failure.

It does not protect against every regional failure or configuration mistake.

Cross-region designs improve resilience but add cost, replication delay, and governance work.

Place latency-sensitive services near users and governed data in approved regions.

Confirm that every required AI model is available in the chosen region.

### Managed AI service categories

A hosted LLM API exposes a provider-operated generative model through an API.

A model hosting service deploys a model you select or train behind an endpoint.

A vector database stores embeddings and supports similarity search.

Pinecone is a managed specialist example.

PostgreSQL with pgvector is a general database option.

Speech services convert audio to text, text to audio, or both.

Vision services classify, detect, or extract information from images and video.

Other categories include model training, feature stores, evaluation, safety, and monitoring.

MLflow is an open-source example for tracking experiments and models.

LangChain is an application framework, not a model hosting platform.

### The three major clouds

Amazon Web Services offers Bedrock for managed foundation-model access.

AWS SageMaker supports broader model building, training, and hosting workflows.

Microsoft offers Azure AI Foundry for model discovery and AI application development.

Azure OpenAI Service provides selected OpenAI models within Azure controls.

Google Cloud offers Vertex AI for models, training, deployment, and generative AI tooling.

All three provide identity, networking, storage, monitoring, speech, and vision services.

Model catalogues, region support, quotas, controls, and prices change often.

Compare current capabilities with a scored proof of concept.

Do not equate similar product names with identical behaviour.

### Managed API or self-hosted model

A managed API offers fast setup, elastic capacity, updates, and limited infrastructure work.

It may impose quotas, variable latency, data terms, and model-version changes.

Self-hosting means your team runs the model and serving stack.

It offers more control over weights, versions, location, and optimisation.

It requires accelerator capacity, scaling, patching, observability, and specialist skills.

Graphics processing units (GPUs) accelerate the parallel calculations used by many models.

Utilisation matters: an idle GPU still incurs cost.

A hybrid design can use a managed API by default and a hosted open model for restricted workloads.

## A worked example

A retailer expects 100,000 product-support conversations per month.

Each conversation uses an illustrative 6,000 input tokens and 1,000 output tokens.

Monthly use is 600 million input tokens and 100 million output tokens.

At illustrative rates of $3 per million input tokens and $15 per million output tokens, model cost is $3,300.

The estimate excludes retrieval, networking, logging, and support.

Peak traffic is 20 requests per second for 15 minutes after weekly promotions.

The company needs p95 latency below four seconds and 99.9% monthly availability.

It stores customer data in one approved region across two availability zones.

The team compares a managed API with two self-hosted replicas.

The managed option wins the pilot because traffic is bursty and the operations team is small.

The architecture uses private networking where available and redacts payment details before inference.

It keeps model access behind an internal gateway.

The gateway records model version, tokens, latency, and errors.

A smaller backup model handles basic questions during provider failure.

All prices and targets here are illustrative.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["Users"] --> B["Load balancer"]
      B --> C["App autoscaling group peak 20 rps"]
      C --> D["Managed or self-hosted decision"]
      D -->|Managed pilot| E["Managed LLM API"]
      D -->|Self-hosted option| F["Two self-hosted replicas"]
      C --> G["Cache"]
      C --> H["Logging and monitoring"]
    ```

## Lab

Build a vendor-neutral decision matrix with a local spreadsheet or Markdown table.

1. Define a fictional document assistant for 500 users.
2. Set monthly volume to 10,000 requests.
3. Assume 2,000 input tokens and 300 output tokens per request.
4. List requirements for region, p95 latency, uptime, and data retention.
5. Add rows for hosted API, managed custom endpoint, and self-hosted open model.
6. Score each option from 1 to 5 for cost, control, speed, skills, and portability.
7. Give each criterion a weight totalling 100%.
8. Check current free-tier or trial documentation for AWS, Azure, and Google Cloud.
9. Do not create paid resources or add a card for this lab.
10. Map one relevant product from each provider to every required category.
11. Add a risk register with quota, region, lock-in, outage, and data risks.
12. Write an architecture decision record with your choice and exit plan.

!!! note
    Free-tier terms and model availability change. Verify them before any deployment.

## Check your understanding

1. Which responsibilities remain with the customer when using SaaS?
2. Why does a multi-zone design not solve every availability risk?
3. How do Bedrock, Azure AI Foundry, and Vertex AI broadly relate?
4. At what traffic pattern might self-hosting become attractive?
5. What should an exit plan for a managed model API include?

## Further reading

- [NIST definition of cloud computing](https://csrc.nist.gov/pubs/sp/800/145/final)
- [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/)
- [Azure AI Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/)
- [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs)
- [Cloud Security Alliance guidance](https://cloudsecurityalliance.org/research/guidance)

## Conclusion

Cloud AI design joins service models, locations, managed capabilities, and operating responsibility.

An AI SA selects the simplest option that meets measurable risk, cost, and reliability needs.
