# MLOps and LLMOps

## Introduction

Machine learning operations, or MLOps, applies engineering discipline to model delivery.
LLMOps extends it to language models, prompts, retrieval, and model APIs.
This course covers versioning, promotion, registries, drift, releases, and reproducibility.
Afterward, you can design a delivery path for an AI system whose outputs are probabilistic.

## Why this matters for the AI SA

Normal continuous integration and delivery, or CI/CD, assumes code drives behaviour.
AI behaviour also depends on data, model weights, prompts, sampling, and provider changes.
The AI Solutions Architect (AI SA) must define deployable units and promotion evidence.
They choose where artifacts live, which tests block release, and how rollback works.
They must make a release traceable even when an exact output cannot be repeated.

## Key concepts

### Why AI needs different CI/CD

Non-determinism means identical requests can produce different valid outputs.
Data dependence means model quality changes when training or production data changes.
Unit tests still matter, but exact string assertions are often too brittle.
Use distributional tests, quality thresholds, schema checks, and fixed evaluation sets.

CI should test code, data contracts, prompts, retrieval, and model behaviour.
CD should promote a complete version bundle.
That bundle may contain code commit, prompt ID, model ID, index version, parameters, and eval report.

### Environments, versions, and registries

Promote artifacts through development, staging, and production.
Do not rebuild between environments.
Change configuration and credentials, not the tested artifact.
Use masked or synthetic data outside production.

Version prompt templates like code.
Record model provider, exact model identifier, parameters, and API version.
A model registry stores model versions, metadata, approvals, and deployment stage.
MLflow provides a registry; cloud platforms provide managed alternatives.
A feature store publishes governed model inputs for reuse online and offline.
Feast is an open-source example.
LLM applications may need an embedding or document registry as well.

### Reproducibility

Reproducibility means recreating the process and obtaining meaningfully comparable results.
Random seeds help, but hosted models can change behind a stable name.
Hardware kernels and parallel execution can also vary results.
Snapshot datasets, dependencies, prompts, and index contents.
Pin immutable model versions when providers expose them.

Log enough inputs to investigate failures, subject to privacy rules.
Store hashes when raw content cannot be retained.
Define acceptable statistical variation rather than promise byte-for-byte output.
Kubeflow Pipelines and MLflow can record pipeline runs and artifacts.

### Drift detection

Drift is a change between the data or behaviour expected at build time and what occurs in production.
Input drift changes request topics, languages, lengths, or features.
Concept drift changes the relationship between inputs and correct outputs.
Output drift changes response properties such as refusal rate or sentiment.

Monitor distributions, not only averages.
Compare a recent window with a reference window.
Alert on meaningful business effects and sustained changes.
Drift is a signal for investigation, not proof that a model is wrong.
Labels often arrive late, so combine proxies with sampled human review.

### Canary model releases

A canary release sends a small share of live traffic to a candidate version.
Start with internal users, then perhaps 1%, 5%, and 25% of eligible traffic.
These percentages are illustrative.
Compare quality, latency, errors, safety, and cost against the current version.

Use sticky assignment so one user gets a consistent version.
Exclude high-risk tasks at first.
Set automatic stop thresholds and preserve a fast rollback path.
Shadow mode is safer: the candidate sees copied requests but its output is not served.

## A worked example

A bank classifies 2 million support messages each month into 40 queues.
The current model has 88% macro F1, a metric that averages class quality equally.
The release gate requires at least 87% on a frozen 5,000-message set and no critical class below 80% recall.
These thresholds are illustrative.

The release bundle contains container digest, model registry version 17, feature definitions, code commit, and data snapshot hash.
Staging uses masked production samples.
The candidate first runs in shadow mode on 50,000 messages.
It then receives 5% of low-risk traffic for three days.

The candidate reaches 90% macro F1 but sends 2.4% of messages to fallback, versus 0.6% for the current model.
Investigation finds a changed language distribution.
The team pauses promotion, updates the eval set, and retrains.
Rollback requires changing a registry alias, not rebuilding a container.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["Commit"] --> B["Bundle digest registry v17 features data hash"]
      subgraph offlineGate["Offline gate"]
        B --> C["Frozen 5,000-message eval"] --> D["At least 87% macro F1"] --> E["Critical class recall at least 80%"]
      end
      subgraph rollout["Rollout"]
        E --> F["Shadow mode 50,000 messages"] --> G["5% low-risk canary 3 days"] --> H["Full rollout"]
      end
      H --> I["Monitor fallback rate and language drift"]
      I --> J["Rollback by registry alias change"]
    ```

## Lab

Create a reproducible local release pipeline with free tools.

1. Choose a small public text-classification dataset.
2. Split it once into train, validation, and test files.
3. Hash each file and record the hashes.
4. Train a small scikit-learn model.
5. Track parameters, metrics, artifacts, and code version with local MLflow.
6. Register two model versions in the MLflow Model Registry.
7. Write a release manifest with model, dataset, environment, and code identifiers.
8. Define gates for quality, inference latency, and artifact completeness.
9. Simulate 1% canary assignment with a deterministic hash of user ID.
10. Shift the input distribution by adding longer or different-topic samples.
11. Compare class and length distributions with the baseline.
12. Trigger a warning only after three consecutive changed batches.
13. Promote or reject the candidate and record the reason.
14. Re-run from a clean environment and compare results.

!!! note
    A successful rerun is evidence of control, not proof of exact determinism.

## Check your understanding

1. Which artifacts must be versioned to reproduce an LLM application release?
2. Why can ordinary exact-output tests fail for a healthy model?
3. How does shadow deployment differ from a canary release?
4. Why is drift an investigation signal rather than a diagnosis?
5. What should a rollback change, and what should it avoid rebuilding?

## Further reading

- [MLflow Model Registry](https://mlflow.org/docs/latest/ml/model-registry/)
- [Kubeflow Pipelines documentation](https://www.kubeflow.org/docs/components/pipelines/)
- [Feast documentation](https://docs.feast.dev/)
- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [NIST guidance on adversarial machine learning](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)

## Conclusion

MLOps and LLMOps make changing AI systems governable.
The AI SA must design version bundles, evidence gates, monitoring, canaries, and rollback before the first production release.
