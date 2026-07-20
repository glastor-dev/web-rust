'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { z } from 'zod';

const sowSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  company: z.string().min(2, 'La empresa debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
});

interface SOWModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    company: string;
    email: string;
    turnstileToken: string;
  }) => void;
  isGenerating: boolean;
}

export function SOWModal({ isOpen, onClose, onSubmit, isGenerating }: SOWModalProps) {
  const [formData, setFormData] = useState({ name: '', company: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = sowSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!turnstileToken && !(process.env.NODE_ENV === 'development')) {
      setErrors({ ...errors, turnstile: 'Esperando validación de seguridad...' });
      return;
    }

    setErrors({});
    onSubmit({ ...formData, turnstileToken: turnstileToken || 'dev-bypass-token' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#050505] border border-brand/30 w-full max-w-md p-8 relative shadow-[0_0_50px_rgba(0,255,102,0.1)]"
          >
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
              ESTIMACIÓN <span className="text-brand">TÉCNICA</span>
            </h3>
            <p className="text-zinc-400 text-sm mb-8 font-mono">
              Generaremos el presupuesto técnico en PDF y lo enviaremos a tu correo. Cero spam
              corporativo, promesa.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  disabled={isGenerating}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:outline-none focus:border-brand transition-colors font-mono text-sm`}
                  placeholder="Ej: Elon Musk"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  disabled={isGenerating}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full bg-black border ${errors.company ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:outline-none focus:border-brand transition-colors font-mono text-sm`}
                  placeholder="Ej: SpaceX"
                />
                {errors.company && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.company}</span>
                )}
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">
                  Email de Destino
                </label>
                <input
                  type="email"
                  disabled={isGenerating}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:outline-none focus:border-brand transition-colors font-mono text-sm`}
                  placeholder="elon@spacex.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>
                )}
              </div>

              <div className="mt-2">
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{ theme: 'dark' }}
                />
                {errors.turnstile && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.turnstile}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  isGenerating || (!turnstileToken && !(process.env.NODE_ENV === 'development'))
                }
                className="w-full mt-4 h-14 bg-brand text-black hover:bg-white transition-colors uppercase tracking-wider font-bold rounded-sm disabled:opacity-50 disabled:pointer-events-none"
              >
                {isGenerating ? 'GENERANDO PDF Y ENVIANDO...' : 'ENVIAR ESTIMACIÓN AL CORREO'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
