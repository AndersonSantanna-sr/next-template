'use server';

import { contactSchema } from './schema';

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  // TODO: replace with real email provider (Resend, Nodemailer, etc.)
  console.log('Contact form submission:', result.data);

  return { success: true };
}
