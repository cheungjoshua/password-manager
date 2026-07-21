// API Test Runner
const request = require('supertest');
const app = require('../../src/index');

// Mock user factory for tests
const testUsers = {
  valid: {
    username: 'testuser',
    password: 'SecurePassword123!'
  },
  invalid: {
    username: 'invaliduser',
    password: 'wrongpassword'
  },
  weak: {
    username: 'weakuser',
    password: '12345'
  }
};

module.exports = {
  request,
  app,
  testUsers
};
