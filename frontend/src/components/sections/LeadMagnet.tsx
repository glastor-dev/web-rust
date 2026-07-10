import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../reutilizables/button';
import { DownloadIcon, CheckCircle2Icon } from 'lucide-react';

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send the email to your API/CRM
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative overflow-hidden bg-[#050505]">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/5 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-max mb-6">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
              Whitepaper Técnico Gratuito
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
            De Node.js a Rust:
            <br />
            <span className="text-zinc-500">Guía de Migración.</span>
          </h2>

          <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8 max-w-lg">
            Descubre la arquitectura exacta que usamos para reducir los costos de AWS en un 60% y
            llevar la latencia a milisegundos. Sin buzzwords, puro código y estrategias de
            despliegue.
          </p>

          <ul className="flex flex-col gap-4 mb-10">
            <li className="flex items-center gap-3 text-sm text-zinc-300 font-mono">
              <CheckCircle2Icon className="w-5 h-5 text-brand shrink-0" />
              Comparativa de consumo RAM (V8 vs Binario)
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300 font-mono">
              <CheckCircle2Icon className="w-5 h-5 text-brand shrink-0" />
              Estrategia de adopción gradual vía FFI / NAPI
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300 font-mono">
              <CheckCircle2Icon className="w-5 h-5 text-brand shrink-0" />
              Métricas reales de clientes en producción
            </li>
          </ul>
        </motion.div>

        {/* Right: Form / Download Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl relative group">
            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand/20" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mb-6 text-brand border border-brand/30">
                  <DownloadIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Guía enviada!</h3>
                <p className="text-zinc-400">
                  Revisa tu bandeja de entrada. Te hemos enviado el enlace de descarga directo al
                  PDF.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl font-medium text-white mb-2">
                  Acceso Inmediato al Documento
                </h3>
                <p className="text-sm text-zinc-500 mb-8">
                  Ingresa tu email corporativo para recibir el PDF.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="tu@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050505] border border-white/20 text-white px-4 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-zinc-600 font-mono text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full h-14 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest font-bold text-xs text-black">
                      Descargar Whitepaper <DownloadIcon className="w-4 h-4" />
                    </span>
                    {/* Sweep Effect */}
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  </Button>
                </form>
                <p className="text-center text-[10px] text-zinc-600 mt-6 font-mono uppercase tracking-widest">
                  Prometemos cero spam. Solo ingeniería.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
