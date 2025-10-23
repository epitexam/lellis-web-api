# 🧱 Clean Architecture Progress — Elysia + Bun + Prisma

Following the article:  
[Revolutionizing Software Development: Unveiling the Power of Clean Architecture with TypeScript](https://medium.com/@deivisonisidoro_94304/revolutionizing-software-development-unveiling-the-power-of-clean-architecture-with-typescript-5ee968357d35)

---

## ✅ Current Structure Overview

src/
├── application/
│   ├── providers/
│   ├── repositories/
│   ├── useCases/
│
├── domain/
│   ├── post/
│   ├── user/
│
├── infrastructure/
│   ├── post/
│   ├── user/
│
├── presentation/
│   ├── adapters/
│   ├── dtos/
│   ├── http/
│   ├── post/
│   ├── user/

---

## ✅ Completed

### 🧩 Domain Layer
- [x] Defined **DTOs** for Post (`ICreatePostDTO`, `IUpdatePostDTO`, `ISinglePostDTO`, `IUserPostDTO`)
- [x] Created **Entities**, **Enums**, and **ValueObjects** (placeholders present)
- [x] Structured `user` and `post` domains separately

### 🧠 Application Layer
- [x] Created `useCases` for Post and User
  - [x] `CreateUserUseCase`
- [x] Defined base **repositories interfaces**
  - [x] `IUsersRepository`
- [x] Added **providers**
  - [x] `IPasswordHasher.ts`

### 🏗️ Infrastructure Layer
- [x] Structured `database`, `providers`, `repositories`, and `services`
- [x] Implemented Prisma repositories
  - [x] `PrismaUserRepository.ts`
- [x] Added token and password providers
  - [x] `TokenProvider.ts`
  - [x] `HashProviders.ts`
- [x] Added `CreateUserComposer.ts` and `validateToken.ts`

### 🖥️ Presentation Layer
- [x] Created HTTP controllers
  - [x] `CreateUserController.ts`
  - [x] `CreatePostController.ts`
- [x] Added **Elysia adapter** (`ElysiaAdapter.ts`)
- [x] Added DTOs for pagination
  - [x] `PaginationRequestDTO.ts`
  - [x] `PaginationResponseDTO.ts`
- [x] Middleware
  - [x] `authMiddleware.ts`

---

## 🚧 In Progress

### 🔄 Application Layer
- [ ] Add remaining **use cases** for `Post`
  - [ ] `UpdatePostUseCase`
  - [ ] `GetSinglePostUseCase`
  - [ ] `ListUserPostsUseCase`

### 🏗️ Infrastructure Layer
- [ ] Implement **PrismaPostRepository**
- [ ] Add **PostService** logic
- [ ] Finalize **Token validation** middleware integration with Elysia

### 🧱 Domain Layer
- [ ] Add domain rules (business logic) for:
  - [ ] Post creation validation (e.g., title/content constraints)
  - [ ] User role or permissions enum
- [ ] Define error handling (e.g., domain exceptions)

### 🧩 Presentation Layer
- [ ] Implement **routes registration** in `index.ts`
- [ ] Connect Elysia routes → controllers → use cases
- [ ] Add **response mappers** for DTOs
- [ ] Add error middleware (global error handler)

---

## 🧰 Future Enhancements

### 🧑‍💻 Developer Experience
- [ ] Add ESLint + Prettier configuration for Bun
- [ ] Setup testing (e.g., **Vitest** or **Bun test**) for:
  - [ ] Use cases
  - [ ] Repositories (mock Prisma)
  - [ ] E2E routes

### 🧪 Infrastructure
- [ ] Dockerize Bun + Prisma app
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add environment config management (`env.ts`)

---

## 🌱 Summary

| Layer | Progress | Notes |
|-------|-----------|-------|
| Domain | 🟩 70% | Structure ready, needs business logic |
| Application | 🟩 60% | Core use cases missing for Post |
| Infrastructure | 🟩 75% | Prisma and providers implemented |
| Presentation | 🟩 65% | Controllers and middleware working, needs route wiring |

---

### 🏁 Next Steps
1. Implement **Post use cases** (`Create`, `Update`, `List`, `GetOne`)
2. Finalize **PrismaPostRepository**
3. Connect everything through **Elysia routes**
4. Add **unit tests** for each use case
5. Implement **global error middleware**

---

🧠 *"The architecture is clean when dependencies always point inward."*  
— Robert C. Martin
