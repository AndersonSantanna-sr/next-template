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

  // TODO: wire real email provider here (Resend, Nodemailer, etc.) — remove this comment

  return { success: true };
}
