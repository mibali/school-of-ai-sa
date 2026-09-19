# Systems Design

## Introduction

Systems design turns requirements into components, interfaces, and operating controls.

This course covers scaling, availability, service objectives, latency, caching, and fallbacks.

After this course, you can sketch an AI service that handles growth and partial failure.

You can also define measurable targets for its users.

## Why this matters for the AI SA

AI workloads can be slow, expensive, bursty, and dependent on external providers.

An AI SA chooses boundaries, capacity, queues, timeouts, caches, and failure behaviour.

These choices determine user experience and operating cost.

A model demo proves little about a production system under load.

Good design assumes that every dependency will eventually fail.

## Key concepts

### Vertical and horizontal scalability

Scalability is a system's ability to handle changing demand.

Vertical scaling gives one machine more CPU, memory, or accelerator capacity.

It is simple but has hardware limits and can create one large failure point.

Horizontal scaling adds more service instances.

It needs load balancing and shared or partitioned state.

A stateless service keeps no required session data on one instance.

Stateless request handlers are easier to scale horizontally.

Model servers may batch requests to improve accelerator use.

Batching can improve throughput but can also increase waiting time.

Backpressure slows or rejects new work when capacity is exhausted.

### Availability, SLIs, and SLOs

Availability is the proportion of time a service can perform its intended function.

A service level indicator (SLI) is a measured reliability signal.

Examples include successful-response rate and request latency.

A service level objective (SLO) is a target for an SLI over a period.

An illustrative SLO is 99.9% successful requests per calendar month.

That allows about 43 minutes of failure in a 30-day month.

An error budget is the amount of failure allowed by the SLO.

Dependencies need targets that support the end-to-end objective.

Measure useful responses, not only HTTP status codes.

A fluent but empty model response may be a functional failure.

### Latency budgets for AI endpoints

Latency is elapsed time between request and response.

A latency budget allocates an end-to-end target across components.

Time to first token measures how soon streamed generation begins.

Time to last token measures completion of the full response.

Percentiles show the distribution better than an average.

P95 latency is the value that 95% of requests meet or beat.

Set timeouts shorter than the caller's deadline.

Use cancellation so abandoned requests stop consuming model capacity.

Limit input and output sizes to bound cost and duration.

### Caching AI responses

A cache stores reusable results closer to demand.

Exact-match caching returns a prior result for an identical normalised request.

Semantic caching returns a result for a meaningfully similar request.

Semantic caches add false-match and staleness risk.

Cache embeddings, retrieval results, deterministic classifications, or complete responses where safe.

A cache key should include model, prompt version, parameters, tenant, and relevant data version.

Time to live (TTL) is how long an entry remains valid.

Do not let one user's private response become another user's cache hit.

Do not cache high-risk or rapidly changing answers without strong invalidation.

### Graceful degradation and fallbacks

Graceful degradation preserves limited useful behaviour during failure.

A fallback can use a smaller model, keyword search, a static answer, or human review.

A circuit breaker stops calls to a failing dependency for a short period.

Retries can help transient errors but amplify overload.

Use limited retries with random delay and only for safe operations.

A queue can absorb short bursts for asynchronous work.

Reject excess work clearly rather than allowing an unbounded queue.

Test degraded modes before an incident.

## A worked example

A claims assistant receives 10 requests per second normally and 40 at peak.

The end-to-end p95 latency objective is 3,000 milliseconds.

Authentication receives 50 ms of the budget.

Retrieval receives 250 ms.

Prompt assembly receives 50 ms.

Model inference receives 2,400 ms.

Network and response handling receive 150 ms.

The remaining 100 ms is contingency.

The service objective is 99.9% useful responses each month.

Three stateless application replicas run across two availability zones.

Autoscaling starts when average concurrent requests exceed an illustrative threshold of 20 per replica.

An exact cache stores approved answers for public policy questions for 15 minutes.

The key includes policy version and prompt version.

If the main model times out after 2.4 seconds, a smaller model gets 400 ms for classification only.

If both fail, the user receives relevant source links and an option for human review.

The system never retries a timed-out generation more than once.

A load test confirms 42 requests per second before p95 exceeds the target.

These limits are illustrative and require production measurement.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["Request"] --> B["50 ms auth"]
      B --> C["Exact cache 15-min TTL key policy and prompt version"]
      C --> D["250 ms retrieval"]
      D --> E["50 ms prompt assembly"]
      E --> F["2,400 ms model inference"]
      F --> G["Response"]
      F -->|Timeout| H["400 ms small model classification only"]
      H -->|Failure| I["Source links and human review"]
      J["Three stateless replicas across two availability zones"] --> A
    ```

## Lab

Use Python, FastAPI, and Locust, all available as open-source tools.

1. Create a virtual environment.
2. Run `pip install fastapi uvicorn locust`.
3. Build one endpoint that waits between 200 and 1,200 ms to simulate inference.
4. Make 5% of requests return a simulated provider error.
5. Add a two-second timeout around the simulated model call.
6. Add an in-memory exact cache with a 60-second TTL.
7. Include prompt version and tenant in the cache key.
8. Return a static fallback when the simulated model fails.
9. Start the service locally with Uvicorn.
10. Create a Locust task that sends a mix of repeated and unique prompts.
11. Run tests at 5, 20, and 50 concurrent users.
12. Record p50, p95, error rate, fallback rate, and cache hit rate.
13. Disable the cache and compare latency and simulated model calls.
14. Write an SLI and SLO based on observed user-visible success.

Use fictional prompts and keep the service local for this lab.

## Check your understanding

1. When does horizontal scaling require changes to application state?
2. How does an SLI differ from an SLO and an error budget?
3. Which components belong in an AI endpoint's latency budget?
4. What must a safe response-cache key contain?
5. How can retries turn a dependency failure into a wider outage?

## Further reading

- [Google SRE service level objectives](https://sre.google/sre-book/service-level-objectives/)
- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)
- [AWS Builders' Library: timeouts, retries, and backoff](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)
- [IETF HTTP caching standard](https://www.rfc-editor.org/rfc/rfc9111)

## Conclusion

Production AI needs explicit capacity, reliability, latency, caching, and failure plans.

An AI SA converts these plans into measurable objectives and tested degraded behaviour.
