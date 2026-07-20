'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../reutilizables/button';
import {
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  ServerStack01Icon,
  Shield01Icon,
  DatabaseLightningIcon,
} from 'hugeicons-react';

export const MultiStepContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    budget: '',
    email: '',
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setStep(4);
    }, 1000);
  };

  const services = [
    {
      id: 'backend',
      icon: ServerStack01Icon,
      title: 'Backend en Rust',
      desc: 'Sistemas distribuidos y APIs de alta concurrencia',
    },
    {
      id: 'infra',
      icon: Shield01Icon,
      title: 'Auditoría AWS',
      desc: 'Reducción de costos y optimización de infraestructura',
    },
    {
      id: 'perf',
      icon: DatabaseLightningIcon,
      title: 'Optimización Extrema',
      desc: 'Mejora de Core Web Vitals y latencia de base de datos',
    },
  ];

  return (
    <section
      id="contacto"
      className="py-24 md:py-32 bg-[#050505] relative z-10 overflow-hidden border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <SectionHeader
            title="Inicia tu Proyecto"
            subtitle="Olvídate de formularios aburridos. Cuéntanos qué necesitas y un arquitecto de Glastor te contactará en menos de 48h con una estimación técnica realista."
          />
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-lg relative overflow-hidden shadow-2xl">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#111]">
            <motion.div
              className="h-full bg-brand"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-6">
                  1. ¿Qué reto técnico necesitas resolver?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((srv) => {
                    const Icon = srv.icon;
                    const isSelected = formData.service === srv.id;
                    return (
                      <button
                        key={srv.id}
                        onClick={() => {
                          setFormData({ ...formData, service: srv.id });
                          handleNext();
                        }}
                        className={`text-left p-6 rounded-md border transition-all duration-300 ${isSelected ? 'border-brand bg-brand/5 shadow-[0_0_15px_rgba(0,255,102,0.1)]' : 'border-white/10 bg-[#111] hover:border-white/30'}`}
                      >
                        <Icon
                          className={`w-8 h-8 mb-4 ${isSelected ? 'text-brand' : 'text-zinc-500'}`}
                        />
                        <h4 className="text-white font-bold mb-2">{srv.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{srv.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-6">
                  2. ¿Cuál es el rango de presupuesto para este cuatrimestre?
                </h3>
                <div className="flex flex-col gap-3">
                  {['Menos de $10k', '$10k - $25k', '$25k - $50k', 'Más de $50k'].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => {
                        setFormData({ ...formData, budget });
                        handleNext();
                      }}
                      className={`w-full text-left p-4 rounded-md border font-mono text-sm transition-all duration-300 ${formData.budget === budget ? 'border-brand bg-brand/5 text-brand' : 'border-white/10 bg-[#111] text-zinc-300 hover:border-white/30 hover:bg-white/5'}`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={handleBack}
                    className="text-sm font-mono text-zinc-500 hover:text-white transition-colors"
                  >
                    ← Volver
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form
                key="step3"
                onSubmit={submitForm}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-6">
                  3. ¿Dónde enviamos la estimación técnica?
                </h3>
                <div className="space-y-4">
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
                      autoFocus
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="cto@tuempresa.com"
                      className="w-full bg-[#111] border border-white/10 text-white px-4 py-4 font-mono text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm font-mono text-zinc-500 hover:text-white transition-colors"
                  >
                    ← Volver
                  </button>
                  <Button type="submit" variant="default" className="gap-2">
                    Enviar Solicitud <ArrowRight01Icon className="w-4 h-4" />
                  </Button>
                </div>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckmarkCircle01Icon className="w-10 h-10 text-brand" />
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight text-white">
                  Solicitud Recibida
                </h3>
                <p className="text-zinc-400 max-w-md mx-auto">
                  Hemos registrado tus requerimientos. Un arquitecto de Glastor revisará tu caso y
                  te contactará en {formData.email} con una estimación técnica y fecha de sesión en
                  menos de 48h hábiles.
                </p>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Siguiente paso estimado: reunión técnica · 48h
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
