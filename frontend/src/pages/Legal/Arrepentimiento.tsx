import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SEO } from '../../components/SEO';
import { Button } from '../../components/reutilizables/button';
import { Card } from '../../components/reutilizables/card';

const arrepentimientoSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  apellido: z.string().min(2, 'El apellido es obligatorio'),
  dni: z.string().min(6, 'El DNI es inválido'),
  telefono: z.string().min(8, 'Teléfono inválido'),
  email: z.string().email('Email inválido'),
  orden: z.string().min(1, 'Número de orden/pedido es obligatorio'),
  fecha_compra: z.string().min(1, 'La fecha de compra es obligatoria'),
  producto: z.string().min(1, 'Especifique el producto o servicio'),
  motivo: z.string().min(1, 'Seleccione un motivo'),
  declaracion: z.boolean().refine(val => val === true, {
    message: 'Debe aceptar la declaración jurada'
  })
});

type ArrepentimientoFormValues = z.infer<typeof arrepentimientoSchema>;

export default function Arrepentimiento() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ArrepentimientoFormValues>({
    resolver: zodResolver(arrepentimientoSchema)
  });

  const onSubmit = async (data: ArrepentimientoFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3001/api/arrepentimiento/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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
            De conformidad con el <strong>Art. 34 de la Ley 24.240 de Defensa del Consumidor</strong>, usted tiene el derecho irrenunciable de revocar la aceptación del servicio dentro de los 10 días computados a partir de la celebración del contrato.
          </p>
        </div>

        {success ? (
          <Card className="p-8 bg-brand/5 border-brand text-center">
            <h2 className="text-2xl font-black uppercase tracking-widest text-brand mb-4">Solicitud Recibida</h2>
            <p className="text-zinc-300">Hemos enviado una constancia de recepción a su correo electrónico. Nuestro departamento legal procesará su solicitud a la brevedad y se pondrá en contacto.</p>
          </Card>
        ) : (
          <Card className="p-8 bg-zinc-950 border border-white/10 rounded-none shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="border-b border-white/10 pb-4 mb-6">
                <h3 className="text-brand text-sm font-mono uppercase tracking-widest">1. Datos del Comprador</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Nombre *</label>
                  <input id="nombre" {...register('nombre')} className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                  {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="apellido" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Apellido *</label>
                  <input id="apellido" {...register('apellido')} className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                  {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dni" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">DNI *</label>
                  <input id="dni" {...register('dni')} className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                  {errors.dni && <p className="text-red-500 text-xs">{errors.dni.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="telefono" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Teléfono *</label>
                  <input id="telefono" {...register('telefono')} type="tel" className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                  {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Correo Electrónico *</label>
                  <input id="email" {...register('email')} type="email" className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="border-b border-white/10 pb-4 mb-6 mt-12">
                <h3 className="text-brand text-sm font-mono uppercase tracking-widest">2. Datos de la Compra</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="orden" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Número de Orden/Pedido *</label>
                  <input id="orden" {...register('orden')} className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                  {errors.orden && <p className="text-red-500 text-xs">{errors.orden.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fecha_compra" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Fecha de Compra *</label>
                  <input id="fecha_compra" {...register('fecha_compra')} type="date" className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand scheme-dark" />
                  {errors.fecha_compra && <p className="text-red-500 text-xs">{errors.fecha_compra.message}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="producto" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Producto(s) a devolver *</label>
                <input id="producto" {...register('producto')} placeholder="Ej: Auditoría, MVP..." className="flex w-full rounded-none border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand" />
                {errors.producto && <p className="text-red-500 text-xs">{errors.producto.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="motivo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300">Motivo *</label>
                <select 
                  id="motivo" 
                  {...register('motivo')}
                  className="flex w-full rounded-none border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 bg-black border-white/20 h-12 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-brand focus-visible:border-brand"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Cambio de modelo">Cambio de modelo</option>
                  <option value="Arrepentimiento puro">Arrepentimiento puro</option>
                  <option value="El producto no coincide con lo esperado">El producto no coincide con lo esperado</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.motivo && <p className="text-red-500 text-xs">{errors.motivo.message}</p>}
              </div>

              <div className="border-b border-white/10 pb-4 mb-6 mt-12">
                <h3 className="text-brand text-sm font-mono uppercase tracking-widest">3. Declaración</h3>
              </div>

              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <input type="checkbox" id="declaracion" {...register('declaracion')} className="w-5 h-5 accent-brand" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="declaracion" className="text-zinc-300 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Declaro bajo juramento que los datos informados son verdaderos y ejerzo mi derecho de revocación estipulado en el Art. 34 de la Ley 24.240.
                  </label>
                  {errors.declaracion && <p className="text-red-500 text-xs">{errors.declaracion.message}</p>}
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full h-16 uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  {isSubmitting ? 'Procesando...' : 'ENVIAR SOLICITUD DE REVOCACIÓN'}
                </Button>
              </div>

            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
