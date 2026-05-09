'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { testimonials } from './data';

export function TestimonialsSection() {
  return (
    <section id='testimonials' className='py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title */}
          <motion.div variants={fadeUp} className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Loved by developers</h2>
            <p className='mt-4 text-muted-foreground'>
              Don&apos;t take our word for it. Here&apos;s what people are saying.
            </p>
          </motion.div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className='flex h-full flex-col'>
                  <CardContent className='flex-1 pt-6'>
                    <Quote className='h-6 w-6 text-primary' />
                    <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </CardContent>
                  <CardFooter className='flex items-center gap-3'>
                    {/* TODO: replace with real avatar images */}
                    <div className='h-9 w-9 rounded-full bg-muted' />
                    <div>
                      <p className='text-sm font-semibold'>{t.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
