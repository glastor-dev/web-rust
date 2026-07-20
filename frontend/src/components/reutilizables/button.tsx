/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-black',
  {
    variants: {
      variant: {
        default:
          'bg-brand text-black hover:scale-[1.03] hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]',
        destructive:
          'bg-red-500 text-zinc-50 hover:scale-[1.03] hover:bg-red-500/90 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',
        outline:
          'border border-white/20 bg-transparent text-white hover:scale-[1.03] hover:border-brand hover:text-brand hover:bg-brand/10 hover:shadow-[0_0_15px_rgba(0,255,102,0.2)]',
        secondary: 'bg-white/10 text-white hover:scale-[1.03] hover:bg-white/20',
        ghost: 'hover:bg-white/10 hover:text-white text-zinc-300',
        link: 'text-brand underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 text-[10px]',
        lg: 'h-14 px-10 text-sm font-black',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
