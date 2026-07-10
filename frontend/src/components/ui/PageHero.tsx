import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { Button } from '../reutilizables/button';
import { NetworkParticles } from './NetworkParticles';
import { TextRevealGSAP } from './TextRevealGSAP';

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
  backgroundImage?: string;
  minHeight?: 'min-h-[50vh]' | 'min-h-[80vh]' | 'min-h-[90vh]' | 'min-h-screen';
  titleClass?: string;
  /** Pass plain text (use \n for line breaks) to enable GSAP word-by-word reveal */
  titleText?: string;
  bottomElement?: React.ReactNode;
}

export function PageHero({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  socialProof,
  visualElement,
  backgroundImage,
  minHeight = 'min-h-[80vh]',
  titleClass,
  titleText,
  bottomElement,
}: PageHeroProps) {
  const isAsymmetrical = !!visualElement;

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacityY = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Build GSAP-ready lines from titleText prop (highlights RUST keyword)
  const titleLines = titleText
    ? titleText.split('\n').map((line, li) => (
        <span key={li}>
          {line.split(' ').map((word, wi) => (
            <span key={wi}>
              {word === 'RUST' ? <span className="text-brand">{word}</span> : word}
              {wi < line.split(' ').length - 1 ? '\u00a0' : ''}
            </span>
          ))}
        </span>
      ))
    : null;

  const titleClasses = `${titleClass || (isAsymmetrical ? 'text-fluid-h2 break-keep' : 'text-fluid-display mx-auto')} font-black uppercase tracking-tighter text-white mb-6 leading-[0.9] w-full`;

  return (
    <section
      ref={containerRef}
      className={`relative ${minHeight} flex flex-col justify-center overflow-hidden w-full`}
    >
      {/* Layer 0: Background photograph */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 flex justify-center overflow-hidden">
          <div className="w-full max-w-[1920px] h-full relative">
            <img
              src={backgroundImage}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-20 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none" />
          </div>
        </div>
      )}

      {/* Layer 1: Network Particles canvas — represents distributed architecture */}
      <div className="absolute inset-0 z-[1] mix-blend-screen opacity-65 pointer-events-none">
        <NetworkParticles nodeCount={60} className="w-full h-full" />
      </div>

      {/* Layer 2: Ambient radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand/5 rounded-full blur-[180px] pointer-events-none z-[2]" />

      {/* Layer 10: Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div
          className={`relative z-20 w-full ${isAsymmetrical ? 'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center' : 'max-w-4xl mx-auto text-center flex flex-col items-center'}`}
        >
          <div
            className={`flex flex-col ${isAsymmetrical ? 'items-start text-left' : 'items-center text-center'}`}
          >
            <motion.div
              style={{ opacity: opacityY, scale: scaleY, y: translateY }}
              className="w-full"
            >
              {/* Title: GSAP reveal (preferred) or motion.h1 fallback */}
              {titleLines ? (
                <TextRevealGSAP
                  lines={titleLines}
                  className={titleClasses}
                  immediate={true}
                  asH1={true}
                  delay={0.2}
                />
              ) : (
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={titleClasses}
                  >
                    {title}
                  </motion.h1>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
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
                transition={{ delay: 0.7, duration: 0.8 }}
                className={`flex flex-col sm:flex-row gap-4 mb-8 ${isAsymmetrical ? '' : 'justify-center w-full'}`}
              >
                {ctaPrimary && (
                  <Button asChild variant="default">
                    <a href={ctaPrimary.href}>{ctaPrimary.text}</a>
                  </Button>
                )}
                {ctaSecondary && (
                  <Button asChild variant="outline">
                    <a href={ctaSecondary.href}>{ctaSecondary.text}</a>
                  </Button>
                )}
              </motion.div>
            )}

            {/* Social Proof */}
            {socialProof && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className={`text-xs font-mono text-zinc-500 uppercase tracking-widest border-t border-white/10 pt-4 w-full ${isAsymmetrical ? 'text-left' : 'text-center max-w-sm mx-auto'}`}
              >
                {socialProof}
              </motion.div>
            )}
          </div>

          {/* Right Column Visual */}
          {isAsymmetrical && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 50 }}
              className="w-full relative h-full flex items-center justify-center mt-12 lg:mt-0"
            >
              {visualElement}
            </motion.div>
          )}
        </div>
      </div>

      {bottomElement && (
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-auto">
          {bottomElement}
        </div>
      )}
    </section>
  );
}
