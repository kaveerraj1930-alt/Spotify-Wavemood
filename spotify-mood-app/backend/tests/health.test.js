import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/server.js';

process.env.NODE_ENV = 'test';

const app = createApp();

describe('GET /api/health', () => {
  it('returns 200 with ok status', async () => {
    const response = await request(app).get('/api/health');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
    assert.equal(response.body.service, 'spotify-mood-backend');
    assert.ok(response.body.timestamp);
  });
});
