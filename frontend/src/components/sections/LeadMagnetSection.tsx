import { motion } from 'motion/react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export const LeadMagnetSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here would go the actual form submission logic to CRM (e.g. HubSpot)
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setEmail('');
    }
  };

  return (
    <section className="py-24 md:py-32 bg-brand text-[#050505] relative z-10 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#050505" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] text-brand font-mono text-[10px] uppercase tracking-widest mb-8"
            >
              <FileText className="w-3 h-3" />
              Whitepaper Técnico Gratuito
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[4rem] font-black uppercase tracking-tighter leading-[0.9] mb-8"
            >
              Reduce tu factura de AWS un 40% migrando a Rust
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm md:text-base font-medium max-w-lg mb-10"
            >
              Descubre en esta guía técnica cómo las empresas están abandonando Node.js y Python en
              favor de Rust para aplastar sus costes de infraestructura y dominar la latencia.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 font-mono text-sm mb-12"
            >
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>Auditoría de consumo de memoria y CPU</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>Estrategia de migración de microservicios paso a paso</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>Casos de estudio reales con métricas de ahorro</span>
              </li>
            </motion.ul>
          </div>

          {/* Form & Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="order-1 lg:order-2 bg-[#050505] p-8 md:p-12 border border-brand/30 shadow-[20px_20px_0px_rgba(0,0,0,0.2)]"
          >
            <h3 className="text-white text-2xl font-bold uppercase tracking-tight mb-2">
              Descargar Guía Técnica
            </h3>
            <p className="text-zinc-400 font-mono text-xs mb-8">
              Únete a +2,000 CTOs e ingenieros recibiendo nuestros reportes.
            </p>

            {submitted ? (
              <div className="bg-brand/10 border border-brand p-6 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-brand mx-auto mb-4" />
                <p className="text-brand font-bold uppercase tracking-widest text-sm">
                  ¡Enviado a tu email!
                </p>
                <p className="text-zinc-400 font-mono text-xs mt-2">
                  Revisa tu bandeja de entrada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2"
                  >
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cto@empresa.com"
                    className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-4 font-mono text-sm focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand text-[#050505] font-bold uppercase tracking-widest px-8 py-4 flex items-center justify-center gap-3 hover:bg-white transition-colors duration-300"
                >
                  <Download className="w-5 h-5" />
                  Descargar Ahora
                </button>
                <p className="text-zinc-600 font-mono text-[10px] text-center">
                  Cero spam. Solo ingeniería y arquitectura de alto nivel.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
