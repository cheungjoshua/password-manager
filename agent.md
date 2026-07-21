# Testing Agent Specification for Password Manager

## Overview
This document defines the testing strategy for the Password Manager project. This approach focuses on API testing with Jest, starting with authentication endpoints before expanding to full CRUD operations.

---

## Project Structure

```
password-manager/
├── agent.md                     # This testing specification
├── docker-compose.yaml
├── README.md
├── client/                      # Vue 3 frontend (no tests yet)
│   └── ...
└── server/                      # Express + TypeScript backend
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── utils/
    ├── tests/                   # All tests live here (enterprise standard)
    │   ├── api/                 # API endpoint tests (priority)
    │   │   ├── auth.test.js     # Login, register, JWT tests
    │   │   ├── password.test.js # CRUD password operations
    │   │   └── index.js         # API test runner
    │   ├── models/              # Model/schema tests
    │   ├── middleware/          # Middleware tests
    │   └── utils/               # Utility function tests
    ├── package.json
    └── jest.config.js           # Jest configuration
```

---

## Technology Stack

### Testing Framework
- **Jest**: Primary testing framework
  - Built-in mocking capabilities
  - Great TypeScript support
  - Snapshot testing available
  - Fast test execution

### HTTP Testing
- **Supertest**: Middleware for testing Express routes
  - Makes HTTP requests to your server
  - Validates responses
  - Works seamlessly with Jest

### Code Coverage
- **Jest Coverage**: Optional reporting
- **Target**: 70% (voluntary, no blocking)

### Test Data Management
- **Hardcoded test values**: No environment variables needed
- **No real database**: All mocks

---

## Test Organization

### Directory Structure
```
tests/
├── api/                    # API endpoint tests (highest priority)
│   ├── auth.test.js       # Login, register, JWT validation
│   ├── password.test.js   # Create, read, update, delete
│   └── index.js           # API test runner configuration
├── models/
│   └── user.test.js       # User schema validation
├── middleware/
│   ├── auth.test.js       # JWT authentication middleware
│   └── validation.test.js # Joi validation tests
└── utils/
    ├── crypto.test.js     # Password encryption/decryption
    └── helpers.test.js    # Utility functions
```

---

## Test Configuration

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/server/tests'],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.test.ts',
  ],
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
  testTimeout: 10000,
};
```

### Test Setup File
```javascript
// tests/setup.js
const mongoose = require('mongoose');

beforeAll(async () => {
  // Mock database connection
  // Use in-memory or mock MongoDB
});

afterAll(async () => {
  // Clean up mock database
  await mongoose.disconnect();
});
```

---

## Test Strategy

### Phase 1: Authentication Flow (Week 1)
**Priority: HIGH**

1. **Login Endpoint** (`POST /api/auth/login`)
   - Valid credentials → JWT token
   - Invalid credentials → 401 error
   - Rate limiting validation

2. **Register Endpoint** (`POST /api/auth/register`)
   - Valid user data → User created + token
   - Duplicate username → 409 error
   - Password strength validation

3. **JWT Middleware**
   - Valid token → User context added to request
   - Invalid/missing token → 401 error
   - Token expiration handling

4. **Protected Routes**
   - Route protection via middleware
   - Error handling for unauthenticated access

### Phase 2: Password CRUD Operations (Week 2)
**Priority: HIGH**

1. **Create Password Entry** (`POST /api/entries`)
   - Validation of required fields
   - Encryption before saving
   - Success response with ID

2. **Retrieve Password Entry** (`GET /api/entries/:id`)
   - Authorization check
   - Return encrypted data
   - Handle not found (404)

3. **Update Password Entry** (`PUT /api/entries/:id`)
   - Partial updates allowed
   - Validation of changes
   - Encryption before saving

4. **Delete Password Entry** (`DELETE /api/entries/:id`)
   - Authorization check
   - Soft delete vs hard delete

### Phase 3: Supporting Tests (Week 3)
**Priority: MEDIUM**

1. **Database Models**
   - User schema validation
   - PasswordEntry schema validation
   - Indexes and relationships

2. **Middleware**
   - Authentication middleware
   - Validation middleware
   - Error handling middleware

3. **Utility Functions**
   - Password encryption/decryption
   - Hashing helpers
   - Validation helpers

---

## Test Patterns

### API Test Template
```javascript
const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/auth/login', () => {
  it('should return JWT token for valid credentials', async () => {
    const userData = {
      username: 'testuser',
      password: 'password123'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(userData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  it('should return 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'wronguser',
        password: 'wrongpassword'
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toContain('Invalid credentials');
  });
});
```

### Mock User Factory
```javascript
const testUsers = {
  valid: {
    username: 'testuser',
    password: 'securePassword123!'
  },
  invalid: {
    username: 'invaliduser',
    password: 'wrongpassword'
  }
};

// Export for use in tests
module.exports = testUsers;
```

---

## Test Execution

### Running Tests Locally
```bash
# Run all tests
npm test

# Run tests with coverage (no blocking)
npm test -- --coverage

# Run specific test file
npm test -- tests/api/auth.test.js

# Run tests for specific pattern
npm test -- --testPathPattern="auth"
```

### Package.json Scripts
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

## Mocking Strategy

### Database Mocking
```javascript
// Use Jest's native mock for Mongoose
const mongoose = require('mongoose');
jest.mock('mongoose');

const MockModel = jest.requireMock('mongoose').default;

describe('User Model', () => {
  it('should create user successfully', async () => {
    const mockUser = { username: 'testuser' };
    
    MockModel.create.mockResolvedValue(mockUser);

    const User = require('../../src/models/User');
    const user = await User.create({ username: 'testuser' });

    expect(mockUser).toEqual(user);
  });
});
```

### Controller Mocking
```javascript
// Controllers test with mocked dependencies
jest.mock('../../src/middleware/auth');
jest.mock('../../src/models/User');

describe('Login Controller', () => {
  it('should login successfully', async () => {
    const mockUser = { id: '123', username: 'testuser' };
    jest.requireMock('../../src/models/User').findOne.mockResolvedValue(mockUser);

    const login = require('../../src/controllers/auth.controller');

    const result = await login.post({ username: 'testuser', password: 'pass' });

    expect(result).toHaveProperty('token');
  });
});
```

---

## Quality Guidelines

### Test Naming
- ✅ `POST /api/login should return 200 with valid credentials`
- ❌ `login test`
- ❌ `test login`

### Test Independence
- Each test must be independent
- No shared state between tests
- Set up and tear down in each test

### Test Readability
- Use `expect()` assertions clearly
- Include error cases (invalid data, 404, 500)
- Comment complex test scenarios

### Anti-Patterns to Avoid
```javascript
// ❌ BAD: Test that modifies shared state
beforeAll(async () => {
  // Creates one user that all tests see
  await createUser();
});

// ✅ GOOD: Each test creates its own data
it('creates user', async () => {
  const user = await createUser();
  // Test user...
});

it('retrieves user', async () => {
  const user = await createUser();
  // Test user...
});
```

---

## Migration Path (Future)

### From Option A to Option B
If you decide to add CI/CD later:

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Coverage Thresholds (When Added)
```javascript
// Add to jest.config.js
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70
  }
}
```

---

## Checklist for Implementation

### Setup Phase
- [ ] Install Jest and Supertest in `server/package.json`
- [ ] Create `jest.config.js`
- [ ] Create `tests/` directory structure
- [ ] Create test setup file (`tests/setup.js`)

### First Tests (Authentication)
- [ ] Write login endpoint test
- [ ] Write register endpoint test
- [ ] Write JWT middleware test
- [ ] Write protected route test

### Second Tests (Password CRUD)
- [ ] Write create password entry test
- [ ] Write retrieve password entry test
- [ ] Write update password entry test
- [ ] Write delete password entry test

### Supporting Tests
- [ ] Write database model tests
- [ ] Write middleware tests
- [ ] Write utility function tests

### Maintenance
- [ ] Review test coverage weekly
- [ ] Refactor tests as code evolves
- [ ] Add new tests for new features
- [ ] Remove tests for deprecated code

---

## Notes & Assumptions

1. **No real database needed**: All tests use mocks
2. **No environment variables**: Test data hardcoded in tests
3. **Fast iterations**: Tests run in seconds, not minutes
4. **Voluntary coverage**: 70% target, no blocking initially
5. **Local-only**: No CI/CD pipeline in Phase 1
6. **API-first**: Focus on server endpoints before frontend

---

## Questions & Feedback

As we implement tests, please track:
1. Which tests are failing?
2. Which tests are slow?
3. Which areas need more coverage?
4. What additional features should we test?

This document will be updated as the project evolves.
