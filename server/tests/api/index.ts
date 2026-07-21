// API Test Runner
import request from 'supertest';
import { app as mockApp } from '../server';

// Re-export default for compatibility
export default mockApp;

// Mock user factory for tests
export const testUsers = {
  valid: {
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'SecurePassword123!'
  },
  invalid: {
    email: 'wrong@example.com',
    password: 'wrongpassword'
  },
  weak: {
    email: 'weak@example.com',
    username: 'weakuser',
    password: '12345'
  }
};

export { request, mockApp };