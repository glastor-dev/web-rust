import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SEO } from '../../components/SEO';
import { Button } from '../../components/reutilizables/button';
import { Card } from '../../components/reutilizables/card';

const arrepentimientoSchema = z.object({
  email: z.string().email('Email inválido'),
  orden: z.string().min(1, 'Número de orden/pedido es obligatorio'),
  motivo: z.string().optional(),
});

type ArrepentimientoFormValues = z.infer<typeof arrepentimientoSchema>;

export default function Arrepentimiento() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArrepentimientoFormValues>({
    resolver: zodResolver(arrepentimientoSchema),
  });

  const onSubmit = async (data: ArrepentimientoFormValues) => {
    if (!turnstileToken) {
      alert('Por favor, espera la validación de seguridad antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        turnstile_token: turnstileToken,
        declaracion: true,
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        fecha_compra: '',
        producto: '',
      };
      const res = await fetch('http://localhost:3001/api/arrepentimiento/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al procesar la solicitud');
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Hubo un error al procesar la solicitud. Por favor intente más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Glastor | Botón de Arrepentimiento"
        description="Formulario de revocación de compra - Ley de Defensa del Consumidor (Ley 24.240)."
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">
            BOTÓN DE <span className="text-red-500">ARREPENTIMIENTO.</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            De acuerdo con el artículo 34 de la Ley 24.240 y la Disposición 954/2025, los clientes
            tienen el derecho de revocar la contratación de servicios dentro del plazo de 10 días
            desde su aceptación, o solicitar la baja del servicio.
          </p>
        </div>

        {success ? (
          <Card className="p-8 bg-brand/5 border-brand text-center">
            <h2 className="text-2xl font-black uppercase tracking-widest text-brand mb-4">
              Solicitud Recibida
            </h2>
            <p className="text-zinc-300">
              Hemos enviado una constancia de recepción a su correo electrónico. Nuestro
              departamento legal procesará su solicitud a la brevedad y se pondrá en contacto.
            </p>
          </Card>
        ) : (
          <Card className="bg-zinc-900 border border-white/10 p-8 rounded-none shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  Email de Contacto *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="tu@empresa.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  ID de Contrato / MSA *
                </label>
                <input
                  type="text"
                  {...register('orden')}
                  className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Ej: MSA-2026-XYZ"
                />
                {errors.orden && (
                  <p className="text-red-500 text-xs mt-2">{errors.orden.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  Motivo (Opcional)
                </label>
                <textarea
                  {...register('motivo')}
                  className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors h-32"
                  placeholder="Dinos por qué te vas..."
                ></textarea>
              </div>

              <div className="mt-2">
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{ theme: 'dark' }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                variant="destructive"
                size="lg"
                className="w-full h-16 uppercase tracking-widest text-base mt-4 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {isSubmitting ? 'Procesando...' : 'Solicitar Revocación de Contrato'}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
