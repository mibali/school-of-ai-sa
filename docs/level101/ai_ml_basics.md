# AI and Machine Learning Basics

## Introduction

Artificial intelligence (AI) is software that performs tasks associated with human intelligence.

Machine learning (ML) is a way to build AI by learning patterns from data instead of writing every rule.

This course explains common learning methods, dataset splits, evaluation metrics, and model fit.

It also explains common failure modes and when simple software is the better choice.

After this course, you can frame an ML problem, select useful metrics, and challenge a proposed design.

## Why this matters for the AI SA

An AI Solutions Architect (AI SA) turns a business need into a reliable technical system.

You must decide whether the need is a prediction problem at all.

You must define the input, output, acceptable error, and feedback loop.

These choices affect data collection, model selection, serving cost, monitoring, and risk.

A model with a high benchmark score can still fail the business goal.

## Key concepts

### Supervised and unsupervised learning

Supervised learning uses examples that pair an input with a known answer, called a label.

A spam filter may learn from emails labelled `spam` or `not spam`.

Classification predicts a category.

Regression predicts a number, such as delivery time in minutes.

Unsupervised learning uses data without known labels.

Clustering, an unsupervised method, groups similar records.

It can reveal customer segments, but a human must decide what those groups mean.

### Training, validation, and test data

Training data is the set used to adjust model parameters.

Validation data is a separate set used to choose settings and compare candidates.

Test data is held back for one final estimate of performance on unseen cases.

An illustrative split is 70% training, 15% validation, and 15% test.

Split by time for forecasts so future records never influence the past.

Split by customer when records from one customer are strongly related.

Data leakage occurs when information unavailable at prediction time enters training or evaluation.

### Metrics and the accuracy trap

Accuracy is the fraction of all predictions that are correct.

Precision is the fraction of predicted positives that are truly positive.

Recall is the fraction of all true positives that the model finds.

Suppose 10 of 1,000 payments are fraudulent.

A model that predicts `not fraud` every time is 99% accurate but has 0% fraud recall.

Use precision when false alarms are costly.

Use recall when missing a positive case is costly.

A confusion matrix counts true positives, false positives, true negatives, and false negatives.

Choose thresholds with business costs, not a metric in isolation.

### Fit, generalisation, and failure modes

Generalisation is useful performance on new data.

Overfitting happens when a model learns training noise and performs poorly on new data.

Underfitting happens when a model is too simple, poorly trained, or missing useful features.

Regularisation constrains a model to reduce overfitting.

Data drift means the distribution of production inputs changes over time.

Concept drift means the relationship between input and answer changes.

Other failures include biased labels, class imbalance, stale features, and training-serving skew.

Training-serving skew means production feature calculations differ from training calculations.

Monitor inputs, predictions, outcomes, latency, and errors after launch.

### When ML is not the right tool

Do not use ML when an exact rule solves the task cheaply and reliably.

Do not use it when errors are unacceptable and no safe human review exists.

Avoid it when there is too little representative data or no measurable target.

A database query is better for retrieving an account balance.

A rules engine is often better for a small, stable set of legal constraints.

Start with a simple baseline before adding a learned model.

## A worked example

A support team receives 20,000 tickets per month.

About 2,000 tickets concern billing.

The team wants a classifier that routes billing tickets automatically.

It collects 60,000 historical tickets with agent-assigned labels.

The team splits them by month: 42,000 for training, 9,000 for validation, and 9,000 for testing.

This time-based split better represents future traffic.

On the test set, 900 tickets are truly billing tickets.

The model marks 1,000 as billing.

Of those, 800 are correct.

Precision is 800 / 1,000, or 80%.

Recall is 800 / 900, or about 89%.

Overall accuracy is 96%, but routing decisions use precision and recall.

The team estimates a wrong route costs 4 minutes and a missed billing ticket costs 12 minutes.

It raises the decision threshold until precision reaches 90%, while recall falls to 78%.

Agents review low-confidence cases.

The architecture logs input category signals, confidence, final agent route, and model version.

An alert fires if billing volume changes by more than 30% from the four-week baseline.

These values are illustrative, not universal targets.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["60,000 historical tickets"] --> B["Time split 42,000 train 9,000 validation 9,000 test"]
      B --> C["Train classifier"]
      C --> D["Evaluate on test set"]
      D --> E["Deploy behind ticket routing"]
      E --> F["Monitor drift and agent feedback"]
      F --> A
    ```

## Lab

Use Python and scikit-learn, both open source.

1. Create a virtual environment with `python -m venv .venv`.
2. Activate it and run `pip install scikit-learn pandas`.
3. Load scikit-learn's breast cancer dataset with `load_breast_cancer()`.
4. Split the data with `train_test_split`, using 20% for testing and `stratify=y`.
5. Split the remaining data again to create a validation set.
6. Train `LogisticRegression(max_iter=5000)` as a baseline.
7. Print accuracy, precision, recall, and the confusion matrix on validation data.
8. Change the probability threshold from 0.5 to 0.3 and compare precision and recall.
9. Select a threshold before viewing test results.
10. Evaluate once on the test set and record the result.
11. Add an intentionally weak model, such as `DummyClassifier`, for comparison.
12. Write three production signals you would monitor for drift.

!!! note
    This public dataset supports learning only. It is not suitable for clinical decisions.

## Check your understanding

1. Why can a 99% accurate classifier still be useless?
2. When should you split a dataset by time rather than at random?
3. How do overfitting and underfitting appear in training and validation results?
4. Which production signals could reveal data drift before labels arrive?
5. What evidence would make you reject ML in favour of rules?

## Further reading

- [Google Machine Learning Glossary](https://developers.google.com/machine-learning/glossary)
- [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)

## Conclusion

ML architecture starts with problem framing, representative data, and a metric tied to real costs.

An AI SA also plans for drift, safe fallback, and the possibility that ML is unnecessary.
