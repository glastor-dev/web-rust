import { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // magnetic pull strength (default 0.4)
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

/**
 * A button that magnetically attracts the cursor when it gets close.
 * The element physically moves toward the cursor within a radius.
 * On mouse leave, it springs back to its original position.
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  as: Tag = 'button',
  href,
  onClick,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    setPosition({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const commonProps = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    'aria-label': ariaLabel,
    ...(href ? { href } : {}),
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      className="inline-flex"
    >
      {/* @ts-expect-error — dynamic tag */}
      <Tag {...commonProps}>{children}</Tag>
    </motion.div>
  );
}
