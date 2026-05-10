'use client';

import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { contactSchema, type ContactFormData } from './schema';
import { sendContactMessage } from './action';

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    const result = await sendContactMessage(data);
    if (result.success) {
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } else {
      toast.error(result.error ?? 'Something went wrong. Please try again.');
    }
  }

  return (
    <section id='contact' className='py-20'>
      <div className='mx-auto max-w-xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title and subtitle */}
          <motion.div variants={fadeUp} className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Get in touch</h2>
            <p className='mt-4 text-muted-foreground'>
              Have a question or want to work together? Send us a message.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            className='mt-10 space-y-5'
          >
            <div className='space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Your name' {...register('name')} />
              {errors.name && <p className='text-xs text-destructive'>{errors.name.message}</p>}
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='you@example.com' {...register('email')} />
              {errors.email && <p className='text-xs text-destructive'>{errors.email.message}</p>}
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                placeholder="Tell us what's on your mind..."
                rows={5}
                {...register('message')}
              />
              {errors.message && (
                <p className='text-xs text-destructive'>{errors.message.message}</p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
