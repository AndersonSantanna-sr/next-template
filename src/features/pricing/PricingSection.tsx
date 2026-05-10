'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { plans } from './data';

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id='pricing' className='bg-muted/30 py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className='mx-auto max-w-2xl text-center'>
            {/* TODO: update section title */}
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Simple, transparent pricing
            </h2>
            <p className='mt-4 text-muted-foreground'>No hidden fees. Cancel anytime.</p>

            <div className='mt-6 flex items-center justify-center gap-3'>
              <span className={cn('text-sm', !annual && 'font-semibold')}>Monthly</span>
              <button
                onClick={() => setAnnual((v) => !v)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  annual ? 'bg-primary' : 'bg-muted-foreground/30',
                )}
                role='switch'
                aria-checked={annual}
                aria-label='Toggle annual billing'
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform',
                    annual ? 'translate-x-6' : 'translate-x-1',
                  )}
                />
              </button>
              <span className={cn('text-sm', annual && 'font-semibold')}>
                Annual{' '}
                <Badge variant='secondary' className='ml-1'>
                  Save 20%
                </Badge>
              </span>
            </div>
          </motion.div>

          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card
                  className={cn('relative h-full', plan.recommended && 'border-primary shadow-lg')}
                >
                  {plan.recommended && (
                    <Badge className='absolute -top-3 left-1/2 -translate-x-1/2'>Recommended</Badge>
                  )}
                  <CardHeader>
                    <p className='font-semibold'>{plan.name}</p>
                    <div className='mt-2 flex items-baseline gap-1'>
                      <span className='text-4xl font-bold'>
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className='text-sm text-muted-foreground'>/mo</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2'>
                      {plan.features.map((f) => (
                        <li key={f} className='flex items-center gap-2 text-sm'>
                          <Check className='h-4 w-4 shrink-0 text-primary' />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {/* TODO: update CTA href per plan */}
                    <Button className='w-full' variant={plan.recommended ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
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
