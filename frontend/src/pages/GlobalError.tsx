import { motion } from 'motion/react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '../components/reutilizables/button';

export default function GlobalError() {
  const error = useRouteError();

  let errorMessage = 'Un error inesperado ha ocurrido en la arquitectura.';
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Si es un error de carga de módulo (típico de lazy loading), sugerir recargar
  const isChunkError = errorMessage
    ?.toLowerCase()
    .includes('failed to fetch dynamically imported module');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center animate-in fade-in duration-700 bg-background text-foreground">
      <SEO
        title="Error de Sistema | Glastor"
        description="Fallo de sistema detectado. Reparando arquitectura."
      />
      {/* Indicador para motores de búsqueda de no indexar esto */}
      <meta name="robots" content="noindex, nofollow" />

      {/* Grid Background Effect */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Glowing Orb (Red for errors) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="text-fluid-display font-black leading-[0.8] text-transparent bg-clip-text bg-linear-to-b from-red-500 to-red-900 uppercase tracking-tighter">
            SYS FAULT
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-fluid-h2 font-bold uppercase tracking-tight text-white mb-6">
            FALLO DE ARQUITECTURA.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
            {isChunkError
              ? 'Nueva versión detectada. La instancia de la página solicitada es antigua o no se pudo cargar. Por favor, recarga el sistema.'
              : 'La aplicación encontró un error crítico y no pudo renderizar esta ruta.'}
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mb-12 max-w-xl mx-auto text-left overflow-x-auto text-red-400 font-mono text-sm shadow-inner shadow-black/50">
            <span className="text-zinc-500 mr-2">LOG:</span> {errorMessage}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isChunkError ? (
              <Button
                onClick={() => window.location.reload()}
                variant="default"
                size="lg"
                className="h-16 px-10 text-lg uppercase tracking-widest group bg-red-600 hover:bg-red-700 text-white border-transparent"
              >
                <RefreshCcw
                  className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500"
                  strokeWidth={2.5}
                />
                Reiniciar Instancia
              </Button>
            ) : (
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="lg"
                className="h-16 px-10 text-lg uppercase tracking-widest group border-red-500/50 hover:bg-red-500/10 text-white"
              >
                <RefreshCcw
                  className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500"
                  strokeWidth={2.5}
                />
                Reintentar
              </Button>
            )}

            <Button
              asChild
              variant={isChunkError ? 'outline' : 'default'}
              size="lg"
              className="h-16 px-10 text-lg uppercase tracking-widest group"
            >
              <Link to="/">
                <ArrowLeft
                  className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform"
                  strokeWidth={2.5}
                />
                Volver a la Base
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
