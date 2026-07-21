'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useCartStore } from '@/store/cartStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  User,
  MapPin,
  Wallet,
  Bitcoin,
  Building2,
  Square,
  CheckSquare,
  AlertCircle,
} from 'lucide-react';

const checkoutSchema = z.object({
  email: z.string().email('Email inválido'),
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  company: z.string().optional(),
  address: z.string().min(5, 'Dirección requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  postalCode: z.string().min(4, 'CP requerido'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useRouter();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [humanityVerified, setHumanityVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'CRYPTO' | 'BANK'>('BANK');

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/tienda');
    }
  }, [items, navigate, isProcessing]);

  const onSubmit = (data: CheckoutFormData) => {
    if (!humanityVerified) return;
    setIsProcessing(true);

    // Mock API call
    console.log('Datos validados enviados:', data);

    setTimeout(() => {
      clearCart();
      alert('¡Orden generada con éxito! Nos pondremos en contacto en breve.');
      navigate('/tienda');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top bar / Regreso */}
        <div className="mb-12">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-white transition-colors bg-black">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Volver a la tienda</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          {/* Columna Izquierda: Formulario (2/3) */}
          <div className="lg:w-2/3">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-4">
                CHECKOUT <span className="text-brand">B2B</span>
              </h1>
              <p className="text-zinc-400 text-sm">
                Complete sus datos de facturación y envío para generar la orden de compra.
              </p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              {/* Sección 1: Contacto */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full blur-3xl pointer-events-none" />

                <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-brand" />
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`w-full bg-[#050505] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand'} rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]`}
                      placeholder="ejemplo@empresa.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] uppercase font-bold mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Nombre
                      </label>
                      <input
                        {...register('firstName')}
                        type="text"
                        className={`w-full bg-[#050505] border ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand'} rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-[10px] uppercase font-bold mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Apellidos
                      </label>
                      <input
                        {...register('lastName')}
                        type="text"
                        className={`w-full bg-[#050505] border ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand'} rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-[10px] uppercase font-bold mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Razón Social / Empresa (Opcional)
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Envío */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-brand" />
                  Dirección de Envío
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Dirección (Calle, Altura, Piso)
                    </label>
                    <input
                      {...register('address')}
                      type="text"
                      className={`w-full bg-[#050505] border ${errors.address ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand'} rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-[10px] uppercase font-bold mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Ciudad
                      </label>
                      <input
                        {...register('city')}
                        type="text"
                        className={`w-full bg-[#050505] border ${errors.city ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand'} rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-[10px] uppercase font-bold mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Código Postal
                      </label>
                      <input
                        {...register('postalCode')}
                        type="text"
                        className={`w-full bg-[#050505] border ${errors.postalCode ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-brand'} rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-[10px] uppercase font-bold mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 3: Pago B2B */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-3 mb-8">
                  <Wallet className="w-5 h-5 text-brand" />
                  2. MÉTODO DE PAGO SEGURO
                </h2>

                {/* TABS DE PAGO */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`relative border rounded-lg py-6 flex flex-col items-center justify-center gap-2 transition-colors ${paymentMethod === 'CARD' ? 'bg-brand border-brand text-black' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">TARJETA</span>
                    <span className="absolute top-2 right-2 bg-zinc-800 text-zinc-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Próx.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CRYPTO')}
                    className={`relative border rounded-lg py-6 flex flex-col items-center justify-center gap-2 transition-colors ${paymentMethod === 'CRYPTO' ? 'bg-brand border-brand text-black' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                  >
                    <Bitcoin className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">CRYPTO</span>
                    <span className="absolute top-2 right-2 bg-zinc-800 text-zinc-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Próx.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('BANK')}
                    className={`border rounded-lg py-6 flex flex-col items-center justify-center gap-2 transition-colors ${paymentMethod === 'BANK' ? 'bg-brand border-brand text-black shadow-[0_0_20px_rgba(0,255,102,0.15)]' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                  >
                    <Building2 className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">BANCO</span>
                  </button>
                </div>

                {paymentMethod === 'BANK' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Caja de Datos */}
                    <div className="border border-white/20 rounded-md bg-[#050505] font-mono text-[11px] uppercase tracking-wider overflow-hidden">
                      <div className="grid grid-cols-[100px_1fr] border-b border-white/10 p-4">
                        <span className="text-zinc-500 font-bold">BANCO:</span>
                        <span className="text-white text-right">Banco Galicia</span>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] border-b border-white/10 p-4">
                        <span className="text-zinc-500 font-bold">ALIAS:</span>
                        <span className="text-white text-right">DIBUJO.DRAGA.PRIMO</span>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] border-b border-white/10 p-4">
                        <span className="text-zinc-500 font-bold">TITULAR:</span>
                        <span className="text-white text-right">Andres Antonio Cardoso</span>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] p-4">
                        <span className="text-zinc-500 font-bold">CUIT:</span>
                        <span className="text-white text-right">23253165669</span>
                      </div>
                    </div>

                    {/* Input Concepto */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-2">
                        Nombre de Titular o Concepto de Transferencia
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-[#050505] border border-white/20 focus:border-brand rounded-md px-4 py-3 text-white outline-none transition-colors font-bold uppercase"
                        placeholder="GLASTOR - TU NOMBRE COMPLETO"
                      />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setTermsAccepted(!termsAccepted)}
                        className="mt-0.5 text-zinc-400 hover:text-white transition-colors"
                      >
                        {termsAccepted ? (
                          <CheckSquare className="w-5 h-5 text-brand" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                      <p className="text-xs text-zinc-300 leading-tight">
                        He leído y acepto los{' '}
                        <a href="/legales" className="underline font-bold hover:text-brand">
                          Términos y Condiciones
                        </a>{' '}
                        y la{' '}
                        <a href="/legales" className="underline font-bold hover:text-brand">
                          Política de Privacidad
                        </a>
                        , consintiendo el procesamiento de mis datos personales para gestionar mi
                        pedido.
                      </p>
                    </div>

                    {/* Captcha Turnstile */}
                    <div className="border border-white/10 rounded-md bg-[#050505] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 min-h-[90px]">
                      <div className="flex items-center gap-4">
                        <ShieldCheck className={`w-6 h-6 ${humanityVerified ? 'text-brand' : 'text-zinc-500'}`} />
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-sm">Verificación de Humanidad</span>
                          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                            {humanityVerified ? 'VERIFICADO SEGURO' : 'PROTECCIÓN CLOUDFLARE B2B'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center shrink-0">
                        <Turnstile
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                          onSuccess={(token) => setHumanityVerified(true)}
                          options={{
                            theme: 'dark',
                            size: 'normal',
                          }}
                        />
                      </div>
                    </div>

                    {/* Botonazo */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={
                          isProcessing ||
                          !termsAccepted ||
                          !humanityVerified ||
                          paymentMethod !== 'BANK'
                        }
                        className={`w-full font-extrabold text-sm tracking-widest py-5 rounded-md flex justify-center items-center gap-3 transition-all ${termsAccepted && humanityVerified ? 'bg-[#1a1a1a] text-white border border-brand/50 hover:bg-brand hover:text-black' : 'bg-[#111] text-zinc-500 cursor-not-allowed border border-white/5'}`}
                      >
                        {isProcessing ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ShieldCheck className="w-5 h-5" />
                        )}
                        Confirmar Orden de Compra por $ {subtotal.toLocaleString('es-AR')}
                      </button>
                      <p className="text-center text-[10px] text-zinc-400 font-bold mt-4">
                        *Al finalizar, por favor envía el comprobante de transferencia por WhatsApp
                        o Email para procesar tu pedido más rápido.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </form>
          </div>

          {/* Columna Derecha: Resumen Pegajoso (Sticky) */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-[#0a0a0a] border border-white/5 rounded-xl shadow-2xl p-6 lg:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-8 border-b border-white/10 pb-4">
                RESUMEN DE LA ORDEN
              </h3>

              {/* Items */}
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4 pt-2 hide-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-md shrink-0 p-1 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute -top-2 -right-2 bg-brand text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold uppercase text-white leading-tight line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <div className="text-brand text-xs font-mono font-bold tracking-widest">
                        $ {(item.price * item.quantity).toLocaleString('es-AR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cálculos */}
              <div className="border-t border-white/10 pt-6 space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 font-bold">Subtotal</span>
                  <span className="font-mono text-white">$ {subtotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 font-bold">Envío B2B</span>
                  <span className="font-mono text-brand font-bold tracking-widest">GRATUITO</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 font-bold">Impuestos (IVA 21%)</span>
                  <span className="text-zinc-500 font-mono text-xs">Incluido</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                <span className="text-sm font-bold uppercase tracking-wider">TOTAL</span>
                <span className="text-2xl font-mono font-black text-brand">
                  $ {subtotal.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="w-full bg-[#111] border border-white/5 text-zinc-500 font-extrabold text-xs tracking-widest py-3 rounded-md flex justify-center items-center gap-2 cursor-not-allowed">
                <ShieldCheck className="w-4 h-4" />
                VERIFICACIÓN PENDIENTE
              </div>

              <div className="mt-6 text-center">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Transacción Segura encriptada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
