import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedSectionProps { id: string; className?: string; children: ReactNode; label?: string }

export function AnimatedSection({ id, className = '', children, label }: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();
  return <motion.section
    id={id}
    className={className}
    aria-label={label}
    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reduceMotion ? 0 : 0.42, ease: 'easeOut' }}
  >{children}</motion.section>;
}
