import { describe, it, expect } from 'vitest';
import { contactSchema } from '../schema';

describe('contactSchema', () => {
  const valid = {
    name: 'Ana Lima',
    email: 'ana@example.com',
    message: 'Hello, I have a question about pricing.',
  };

  it('passes with valid data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects name shorter than 2 chars', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'A' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('name');
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('email');
  });

  it('rejects message shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'Hi' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('message');
  });
});
