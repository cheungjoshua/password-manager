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
  - `testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.ts']`
  - `transform: { '^.+\\.ts$': 'ts-jest' }`
  - `moduleFileExtensions: ['js', 'ts', 'json']`
  - `coverageDirectory: 'coverage'`
  - `coverageReporters: ['text', 'lcov', 'html']`
- [x] Create `server/tests/setup.js` for global test setup
- [x] Create `server/tests/` directory structure:
  ```
  tests/
  ├── api/
  │   ├── auth.test.js
  │   ├── password.test.js
  │   └── index.js
  ├── models/
  │   └── user.test.js
  ├── middleware/
  │   ├── auth.test.js
  │   └── validation.test.js
  └── utils/
      ├── crypto.test.js
      └── helpers.test.js
  ```

### Verification
- [x] Run `npm test` and verify Jest runs without errors
- [x] Confirm TypeScript compilation with Jest works
- [x] Verify test timeout is set to 10000ms

---

## Phase 2: Authentication Flow Tests
**Priority: HIGH | Week 1**

### Test File: `tests/api/auth.test.js`
- [ ] **POST /api/auth/login** - Valid credentials returns JWT token (200)
- [ ] **POST /api/auth/login** - Invalid credentials returns 401 error
- [ ] **POST /api/auth/login** - Missing required fields validation
- [ ] **POST /api/auth/register** - Valid user data creates user and returns token (201)
- [ ] **POST /api/auth/register** - Duplicate username returns 409 error
- [ ] **POST /api/auth/register** - Weak password validation
- [ ] **JWT Middleware** - Valid token adds user to request context (200)
- [ ] **JWT Middleware** - Invalid token returns 401 error
- [ ] **JWT Middleware** - Missing token returns 401 error
- [ ] **Protected Routes** - Unauthenticated access returns 401
- [ ] **Mock user factory** - Create `tests/utils/testUsers.js` for test data

### Test Patterns to Document
- [ ] Add API test template to `tests/api/index.js`
- [ ] Document mock user factory pattern
- [ ] Add error handling assertions for all tests

---

## Phase 3: Password CRUD Operations Tests
**Priority: HIGH | Week 2**

### Test File: `tests/api/password.test.js`
- [ ] **POST /api/entries** - Create password entry with validation
- [ ] **POST /api/entries** - Missing required fields returns 400
- [ ] **POST /api/entries** - Data encryption before saving to DB
- [ ] **POST /api/entries** - Success response includes entry ID (201)
- [ ] **GET /api/entries/:id** - Retrieve entry with encryption (200)
- [ ] **GET /api/entries/:id** - Entry not found returns 404
- [ ] **PUT /api/entries/:id** - Partial update allowed
- [ ] **PUT /api/entries/:id** - Validation of changes
- [ ] **PUT /api/entries/:id** - Encryption before saving updated data
- [ ] **DELETE /api/entries/:id** - Delete entry with authorization check
- [ ] **DELETE /api/entries/:id** - Authorization: access own entry (200)
- [ ] **DELETE /api/entries/:id** - Authorization: access other's entry (403)

### Test Patterns to Document
- [ ] Document authorization testing approach
- [ ] Add soft delete vs hard delete considerations

---

## Phase 4: Supporting Component Tests
**Priority: MEDIUM | Week 3**

### Models: `tests/models/user.test.js`
- [ ] User schema validation (required fields, unique username)
- [ ] Password hashing verification
- [ ] Document/Query structure tests

### Middleware: `tests/middleware/auth.test.js`
- [ ] JWT auth middleware - extracts user from token
- [ ] JWT auth middleware - rejects invalid tokens
- [ ] JWT auth middleware - handles missing tokens
- [ ] Error handling middleware tests

### Middleware: `tests/middleware/validation.test.js`
- [ ] Joi validation tests for login payload
- [ ] Joi validation tests for registration payload
- [ ] Joi validation tests for password entry

### Utils: `tests/utils/crypto.test.js`
- [ ] Password encryption function tests
- [ ] Password decryption function tests
- [ ] Encryption key management tests
- [ ] Password hashing tests

### Utils: `tests/utils/helpers.test.js`
- [ ] Any helper utility function tests

---

## Phase 5: Test Maintenance & Quality
**Ongoing**

### Test Review
- [ ] Review all tests for proper isolation (no shared state)
- [ ] Ensure each test is independent (setup/teardown per test)
- [ ] Verify test names follow pattern: `METHOD /path should [action] [result]`
- [ ] Remove unused test cases

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
      "test:auth": "jest tests/api/auth.test.js",
      "test:api": "jest tests/api/*.test.js"
    }
  }
  ```

---

## Progress Tracking

| Phase | Status | Tests Written | Passing | Coverage |
|-------|--------|---------------|---------|----------|
| Phase 1: Setup | ✅ **COMPLETE** | - | - | - |
| Phase 2: Auth | - | - | - | - |
| Phase 3: CRUD | - | - | - | - |
| Phase 4: Utils | - | - | - | - |
| Phase 5: Quality | - | - | - | - |

---

## Quick Commands

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/api/auth.test.js

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
