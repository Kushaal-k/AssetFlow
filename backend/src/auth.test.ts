import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './index.js';
import { createMemoryUserRepository } from './repositories/memoryUserRepository.js';

async function withServer(fn: (baseUrl: string) => Promise<void>) {
  const app = createApp({ userRepository: createMemoryUserRepository() });
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once('listening', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to get server address');
  }

  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

test('signup and login return a JWT for the new user', async () => {
  await withServer(async (baseUrl) => {
    const signupRes = await fetch(`${baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'secret123' }),
    });

    assert.equal(signupRes.status, 201);
    const signupBody = await signupRes.json();
    assert.ok(signupBody.token);
    assert.equal(signupBody.user.email, 'test@example.com');

    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'secret123' }),
    });

    assert.equal(loginRes.status, 200);
    const loginBody = await loginRes.json();
    assert.ok(loginBody.token);
    assert.equal(loginBody.user.email, 'test@example.com');
  });
});
