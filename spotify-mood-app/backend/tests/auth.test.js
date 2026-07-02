import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isTokenExpired } from '../src/auth.js';

describe('isTokenExpired', () => {
  it('returns true when expiresAt is missing', () => {
    assert.equal(isTokenExpired(null), true);
  });

  it('returns true when token expires within the buffer window', () => {
    const expiresAt = Date.now() + 30_000;
    assert.equal(isTokenExpired(expiresAt), true);
  });

  it('returns false when token is still valid', () => {
    const expiresAt = Date.now() + 3600_000;
    assert.equal(isTokenExpired(expiresAt), false);
  });
});
