import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorMode = 'default' | 'hover' | 'text';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Two springs: fast for the dot, slow for the ring
  const fastConfig = { damping: 28, stiffness: 500, mass: 0.3 };
  const slowConfig = { damping: 32, stiffness: 180, mass: 0.8 };

  const dotX = useSpring(cursorX, fastConfig);
  const dotY = useSpring(cursorY, fastConfig);
  const ringX = useSpring(cursorX, slowConfig);
  const ringY = useSpring(cursorY, slowConfig);

  const labelRef = useRef('');

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], [data-cursor]');

      if (clickable) {
        const newLabel =
          (clickable as HTMLElement).dataset.cursor ||
          (clickable as HTMLElement).getAttribute('aria-label') ||
          (clickable as HTMLElement).innerText?.slice(0, 16).trim() ||
          '';
        if (newLabel !== labelRef.current) {
          labelRef.current = newLabel;
          setLabel(newLabel);
        }
        setMode('hover');
      } else if (
        window.getComputedStyle(target).cursor === 'text' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setMode('text');
        setLabel('');
      } else {
        if (mode !== 'default') {
          setMode('default');
          setLabel('');
          labelRef.current = '';
        }
      }
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY, isVisible, mode]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] hidden md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: mode === 'hover' ? 64 : mode === 'text' ? 2 : 32,
            height: mode === 'hover' ? 64 : mode === 'text' ? 32 : 32,
            borderRadius: mode === 'text' ? 2 : 99,
            opacity: mode === 'hover' ? 0.6 : 0.25,
            borderColor: '#00ff66',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ border: '1px solid' }}
        />
      </motion.div>

      {/* Core dot — mix-blend-difference for that premium inversion effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: mode === 'hover' ? 8 : 6,
            height: mode === 'hover' ? 8 : 6,
            backgroundColor: mode === 'hover' ? '#00ff66' : '#ffffff',
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </motion.div>

      {/* Contextual label — appears near the cursor when hovering interactive elements */}
      {label && mode === 'hover' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99997] hidden md:block"
          style={{
            x: ringX,
            y: ringY,
            translateX: 'calc(-50% + 36px)',
            translateY: 'calc(-50% + 36px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <span className="font-mono text-[9px] text-brand uppercase tracking-widest whitespace-nowrap bg-[#050505]/90 px-2 py-1 border border-brand/30">
            {label}
          </span>
        </motion.div>
      )}
    </>
  );
}
