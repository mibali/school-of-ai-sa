# Applied architecture electives

## Why take an applied elective?

These tracks widen the learner beyond LLM systems. They require the same architecture discipline—problem framing, data readiness, evaluation, controls, cost, and operations—but may favour rules, specialized machine learning, or computer vision. Revisit [AI and ML basics](../level101/ai_ml_basics.md), [Data for AI](../level101/data.md), [Evaluation](../level102/evaluation.md), and [Cost engineering](../level102/cost_engineering.md) as you work.

## Model-choice guide

| Approach | Use when | Avoid when |
| --- | --- | --- |
| Rules | Policy is explicit, stable, and deterministic | Meanings are ambiguous or rules become unmaintainable |
| Specialized ML | A bounded prediction task has representative labelled data | Labels are weak or requirements change too quickly |
| Vision model | Images contain repeatable visual signals | The signal depends on missing context or image quality is uncontrolled |
| LLM | Language ambiguity and flexible generation matter | Exact, deterministic behaviour or very low latency is mandatory |
| RAG | Answers must use a changing, approved knowledge collection | Retrieval cannot enforce access or source coverage is poor |
| Agent | Steps vary and bounded tool use creates clear value | A fixed workflow works, or actions cannot be safely constrained |

Treat this as a shortlist, then benchmark the simplest credible options on the real task.

## Content moderation

### Architecture decisions

Start with policy: define prohibited, restricted, and allowed content, including context, severity, and jurisdiction. Rules suit exact patterns and hard limits. A specialized classifier suits stable categories with adequate labelled examples. An LLM may help with contextual ambiguity or policy explanations, but adds variability, latency, and prompt-injection exposure. A layered design can use rules for obvious cases, a classifier for scale, and human review for ambiguity without making every request an LLM call.

Choose thresholds from the costs of false positives and false negatives. A false positive can suppress legitimate speech, disproportionately affect a dialect, or burden appeals. A false negative can expose users to harm. Keep a review band around uncertain scores, publish an appeal route, and give reviewers the policy version and sufficient context. Monitor overturn rates and errors by language and relevant group; do not infer fairness from an aggregate score.

### Small lab

1. **Open data:** choose a small, openly available moderation dataset; read its data statement and **confirm the dataset licence** permits your use and redistribution before downloading.
2. **Baseline:** write a narrow policy and compare a simple keyword rule with a basic classifier on a held-out set.
3. **Threshold test:** plot or tabulate false positives and false negatives at three thresholds, including results by supported language.
4. **Adversarial and multilingual test:** create lawful test cases with misspellings, coded wording, quoted abuse, dialect, and at least one additional language; document review limitations.
5. **System decision:** select rules, classifier, LLM, or a layered approach; specify review bands, appeals, release gates, monitoring, and an owner.

## Visual identification

### Architecture decisions

Consider a species-identification app from field photos or a factory service that detects surface defects. Image data readiness includes consent and provenance, label quality, class balance, camera angle, resolution, lighting, backgrounds, season, location, and train-test leakage. Split related images—such as frames from one video or photos of one asset—together to avoid an inflated score.

A trained convolutional neural network (CNN) can be efficient for a stable, high-volume task with sufficient labelled images. A vision API can accelerate a pilot where its supported labels, privacy terms, latency, and cost fit. Benchmark both against a **domain expert baseline** measured on the same hidden set. Augmentation such as crop, rotation, brightness, or blur can improve robustness only when the transformed image remains realistic and keeps the same label.

Edge deployment can reduce latency, bandwidth, and exposure of raw images, and can work offline; it constrains model size, power, updates, and observability. Cloud deployment offers elastic compute and simpler centralized updates but depends on connectivity and data transfer. Design an abstention or expert-review path for low confidence and unfamiliar conditions.

### Small lab

1. **Frame the task:** choose species identification or asset-defect detection, define classes and consequences of each error, and **confirm the dataset licence**.
2. **Audit data:** inspect labels, duplicates, imbalance, resolution, environment, and provenance; make leakage-safe train, validation, and test splits.
3. **Build baselines:** measure a simple pretrained model or permitted vision API and a domain expert on the same hidden examples.
4. **Test robustness:** apply realistic augmentation during training, then test separately by lighting, device, background, class, and an out-of-distribution set.
5. **Make the system decision:** choose edge, cloud, or hybrid deployment and document confidence thresholds, expert escalation, latency, cost, monitoring, update, and rollback.

Do not use copyrighted or restricted datasets without permission. Record the licence, attribution obligations, allowed purposes, privacy conditions, and any limits on derived models in the architecture decision.
