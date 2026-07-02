import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/server.js';

process.env.NODE_ENV = 'test';
process.env.FRONTEND_URL = 'http://localhost:5173';

const app = createApp();

describe('CORS configuration', () => {
  it('allows requests from the configured frontend origin', async () => {
    const response = await request(app)
      .get('/api/health')
      .set('Origin', 'http://localhost:5173');

    assert.equal(response.status, 200);
    assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:5173');
  });
});
