# 🧱 Clean Architecture — Elysia + Bun + Prisma

This project follows the principles of **Clean Architecture** and **Domain-Driven Design (DDD)**  
using **Elysia** (as the web framework), **Prisma** (as ORM), and **Bun** (as the runtime).

Inspired by the article:  
[Revolutionizing Software Development: Unveiling the Power of Clean Architecture with TypeScript](https://medium.com/@deivisonisidoro_94304/revolutionizing-software-development-unveiling-the-power-of-clean-architecture-with-typescript-5ee968357d35)

---

## ✅ Project Structure

```plaintext
src/
├── application/
│   ├── providers/
│   │   └── IPasswordHasher.ts
│   ├── repositories/
│   │   └── IUsersRepository.ts
│   └── useCases/
│       ├── post/
│       │   └── CreatePostUseCase.ts
│       └── user/
│           ├── CreateUserUseCase.ts
│           └── UpdateUserUseCase.ts
│
├── domain/
│   ├── post/
│   │   ├── dtos/
│   │   │   ├── ICreatePostDTO.ts
│   │   │   ├── IUpdatePostDTO.ts
│   │   │   ├── ISinglePostDTO.ts
│   │   │   └── IUserPostDTO.ts
│   │   ├── entities/
│   │   │   └── Post.ts
│   │   └── enums/
│   │       └── PostErrorTypes.ts
│   │
│   ├── user/
│   │   ├── dtos/
│   │   │   ├── ICreateUserDTO.ts
│   │   │   ├── IUpdateUserRequestDTO.ts
│   │   │   └── IUserOutputRequestDTO.ts
│   │   ├── entities/
│   │   │   └── User.ts
│   │   ├── enums/
│   │   │   ├── EmailErrorTypes.ts
│   │   │   └── PasswordErrorTypes.ts
│   │   └── valueObjects/
│   │       └── Password.ts
│   │
│   └── security/
│       ├── ITokenProvider.ts
│       └── valueObjects/
│           └── Credentials.ts
│
├── infrastructure/
│   ├── post/
│   │   ├── database/
│   │   ├── providers/
│   │   ├── repositories/
│   │   │   └── PrismaPostRepository.ts
│   │   └── services/
│   │       └── CreatePostComposer.ts
│   │
│   ├── user/
│   │   ├── database/
│   │   ├── providers/
│   │   │   ├── HashProvider.ts
│   │   │   └── TokenProvider.ts
│   │   ├── repositories/
│   │   │   ├── PrismaUserRepository.ts
│   │   │   └── UpdateUserComposer.ts
│   │   └── services/
│   │       └── ValidateToken.ts
│   │
│   └── utils/
│       └── common utilities
│
├── presentation/
│   ├── adapters/
│   │   └── ElysiaAdapters.ts
│   ├── dtos/
│   │   ├── PaginationRequestDTO.ts
│   │   └── PaginationResponseDTO.ts
│   ├── elysia/
│   │   ├── post/
│   │   │   └── index.ts
│   │   ├── user/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── http/
│   │   ├── controllers/
│   │   │   ├── CreateUserController.ts
│   │   │   └── CreatePostController.ts
│   │   ├── interfaces/
│   │   │   └── IController.ts
│   │   └── middleware/
│   │       └── authMiddleware.ts
│   └── adapters/
│       └── ElysiaAdapters.ts
│
└── index.ts
````

---

## 🧩 Domain Layer

**Goal:** Define business logic, entities, and core rules — completely independent of frameworks.

✅ Completed:

* [x] `User` and `Post` entities created
* [x] DTOs defined for creation, update, and listing
* [x] Enums for domain-specific errors
* [x] `Password` and `Credentials` value objects
* [x] Domain structured by feature (`post`, `user`, `security`)

🧩 To Improve:

* [ ] Add domain validation rules (e.g., password policy, email format)
* [ ] Add business rules for Post creation (length, title constraints)
* [ ] Add domain-level error classes

---

## 🧠 Application Layer

**Goal:** Coordinate business logic and connect domain with the infrastructure.

✅ Completed:

* [x] Implemented `CreateUserUseCase` and `UpdateUserUseCase`
* [x] Added `CreatePostUseCase`
* [x] Defined abstract repositories (`IUsersRepository`)
* [x] Defined providers interfaces (`IPasswordHasher`)
* [x] Orchestrated use cases using composers

🧩 To Improve:

* [ ] Add missing Post use cases (`UpdatePost`, `ListUserPosts`, `GetSinglePost`)
* [ ] Add `IPostsRepository` interface (if not yet defined)

---

## 🏗️ Infrastructure Layer

**Goal:** Implement technical details like Prisma, Hashing, and Token management.

✅ Completed:

* [x] Created **Prisma** repositories for `User` and `Post`
* [x] Added providers:

  * [x] `HashProvider` (bcrypt)
  * [x] `TokenProvider` (JWT)
* [x] Added composers for use case orchestration

🧩 To Improve:

* [ ] Centralize Prisma client configuration (`infrastructure/database/prisma/`)
* [ ] Add repository tests with mocked Prisma
* [ ] Simplify `Composer` naming if used mainly for dependency wiring

---

## 🖥️ Presentation Layer

**Goal:** Expose the application to the outside world (HTTP via Elysia).

✅ Completed:

* [x] Created `CreateUserController` and `CreatePostController`
* [x] Added authentication middleware (`authMiddleware.ts`)
* [x] Added pagination DTOs
* [x] Integrated with Elysia routes (`elysia/user`, `elysia/post`)
* [x] Added adapter to decouple Elysia (`ElysiaAdapters.ts`)

🧩 To Improve:

* [ ] Connect all controllers in a single `elysia/index.ts`
* [ ] Add global error middleware
* [ ] Implement DTO → Response mappers for clarity
* [ ] Add centralized route registration in `presentation/http`

---

## 🚀 Future Improvements

### 🧑‍💻 Developer Experience

* [ ] Add **ESLint + Prettier** config for Bun
* [ ] Configure **Vitest** or **Bun test** for:

  * Use cases
  * Repositories
  * E2E routes
* [ ] Add `.env` configuration handling (`env.ts`)

### 🧪 Infrastructure

* [ ] Dockerize Bun + Prisma app
* [ ] Add **CI/CD pipeline** (GitHub Actions)
* [ ] Add request logging (Elysia plugin or Bun.logger)

---

## 🌱 Progress Overview

| Layer          | Progress | Notes                                                 |
| -------------- | -------- | ----------------------------------------------------- |
| Domain         | 🟩 75%   | Entities, DTOs, and core rules defined                |
| Application    | 🟩 70%   | Core use cases ready, Post logic missing              |
| Infrastructure | 🟩 80%   | Prisma and providers implemented                      |
| Presentation   | 🟩 70%   | Controllers and middleware working, routing to refine |

---

## 🏁 Next Steps

1. Add remaining Post use cases (`Update`, `List`, `GetOne`)
2. Finalize route registration in Elysia
3. Add domain validation and error classes
4. Add tests for core use cases
5. Implement global error middleware and request logging