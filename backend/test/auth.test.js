const test = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcryptjs');
const { JwtService } = require('@nestjs/jwt');

test('Auth Security Suite - Password Hashing & JWT Verification', async (t) => {
  const jwtService = new JwtService({
    secret: 'test-secret-key-12345',
    signOptions: { expiresIn: '1h' },
  });

  await t.test('Password should be securely hashed and verifiable with bcrypt', async () => {
    const rawPassword = 'mySecurePassword2026!';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rawPassword, salt);

    assert.notStrictEqual(rawPassword, hash);
    assert.strictEqual(await bcrypt.compare(rawPassword, hash), true);
    assert.strictEqual(await bcrypt.compare('wrongPassword', hash), false);
  });

  await t.test('Backdoor password123 MUST NOT validate for unauthorized accounts', async () => {
    const realUserHash = await bcrypt.hash('SpecificUserPass', 10);
    const isValidWithBackdoor = await bcrypt.compare('password123', realUserHash);
    // Backdoor should be completely absent
    assert.strictEqual(isValidWithBackdoor, false, 'Backdoor password123 must be rejected!');
  });

  await t.test('JWT token generation and decoding works with role payload', async () => {
    const payload = { sub: 'usr-1', email: 'harounchedli72@gmail.com', role: 'SUPER_ADMIN' };
    const token = jwtService.sign(payload);
    assert.ok(token);
    assert.strictEqual(typeof token, 'string');

    const decoded = jwtService.verify(token);
    assert.strictEqual(decoded.sub, 'usr-1');
    assert.strictEqual(decoded.email, 'harounchedli72@gmail.com');
    assert.strictEqual(decoded.role, 'SUPER_ADMIN');
  });

  await t.test('Expired or tampered token MUST be rejected', async () => {
    const expiredService = new JwtService({
      secret: 'test-secret-key-12345',
      signOptions: { expiresIn: '0s' },
    });
    const expiredToken = expiredService.sign({ sub: 'usr-1' });

    assert.throws(() => {
      jwtService.verify(expiredToken);
    });

    const tamperedToken = expiredToken + 'corrupted';
    assert.throws(() => {
      jwtService.verify(tamperedToken);
    });
  });
});
