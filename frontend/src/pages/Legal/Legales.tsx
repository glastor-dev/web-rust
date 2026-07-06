import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../../components/SEO';
import { ChevronRight } from 'lucide-react';
import { Card } from '../../components/reutilizables/card';
import { Button } from '../../components/reutilizables/button';

const legalDocuments = [
  { id: 'privacidad', title: 'Política de Privacidad' },
  { id: 'aviso-legal', title: 'Aviso Legal' },
  { id: 'cookies', title: 'Política de Cookies' },
  { id: 'condiciones', title: 'Condiciones de Venta' },
  { id: 'accesibilidad', title: 'Accesibilidad Web' },
  { id: 'confidencialidad', title: 'Aviso de Confidencialidad' },
  { id: 'defensa-consumidor', title: 'Defensa del Consumidor' },
  { id: 'rgpd', title: 'Marco RGPD / LPD 2026' },
  { id: 'arrepentimiento', title: 'Botón de Arrepentimiento' }
];

export default function Legales() {
  const [activeDoc, setActiveDoc] = useState('privacidad');
  const { hash } = useLocation();

  // Escuchar el hash de la URL para abrir el tab correcto directamente
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      if (legalDocuments.some(doc => doc.id === id)) {
        setActiveDoc(id);
      }
    }
  }, [hash]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen bg-[#050505] pt-32 pb-24">
      <SEO 
        title="Glastor | Portal Legal"
        description="Portal de transparencia, privacidad y normativas legales."
      />
      <meta name="robots" content="noindex" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <h1 className="text-fluid-h2 font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">
            PORTAL <span className="text-brand">LEGAL.</span>
          </h1>
          <p className="text-zinc-400 text-lg">Transparencia absoluta. Sin letra pequeña.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sidebar / Menu */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="sticky top-32">
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">Documentos</h3>
              
              <nav className="flex flex-col space-y-2">
                {legalDocuments.map((doc) => {
                  const isActive = activeDoc === doc.id;
                  const isArrepentimiento = doc.id === 'arrepentimiento';
                  
                  return (
                    <button
                      key={doc.id}
                      onClick={() => {
                         setActiveDoc(doc.id);
                         window.history.pushState(null, '', `#${doc.id}`);
                      }}
                      className={`flex items-center justify-between text-left px-4 py-4 rounded-sm transition-all duration-300 font-bold ${
                        isActive && !isArrepentimiento
                          ? 'bg-brand/10 text-brand border-l-4 border-brand' 
                          : isActive && isArrepentimiento
                          ? 'bg-red-500/10 text-red-500 border-l-4 border-red-500'
                          : isArrepentimiento
                          ? 'text-brand hover:text-red-500 hover:bg-red-500/5 border-l-4 border-transparent'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                    >
                      {doc.title}
                      {isActive && <ChevronRight size={16} />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-12 pt-8 border-t border-white/10 space-y-2">
                <p className="text-zinc-500 text-sm">Última actualización: <strong className="text-white">Julio 2026</strong></p>
                <p className="text-zinc-500 text-sm">GLASTOR® - Marca Registrada</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full md:w-2/3 lg:w-3/4 min-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDoc}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:uppercase prose-h2:tracking-widest prose-h2:font-black prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-brand"
              >
                
                {/* Contenido Condicional según Documento */}
                {activeDoc === 'privacidad' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Política de Privacidad</h2>
                    <p>En <strong>Glastor</strong>, construimos sistemas inquebrantables. Eso incluye la seguridad de tus datos. No comerciamos con información, no usamos rastreadores ocultos y minimizamos la recolección al máximo.</p>
                    <h3 className="text-white mt-8 mb-2 font-bold">1. Datos que recopilamos</h3>
                    <p>Solo recopilamos los datos estrictamente necesarios para comunicarnos con nuestros clientes B2B (nombre, email corporativo, detalles del proyecto) cuando se agendan reuniones o auditorías técnicas.</p>
                    <h3 className="text-white mt-8 mb-2 font-bold">2. Almacenamiento y Seguridad</h3>
                    <p>Toda la información de contacto está cifrada y almacenada en infraestructuras con certificación ISO 27001.</p>
                  </div>
                )}

                {activeDoc === 'aviso-legal' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Aviso Legal</h2>
                    <p>El presente Aviso Legal regula el uso y acceso al sitio web <strong>glastor.es</strong>, propiedad de GLASTOR®.</p>
                    
                    <h3 className="text-white mt-8 mb-4 font-bold">Información de la Empresa</h3>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                      <li><strong>Titular:</strong> ANDRES ANTONIO CARDOSO</li>
                      <li><strong>CUIT:</strong> 23253165669 (Responsable Inscripto)</li>
                      <li><strong>Dominio:</strong> GLASTOR.ES</li>
                      <li><strong>Email de Contacto:</strong> <a href="mailto:ventas@glastor.es" className="text-brand hover:underline">ventas@glastor.es</a></li>
                      <li><strong>Dirección Postal:</strong> 9 de Julio 614, Tristán Suárez, Buenos Aires (CP: 1806)</li>
                    </ul>

                    <h3 className="text-white mt-8 mb-2 font-bold">Condiciones de Uso y Propiedad Intelectual</h3>
                    <p>El uso de este sitio web implica la aceptación plena de las disposiciones incluidas en este Aviso Legal. El código fuente, los diseños gráficos, las imágenes, las animaciones, el software, los textos y los contenidos recogidos en glastor.es están protegidos por la legislación aplicable y son propiedad exclusiva de GLASTOR®.</p>
                  </div>
                )}

                {activeDoc === 'cookies' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Política de Cookies</h2>
                    <p>Usamos cookies técnicas estrictamente necesarias para el funcionamiento de la plataforma. Las cookies analíticas son opcionales y pueden ser gestionadas desde el panel de preferencias.</p>
                    <h3 className="text-white mt-8 mb-2 font-bold">Tipos de Cookies</h3>
                    <ul>
                      <li><strong>Esenciales:</strong> Mantienen la sesión y previenen ataques CSRF.</li>
                      <li><strong>Rendimiento:</strong> Telemetría anonimizada de los tiempos de carga (Next.js/React).</li>
                    </ul>
                  </div>
                )}

                {activeDoc === 'condiciones' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Condiciones de Venta</h2>
                    <p>Glastor provee servicios B2B de ingeniería de software. Los contratos de desarrollo se negocian bajo un formato de <strong>Master Service Agreement (MSA)</strong> personalizado para cada cliente.</p>
                    <p>Las tarifas, cronogramas de pago y SLAs se establecen en las Órdenes de Trabajo (SOW) adjuntas a cada contrato comercial.</p>
                  </div>
                )}
                
                {activeDoc === 'accesibilidad' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Accesibilidad Web</h2>
                    <p>Nos comprometemos a garantizar la accesibilidad digital para personas con discapacidad. Trabajamos continuamente para mejorar la experiencia de usuario y aplicamos los estándares de accesibilidad pertinentes (WCAG 2.1 Nivel AA).</p>
                    <p>Este sitio ha sido diseñado con alto contraste, tipografía fluida y soporte para lectores de pantalla en componentes críticos.</p>
                  </div>
                )}

                {activeDoc === 'confidencialidad' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Aviso de Confidencialidad</h2>
                    <p>Toda comunicación técnica, arquitectura compartida y secretos industriales discutidos durante las fases de auditoría están protegidos bajo un <strong>Acuerdo de Confidencialidad Mutuo (NDA)</strong> vinculante desde el primer contacto.</p>
                  </div>
                )}

                {activeDoc === 'defensa-consumidor' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Defensa del Consumidor</h2>
                    <p>Al operar globalmente, Glastor respeta los derechos consagrados en la Ley de Defensa del Consumidor vigente en la República Argentina (Ley 24.240) y directivas equivalentes en la Unión Europea para la prestación de servicios digitales.</p>
                  </div>
                )}

                {activeDoc === 'rgpd' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Marco RGPD / LPD 2026</h2>
                    <p>Bajo el Reglamento General de Protección de Datos (RGPD) europeo y la Ley de Protección de Datos (LPD) argentina, garantizamos los derechos ARCO de nuestros clientes.</p>
                    <ul>
                      <li>Derecho de Acceso.</li>
                      <li>Derecho de Rectificación.</li>
                      <li>Derecho de Cancelación (Derecho al olvido).</li>
                      <li>Derecho de Oposición.</li>
                    </ul>
                    <p className="mt-4">Contacto DPO: <a href="mailto:dpo@glastor.dev">dpo@glastor.dev</a></p>
                  </div>
                )}

                {activeDoc === 'arrepentimiento' && (
                  <div>
                    <h2 className="mb-8 border-b border-red-500/20 pb-4 text-white">Cancelación / Botón de Arrepentimiento</h2>
                    <p>De acuerdo con la resolución 424/2020 de la Secretaría de Comercio Interior, los clientes tienen el derecho de revocar la contratación de servicios dentro del plazo de 10 días desde su aceptación.</p>
                    
                    <Card className="mt-8 bg-zinc-900 border border-white/10 p-8 rounded-none shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                      <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada a Legal.'); }}>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Email de Contacto</label>
                          <input type="email" required className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="tu@empresa.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">ID de Contrato / MSA</label>
                          <input type="text" required className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Ej: MSA-2026-XYZ" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Motivo (Opcional)</label>
                          <textarea className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors h-32" placeholder="Dinos por qué te vas..."></textarea>
                        </div>
                        <Button type="submit" variant="destructive" size="lg" className="h-16 uppercase tracking-widest text-base mt-4 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]">
                          Solicitar Revocación de Contrato
                        </Button>
                      </form>
                    </Card>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
