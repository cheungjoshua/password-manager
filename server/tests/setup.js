// Global test setup
const mongoose = require('mongoose');

// Mock database connection for tests
beforeAll(async () => {
  console.log('Test setup: Initializing mock database...');
});

afterAll(async () => {
  console.log('Test teardown: Disconnecting mock database...');
  await mongoose.disconnect();
});
