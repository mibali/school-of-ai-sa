# RAG Architecture

## Introduction

Retrieval-augmented generation, or RAG, gives a language model selected source material at request time.
It separates stored knowledge from the model's learned parameters.
This course covers ingestion, retrieval, generation, and evaluation.
You will learn to choose chunking, embeddings, search, and reranking methods.
You will also learn when not to use RAG.
Afterward, you can design and test a grounded question-answering service.

## Why this matters for the AI SA

An AI Solutions Architect (AI SA) decides where knowledge lives and how it reaches a model.
Those decisions set answer quality, latency, security, and cost.
The architect must define data freshness, access control, and evidence requirements.
They must size indexes and set service-level objectives, or SLOs, for response time and availability.
They must also explain why retrieval is better than a larger context window, fine-tuning, or ordinary search.

## Key concepts

### The RAG loop

RAG has an index path and a query path.
The index path loads documents, cleans them, splits them into chunks, creates embeddings, and stores metadata.
An embedding is a numeric vector that represents meaning.
The index must preserve source IDs, timestamps, permissions, and document versions.

The query path accepts a question, retrieves candidates, optionally reranks them, and builds a prompt.
A reranker is a model that scores a query and each candidate together.
The generator answers from the selected context and cites its sources.
Updates should change only affected chunks, not rebuild the full corpus.

### Chunking and embeddings

A chunk is the unit stored and retrieved.
Fixed-size chunks are simple but can cut through ideas.
Sentence or paragraph chunks preserve meaning but vary in size.
Structure-aware chunks follow headings, tables, or code blocks.
Parent-child retrieval finds small chunks, then returns a larger parent for context.

Overlap can preserve boundary facts, but it increases index size and duplicate results.
Start with 300–600 tokens and 10–20% overlap as an illustrative baseline.
Measure rather than copy that default.

Choose an embedding model using domain quality, language coverage, vector size, latency, and licence.
Test on real queries before choosing it.
Changing models usually requires re-embedding the corpus.
Products include hosted embedding APIs and open models such as BGE and E5.

### Search, hybrid retrieval, and reranking

Vector search finds semantically similar text.
BM25 is a term-ranking algorithm that rewards matching rare words.
BM25 often wins on product codes, names, and exact phrases.
Hybrid search combines vector and lexical scores.
It is a strong default for mixed enterprise content.

Retrieve perhaps 20 candidates, rerank them, and send the best 4–8 to the model.
These figures are illustrative.
Reranking adds latency, often tens to hundreds of milliseconds.
Metadata filters must enforce tenant and document permissions before generation.
pgvector, Pinecone, and Weaviate can support vector retrieval; several also support hybrid patterns.

### When RAG is the wrong answer

Use a context window directly when the source set is small, bounded, and supplied with each task.
Use fine-tuning when you need stable behaviour, style, or task skill rather than changing facts.
Use plain search when users need documents, not a generated synthesis.
Use a database query when answers depend on exact structured values or calculations.
Do not add RAG to hide poor source quality.
Retrieval cannot create facts that are absent, stale, or inaccessible.

### RAG-specific evaluation

Retrieval hit rate measures how often the required source appears in the top results.
Report hit rate at a cutoff, such as hit rate at 5.
Recall measures how much of the relevant evidence retrieval found.
Faithfulness measures whether answer claims follow from supplied context.
Answer relevance measures whether the response addresses the question.

Evaluate retrieval separately from generation.
Otherwise, a fluent model can hide failed retrieval.
Keep source labels and expected evidence in the evaluation set.

## A worked example

A support team has 50,000 product pages containing 30 million tokens.
Pages change daily, and each user may view only their region's content.
The team creates 60,000 structure-aware chunks averaging 500 tokens.
At 1,536 dimensions with four-byte values, raw vectors occupy about 369 MB.
The production index needs more space for graph links, metadata, and replicas.

For each question, hybrid search returns 30 candidates in 90 ms.
A reranker reduces them to 6 in 120 ms.
Generation takes 1.4 seconds, so median end-to-end latency is about 1.7 seconds.
All numbers are illustrative.

On 200 labelled questions, hit rate at 5 rises from 78% for vector-only search to 89% for hybrid search.
Faithfulness rises from 82% to 93% after prompts require citations and abstention.
The team rejects answers when no candidate passes a relevance threshold.
Region metadata is applied during retrieval, not after generation.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      subgraph indexPath["Index path"]
        A["50,000 regional pages"] --> B["Structure-aware chunking"] --> C["60,000 chunks of about 500 tokens"] --> D["1,536-dim embeddings"] --> E["Index with daily updates"]
      end
      subgraph queryPath["Query path"]
        F["Question"] --> G["Hybrid search with region filter 30 candidates 90 ms"] --> H["Reranker top 6 120 ms"] --> I["Relevance-threshold gate"]
        I -->|Pass| J["Grounded generation with citations 1.4 s"]
        I -->|None pass| K["Abstain"]
      end
      E --> G
    ```

## Lab

Build a small local RAG benchmark with free, open tools.

1. Install Python, PostgreSQL with pgvector, or use an in-memory vector library such as FAISS.
2. Select 20 public documents with headings and stable URLs.
3. Write 15 questions and record the source passage for each before building retrieval.
4. Create one index with 400-token fixed chunks and 15% overlap.
5. Create a second index with heading-aware chunks.
6. Use an open embedding model from Sentence Transformers.
7. Retrieve the top 5 chunks for every question.
8. Calculate hit rate at 5 by checking whether the labelled source appears.
9. Add BM25 with a library such as `rank-bm25` and combine ranked lists.
10. Compare vector, BM25, and hybrid results in a Markdown table.
11. Generate answers with a small local model or a provider's free allowance.
12. Mark each answer as faithful, unfaithful, or unsupported using the source text.
13. Record median retrieval latency and total prompt tokens.
14. Write one architecture decision based on the results.

!!! note
    Keep the labelled questions unchanged while comparing designs. Otherwise, the comparison is not fair.

## Check your understanding

1. Why should retrieval and generation be evaluated separately?
2. When would BM25 outperform vector search?
3. What costs and quality risks come from chunk overlap?
4. Why must permission filters run before generation?
5. Which requirement would make plain search better than RAG?

## Further reading

- [Retrieval-Augmented Generation paper](https://arxiv.org/abs/2005.11401)
- [pgvector documentation](https://github.com/pgvector/pgvector)
- [Sentence Transformers semantic search](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)
- [Weaviate hybrid search](https://docs.weaviate.io/weaviate/search/hybrid)
- [Pinecone learning center: rerankers](https://www.pinecone.io/learn/series/rag/rerankers/)

## Conclusion

RAG is an evidence pipeline, not a single database feature.
The AI SA must design both paths, test each stage, enforce access, and know when a simpler pattern is better.
