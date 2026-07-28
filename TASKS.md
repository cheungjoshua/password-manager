# Backend Testing Tasks - Password Manager

## Overview

This file tracks all **backend testing** tasks for the Password Manager project.
Following the testing strategy in [agent.md](./agent.md), we focus on:

- API testing with Jest + Supertest
- Mock-based approach (no real database)
- Authentication tests first, then CRUD operations
- Target: 70% code coverage (voluntary, no blocking)

---

## Phase 1: Test Infrastructure Setup

**Goal:** Get testing framework ready with proper configuration

### Setup Tasks

- [x] Install Jest and Supertest in `server/package.json`
  ```bash
  npm install --save-dev jest supertest ts-jest @types/jest @types/supertest
  ```
- [x] Install TypeScript dependencies for Jest
  ```bash
  npm install --save-dev @types/node @types/express
  ```
- [x] Create `server/jest.config.js` with:
  - `testEnvironment: 'node'`
  - `roots: ['<rootDir>/tests']`
  - `testMatch: ['**/tests/**/*.test.ts']`
  - `transform: { '^.+\\.ts$': 'ts-jest' }`
  - `moduleFileExtensions: ['js', 'ts', 'json']`
  - `coverageDirectory: 'coverage'`
  - `coverageReporters: ['text', 'lcov', 'html']`
- [x] Create `server/tests/setup.js` for global test setup
- [x] Create `server/tests/` directory structure:
  ```
  tests/
  ├── api/
  │   ├── auth.test.ts
  │   ├── password.test.ts
  │   └── index.js
  ├── models/
  │   └── user.test.ts
  ├── middleware/
  │   ├── auth.test.ts
  │   └── validation.test.ts
  └── utils/
      ├── crypto.test.ts
      └── helpers.test.ts
  ```

### Verification

- [x] Run `npm test` and verify Jest runs without errors
- [x] Confirm TypeScript compilation with Jest works
- [x] Verify test timeout is set to 10000ms

---

## Phase 2: Authentication Flow Tests

**Priority: HIGH | Week 1**

### Test File: `tests/api/auth.test.ts`

- [x] **POST /users/login/** - Invalid credentials returns 401 error
- [x] **POST /users/login/** - Missing required fields validation
- [x] **POST /users/login/** - Invalid email format validation
- [x] **POST /users/login/** - Password less than 6 chars validation
- [x] **POST /users/signup** - Valid user data creates user successfully
- [x] **POST /users/signup** - Duplicate email handling (mock not implemented)
- [x] **POST /users/signup** - Missing required fields validation
- [x] **POST /users/signup** - Invalid email format validation
- [x] **POST /users/signup** - Weak password validation
- [x] **POST /users/signup** - Weak username validation

### Test Patterns to Document

- [x] Add API test template to `tests/api/index.ts`
- [x] Document mock user factory pattern
- [x] Add error handling assertions for all tests

---

## Phase 3: Password CRUD Operations Tests

**Priority: HIGH | Week 2**

### Test File: `tests/api/password.test.ts`

- [x] **POST /api/entries** - Create password entry with validation
- [x] **POST /api/entries** - Missing required fields returns 400
- [x] **POST /api/entries** - Data encryption before saving to DB
- [x] **POST /api/entries** - Success response includes entry ID (200)
- [x] **GET /api/entries** - Retrieve entry with encryption (200)
- [x] **GET /api/entries** - Returns message when no list found (200)
- [x] **PUT /api/entries/:id** - Partial update allowed
- [x] **PUT /api/entries/:id** - Encryption before saving updated data
- [x] **DELETE /api/entries/:id** - Delete entry with authorization check
- [x] **DELETE /api/entries/:id** - Collection does not exist returns 400
- [x] **DELETE /api/entries/:id** - Authorization: access other's entry returns 400

### Test Patterns to Document

- [x] Document authorization testing approach
- [x] Add soft delete vs hard delete considerations
- [x] Add 404 handling test for not found entries
- [x] Add mock authorization helper functions

**Implementation Notes:**

- Authorization helper added to `tests/api/index.ts` with `mockAuthenticatedRequest` and `mockUnauthenticatedRequest`
- Soft delete vs hard delete documented with test patterns
- 404 handling pattern documented with different HTTP status codes for different scenarios

---

## Phase 4: Supporting Component Tests

**Priority: MEDIUM | Week 3**

### Models: `tests/models/user.test.ts`

- [x] User schema validation (required fields and field-level validation)
- [x] Password hashing verification
- [x] Document/Query structure tests

### Middleware: `tests/middleware/auth.test.ts`

- [x] JWT auth middleware - extracts user from token
- [x] JWT auth middleware - rejects invalid tokens
- [x] JWT auth middleware - handles missing tokens
- [x] Error handling middleware tests

### Middleware: `tests/middleware/validation.test.ts`

- [x] Joi validation tests for login payload
- [x] Joi validation tests for registration payload
- [x] Joi validation tests for password entry

### Utils: `tests/utils/crypto.test.ts`

- [x] Password encryption function tests
- [x] Password decryption function tests
- [x] Encryption key management tests
- [x] Password hashing tests

### Utils: `tests/utils/helpers.test.ts`

- [x] Any helper utility function tests

---

## Phase 5: Test Maintenance & Quality

**Ongoing**

### Test Review

- [x] Review all tests for proper isolation (no shared state)
- [x] Ensure each test is independent (setup/teardown per test)
- [x] Verify test names follow pattern: `METHOD /path should [action] [result]`
- [x] Remove unused or overly synthetic test cases
- [x] Replace export-only and mock-only assertions with behavior-based tests
- [x] Document anti-pattern guidance in [agent.md](./agent.md) so future tests avoid the same issue
- [x] Add a required review checklist so future test additions must verify behavior, naming, and observable outcomes

### Coverage Optimization

- [ ] Run coverage: `npm test -- --coverage`
- [ ] Identify uncovered code paths
- [ ] Add tests to reach 70% coverage target
- [ ] Generate HTML coverage report

### Test Speed

- [ ] Verify test execution time < 5 seconds
- [ ] Optimize slow tests
- [ ] Review mock configurations

### CI/CD Preparation

- [ ] Add `package.json` scripts:
  ```json
  {
    "scripts": {
      "test": "jest",
      "test:coverage": "jest --coverage",
      "test:watch": "jest --watch",
      "test:auth": "jest tests/api/auth.test.ts",
      "test:api": "jest tests/api/*.test.ts"
    }
  }
  ```

---

## Progress Tracking

| Phase            | Status          | Tests Written | Passing | Coverage |
| ---------------- | --------------- | ------------- | ------- | -------- |
| Phase 1: Setup   | ✅ **COMPLETE** | -             | -       | -        |
| Phase 2: Auth    | ✅ **COMPLETE** | 11            | 11      | -        |
| Phase 3: CRUD    | ✅ **COMPLETE** | 9             | 9       | -        |
| Phase 4: Utils   | ✅ **COMPLETE** | 91            | 91      | -        |
| Phase 5: Quality | 📝 In Progress  | -             | -       | -        |

---

## Quick Commands

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/api/auth.test.ts

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage
```

---

## Notes

- **No real database needed**: All tests use mocks
- **No environment variables**: Test data hardcoded in tests
- **Fast iterations**: Tests should run in seconds
- **API-first approach**: Focus on server endpoints before frontend
- **Mock-based**: See [agent.md](./agent.md) for mocking strategy

## Completed Work

### Phase 2: Authentication Tests

- 11 tests written and passing for `POST /users/signup` and `POST /users/login/`
- Mock server created at `tests/server.ts` to avoid mongoose dependency
- Test runner created at `tests/api/index.ts` with mock user factory
- Jest configured with TypeScript support
- All tests use `.test.ts` extension for TypeScript files
