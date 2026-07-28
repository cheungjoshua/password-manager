// API Test Runner
import request from 'supertest';
import { app as mockApp } from '../server';
import mongoose from 'mongoose';

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

/**
 * Mock user for authorization tests
 * Simulates authenticated request by setting req.user
 */
export const mockAuthenticatedRequest = (req: any, userId = 'user-1') => {
  return {
    ...req,
    user: { 
      _id: userId,
      email: `user${userId}@example.com`,
      username: `user${userId}`
    }
  };
};

/**
 * Mock unauthorized request (no authentication)
 */
export const mockUnauthenticatedRequest = (req: any) => {
  return {
    ...req,
    user: null
  };
};

/**
 * Mock ObjectId generator
 */
export const mockObjectId = () => {
  return new mongoose.Types.ObjectId();
};

export { request, mockApp };

// Test patterns documentation
/**
 * AUTHORIZATION TESTING PATTERNS
 * 
 * Pattern 1: Mock authenticated user in request
 * ------------------------------------------
 * Always mock req.user when testing protected endpoints:
 * 
 *   const req: any = {
 *     body: { ... },
 *     user: { _id: 'user-1', email: 'test@example.com' }
 *   };
 * 
 * Pattern 2: Test unauthorized access attempts
 * -------------------------------------------
 * Test that unauthenticated requests are rejected:
 * 
 *   const res = await request(app)
 *     .get('/api/passwords')
 *     .send({}); // No auth header/cookies
 *   expect(res.status).toBe(401);
 * 
 * Pattern 3: Authorization checks in controller
 * --------------------------------------------
 * Each endpoint must verify user ownership:
 * 
 *   const userID = req.user._id;
 *   const collection = await Password.findOne({ 
 *     user_id: userID 
 *   });
 * 
 * Pattern 4: Cross-user access prevention
 * ---------------------------------------
 * Test that users cannot access other users' data:
 * 
 *   const req: any = {
 *     body: { app_name: 'Test' },
 *     user: { _id: 'user-1' } // Logged in as user-1
 *   };
 *   // Create entry for user-1
 *   // Then try to access as user-2
 *   const req2: any = { user: { _id: 'user-2' } };
 *   expect(getPasswords(req2, res)).rejects.toThrow();
 */

/**
 * DELETE STRATEGY CONSIDERATIONS
 * 
 * Hard Delete (Current Implementation):
 * -------------------------------------
 * - Uses $pull to remove collection from array
 * - Pros: Simple, clean data
 * - Cons: Cannot undo, no audit trail
 * - Test pattern:
 *   
 *   it('should permanently delete password entry', async () => {
 *     (Password.findOne as jest.Mock).mockResolvedValue({ user_id: 'user-1' });
 *     (Password.updateOne as jest.Mock).mockResolvedValue({ ok: 1 });
 *     
 *     const req: any = {
 *       params: { id: 'collection-1' },
 *       user: { _id: 'user-1' }
 *     };
 *     
 *     await deletePassword(req, res);
 *     expect(Password.updateOne).toHaveBeenCalled();
 *   });
 * 
 * Soft Delete (Future Consideration):
 * -----------------------------------
 * - Adds deletedAt timestamp instead of removing
 * - Pros: Can restore, audit trail
 * - Cons: More complex queries, bloats database
 * - Implementation:
 *   
 *   if (!isPasswordCollectionExist) {
 *     return res.status(404).json({ error: 'Not Found' });
 *   }
 *   
 *   await Password.updateOne(
 *     { _id: passwordId },
 *     { 
 *       $set: { 
 *         deletedAt: new Date(),
 *         deletedBy: req.user._id
 *       } 
 *     }
 *   );
 * 
 * Soft delete test pattern:
 * 
 *   it('should soft delete and return 404 for subsequent GET', async () => {
 *     (Password.findOne as jest.Mock).mockResolvedValue({ deletedAt: new Date() });
 *     const req: any = { user: { _id: 'user-1' } };
 *     
 *     await getPasswords(req, res);
 *     expect(res.status).toBe(404);
 *   });
 * 
 * Pattern 5: 404 Not Found Handling
 * ---------------------------------
 * Different HTTP status codes for different scenarios:
 * 
 * - 404 for resource not found (GET/PUT/DELETE by id)
 * - 400 for validation errors or collection structure errors
 * - 403 for authorization denied (accessing other user's data)
 * 
 * Test pattern:
 * 
 *   it('should return 404 for deleted entry', async () => {
 *     (Password.findOne as jest.Mock).mockResolvedValue(null);
 *     
 *     const req: any = {
 *       params: { id: 'collection-1' },
 *       user: { _id: 'user-1' }
 *     };
 *     
 *     await deletePassword(req, res);
 *     expect(res.status).toBe(404);
 *   });
 * 
 * Pattern 6: Collection-level vs Entry-level authorization
 * --------------------------------------------------------
 * Current implementation checks both:
 * 1. User owns the collection (user_id match)
 * 2. Collection exists with specific entry (_id match)
 * 
 * Test pattern:
 * 
 *   it('should reject access to other user\'s collection', async () => {
 *     (Password.findOne as jest.Mock).mockResolvedValue({ 
 *       user_id: 'user-2', // Different user
 *       collections: [{ _id: 'collection-1' }] 
 *     });
 *     
 *     const req: any = {
 *       params: { id: 'collection-1' },
 *       user: { _id: 'user-1' } // Trying to access as different user
 *     };
 *     
 *     await deletePassword(req, res);
 *     expect(res.status).toBe(403);
 *   });
 *} */