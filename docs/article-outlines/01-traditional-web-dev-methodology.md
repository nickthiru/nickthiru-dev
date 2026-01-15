# Article 1: The Web Dev Methodology That Still Works (For Traditional Apps)

## Meta

**Series**: Development Methodology Series  
**Article**: 1 of 3  
**Status**: Outline  
**Target Publication**: nickthiru.dev  
**Estimated Length**: 3,500-4,000 words

## Series Navigation

> **Part of a Series**: This is Article 1 of 3 in the "Development Methodology Series"
>
> - **Article 1**: The Web Dev Methodology That Still Works (For Traditional Apps) _(you are here)_
> - **Article 2**: [Why Traditional Development Methodology Breaks for Agentic AI Systems](./02-why-traditional-breaks-for-ai.md)
> - **Article 3**: [A Lean Methodology for Agentic AI Development](./03-lean-ai-methodology.md)

---

## Hook

For years, I built full-stack web applications using a structured, 4-phase development methodology. It worked beautifully for traditional apps—predictable, scalable, and team-friendly.

Then AI agents came along.

The methodology that served me so well suddenly didn't fit. Not because it was bad, but because **Agentic AI systems are fundamentally different beasts**.

Before I explain what broke and why, let me share what worked. Because if you're building traditional web apps (and many of us still are), this methodology still delivers.

---

## Article Structure

### 1. Introduction

**Goal**: Set context and establish credibility

- Brief personal journey: Years of building full-stack apps
- The methodology evolved from real-world pain points and integrating best practices from established sources
- It's not "obsolete"—it's just **not applicable to Agentic AI apps**
- For traditional full-stack web apps, it still works (with AI assisting within the guided methodology)
- **Attribution**: The design phases were heavily influenced by two foundational books:
  - _Microservices: Up and Running_ by Ronnie Mitra and Irakli Nadareishvili (for service design and API contracts)
  - _The DynamoDB Book_ by Alex DeBrie (for NoSQL data modeling)
- These books, combined with years of picking up practices from various disciplines, formed the backbone of this integrated approach
- Teaser: "But when I started building Agentic AI systems, I had to rethink everything. More on that in Article 2."

### 2. The Problem This Methodology Solves

**Goal**: Establish the "why" before the "how"

**Common pain points in traditional web development**:

- Requirements changing mid-development
- Frontend and backend teams blocked waiting for each other
- Data model doesn't support new features
- Integration nightmares
- Unclear acceptance criteria
- Technical debt from rushed decisions

**The core insight**: Most problems stem from **insufficient upfront design** and **lack of clear contracts**.

### 3. The 4-Phase Methodology Overview

**Goal**: High-level framework before diving deep

**Visual**: Simple diagram showing the 4 phases

1. **Phase 1: Requirements & Story Mapping**
2. **Phase 2: Conceptual Design (UI & Data Modeling)**
3. **Phase 3: API Design & Contracts**
4. **Phase 4: Implementation & Testing**

**Key principle**: Each phase builds on the previous one. You don't code until you've designed. You don't design until you understand the requirements.

**Philosophical foundation**: This integrates **SEED(S) methodology** (Actors → Stories/Jobs → Experience → Design → Specification) with design-driven development and contract-first APIs.

**Outcome**: By the time you start coding, you know exactly what you're building, and frontend/backend teams can work in parallel.

---

### 4. Phase 1: Requirements & Story Mapping

**Goal**: Understand who you're building for and what they need

#### Step 1: Identify Actors

- Who are the users of this system?
- What roles do they play?
- Example: Customer, Admin, Support Agent
- Document in `docs/project/actors.md`

#### Step 2: Create Job Stories (Not User Stories)

**Critical distinction**: We use **Job Story format**, not traditional User Stories.

**Format**:

```
When [circumstance]
I want to [motivation]
So I can [goal]
```

**Example**:

```
When I need to check in for my flight,
I want to do it from my phone,
So I can avoid airport queues
```

**Why this format?**: Based on Clayton Christensen's "Jobs to Be Done" theory, it focuses on **circumstances and context**, not personas. This leads to better feature design because it captures the situational triggers that drive user behavior.

#### Step 3: Story Mapping & Bundling

**The hierarchy**:

```
👤 User (Actor)
  └─ 🎯 Goal
      └─ 📝 Epic
          └─ 📄 Story [Story-ID]
```

**Critical concept - Story Bundling**:

- The story map is your **discovery space** (fine-grained stories)
- Story cards are your **implementation units** (bundled stories)
- Multiple stories from the map can share the same Story ID when they:
  - Work on the same page/component
  - Pull from the same data model
  - Are naturally tested together

**Example**: "Filter flights by price" and "Filter flights by airline" might be separate stories in the map but bundled into Story Card SC-001 because they're the same component and data model.

**Deliverable**:

- Story map with granular stories
- Story cards (bundled) with clear acceptance criteria
- Documented in `docs/backlog/story-cards/`

---

### 5. Phase 2: Conceptual Design

**Goal**: Design the user experience and data model before writing code

#### Step 1: UI Mockups (Design-Driven Development)

- Create mockups for every screen and state
- Include error states, loading states, empty states
- Get feedback from stakeholders early
- **Why**: Mockups are cheap to change; code is expensive
- Store in `docs/specs/stories/[story-id]/mockups/`

#### Step 2: Entity-Relationship Diagram (ERD)

**Important**: This is **project-level**, not story-level

- Identify entities (Customer, Order, Product)
- Define relationships (one-to-many, many-to-many)
- Document attributes
- Store in `docs/project/specs/erd.puml`
- Update as new stories add entities

#### Step 3: Define Access Patterns (UI-Centric Approach)

**Critical step for DynamoDB**:

> "You can't design your table until you know how you'll use your data" — Alex DeBrie, _The DynamoDB Book_

**The process**:

1. Review UI mockups for **every screen**
2. Document what data each screen needs
3. Define input/output shapes for each access pattern
4. Map patterns to DynamoDB queries

**Example access patterns**:

- Get customer by ID
- Get customer by email
- Get all orders for a customer (sorted by date, most recent first)
- Get all orders by status

**Why this matters**: DynamoDB requires you to design for your access patterns upfront. Miss a pattern, and you're in trouble later. This is where _The DynamoDB Book_ principles are critical.

**Deliverable**: Comprehensive access patterns documented in `docs/specs/stories/[story-id]/access-patterns.md`

#### Step 4: Data Modeling (DynamoDB)

**Two approaches** (choose based on your needs):

**1. Faux-SQL Approach** (recommended for MVPs and evolving apps):

- Multiple tables (one per entity: `CustomersTable`, `OrdersTable`)
- **Hybrid key naming**:
  - Descriptive primary keys: `CustomerId`, `OrderId`
  - Generic GSI attributes: `GSI1PK`, `GSI1SK`, `GSI2PK`, `GSI2SK`
- 1-2 GSIs per table, reusable for related patterns
- Easier to understand and change
- 50-100ms response times acceptable
- Good for evolving requirements
- Great for analytics and reporting

**2. Single-Table Design** (for high-scale, performance-critical apps):

- One table for all entities
- Generic key names throughout: `PK`, `SK`, `GSI1PK`, `GSI1SK`
- Overloaded GSIs (multiple entity types per index)
- Sub-10ms performance possible
- Steeper learning curve
- Requires comprehensive upfront planning
- Harder to change later

**Pragmatic migration path**: Start with Faux-SQL, migrate to Single-Table when scale demands it.

**Entity documentation system**:

- `docs/project/specs/entity-key-table-master.md` - Master reference for all entities
- `docs/project/specs/entities/[entity].md` - Per-entity files with:
  - Entity-key tables (main table + GSIs)
  - Access patterns with query examples
  - Design decisions and rationale
  - Evolution history

**Deliverable**: Complete data model with primary keys, secondary indexes, example items, and comprehensive documentation

---

### 6. Phase 3: API Design & Contracts

**Goal**: Define the contract between frontend and backend so teams can work in parallel

This phase is heavily influenced by _Microservices: Up and Running_ principles around service contracts and API design.

#### Step 1: Sequence Diagrams (Backend Focus)

**Critical guideline**: Focus on **backend data flows**, not UI scenarios.

- Multiple UI scenarios may share the same backend interaction (e.g., different filters/views using same search API)
- Create **one diagram per backend interaction pattern**, not per UI scenario
- Show component interactions (BFF → Microservice → DynamoDB)
- Identify API calls needed
- Store in `docs/specs/stories/[story-id]/sequence-diagrams/`

#### Step 2: Separate Actions & Queries (Command Query Separation)

**Queries** (read operations):

- Input parameters
- Output shape
- Error cases
- **Caching strategy** (TTL, cache layers, invalidation rules)
- **Performance targets** (response time SLAs)
- Database query details
- **Client-side processing** requirements
- Validation (client-side, BFF, API Gateway, Lambda)
- No side effects

**Actions** (write operations):

- Input parameters
- Expected outcome
- Side effects
- Response format
- **Idempotency** considerations
- Transaction requirements
- Validation layers
- Error handling

**Deliverable**: Comprehensive Actions & Queries document in `docs/specs/stories/[story-id]/actions-queries.md`

#### Step 3: OpenAPI Specification

- Formalize all endpoints
- Define request/response schemas
- Document error responses
- Include examples for every endpoint
- Generate TypeScript types for frontend
- Generate API stubs for backend

**The magic of parallel development**:

1. OpenAPI spec finalized and agreed upon
2. Frontend generates TypeScript types and **mock server** (Prism/MSW)
3. Backend generates API stubs and validation
4. Both teams work simultaneously against the contract
5. Integration happens smoothly because contracts were agreed upfront

**Deliverable**: OpenAPI spec file (`docs/specs/stories/[story-id]/api.yml`) that both teams sign off on

---

### 7. Phase 4: Implementation & Testing

**Goal**: Build, test, and ship

#### Definition of Ready (Phase Gates)

Before implementation begins, verify:

**Pre-Development**:

- ✅ Story card documented with clear acceptance criteria
- ✅ Actors identified
- ✅ Job story format complete
- ✅ Priority assigned and agreed upon

**Phase 1 Complete**:

- ✅ UI mockups created for all screens and states
- ✅ ERD created
- ✅ ALL access patterns documented comprehensively

**Phase 2 Complete**:

- ✅ Sequence diagrams created
- ✅ Actions and Queries separated per CQS
- ✅ DynamoDB data model designed
- ✅ API specification (OpenAPI) finalized

**Phase 3 Complete**:

- ✅ Feedback collected from end users
- ✅ Feedback collected from client developers
- ✅ Final sign-off from PO, Frontend UI, Frontend BFF, Backend, QA

**Team Readiness**:

- ✅ Team has capacity
- ✅ Dependencies identified and resolved
- ✅ No blockers

#### Frontend (SvelteKit)

- Implement UI components (`.svelte` files)
- Implement BFF (Backend-for-Frontend) API routes (`+server.ts`)
- Call backend microservices
- Handle errors gracefully
- Client-side validation

#### Backend (Serverless Microservices)

- Implement Lambda handlers
- Implement data access layer (transform DynamoDB items at boundary)
- Separation of concerns (don't leak DynamoDB structure into business logic)
- Write unit tests
- Integration tests with DynamoDB Local

#### Infrastructure as Code

- AWS CDK for infrastructure
- Environment-specific configurations
- DynamoDB tables, Lambda functions, API Gateway

#### QA & Testing

- Unit tests (80%+ coverage target)
- Integration tests
- E2E tests (Playwright)
- Manual QA testing
- Performance testing (if needed)
- Security testing
- Demo to Product Owner

#### Definition of Done

**Code Quality**:

- ✅ Code complete for all components
- ✅ Code reviewed and approved
- ✅ All automated checks pass (linting, type checking, tests, coverage)
- ✅ No critical or high-severity bugs

**Testing**:

- ✅ Unit tests written and passing
- ✅ Integration tests written and passing
- ✅ E2E tests written and passing
- ✅ Manual QA testing complete
- ✅ All acceptance criteria verified

**Documentation**:

- ✅ Technical documentation updated
- ✅ API documentation updated (OpenAPI spec)
- ✅ Code comments added where necessary
- ✅ README files updated

**Deployment**:

- ✅ Deployed to staging and tested
- ✅ Deployed to production
- ✅ Monitoring/alerting configured
- ✅ Rollback plan documented

**Acceptance**:

- ✅ Demoed to Product Owner
- ✅ Product Owner acceptance obtained
- ✅ No outstanding critical feedback

**Compliance**:

- ✅ Security review complete (if required)
- ✅ Performance requirements met
- ✅ Accessibility standards met (WCAG 2.1 Level AA)
- ✅ Privacy/data protection requirements met

**Deliverable**: Fully tested, production-ready feature

---

### 8. Why This Works (For Traditional Apps)

**Goal**: Reinforce the value proposition

**Key benefits**:

1. **Parallel development**: Frontend and backend work simultaneously after Phase 3 (enabled by OpenAPI contracts and mock servers)
2. **Fewer surprises**: Design decisions made upfront, not mid-implementation
3. **Clear acceptance criteria**: Everyone knows what "done" looks like (Definition of Ready/Done)
4. **Scalable data model**: DynamoDB design handles growth (access pattern-driven design)
5. **Team autonomy**: Clear contracts enable independent work
6. **Quality gates**: Each phase has exit criteria
7. **Customer-centric**: Job stories and SEED(S) methodology keep focus on user needs

**Real-world impact**:

- Reduced integration bugs (contract-first approach)
- Faster delivery (parallel development)
- Happier teams (clear responsibilities, less blocking)
- More predictable timelines (comprehensive upfront design)
- Better data models (access patterns defined before implementation)

**The integration advantage**: This isn't just one methodology—it's a carefully integrated system combining:

- SEED(S) customer-centric service design
- Jobs to Be Done theory
- Command Query Separation (CQS)
- Contract-first API design (from _Microservices: Up and Running_)
- Access pattern-driven data modeling (from _The DynamoDB Book_)
- Design-driven development
- Agile/Scrum practices

---

### 9. The Limitations (Teaser for Article 2)

**Goal**: Transition to the next article

This methodology works beautifully for **deterministic, predictable systems**. But Agentic AI systems are:

- **Non-deterministic**: Same input, different outputs
- **Emergent**: Behavior emerges from agent interactions
- **Experimental**: You don't know what works until you try it
- **Conversational**: Natural language, not structured APIs

**The problem**:

- You can't design a complete OpenAPI spec for an AI agent's behavior
- You can't define all access patterns upfront when the agent is learning and adapting
- You can't create comprehensive mockups when the UI is conversational
- You can't separate Actions and Queries cleanly when prompts do both

**The realization**: I needed a different approach.

**Transition**: "In Article 2, I'll explain exactly why this methodology breaks for Agentic AI systems, and what I learned from trying to force-fit it."

---

### 10. Acknowledgments & Further Reading

**Standing on the shoulders of giants**:

This methodology wouldn't exist without the foundational work of others. Two books in particular shaped the design phases:

- **_Microservices: Up and Running_** by Ronnie Mitra and Irakli Nadareishvili — For service design, API contracts, and the principles of building distributed systems
- **_The DynamoDB Book_** by Alex DeBrie — For access pattern-driven data modeling and NoSQL design principles

I'm deeply grateful to these authors for their contributions to the craft of software development. Their work has been instrumental in my pursuit of excellence in building scalable systems.

**For those who want depth**:

- [Full methodology documentation](https://github.com/[username]/smw-docs) _(placeholder for public repo)_
- _The DynamoDB Book_ by Alex DeBrie (essential for NoSQL data modeling)
- _Microservices: Up and Running_ by Ronnie Mitra and Irakli Nadareishvili
- AWS Well-Architected Framework
- _Domain-Driven Design_ by Eric Evans
- Clayton Christensen's work on Jobs to Be Done theory

---

## Tone & Style

- **Conversational but authoritative**: "Here's what I learned from years of building apps"
- **Practical, not academic**: Real examples, real pain points
- **Honest about limitations**: "This works great for X, but not for Y"
- **Generous with attribution**: Credit the sources that shaped the methodology
- **Visual**: Diagrams, code snippets, examples
- **Scannable**: Headers, bullet points, callouts

---

## Key Takeaways (Summary Box)

> **TL;DR**:
>
> - Traditional web apps benefit from structured, 4-phase methodology
> - Integrates SEED(S), Jobs to Be Done, CQS, contract-first APIs, and access pattern-driven data modeling
> - Design before coding prevents expensive mistakes
> - OpenAPI contracts + mock servers enable parallel frontend/backend development
> - DynamoDB requires upfront access pattern design (Faux-SQL for MVPs, Single-Table for scale)
> - Job stories (not user stories) focus on circumstances and context
> - Story bundling balances discovery granularity with implementation efficiency
> - Definition of Ready/Done provides clear quality gates
> - This methodology still works for full-stack web apps (with AI assisting)
> - But it breaks for Agentic AI systems (see Article 2)
> - Built on foundations from _Microservices: Up and Running_ and _The DynamoDB Book_

---

## SEO & Metadata

**Title**: The Web Dev Methodology That Still Works (For Traditional Apps)  
**Meta Description**: A 4-phase development methodology for building scalable full-stack web apps with SvelteKit, serverless microservices, and DynamoDB. Integrates SEED(S), Jobs to Be Done, and contract-first APIs. Learn why it works—and when it doesn't.  
**Keywords**: web development methodology, full-stack development, DynamoDB data modeling, API design, serverless architecture, SvelteKit, contract-first development, Jobs to Be Done, SEED methodology, microservices, OpenAPI  
**Canonical URL**: https://nickthiru.dev/posts/traditional-web-dev-methodology

---

## Internal Links

- Link to Article 2: Why Traditional Development Methodology Breaks for Agentic AI Systems
- Link to Article 3: A Lean Methodology for Agentic AI Development
- Link to full methodology docs (once public repo is ready)

---

## Notes for Writing

- Include real code snippets (OpenAPI example, DynamoDB entity example, Job story examples)
- Add diagrams (4-phase overview, sequence diagram example, ERD example, story map hierarchy)
- Use callout boxes for key insights (especially the Alex DeBrie quote)
- Include "Common Pitfalls" sections in each phase
- Add visual comparison of Faux-SQL vs Single-Table approaches
- Show example of story bundling with real story map
- Include Definition of Ready/Done checklists in visual format
- End with clear CTA: "Read Article 2 to learn why this breaks for AI"
