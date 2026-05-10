'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { benefits } from './data';

export function BenefitsSection() {
  return (
    <section id='benefits' className='py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title and subtitle */}
          <motion.div variants={fadeUp} className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Everything you need</h2>
            <p className='mt-4 text-muted-foreground'>
              Built with the tools and patterns that ship great products, fast.
            </p>
          </motion.div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={fadeUp}>
                <Card className='h-full'>
                  <CardHeader>
                    <benefit.icon className='h-8 w-8 text-primary' />
                    <p className='mt-2 font-semibold'>{benefit.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
