import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCartStore } from '../store/cartStore';
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
} from 'lucide-react';

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Estados del formulario mockeados
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular un procesamiento de pago de 2 segundos
    setTimeout(() => {
      clearCart();
      alert('¡Orden generada con éxito! Nos pondremos en contacto en breve.');
      navigate('/tienda');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top bar / Regreso */}
        <div className="mb-12">
          <Link
            to="/tienda"
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
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                CHECKOUT <span className="text-brand">B2B</span>
              </h1>
              <p className="text-zinc-400 text-sm">
                Complete sus datos de facturación y envío para generar la orden de compra.
              </p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              {/* Sección 1: Contacto */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full blur-3xl pointer-events-none" />

                <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-brand" />
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                      placeholder="ejemplo@empresa.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Nombre
                      </label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Apellidos
                      </label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Razón Social / Empresa (Opcional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Envío */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-brand" />
                  Dirección de Envío
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Dirección (Calle, Altura, Piso)
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Ciudad
                      </label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Código Postal
                      </label>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-zinc-800 focus:border-brand rounded-md px-4 py-2 text-zinc-300 font-mono text-xs outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 3: Pago B2B */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 mb-8">
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
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      TARJETA
                    </span>
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
                    <span className="text-[10px] font-black uppercase tracking-widest">CRYPTO</span>
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
                    <span className="text-[10px] font-black uppercase tracking-widest">BANCO</span>
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

                    {/* Captcha */}
                    <div className="border border-white/10 rounded-md bg-[#050505] p-4 flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setHumanityVerified(true)}
                          className={`w-8 h-8 border flex items-center justify-center transition-colors ${humanityVerified ? 'border-brand bg-brand/10 text-brand' : 'border-zinc-600 bg-black hover:border-zinc-400'}`}
                        >
                          {humanityVerified && <ShieldCheck className="w-5 h-5" />}
                        </button>
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-sm">Verificar humanidad</span>
                          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                            {humanityVerified ? 'VERIFICADO' : 'REQUERIDO PARA CONTINUAR'}
                          </span>
                        </div>
                      </div>
                      <span className="text-zinc-700 font-mono font-black text-xl opacity-20 pointer-events-none select-none tracking-tighter">
                        G-SHIELD
                      </span>
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
                        className={`w-full font-black uppercase text-sm tracking-widest py-5 rounded-md flex justify-center items-center gap-3 transition-all ${termsAccepted && humanityVerified ? 'bg-[#1a1a1a] text-white border border-brand/50 hover:bg-zinc-800' : 'bg-[#111] text-zinc-500 cursor-not-allowed border border-white/5'}`}
                      >
                        {isProcessing ? (
                          <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
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
              <h3 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
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
                <span className="text-sm font-black uppercase tracking-widest">TOTAL</span>
                <span className="text-2xl font-mono font-black text-brand">
                  $ {subtotal.toLocaleString('es-AR')}
                </span>
              </div>

              {/* Se ha movido el submit principal al formulario lateral izquierdo, este queda como un recordatorio B2B visual */}
              <div className="w-full bg-[#111] border border-white/5 text-zinc-500 font-black uppercase text-xs tracking-widest py-3 rounded-md flex justify-center items-center gap-2 cursor-not-allowed">
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
