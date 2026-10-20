import { randomBytes } from 'node:crypto';

// 24-char hex id in the same format as a MongoDB ObjectId,
// so the API contract stays stable once a real database is connected.
export function generateId(): string {
  return randomBytes(12).toString('hex');
}
