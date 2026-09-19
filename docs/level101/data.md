# Data for AI

## Introduction

AI systems depend on data that is usable, current, governed, and relevant.

This course reviews relational data, embeddings, vector search, chunking, pipelines, and governance.

After this course, you can design a basic data path for search or retrieval-augmented generation.

You can also identify quality and privacy risks before deployment.

## Why this matters for the AI SA

An AI SA decides which data enters an AI system and how it moves.

You choose stores, indexes, access controls, refresh schedules, and retention periods.

These choices drive answer quality, latency, cost, and legal exposure.

A strong model cannot repair missing, stale, or unauthorised source data.

Data architecture is therefore part of model architecture.

## Key concepts

### Relational databases recap

A relational database stores data in tables with rows and columns.

A primary key uniquely identifies a row.

A foreign key links a row to another table.

A schema defines fields, types, and constraints.

Structured Query Language (SQL) reads and changes relational data.

A transaction groups operations that must succeed or fail together.

Indexes speed selected reads but consume storage and slow some writes.

Use relational queries for exact facts such as order status and account balance.

Do not replace exact lookup with probabilistic vector search.

### Embeddings and similarity

An embedding is a numeric vector that represents features of an item.

Text with similar meaning often has vectors that are close in embedding space.

Cosine similarity compares the direction of two vectors.

Other distance measures include dot product and Euclidean distance.

The embedding model determines vector dimension and semantic behaviour.

Changing that model usually requires embedding the collection again.

Evaluate retrieval with real questions and known relevant passages.

### Vector databases, ANN, and indexes

A vector database stores vectors and finds nearby vectors.

Nearest-neighbour search finds items closest to a query vector.

Exact search compares every vector and can become slow at large scale.

Approximate nearest neighbour (ANN) search trades some recall for speed.

Retrieval recall is the fraction of relevant items that search returns.

An ANN index is a data structure that narrows the search.

HNSW is a graph-based ANN index used by many systems.

IVF groups vectors into regions and searches selected groups.

Index settings trade memory, build time, latency, and recall.

Examples include Pinecone and PostgreSQL with pgvector.

Metadata filters can enforce tenant, language, date, or access boundaries.

### Chunking is a data problem

A chunk is a bounded piece of source content stored for retrieval.

Chunks that are too large add irrelevant context and token cost.

Chunks that are too small can lose meaning.

Overlap repeats text across adjacent chunks to preserve boundary context.

Structure-aware chunking follows headings, paragraphs, tables, or code units.

Keep source ID, section, version, access label, and timestamps as metadata.

Deduplicate repeated headers and navigation text.

Measure whether retrieval returns enough evidence, not only whether vectors look similar.

### Pipelines, quality, and governance

A data pipeline moves and transforms data through repeatable steps.

Batch pipelines run on a schedule.

Streaming pipelines process events continuously or in short intervals.

Quality checks cover completeness, validity, uniqueness, consistency, and freshness.

Personally identifiable information (PII) is data that identifies or can identify a person.

Examples include names, email addresses, government identifiers, and some location data.

Retention is the period for which data is kept.

Minimise collected data and delete it when the approved purpose ends.

Record lineage, which is the origin and transformation history of data.

Apply access controls before retrieval, not after model generation.

Govern raw documents, chunks, embeddings, prompts, outputs, logs, and backups.

## A worked example

A service company has 12,000 maintenance manuals.

The extracted corpus contains 24 million tokens.

The team creates chunks averaging 400 tokens with 50-token overlap.

The result is about 68,600 chunks, using an illustrative overlap calculation.

Each chunk receives an embedding with 768 numeric dimensions.

Raw 32-bit vectors need about 211 MB before index and metadata overhead.

The team expects actual storage to be several times higher after indexing and replication.

The query service retrieves 20 candidates and reranks them to the best five.

Reranking means applying a second scoring model to improve order.

On 200 labelled questions, at least one useful chunk appears in the top five for 184 questions.

Top-five retrieval recall is therefore 92%.

The p95 search target is 200 milliseconds.

Manual updates enter a nightly pipeline with a four-hour freshness objective.

Documents carry product, region, version, and access-group metadata.

The query applies those filters before similarity search.

The system removes email addresses before embedding and retains query logs for 30 days.

These numbers are illustrative and need workload testing.

!!! note "Reference architecture for this example"
    One valid answer. Draw it yourself first, then compare: what did you include that this omits, and what does this include that you missed?

    ```mermaid
    flowchart LR
      A["12,000 manuals"] --> B["Nightly ingestion with 4-hour freshness and PII stripping"]
      B --> C["About 68,600 chunks 400 tokens 50 overlap"]
      C --> D["768-dimension embeddings"]
      D --> E["Vector index with product region version access-group metadata"]
      F["Search query"] --> G["Pre-search metadata filter"]
      G --> E
      E --> H["20 candidates"]
      H --> I["Reranker"]
      I --> J["Top 5 chunks"]
    ```

## Lab

Use Python, PostgreSQL, and pgvector, or an in-memory vector library.

1. Collect ten public Markdown documents with no personal data.
2. Split them by heading and then into chunks near 300 words.
3. Keep document title, heading, and source path as metadata.
4. Install `sentence-transformers` and generate local embeddings.
5. Install PostgreSQL and pgvector, or use FAISS entirely on your computer.
6. Store each chunk and vector.
7. Embed five test questions and retrieve the five nearest chunks.
8. Label which returned chunks are relevant.
9. Calculate top-five retrieval recall for the five questions.
10. Compare 150-word, 300-word, and 600-word chunks.
11. Add a metadata filter and confirm excluded documents never appear.
12. Delete one source and verify its chunks and vectors are also deleted.
13. Write quality checks for empty text, duplicate chunks, and stale versions.

Use synthetic documents if you cannot confirm that public content permits reuse.

## Check your understanding

1. When is a relational lookup safer than vector similarity search?
2. What does ANN trade for lower search latency?
3. How can chunk size change both retrieval quality and model cost?
4. Which artifacts must a retention policy cover in a RAG system?
5. Why should access filters run before retrieval?

## Further reading

- [PostgreSQL documentation](https://www.postgresql.org/docs/current/)
- [pgvector documentation](https://github.com/pgvector/pgvector)
- [FAISS documentation](https://faiss.ai/)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [GDPR official text](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

## Conclusion

AI data design combines exact records, semantic retrieval, reliable pipelines, and governance.

An AI SA makes these choices measurable and preserves access rules across every derived artifact.
