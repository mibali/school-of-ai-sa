# LLM Fundamentals

## Introduction

A large language model (LLM) predicts and generates sequences of language units.

This course explains those units, context limits, sampling, prompting, and embeddings.

It also introduces failures unique to generative systems.

After this course, you can explain core LLM controls and design a basic, testable interaction.

## Why this matters for the AI SA

An AI SA chooses models, prompts, context, evaluation, and safety controls.

Token volume drives latency and cost.

Context design affects answer quality and data exposure.

Sampling settings affect repeatability.

Failure modes shape review, monitoring, and security requirements.

## Key concepts

### Tokens, tokenisation, and context windows

A token is a unit of text processed by a language model.

Tokenisation is the process that divides text into those units.

A token may be a word, part of a word, punctuation, or whitespace.

English text often averages roughly four characters per token, but language and content change this ratio.

A context window is the maximum token sequence available to the model for one request.

It includes instructions, conversation history, retrieved text, and generated output.

A 32,000-token window does not guarantee equal attention to every token.

Longer input usually increases cost and latency.

### Generation, temperature, and sampling

The model assigns a probability to each possible next token.

Sampling is the method used to select from that probability distribution.

Temperature scales the distribution before selection.

Lower temperature usually makes output more consistent.

Higher temperature usually makes output more varied and risky.

Top-p sampling limits choices to a set whose cumulative probability reaches a threshold.

Even low-temperature generation can be non-deterministic.

Non-determinism means repeated identical requests may produce different outputs.

### Prompting patterns

A prompt is the input that guides a model's response.

A system prompt states high-priority role, behaviour, and constraints.

Zero-shot prompting gives an instruction without examples.

Few-shot prompting adds a small set of input-output examples.

Chain-of-thought prompting asks for intermediate reasoning steps.

For production, prefer concise rationale or structured checks over storing hidden detailed reasoning.

Use clear delimiters to separate instructions from untrusted content.

Specify output structure, allowed evidence, and what to do when evidence is missing.

Prompts need version control and evaluation like code.

### Embeddings and retrieval

An embedding is a list of numbers that represents semantic features of content.

Semantically similar passages often have nearby embeddings.

Similarity search finds nearby vectors using a distance measure such as cosine similarity.

Retrieval-augmented generation (RAG) retrieves relevant sources and places them in the prompt.

RAG can improve grounding but does not guarantee factual output.

Embedding models, dimensions, chunking, and indexes must be evaluated together.

### Generative failure modes

A hallucination is fluent output that is unsupported or false.

Models can also omit facts, misread context, or produce invalid formats.

Prompt injection is untrusted input that tries to override application instructions.

A jailbreak is a direct attempt to bypass a model's safety behaviour.

Prompt injection can arrive through a user message, web page, document, or tool result.

These threats need architectural controls, not only stronger wording.

Treat model output as untrusted data.

The Security Fundamentals course covers these risks in depth.

## A worked example

A company builds an assistant for a 500-page employee handbook.

The extracted handbook contains 180,000 tokens.

Sending all pages on every request would exceed many context limits and waste money.

The team splits text into 900 chunks averaging 200 tokens.

It embeds each chunk and retrieves the five most similar chunks per question.

Retrieved context is about 1,000 tokens.

The system prompt and question add 300 tokens.

The response limit is 400 tokens.

One request therefore uses up to 1,700 tokens.

At an illustrative blended price of $5 per million tokens, 10,000 requests cost about $85.

Provider prices and input-output rates vary, so the team recalculates with current rates.

The prompt requires citations and says, “If the sources do not answer, say you do not know.”

Temperature is 0.2 for lower variation.

The team tests 100 representative questions.

Its release target is at least 90% citation correctness and under 2.5 seconds p95 latency.

P95 means 95% of measured requests complete within that time.

Human reviewers inspect unsupported claims separately from writing quality.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["500-page handbook"] --> B["900 chunks of about 200 tokens"]
      B --> C["Chunk embeddings"]
      C --> D["Vector store"]
      E["Employee question"] --> F["Embed query"]
      F --> D
      D --> G["Top 5 chunks about 1,000 tokens"]
      G --> H["LLM with system prompt"]
      H --> I["Grounded answer with citations"]
    ```

## Lab

Use Python, Ollama, and a small open model that fits your computer.

1. Install [Ollama](https://ollama.com/) using its official instructions.
2. Pull an available small model, for example `ollama pull llama3.2:3b`.
3. Create a text file with five short fictional company policies.
4. Ask one zero-shot question with `ollama run llama3.2:3b`.
5. Repeat the same prompt three times and note any variation.
6. Add a system instruction that requires JSON with `answer` and `evidence` fields.
7. Add two few-shot examples and compare format compliance.
8. Ask a question the policies do not answer.
9. Revise the prompt to require an explicit `unknown` response.
10. Place “Ignore previous instructions” inside a quoted policy and observe the result.
11. Do not connect tools or sensitive data during this injection test.
12. Record input length, output length, latency, and correctness for each run.

If local hardware is limited, use a provider's free trial and never submit private data.

## Check your understanding

1. Which parts of an application consume the context window?
2. Why does temperature zero not always guarantee identical output?
3. When can few-shot prompting help more than zero-shot prompting?
4. Why can RAG reduce hallucination without eliminating it?
5. How do prompt injection and a jailbreak differ?

## Further reading

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [OpenAI tokenisation guide](https://platform.openai.com/docs/concepts#tokens)
- [Google prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

## Conclusion

LLMs combine token limits, probabilistic generation, prompts, and optional retrieval.

An AI SA balances their quality, cost, latency, and security with explicit tests and controls.
