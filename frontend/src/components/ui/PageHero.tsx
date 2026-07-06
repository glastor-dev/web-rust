import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { Button } from './Button';

interface PageHeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  socialProof?: React.ReactNode;
  visualElement?: React.ReactNode;
  minHeight?: 'min-h-[50vh]' | 'min-h-[80vh]' | 'min-h-[90vh]' | 'min-h-screen';
  titleClass?: string;
}

export function PageHero({ 
  title, 
  description, 
  ctaPrimary, 
  ctaSecondary, 
  socialProof,
  visualElement,
  minHeight = 'min-h-[80vh]',
  titleClass
}: PageHeroProps) {
  
  const isAsymmetrical = !!visualElement;
  
  // Parallax Scroll Effect
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacityY = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className={`relative ${minHeight} flex flex-col justify-center overflow-hidden max-w-7xl mx-auto px-6 md:px-12 py-24`}>
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className={`relative z-10 w-full ${isAsymmetrical ? 'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center' : 'max-w-4xl mx-auto text-center flex flex-col items-center'}`}>
        
        {/* Left Column (or Centered) */}
        <div className={`flex flex-col ${isAsymmetrical ? 'items-start text-left' : 'items-center text-center'}`}>
          <motion.div style={{ opacity: opacityY, scale: scaleY, y: translateY }} className="w-full">
            <motion.div className="overflow-hidden">
               <motion.h1 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`${titleClass || (isAsymmetrical ? 'text-fluid-h2 wrap-break-word' : 'text-fluid-display mx-auto')} font-black uppercase tracking-tighter text-white mb-6 leading-[0.9] w-full`}
              >
                {title}
              </motion.h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className={`text-zinc-400 text-xl md:text-2xl font-light mb-12 ${isAsymmetrical ? 'max-w-xl' : 'max-w-2xl'}`}
            >
              {description}
            </motion.div>
          </motion.div>
          
          {/* CTAs */}
          {(ctaPrimary || ctaSecondary) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`flex flex-col sm:flex-row gap-4 mb-8 ${isAsymmetrical ? '' : 'justify-center w-full'}`}
            >
              {ctaPrimary && <Button href={ctaPrimary.href} variant="primary">{ctaPrimary.text}</Button>}
              {ctaSecondary && <Button href={ctaSecondary.href} variant="outline">{ctaSecondary.text}</Button>}
            </motion.div>
          )}

          {/* Social Proof */}
          {socialProof && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className={`text-xs font-mono text-zinc-500 uppercase tracking-widest border-t border-white/10 pt-4 w-full ${isAsymmetrical ? 'text-left' : 'text-center max-w-sm mx-auto'}`}
            >
              {socialProof}
            </motion.div>
          )}
        </div>

        {/* Right Column (Visual Element) */}
        {isAsymmetrical && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 50 }}
            className="w-full relative h-full flex items-center justify-center mt-12 lg:mt-0"
          >
            {visualElement}
          </motion.div>
        )}
      </div>
    </section>
  );
}
