import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#050505] group-[.toaster]:text-zinc-100 group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:shadow-black/50 group-[.toaster]:font-mono rounded-lg',
          description: 'group-[.toast]:text-zinc-400 group-[.toast]:font-sans',
          actionButton:
            'group-[.toast]:bg-brand group-[.toast]:text-black group-[.toast]:font-bold',
          cancelButton: 'group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400',
          success: 'group-[.toaster]:border-brand/50 group-[.toaster]:text-brand',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
