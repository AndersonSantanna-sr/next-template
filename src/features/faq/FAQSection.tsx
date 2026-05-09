'use client';

import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { faqItems } from './data';

export function FAQSection() {
  return (
    <section id='faq' className='bg-muted/30 py-20'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {/* TODO: update section title */}
          <motion.div variants={fadeUp} className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Frequently asked questions
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Can&apos;t find the answer? Reach out via the contact form.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className='mt-12'>
            <Accordion className='space-y-2'>
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
