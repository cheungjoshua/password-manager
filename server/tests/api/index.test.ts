// API Test Runner test - just verify exports work
import { request } from './index';
import { app } from '../server';
import { testUsers } from './index';

describe('API Test Runner', () => {
  it('should export request', () => {
    expect(request).toBeDefined();
  });

  it('should export mock app', () => {
    expect(app).toBeDefined();
  });

  it('should export testUsers', () => {
    expect(testUsers).toBeDefined();
    expect(testUsers.valid).toBeDefined();
  });
});
