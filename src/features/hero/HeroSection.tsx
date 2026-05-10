'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeUp } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-20 text-center'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
        className='mx-auto max-w-4xl px-4 sm:px-6'
      >
        {/* TODO: replace mock content with real copy */}
        <motion.p variants={fadeUp} className='mb-4 text-sm font-medium text-primary'>
          Introducing v2.0 ✨
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'
        >
          Build something <span className='text-primary'>people love</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className='mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl'
        >
          A modern landing page template with everything you need to ship fast. Clean, accessible,
          and fully customizable.
        </motion.p>

        <motion.div variants={fadeUp} className='mt-10 flex flex-wrap justify-center gap-4'>
          {/* TODO: update CTA href and labels */}
          <Button
            size='lg'
            nativeButton={false}
            render={
              <Link href='#contact'>
                Get started <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            }
          />
          <Button
            size='lg'
            variant='outline'
            nativeButton={false}
            render={<Link href='#benefits'>See how it works</Link>}
          />
        </motion.div>

        {/* TODO: replace with real hero image or illustration */}
        <motion.div
          variants={fadeUp}
          className='mt-16 h-64 w-full rounded-2xl bg-muted sm:h-80 md:h-96'
        />
      </motion.div>
    </section>
  );
}
