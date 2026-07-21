// Server test - just verify exports work
import { app } from './server';

describe('Mock Server', () => {
  it('should export app', () => {
    expect(app).toBeDefined();
  });
});
