
# 🧱 Clean Architecture — Elysia + Bun + Prisma

This project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles  
using **Elysia** (web framework), **Prisma** (ORM), and **Bun** (runtime).

Inspired by: [Revolutionizing Software Development: Clean Architecture with TypeScript](https://medium.com/@deivisonisidoro_94304/revolutionizing-software-development-unveiling-the-power-of-clean-architecture-with-typescript-5ee968357d35)

---

## 🧩 Layers Overview

### Domain Layer
- Defines **core business logic**, entities, DTOs, and domain errors.
- Completed:
  - `User` and `Post` entities
  - DTOs for creation, update, listing
  - Value objects: `Password`, `Credentials`
- To improve:
  - Domain validation (password, email)
  - Post business rules
  - Domain-level error classes

### Application Layer
- Coordinates domain logic and infrastructure.
- Completed:
  - `CreateUserUseCase`, `UpdateUserUseCase`
  - Abstract repositories & providers
- To improve:
  - Additional Post use cases
  - Repository interfaces

### Infrastructure Layer
- Implements **Prisma**, hashing, tokens, composers.
- Completed:
  - Repositories for User & Post
  - `HashProvider`, `TokenProvider`
- To improve:
  - Centralize Prisma config
  - Add repository tests

### Presentation Layer
- Exposes HTTP API via Elysia.
- Completed:
  - Controllers & routes for User/Post
  - Authentication middleware
  - Pagination DTOs
  - Elysia adapters
- To improve:
  - Global error middleware
  - DTO → Response mapping
  - Centralized route registration

---

## 🚀 Next Steps
1. Finalize Elysia route registration
2. Add domain validations and error classes
3. Implement tests for core use cases
4. Add global error handling and request logging
```