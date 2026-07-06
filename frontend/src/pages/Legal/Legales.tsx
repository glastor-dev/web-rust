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
  { id: 'arrepentimiento', title: 'Botón de Arrepentimiento' },
];

export default function Legales() {
  const [activeDoc, setActiveDoc] = useState('privacidad');
  const { hash } = useLocation();

  // Escuchar el hash de la URL para abrir el tab correcto directamente
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      if (legalDocuments.some((doc) => doc.id === id)) {
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
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">
                Documentos
              </h3>

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
                <p className="text-zinc-500 text-sm">
                  Última actualización: <strong className="text-white">Julio 2026</strong>
                </p>
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
                    <h2 className="mb-8 border-b border-white/10 pb-4">
                      Política de Privacidad de Glastor
                    </h2>
                    <p className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest">
                      Fecha de entrada en vigor: 6 de julio de 2026
                    </p>

                    <p>
                      En Glastor, construimos sistemas inquebrantables. Eso incluye la seguridad de
                      tus datos. No comerciamos con información, no usamos rastreadores ocultos y
                      minimizamos la recolección al máximo.
                    </p>

                    <p className="mt-4">
                      Esta política explica cómo recopilamos, usamos, protegemos y compartimos tu
                      información personal cuando interactúas con nosotros, en cumplimiento del
                      Reglamento General de Protección de Datos (RGPD) de la UE (aplicable en
                      España) y de la Ley 25.326 de Protección de Datos Personales de Argentina,
                      incluyendo su normativa complementaria.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">1. Datos que recopilamos</h3>
                    <p>
                      Solo recopilamos los datos estrictamente necesarios para comunicarnos con
                      nuestros clientes B2B cuando se agendan reuniones, auditorías técnicas o se
                      solicitan presupuestos:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Información de contacto y cuenta:</strong> nombre, apellidos, correo
                        electrónico corporativo, número de teléfono, empresa, cargo o función, país
                        e idioma.
                      </li>
                      <li>
                        <strong>Detalles del proyecto:</strong> información sobre el alcance,
                        necesidades técnicas y objetivos del proyecto que nos proporcione
                        voluntariamente.
                      </li>
                      <li>
                        <strong>Datos de uso del sitio web:</strong> dirección IP, tipo de navegador
                        y dispositivo, sistema operativo, páginas visitadas, fecha y hora de acceso,
                        y URL de referencia. Estos datos se utilizan con fines estadísticos y de
                        mejora del servicio, y no permiten identificarle directamente.
                      </li>
                      <li>
                        <strong>Registros de comunicación:</strong> intercambios de correos
                        electrónicos, grabaciones de llamadas (con su consentimiento previo cuando
                        sea necesario) y transcripciones de conversaciones con nuestro equipo.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      2. Finalidad del tratamiento y base legal
                    </h3>
                    <p>
                      Tratamos sus datos personales para las siguientes finalidades, siempre con una
                      base legal válida:
                    </p>
                    <div className="overflow-x-auto mt-4 mb-8">
                      <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-white/5 text-white">
                          <tr>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Finalidad
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Base legal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border border-white/10">
                              Gestionar su solicitud de información, reuniones o auditorías
                              técnicas.
                            </td>
                            <td className="p-4 border border-white/10">
                              Interés legítimo (art. 6.1.f RGPD) / Relación contractual (art. 6.1.b
                              RGPD) para atender su consulta.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10">
                              Mantener una comunicación comercial y enviarle información sobre
                              nuestros servicios que puedan interesarle.
                            </td>
                            <td className="p-4 border border-white/10">
                              Consentimiento (art. 6.1.a RGPD), que puede retirar en cualquier
                              momento.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10">
                              Mejorar nuestros servicios y sitio web mediante análisis de uso.
                            </td>
                            <td className="p-4 border border-white/10">
                              Interés legítimo para optimizar la experiencia del usuario y la
                              seguridad de nuestros sistemas.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10">
                              Cumplir con obligaciones legales o regulatorias (ej. requerimientos
                              judiciales).
                            </td>
                            <td className="p-4 border border-white/10">
                              Obligación legal (art. 6.1.c RGPD).
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-white mt-12 mb-4 font-bold">3. Plazos de conservación</h3>
                    <p>
                      Sus datos personales se conservarán durante el tiempo estrictamente necesario
                      para cumplir con las finalidades para las que fueron recopilados:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Datos de contacto y proyecto:</strong> se mantendrán durante la
                        vigencia de la relación comercial y, una vez finalizada, durante los plazos
                        de prescripción de acciones legales (ej. 5 años en España para obligaciones
                        mercantiles) o hasta que usted solicite su supresión.
                      </li>
                      <li>
                        <strong>Datos de uso del sitio web:</strong> se conservan de forma agregada
                        y anonimizada por un periodo máximo de 26 meses, o el tiempo necesario para
                        fines de mejora y seguridad.
                      </li>
                      <li>
                        <strong>Registros de comunicación:</strong> se conservan durante el tiempo
                        necesario para gestionar su solicitud y, posteriormente, durante los plazos
                        legales aplicables.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Almacenamiento y Seguridad
                    </h3>
                    <p>
                      Toda la información de contacto está cifrada y almacenada en infraestructuras
                      con certificación ISO 27001. Además, implementamos medidas técnicas y
                      organizativas para proteger sus datos contra pérdida, robo, acceso no
                      autorizado o divulgación:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>Cifrado de datos en tránsito (TLS/SSL) y en reposo.</li>
                      <li>Controles de acceso basados en el principio de mínimo privilegio.</li>
                      <li>Autenticación reforzada para el acceso a sistemas internos.</li>
                      <li>
                        Monitoreo continuo para detectar y prevenir vulnerabilidades o brechas de
                        seguridad.
                      </li>
                    </ul>
                    <p className="mt-4">
                      En caso de producirse una brecha de seguridad que afecte a sus datos
                      personales, notificaremos a las autoridades de control competentes (AEPD en
                      España o AAIP en Argentina) dentro del plazo máximo de 72 horas desde que
                      tengamos conocimiento, y le informaremos a usted sin demora cuando sea
                      requerido por la ley.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      5. Cesión y Transferencia de Datos
                    </h3>
                    <p>
                      No compartimos sus datos personales con terceros, salvo en los siguientes
                      casos:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Proveedores de servicios:</strong> contamos con encargados de
                        tratamiento que actúan en nuestro nombre para prestar servicios (ej.
                        alojamiento web, envío de correos, plataformas de gestión). Exigimos a estos
                        proveedores las mismas garantías de seguridad y confidencialidad.
                      </li>
                      <li>
                        <strong>Obligación legal:</strong> podemos divulgar datos para cumplir con
                        una ley, un procedimiento judicial o un requerimiento de una autoridad
                        competente (España o Argentina).
                      </li>
                      <li>
                        <strong>Transferencias internacionales:</strong> sus datos pueden ser
                        transferidos a servidores ubicados fuera del Espacio Económico Europeo o de
                        Argentina. En todos los casos, garantizamos un nivel de protección adecuado
                        mediante Cláusulas Contractuales Tipo de la Comisión Europea u otros
                        mecanismos legales válidos. Puede solicitarnos una copia de estas garantías.
                      </li>
                    </ul>
                    <p className="mt-4 text-white font-bold">
                      En ningún caso venderemos, alquilaremos o comercializaremos sus datos
                      personales.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">6. Sus derechos</h3>
                    <p>
                      Usted tiene derechos sobre sus datos personales. Puede ejercerlos de forma
                      gratuita en cualquier momento enviando un correo electrónico a{' '}
                      <a href="mailto:privacy@glastor.com" className="text-brand hover:underline">
                        privacy@glastor.com
                      </a>{' '}
                      con el asunto "Protección de Datos" y adjuntando una copia de su documento de
                      identidad:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Acceso:</strong> saber qué datos tenemos sobre usted y cómo los
                        usamos.
                      </li>
                      <li>
                        <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
                      </li>
                      <li>
                        <strong>Supresión:</strong> solicitar la eliminación de sus datos (derecho
                        al olvido).
                      </li>
                      <li>
                        <strong>Oposición:</strong> oponerse a que tratemos sus datos para fines de
                        marketing directo.
                      </li>
                      <li>
                        <strong>Limitación del tratamiento:</strong> solicitar que suspendamos el
                        tratamiento en ciertas circunstancias.
                      </li>
                      <li>
                        <strong>Portabilidad:</strong> recibir los datos que nos haya facilitado en
                        un formato estructurado y legible.
                      </li>
                      <li>
                        <strong>Retirar el consentimiento:</strong> si el tratamiento se basa en su
                        consentimiento, puede retirarlo en cualquier momento.
                      </li>
                    </ul>
                    <p className="mt-4">
                      Si no queda satisfecho con nuestra respuesta, tiene derecho a presentar una
                      reclamación ante la autoridad de control correspondiente:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        En España: Agencia Española de Protección de Datos (AEPD) -{' '}
                        <a
                          href="https://www.aepd.es"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          www.aepd.es
                        </a>
                      </li>
                      <li>
                        En Argentina: Agencia de Acceso a la Información Pública (AAIP) -{' '}
                        <a
                          href="https://www.argentina.gob.ar/aaip"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          www.argentina.gob.ar/aaip
                        </a>
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">7. Información de contacto</h3>
                    <p>
                      Si tiene preguntas sobre esta política o el tratamiento de sus datos, puede
                      contactarnos a través de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Correo electrónico:</strong>{' '}
                        <a href="mailto:privacy@glastor.com" className="text-brand hover:underline">
                          privacy@glastor.com
                        </a>
                      </li>
                      <li>
                        <strong>Dirección postal:</strong> 9 de Julio 614, Tristán Suárez, Buenos
                        Aires (CP: 1806), Argentina.
                      </li>
                    </ul>
                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Glastor se reserva el derecho de modificar esta política para adaptarla a
                      cambios legislativos o jurisprudenciales. Le notificaremos cualquier cambio
                      significativo mediante un aviso en nuestro sitio web o por correo electrónico.
                    </p>
                  </div>
                )}

                {activeDoc === 'aviso-legal' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Aviso Legal</h2>
                    <p>
                      El presente Aviso Legal regula el uso y acceso al sitio web{' '}
                      <strong>glastor.es</strong>, propiedad de GLASTOR® (en adelante, "la
                      Empresa").
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      1. Información de la Empresa
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                      <li>
                        <strong>Titular:</strong> ANDRES ANTONIO CARDOSO
                      </li>
                      <li>
                        <strong>CUIT:</strong> 23253165669 (Responsable Inscripto)
                      </li>
                      <li>
                        <strong>Dominio:</strong> GLASTOR.ES
                      </li>
                      <li>
                        <strong>Email de Contacto:</strong>{' '}
                        <a href="mailto:ventas@glastor.es" className="text-brand hover:underline">
                          ventas@glastor.es
                        </a>
                      </li>
                      <li>
                        <strong>Dirección Postal:</strong> 9 de Julio 614, Tristán Suárez, Buenos
                        Aires (CP: 1806), Argentina
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-zinc-500">
                      Datos adicionales para cumplimiento en España (si aplica actividad comercial
                      en España o se ofrecen servicios a ciudadanos españoles):
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-500 text-sm mt-2">
                      <li>
                        <strong>NIF/CIF:</strong> [Incluir NIF español si se dispone de uno]
                      </li>
                      <li>
                        <strong>Registro Mercantil:</strong> [Número de inscripción, tomo y folio si
                        corresponde]
                      </li>
                      <li>
                        <strong>Datos de la Agencia Española de Protección de Datos (AEPD):</strong>{' '}
                        [Código de inscripción si procede]
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      2. Condiciones de Uso del Sitio Web
                    </h3>
                    <p>
                      El acceso y uso de este sitio web implica la aceptación plena de las
                      disposiciones incluidas en este Aviso Legal. El usuario se compromete a:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Utilizar el sitio web y sus contenidos de conformidad con la ley, la moral y
                        el orden público.
                      </li>
                      <li>
                        No utilizar los contenidos con fines ilícitos o lesivos para la Empresa o
                        terceros.
                      </li>
                      <li>
                        No realizar acciones que puedan dañar, inutilizar o sobrecargar el sitio
                        web.
                      </li>
                    </ul>
                    <p className="mt-4">
                      La Empresa se reserva el derecho de modificar las condiciones de acceso y uso
                      del sitio en cualquier momento, sin previo aviso, y de denegar o retirar el
                      acceso a aquellos usuarios que incumplan estas condiciones.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      3. Propiedad Intelectual e Industrial
                    </h3>
                    <p>
                      El código fuente, los diseños gráficos, las imágenes, las animaciones, el
                      software, los textos y los contenidos recogidos en glastor.es están protegidos
                      por la legislación aplicable en materia de propiedad intelectual e industrial
                      y son propiedad exclusiva de GLASTOR®.
                    </p>
                    <p className="mt-4">
                      Queda prohibida la reproducción, distribución, comunicación pública,
                      transformación o cualquier otra forma de explotación de los contenidos del
                      sitio, salvo autorización expresa por escrito de la Empresa. La infracción de
                      estos derechos podrá dar lugar a las acciones legales correspondientes.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Limitación de Responsabilidad
                    </h3>
                    <p>
                      La Empresa no garantiza la disponibilidad continuada del sitio web, ni que su
                      funcionamiento sea ininterrumpido o libre de errores.
                    </p>
                    <p className="mt-4">No se responsabiliza de:</p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Los daños o perjuicios que puedan derivarse de la interrupción, mal
                        funcionamiento o imposibilidad de acceso al sitio web.
                      </li>
                      <li>La presencia de virus u otros elementos lesivos en los contenidos.</li>
                      <li>El uso que los usuarios hagan de los contenidos del sitio.</li>
                      <li>
                        Los enlaces a sitios web de terceros, sobre cuyo contenido y funcionamiento
                        no tiene control alguno.
                      </li>
                    </ul>
                    <p className="mt-4">
                      La Empresa excluye cualquier responsabilidad por los daños y perjuicios de
                      toda naturaleza que pudieran derivarse de la mala utilización de los servicios
                      y contenidos del sitio web.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">5. Política de Cookies</h3>
                    <p>
                      Este sitio web utiliza cookies para mejorar la experiencia del usuario,
                      analizar el tráfico y personalizar contenidos. Las cookies son pequeños
                      archivos de texto que se almacenan en el dispositivo del usuario.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Cookies técnicas:</strong> necesarias para el funcionamiento básico
                        del sitio.
                      </li>
                      <li>
                        <strong>Cookies de análisis:</strong> nos ayudan a entender cómo interactúan
                        los usuarios con el sitio.
                      </li>
                      <li>
                        <strong>Cookies de preferencias:</strong> permiten recordar configuraciones
                        del usuario.
                      </li>
                    </ul>
                    <p className="mt-4">
                      El usuario puede configurar su navegador para rechazar todas las cookies o
                      para recibir una notificación cuando se instala una cookie. Sin embargo,
                      algunas funcionalidades del sitio pueden verse afectadas.
                    </p>
                    <p className="mt-4">
                      Para más información, consulte nuestra Política de Cookies.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      6. Protección de Datos Personales
                    </h3>
                    <p>
                      En cumplimiento del Reglamento General de Protección de Datos (RGPD) de la UE
                      y la Ley 25.326 de Protección de Datos Personales de Argentina, le informamos
                      que los datos personales que nos facilite a través de este sitio web serán
                      tratados de forma confidencial y con las medidas de seguridad adecuadas.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Responsable del tratamiento:</strong> ANDRES ANTONIO CARDOSO
                      </li>
                      <li>
                        <strong>Finalidades:</strong> Gestionar su solicitud de información o
                        contacto. Mantener comunicaciones comerciales y técnicas. Mejorar nuestros
                        servicios mediante análisis de uso.
                      </li>
                      <li>
                        <strong>Derechos:</strong> Puede ejercer sus derechos de acceso,
                        rectificación, supresión, oposición, limitación del tratamiento y
                        portabilidad enviando un correo a{' '}
                        <a href="mailto:privacy@glastor.com" className="text-brand hover:underline">
                          privacy@glastor.com
                        </a>{' '}
                        con una copia de su documento de identidad.
                      </li>
                    </ul>
                    <p className="mt-4">
                      Para más información sobre cómo tratamos sus datos, consulte nuestra Política
                      de Privacidad.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      7. Ley Aplicable y Jurisdicción
                    </h3>
                    <p>
                      Para la resolución de cualquier controversia derivada del uso del sitio web,
                      serán de aplicación las leyes de la República Argentina y, en su caso, las de
                      España, dependiendo de la jurisdicción competente según la naturaleza de la
                      relación con el usuario.
                    </p>
                    <p className="mt-4">
                      En el caso de usuarios en España, serán competentes los Juzgados y Tribunales
                      de la ciudad de [incluir ciudad de la sede en España, si existe]. En el caso
                      de usuarios en Argentina, serán competentes los tribunales de la ciudad de
                      Buenos Aires.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">8. Actualizaciones</h3>
                    <p>
                      Este Aviso Legal se actualizó por última vez el 6 de julio de 2026. Glastor se
                      reserva el derecho de modificar el presente Aviso Legal para adaptarlo a
                      cambios legislativos o jurisprudenciales. Notificaremos cualquier cambio
                      significativo mediante un aviso en nuestro sitio web o por correo electrónico.
                    </p>

                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Contacto para consultas legales:{' '}
                      <a href="mailto:legal@glastor.com" className="text-brand hover:underline">
                        legal@glastor.com
                      </a>
                    </p>
                  </div>
                )}

                {activeDoc === 'cookies' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">
                      Política de Cookies de Glastor
                    </h2>
                    <p className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest">
                      Fecha de entrada en vigor: 6 de julio de 2026
                    </p>
                    <p>
                      En Glastor, construimos sistemas inquebrantables. Eso incluye la transparencia
                      sobre cómo usamos las cookies en nuestro sitio web. Esta política explica qué
                      son las cookies, cómo las utilizamos y cómo puede gestionar sus preferencias,
                      en cumplimiento del Reglamento General de Protección de Datos (RGPD) de la UE
                      y la Ley 25.326 de Protección de Datos Personales de Argentina.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">1. ¿Qué son las cookies?</h3>
                    <p>
                      Las cookies son pequeños archivos de texto que los sitios web que visita el
                      usuario envían a su dispositivo (ordenador, tablet, smartphone), donde se
                      almacenan para ser retransmitidas al mismo sitio en una visita posterior. Las
                      cookies permiten al sitio web recordar acciones y preferencias del usuario
                      durante un período de tiempo, facilitando la navegación y mejorando la
                      experiencia.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      2. Tipos de cookies que utilizamos
                    </h3>
                    <p>Clasificamos las cookies según su finalidad:</p>
                    <div className="overflow-x-auto mt-4 mb-8">
                      <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-white/5 text-white">
                          <tr>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Tipo
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Finalidad
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              ¿Requieren consentimiento?
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border border-white/10">
                              Cookies técnicas (esenciales)
                            </td>
                            <td className="p-4 border border-white/10">
                              Son necesarias para el funcionamiento básico del sitio web. Permiten
                              mantener la sesión del usuario, prevenir ataques CSRF, gestionar la
                              seguridad y garantizar la estabilidad de la plataforma.
                            </td>
                            <td className="p-4 border border-white/10 text-brand font-bold">
                              No, son imprescindibles.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10">
                              Cookies de rendimiento (analíticas)
                            </td>
                            <td className="p-4 border border-white/10">
                              Recopilan información sobre cómo los usuarios interactúan con el sitio
                              web (ej. tiempos de carga de páginas, páginas más visitadas, errores).
                              Utilizamos esta información para mejorar el rendimiento y la
                              experiencia del usuario. La información es anonimizada y agregada.
                            </td>
                            <td className="p-4 border border-white/10 text-yellow-500 font-bold">
                              Sí, el usuario debe dar su consentimiento previo.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      3. Cookies específicas utilizadas
                    </h3>
                    <p>A continuación, detallamos las cookies que instalamos en nuestro sitio:</p>
                    <div className="overflow-x-auto mt-4 mb-8">
                      <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-white/5 text-white">
                          <tr>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Nombre de la cookie
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Proveedor
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Tipo
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Duración
                            </th>
                            <th className="p-4 font-mono uppercase tracking-widest border border-white/10">
                              Descripción
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border border-white/10 font-mono text-xs">
                              session_id
                            </td>
                            <td className="p-4 border border-white/10">Glastor</td>
                            <td className="p-4 border border-white/10">Técnica</td>
                            <td className="p-4 border border-white/10">Sesión</td>
                            <td className="p-4 border border-white/10">
                              Identifica la sesión del usuario para mantenerla activa mientras
                              navega.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10 font-mono text-xs">
                              csrf_token
                            </td>
                            <td className="p-4 border border-white/10">Glastor</td>
                            <td className="p-4 border border-white/10">Técnica</td>
                            <td className="p-4 border border-white/10">Sesión</td>
                            <td className="p-4 border border-white/10">
                              Previene ataques de falsificación de solicitudes entre sitios (CSRF).
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10 font-mono text-xs">_ga</td>
                            <td className="p-4 border border-white/10">Google Analytics</td>
                            <td className="p-4 border border-white/10">Rendimiento</td>
                            <td className="p-4 border border-white/10">2 años</td>
                            <td className="p-4 border border-white/10">
                              Registra un ID único para generar datos estadísticos sobre cómo el
                              usuario utiliza el sitio web.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border border-white/10 font-mono text-xs">_gid</td>
                            <td className="p-4 border border-white/10">Google Analytics</td>
                            <td className="p-4 border border-white/10">Rendimiento</td>
                            <td className="p-4 border border-white/10">24 horas</td>
                            <td className="p-4 border border-white/10">
                              Almacena y cuenta las páginas visitadas por un usuario.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Gestión de cookies y consentimiento
                    </h3>
                    <p>
                      Al acceder por primera vez a nuestro sitio web, se le mostrará un banner de
                      consentimiento que le permitirá:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>Aceptar todas las cookies (técnicas y de rendimiento).</li>
                      <li>Rechazar las cookies de rendimiento, conservando solo las técnicas.</li>
                      <li>
                        Personalizar sus preferencias accediendo al Panel de Preferencias de
                        Cookies, disponible en cualquier momento en el pie de página del sitio.
                      </li>
                    </ul>
                    <p className="mt-4">
                      El consentimiento para las cookies de rendimiento es libre, expreso e
                      informado. Puede retirar su consentimiento en cualquier momento con la misma
                      facilidad con que lo otorgó, accediendo al panel de preferencias o
                      configurando su navegador para bloquear o eliminar cookies.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      5. Cómo desactivar o eliminar cookies en el navegador
                    </h3>
                    <p>
                      Además de nuestro panel de preferencias, usted puede configurar su navegador
                      para bloquear o eliminar cookies. A continuación, enlaces a las instrucciones
                      de los navegadores más comunes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <a
                          href="https://support.google.com/chrome/answer/95647"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          Google Chrome
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          Mozilla Firefox
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          Microsoft Edge
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          Safari
                        </a>
                      </li>
                    </ul>
                    <p className="mt-4">
                      Tenga en cuenta que desactivar las cookies técnicas puede afectar al
                      funcionamiento de algunas partes del sitio web.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      6. Transferencia de datos y terceros
                    </h3>
                    <p>
                      Las cookies de rendimiento pueden ser instaladas por terceros proveedores (ej.
                      Google Analytics), que actúan como encargados del tratamiento en nuestro
                      nombre. Estos terceros pueden tener acceso a los datos recopilados para
                      prestar sus servicios, pero están sujetos a acuerdos de confidencialidad y
                      seguridad que garantizan un nivel de protección adecuado, incluyendo, en su
                      caso, Cláusulas Contractuales Tipo de la Comisión Europea para transferencias
                      internacionales.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">7. Actualizaciones</h3>
                    <p>
                      Esta Política de Cookies se actualizó por última vez el 6 de julio de 2026.
                      Glastor se reserva el derecho de modificarla para adaptarla a cambios
                      legislativos o jurisprudenciales. Notificaremos cualquier cambio significativo
                      mediante un aviso en nuestro sitio web.
                    </p>

                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Contacto: Si tiene preguntas sobre esta política, puede contactarnos en{' '}
                      <a href="mailto:privacy@glastor.com" className="text-brand hover:underline">
                        privacy@glastor.com
                      </a>
                      .<br />
                      <br />
                      Para más información sobre cómo tratamos sus datos personales, consulte
                      nuestra{' '}
                      <a href="#privacidad" className="text-brand hover:underline">
                        Política de Privacidad
                      </a>
                      .
                    </p>
                  </div>
                )}

                {activeDoc === 'condiciones' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Condiciones de Venta</h2>
                    <p className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest">
                      Fecha de entrada en vigor: 6 de julio de 2026
                    </p>
                    <p>
                      Las presentes Condiciones de Venta regulan la relación contractual entre
                      GLASTOR® (en adelante, "la Empresa" o "el Prestador") y sus clientes para la
                      prestación de servicios de ingeniería de software y soluciones tecnológicas,
                      en cumplimiento del Reglamento General de Protección de Datos (RGPD) de la UE,
                      la Ley 25.326 de Protección de Datos Personales de Argentina y la Ley 24.240
                      de Defensa del Consumidor de Argentina.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      1. Objeto y ámbito de aplicación
                    </h3>
                    <p>
                      Glastor provee servicios B2B de ingeniería de software, incluyendo, de forma
                      enunciativa y no limitativa:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>Desarrollo de software a medida</li>
                      <li>Consultoría tecnológica y arquitectura de sistemas</li>
                      <li>Servicios de outsourcing y equipos dedicados (dedicated teams)</li>
                      <li>Auditoría técnica y análisis de rendimiento</li>
                      <li>Mantenimiento y soporte de sistemas</li>
                    </ul>
                    <p className="mt-4">
                      Las presentes condiciones se aplican a todos los contratos de servicios
                      celebrados entre Glastor y sus clientes, ya sea mediante contratos
                      individuales, órdenes de trabajo (SOW) o acuerdos marco (MSA). En caso de
                      conflicto entre estas condiciones y un contrato particular, prevalecerá lo
                      establecido en el contrato específico.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      2. Estructura contractual: MSA y SOW
                    </h3>
                    <p>
                      Los contratos de desarrollo se negocian bajo un formato de Master Service
                      Agreement (MSA) personalizado para cada cliente. Esta estructura permite:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>MSA (Acuerdo Marco):</strong> establece las condiciones generales
                        que regirán toda la relación comercial (confidencialidad, propiedad
                        intelectual, responsabilidad, resolución de disputas, etc.), sin necesidad
                        de renegociarlas para cada proyecto.
                      </li>
                      <li>
                        <strong>SOW (Órdenes de Trabajo):</strong> documentos específicos para cada
                        proyecto o encargo, que detallan el alcance, plazos, entregables, tarifas y
                        condiciones particulares.
                      </li>
                    </ul>
                    <p className="mt-4">
                      Las tarifas, cronogramas de pago y niveles de servicio (SLAs) se establecen en
                      las Órdenes de Trabajo (SOW) adjuntas a cada contrato comercial. En caso de
                      conflicto entre el MSA y un SOW, el orden de prelación se establecerá en el
                      propio contrato, siendo lo habitual que el MSA prevalezca en materias legales
                      y el SOW en aspectos específicos del proyecto.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">3. Proceso de contratación</h3>
                    <p>
                      El proceso de contratación de servicios de Glastor se desarrolla de la
                      siguiente manera:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Solicitud de información o presupuesto:</strong> El cliente contacta
                        con Glastor mediante el formulario web, correo electrónico o teléfono,
                        describiendo sus necesidades.
                      </li>
                      <li>
                        <strong>Reunión de análisis:</strong> Se programa una reunión para conocer
                        en detalle el alcance del proyecto y definir los requisitos técnicos.
                      </li>
                      <li>
                        <strong>Propuesta comercial:</strong> Glastor presenta una propuesta
                        detallada con el alcance, metodología, equipo propuesto, cronograma estimado
                        y presupuesto.
                      </li>
                      <li>
                        <strong>Firma del MSA (si procede):</strong> Para relaciones continuadas o
                        múltiples proyectos, se negocia y firma un acuerdo marco.
                      </li>
                      <li>
                        <strong>Firma del SOW:</strong> Se documenta el proyecto específico en una
                        Orden de Trabajo, que incluye entregables, plazos y condiciones de pago.
                      </li>
                      <li>
                        <strong>Ejecución del servicio:</strong> Glastor lleva a cabo los servicios
                        conforme a lo acordado, con comunicación periódica y seguimiento.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Precios, tarifas y condiciones de pago
                    </h3>
                    <p>
                      <strong>Modelos de facturación:</strong> Glastor ofrece diferentes modelos de
                      facturación según el tipo de servicio:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Tiempo y materiales (Time & Material):</strong> facturación por
                        horas efectivas de trabajo, con informes periódicos de horas dedicadas.
                      </li>
                      <li>
                        <strong>Por hitos o fases (Waterfall/Milestones):</strong> facturación por
                        objetivos alcanzados, con pagos vinculados a la entrega de cada hito.
                      </li>
                      <li>
                        <strong>Precio fijo (Fixed Price):</strong> precio cerrado por el proyecto
                        completo, con entregables y cronograma definidos.
                      </li>
                      <li>
                        <strong>Equipo dedicado (Dedicated Team):</strong> tarifa mensual por la
                        disponibilidad de un equipo de desarrollo.
                      </li>
                    </ul>
                    <p className="mt-4">
                      <strong>Precios:</strong> Las tarifas se expresan en [moneda: EUR/USD/ARS] y
                      no incluyen impuestos (IVA u otros gravámenes aplicables), los cuales se
                      añadirán al importe final según la legislación vigente.
                    </p>
                    <p className="mt-4">
                      <strong>Condiciones de pago:</strong> Los pagos se realizan mediante
                      [transferencia bancaria/tarjeta de crédito/otros], dentro de los plazos
                      establecidos en cada SOW. Los retrasos en el pago podrán generar intereses
                      moratorios según lo pactado.
                    </p>
                    <p className="mt-4">
                      <strong>Facturación:</strong> Glastor emitirá factura electrónica conforme a
                      los requisitos fiscales de Argentina y/o España, según corresponda.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      5. Plazos de entrega y prestación de servicios
                    </h3>
                    <p>
                      Los plazos de entrega de los servicios se fijarán en cada SOW, de forma
                      específica y conforme a la naturaleza del proyecto. La Empresa se compromete a
                      realizar los servicios con la diligencia debida, ajustándose a las
                      especificaciones y cronogramas acordados.
                    </p>
                    <p className="mt-4">
                      En caso de retraso imputable a Glastor, el cliente tendrá derecho a exigir la
                      ejecución del servicio en un plazo razonable adicional. No se prevén
                      indemnizaciones automáticas por retraso, salvo pacto expreso en el SOW (ej.
                      penalizaciones por incumplimiento de SLAs).
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      6. Derecho de desistimiento y cancelación
                    </h3>
                    <p>
                      <strong>Para consumidores en Argentina:</strong> De conformidad con el art. 34
                      de la Ley 24.240, el cliente consumidor tiene derecho a revocar la aceptación
                      de la oferta dentro de los 10 (diez) días corridos desde la fecha de entrega
                      del producto o contratación del servicio, sin responsabilidad alguna [Ley
                      24.240, art. 34].
                    </p>
                    <p className="mt-4">
                      <strong>Para clientes B2B:</strong> El derecho de desistimiento no se aplica
                      en contratos entre empresas, salvo pacto en contrario. Las cancelaciones de
                      proyectos o SOW se regirán por lo acordado en el contrato específico.
                    </p>
                    <p className="mt-4">
                      <strong>Procedimiento para ejercer el derecho:</strong> El cliente deberá
                      notificar su decisión por escrito a{' '}
                      <a href="mailto:ventas@glastor.es" className="text-brand hover:underline">
                        ventas@glastor.es
                      </a>{' '}
                      dentro del plazo legal establecido.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      7. Garantía y soporte post-venta
                    </h3>
                    <p>
                      <strong>Garantía legal (Argentina):</strong> Los servicios prestados por
                      Glastor gozan de la garantía legal establecida por la Ley 24.240, que es de 6
                      (seis) meses para servicios profesionales, contados desde la recepción del
                      servicio o la finalización del proyecto [Ley 24.240, art. 11]. Durante este
                      período, Glastor se obliga a corregir gratuitamente cualquier defecto
                      imputable a la prestación del servicio.
                    </p>
                    <p className="mt-4">
                      <strong>Soporte y mantenimiento:</strong> Los servicios de soporte
                      post-entrega se acordarán en el SOW correspondiente, pudiendo incluir:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Período de garantía: corrección de errores (bugs) derivados de la
                        implementación.
                      </li>
                      <li>
                        Servicio de mantenimiento evolutivo: mejoras y adaptaciones del software.
                      </li>
                      <li>
                        SLA (Service Level Agreement): tiempos de respuesta y resolución de
                        incidencias.
                      </li>
                    </ul>
                    <p className="mt-4">
                      <strong>Exclusiones:</strong> Quedan excluidos de la garantía los defectos
                      derivados de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>Uso indebido o malintencionado del software.</li>
                      <li>Modificaciones realizadas por terceros no autorizados.</li>
                      <li>Causas de fuerza mayor o caso fortuito.</li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">8. Propiedad intelectual</h3>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                      <li>
                        <strong>Pre-existente:</strong> Cada parte conserva la propiedad de sus
                        derechos de propiedad intelectual preexistentes al contrato.
                      </li>
                      <li>
                        <strong>Desarrollado:</strong> Los entregables (software, documentación,
                        diseños, etc.) desarrollados por Glastor en el marco de un proyecto serán de
                        propiedad del cliente, previo pago íntegro de las tarifas correspondientes,
                        salvo pacto en contrario en el MSA o SOW.
                      </li>
                      <li>
                        <strong>Licencias de terceros:</strong> Glastor podrá utilizar herramientas,
                        bibliotecas o software de terceros bajo licencias de código abierto o
                        comerciales, de las cuales informará al cliente y que serán transferidas
                        conforme a sus propios términos.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      9. Confidencialidad y protección de datos
                    </h3>
                    <p>
                      <strong>Confidencialidad:</strong> Las partes se obligan a mantener la
                      confidencialidad de toda la información comercial, técnica o personal a la que
                      tengan acceso durante la relación contractual, incluso después de su
                      terminación.
                    </p>
                    <p className="mt-4">
                      <strong>Protección de datos:</strong> El tratamiento de datos personales se
                      regirá por lo dispuesto en nuestra Política de Privacidad y, en su caso, por
                      los acuerdos de encargado de tratamiento (DPA) firmados con el cliente, en
                      cumplimiento del RGPD y la Ley 25.326.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      10. Responsabilidad y limitación
                    </h3>
                    <p>
                      <strong>Responsabilidad:</strong> Glastor responderá por los daños y
                      perjuicios directos que se deriven de la ejecución de sus servicios, siempre
                      que sean imputables a dolo o negligencia grave y hayan sido notificados en un
                      plazo de 30 días desde la finalización del servicio.
                    </p>
                    <p className="mt-4">
                      <strong>Limitación:</strong> En ningún caso Glastor será responsable de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Daños indirectos, lucro cesante o pérdida de oportunidades de negocio.
                      </li>
                      <li>
                        Daños derivados del uso o la implementación del software por parte del
                        cliente.
                      </li>
                      <li>
                        Reclamaciones de terceros, salvo que se acredite responsabilidad directa de
                        Glastor.
                      </li>
                    </ul>
                    <p className="mt-4">
                      <strong>Cuantía máxima:</strong> La responsabilidad total de Glastor, por
                      cualquier concepto, no excederá del importe total pagado por el cliente por el
                      servicio o proyecto en concreto que haya generado la reclamación.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      11. Terminación y resolución del contrato
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                      <li>
                        <strong>Plazo:</strong> El MSA tendrá una duración inicial de [12 meses /
                        anual renovable] y se renovará automáticamente por períodos iguales, salvo
                        que una de las partes notifique por escrito su intención de no renovar con
                        al menos [60 días] de antelación a la fecha de vencimiento.
                      </li>
                      <li>
                        <strong>Resolución anticipada:</strong> Cualquiera de las partes podrá
                        resolver el contrato por incumplimiento grave de la otra, otorgando un plazo
                        de [15 días] para subsanar el incumplimiento, o de forma inmediata en caso
                        de incumplimiento irreparable.
                      </li>
                      <li>
                        <strong>Efectos de la terminación:</strong> Al finalizar el contrato,
                        Glastor entregará al cliente todo el material, código y documentación
                        desarrollada, y el cliente pagará las cantidades pendientes por servicios
                        prestados hasta la fecha de terminación.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      12. Ley aplicable y jurisdicción
                    </h3>
                    <p>
                      <strong>Ley aplicable:</strong> Estas Condiciones de Venta se regirán e
                      interpretarán de conformidad con la ley argentina (Ley 24.240 y Ley 25.326) y,
                      en su caso, con la ley española, dependiendo de la naturaleza de la relación y
                      la ubicación del cliente.
                    </p>
                    <p className="mt-4">
                      <strong>Jurisdicción:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Para clientes en Argentina: Las controversias serán sometidas a la
                        jurisdicción de los tribunales ordinarios de [Ciudad Autónoma de Buenos
                        Aires / provincia correspondiente].
                      </li>
                      <li>
                        Para clientes en España: Las controversias serán sometidas a los Juzgados y
                        Tribunales de [ciudad de la sede en España, si existe].
                      </li>
                      <li>
                        Para clientes fuera de Argentina y España: Las partes podrán someterse a
                        arbitraje o a la jurisdicción que acuerden en el contrato específico.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">13. Actualizaciones</h3>
                    <p>
                      Estas Condiciones de Venta se actualizaron por última vez el 6 de julio de
                      2026. Glastor se reserva el derecho de modificarlas para adaptarlas a cambios
                      legislativos o jurisprudenciales. Notificaremos cualquier cambio significativo
                      mediante un aviso en nuestro sitio web.
                    </p>

                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Contacto: Para consultas sobre estas Condiciones de Venta, puede contactarnos
                      en{' '}
                      <a href="mailto:legal@glastor.com" className="text-brand hover:underline">
                        legal@glastor.com
                      </a>{' '}
                      o al teléfono [+[número de contacto]].
                    </p>
                  </div>
                )}

                {activeDoc === 'accesibilidad' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">
                      Política de Accesibilidad Web
                    </h2>
                    <p className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest">
                      Fecha de entrada en vigor: 6 de julio de 2026
                    </p>
                    <p>
                      En Glastor, nos comprometemos a garantizar que nuestro sitio web glastor.es
                      sea accesible para todas las personas, incluidas aquellas con discapacidad.
                      Creemos que la accesibilidad digital es un derecho fundamental y trabajamos
                      continuamente para mejorar la experiencia de usuario de todos los visitantes.
                    </p>
                    <p className="mt-4">
                      Esta política de accesibilidad se redacta en cumplimiento de la Ley 26.653 de
                      Accesibilidad de la Información en las Páginas Web de Argentina, su Decreto
                      Reglamentario 355/2013, y toma como referencia el estándar internacional WCAG
                      2.1 Nivel AA.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">1. Nivel de accesibilidad</h3>
                    <p>
                      Este sitio web ha sido diseñado para cumplir con los criterios de conformidad
                      del Nivel AA de las Pautas de Accesibilidad al Contenido Web (WCAG) 2.1,
                      elaboradas por el World Wide Web Consortium (W3C).
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Estado de conformidad:</strong> Declaración de conformidad parcial
                        (en proceso de adecuación completa).
                      </li>
                      <li>
                        <strong>Fecha de la última revisión:</strong> 6 de julio de 2026.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      2. Características de accesibilidad implementadas
                    </h3>
                    <p>
                      Para garantizar la accesibilidad del sitio, hemos implementado, de forma
                      enunciativa y no limitativa, las siguientes características:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Alto contraste:</strong> Se ha cuidado la relación de contraste
                        entre el texto y los fondos para facilitar la lectura a personas con baja
                        visión.
                      </li>
                      <li>
                        <strong>Tipografía fluida:</strong> Los textos son redimensionables y se
                        adaptan a diferentes tamaños de pantalla y dispositivos.
                      </li>
                      <li>
                        <strong>Soporte para lectores de pantalla:</strong> Los componentes críticos
                        del sitio son compatibles con tecnologías de asistencia (lectores de
                        pantalla como NVDA, JAWS, VoiceOver).
                      </li>
                      <li>
                        <strong>Navegación por teclado:</strong> Es posible navegar por todo el
                        sitio utilizando únicamente el teclado, sin necesidad de ratón.
                      </li>
                      <li>
                        <strong>Estructura semántica:</strong> Los contenidos están organizados con
                        encabezados, listas y etiquetas HTML semánticas que facilitan la comprensión
                        por parte de las tecnologías de asistencia.
                      </li>
                      <li>
                        <strong>Textos alternativos:</strong> Las imágenes no decorativas incluyen
                        texto alternativo descriptivo.
                      </li>
                      <li>
                        <strong>Independencia del navegador:</strong> El sitio es accesible
                        independientemente del navegador utilizado (Chrome, Firefox, Edge, Safari,
                        etc.).
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      3. Contenido no accesible (excepciones)
                    </h3>
                    <p>
                      Actualmente, las siguientes áreas del sitio pueden presentar barreras de
                      accesibilidad que estamos trabajando para corregir:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Documentos descargables (PDF):</strong> Algunos documentos pueden no
                        ser completamente accesibles. Ofrecemos alternativas en formatos accesibles
                        bajo solicitud.
                      </li>
                      <li>
                        <strong>Contenidos de terceros:</strong> No podemos garantizar la
                        accesibilidad de contenidos incrustados de terceros (ej. mapas, vídeos de
                        plataformas externas).
                      </li>
                      <li>
                        <strong>Contenido multimedia:</strong> Algunos vídeos pueden carecer de
                        subtítulos o audio descripción. Estamos en proceso de incorporarlos.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Mecanismo de contacto y solicitudes
                    </h3>
                    <p>
                      Si encuentra alguna barrera de accesibilidad en nuestro sitio web, o si
                      necesita información en un formato accesible (ej. texto plano, audio,
                      braille), puede contactarnos a través de los siguientes canales:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Correo electrónico:</strong>{' '}
                        <a
                          href="mailto:accesibilidad@glastor.com"
                          className="text-brand hover:underline"
                        >
                          accesibilidad@glastor.com
                        </a>
                      </li>
                      <li>
                        <strong>Teléfono:</strong> [+[número de contacto]]
                      </li>
                      <li>
                        <strong>Formulario de contacto:</strong> Disponible en la sección "Contacto"
                        de nuestro sitio web.
                      </li>
                    </ul>
                    <p className="mt-4">
                      Nos comprometemos a responder a su consulta en un plazo máximo de [5 días
                      hábiles] y a ofrecer una solución o alternativa accesible en el menor tiempo
                      posible.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">5. Quejas y reclamaciones</h3>
                    <p>
                      Si no queda satisfecho con nuestra respuesta, tiene derecho a presentar una
                      queja o reclamación ante las autoridades competentes en materia de
                      accesibilidad:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        En Argentina: Agencia de Acceso a la Información Pública (AAIP) -{' '}
                        <a
                          href="https://www.argentina.gob.ar/aaip"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          www.argentina.gob.ar/aaip
                        </a>
                      </li>
                      <li>
                        En España: Ministerio de Derechos Sociales y Agenda 2030 (Unidad de
                        Accesibilidad).
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      6. Compromiso de mejora continua
                    </h3>
                    <p>
                      En Glastor, entendemos que la accesibilidad digital es un proceso en constante
                      evolución. Nos comprometemos a:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>Realizar auditorías periódicas de accesibilidad.</li>
                      <li>Capacitar a nuestro equipo en diseño y desarrollo accesible.</li>
                      <li>
                        Actualizar esta política para reflejar nuevos estándares y requisitos
                        legales.
                      </li>
                      <li>
                        Priorizar la corrección de las barreras de accesibilidad identificadas.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">7. Actualizaciones</h3>
                    <p>
                      Esta Política de Accesibilidad se actualizó por última vez el 6 de julio de
                      2026. Glastor se reserva el derecho de modificarla para adaptarla a cambios
                      legislativos o para reflejar mejoras en la accesibilidad del sitio.
                    </p>

                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Contacto: Para cualquier consulta sobre esta política, puede escribirnos a{' '}
                      <a
                        href="mailto:accesibilidad@glastor.com"
                        className="text-brand hover:underline"
                      >
                        accesibilidad@glastor.com
                      </a>
                      .<br />
                      <br />
                      Para más información sobre cómo tratamos sus datos personales, consulte
                      nuestra{' '}
                      <a href="#privacidad" className="text-brand hover:underline">
                        Política de Privacidad
                      </a>
                      .
                    </p>
                  </div>
                )}

                {activeDoc === 'confidencialidad' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">
                      Aviso de Confidencialidad
                    </h2>
                    <p className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest">
                      Fecha de entrada en vigor: 6 de julio de 2026
                    </p>
                    <p>
                      En Glastor, reconocemos que la información compartida durante nuestras
                      interacciones comerciales, auditorías técnicas y procesos de consultoría es un
                      activo valioso para nuestros clientes y para nosotros. Este Aviso de
                      Confidencialidad establece el marco legal que protege dicha información, en
                      cumplimiento de la Ley 25.326 de Protección de Datos Personales de Argentina,
                      la Ley 1/2019 de Secretos Empresariales de España y el Reglamento General de
                      Protección de Datos (RGPD).
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      1. Ámbito de aplicación y efecto retroactivo
                    </h3>
                    <p>
                      Toda comunicación técnica, arquitectura compartida y secretos industriales
                      discutidos durante las fases de auditoría, consultoría o negociación están
                      protegidos bajo un Acuerdo de Confidencialidad Mutuo (NDA) vinculante desde el
                      primer contacto, incluyendo:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Conversaciones preliminares y reuniones de descubrimiento (discovery).
                      </li>
                      <li>Intercambios de correos electrónicos, documentos y presentaciones.</li>
                      <li>Acceso a sistemas, plataformas o entornos de prueba.</li>
                      <li>Cualquier otra forma de comunicación o transmisión de información.</li>
                    </ul>
                    <p className="mt-4">
                      Este Aviso de Confidencialidad se considera parte integrante de cualquier
                      relación comercial, contractual o precontractual con Glastor, con efecto
                      retroactivo a la fecha del primer contacto significativo.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      2. Definición de información confidencial
                    </h3>
                    <p>
                      A los efectos de este Aviso, se considera Información Confidencial cualquier
                      información, dato, documento, diseño, código fuente, arquitectura de sistemas,
                      metodología, know-how, estrategia comercial, lista de clientes, datos
                      financieros o cualquier otro tipo de información técnica o comercial que:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Sea identificada como confidencial por la parte divulgante, ya sea de forma
                        expresa (marcada como "Confidencial") o de forma implícita por la naturaleza
                        de la información o las circunstancias de su divulgación.
                      </li>
                      <li>
                        Sea compartida entre las partes en el contexto de una relación profesional,
                        evaluación de servicios o negociación contractual.
                      </li>
                    </ul>
                    <p className="mt-4 font-bold text-white">
                      No se considera Información Confidencial:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        La información que sea o llegue a ser de conocimiento público sin culpa de
                        la parte receptora.
                      </li>
                      <li>
                        La información que la parte receptora posea legítimamente con anterioridad a
                        la divulgación, según conste en sus registros.
                      </li>
                      <li>
                        La información desarrollada de forma independiente por la parte receptora
                        sin acceso a la Información Confidencial divulgada.
                      </li>
                      <li>
                        La información que la parte receptora obtenga legítimamente de un tercero
                        sin restricción de confidencialidad.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      3. Obligaciones de las partes
                    </h3>
                    <p className="text-white mt-4 font-bold">3.1. Deber de confidencialidad</p>
                    <p>La parte receptora se obliga a:</p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        No divulgar la Información Confidencial a terceros sin el consentimiento
                        previo y por escrito de la parte divulgante.
                      </li>
                      <li>
                        Utilizar la Información Confidencial exclusivamente para las finalidades
                        relacionadas con la relación comercial, proyecto o auditoría.
                      </li>
                      <li>
                        Limitar el acceso a la Información Confidencial a aquellos empleados,
                        colaboradores o asesores que necesiten conocerla para el desarrollo de las
                        actividades acordadas, informándoles previamente de las obligaciones de
                        confidencialidad.
                      </li>
                      <li>
                        Mantener la Información Confidencial con el mismo grado de cuidado que
                        utiliza para proteger su propia información confidencial, pero en ningún
                        caso con un grado menor al razonablemente exigible.
                      </li>
                    </ul>
                    <p className="text-white mt-8 font-bold">
                      3.2. Deber de confidencialidad legal en Argentina
                    </p>
                    <p className="mt-4">
                      De conformidad con el artículo 10 de la Ley 25.326, el responsable del
                      tratamiento de datos personales y las personas que intervengan en cualquier
                      fase del tratamiento están obligados al secreto profesional respecto de los
                      mismos. Tal obligación subsiste aun después de finalizada su relación con el
                      titular del archivo de datos.
                    </p>
                    <p className="text-white mt-8 font-bold">3.3. Deber de seguridad</p>
                    <p className="mt-4">
                      La parte receptora adoptará las medidas técnicas y organizativas necesarias
                      para garantizar la seguridad de la Información Confidencial, evitando su
                      adulteración, pérdida, consulta o tratamiento no autorizado, de conformidad
                      con el artículo 9 de la Ley 25.326.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Plazo de vigencia de la confidencialidad
                    </h3>
                    <p>
                      La obligación de confidencialidad tendrá una duración de [5 años] desde la
                      fecha de divulgación de la Información Confidencial, o durante el plazo que se
                      establezca en el contrato específico (MSA o SOW) que las partes suscriban, el
                      que sea mayor.
                    </p>
                    <p className="mt-4">
                      En el caso de información que constituya un secreto empresarial conforme a la
                      Ley 1/2019 de España o la normativa argentina aplicable, la obligación de
                      confidencialidad se mantendrá mientras dicha información conserve su condición
                      de secreta, incluso después del vencimiento del plazo indicado.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      5. Excepciones a la obligación de confidencialidad
                    </h3>
                    <p>
                      La parte receptora no estará obligada a mantener la confidencialidad de la
                      información en los siguientes casos:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Requerimiento legal o judicial:</strong> Cuando la divulgación sea
                        requerida por una ley, un tribunal o una autoridad competente. En tal caso,
                        la parte receptora notificará a la parte divulgante con la mayor antelación
                        posible para que pueda oponerse o solicitar medidas de protección.
                      </li>
                      <li>
                        <strong>Seguridad pública o defensa nacional:</strong> Cuando medien razones
                        fundadas relativas a la seguridad pública o la defensa nacional, conforme al
                        artículo 10.2 de la Ley 25.326.
                      </li>
                      <li>
                        <strong>Información de dominio público:</strong> Cuando la información ya
                        sea de público conocimiento o así llegue a serlo sin culpa de la parte
                        receptora.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">6. Propiedad intelectual</h3>
                    <p>
                      La divulgación de Información Confidencial no implica ninguna cesión o
                      licencia de derechos de propiedad intelectual, industrial o de cualquier otra
                      naturaleza. Cada parte conserva la titularidad de sus respectivos derechos
                      sobre la información divulgada.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      7. Consecuencias del incumplimiento
                    </h3>
                    <p>
                      El incumplimiento de las obligaciones de confidencialidad establecidas en este
                      Aviso dará derecho a la parte perjudicada a:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Ejercer acciones judiciales para la cesación del uso o divulgación indebida
                        de la Información Confidencial.
                      </li>
                      <li>
                        Reclamar los daños y perjuicios sufridos como consecuencia del
                        incumplimiento.
                      </li>
                      <li>
                        Solicitar medidas cautelares (embargo, secuestro de documentos, etc.) para
                        evitar daños irreparables.
                      </li>
                    </ul>
                    <p className="mt-4">
                      En Argentina, la violación del deber de confidencialidad puede dar lugar a
                      sanciones administrativas impuestas por la Agencia de Acceso a la Información
                      Pública (AAIP), así como a acciones de hábeas data conforme a la Ley 25.326.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      8. Ley aplicable y jurisdicción
                    </h3>
                    <p>
                      Este Aviso de Confidencialidad se regirá e interpretará de conformidad con:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        La Ley 25.326 de Protección de Datos Personales y el Código Civil y
                        Comercial de Argentina para las relaciones regidas por la ley argentina.
                      </li>
                      <li>
                        La Ley 1/2019 de Secretos Empresariales y el Reglamento General de
                        Protección de Datos (RGPD) para las relaciones regidas por la ley española.
                      </li>
                    </ul>
                    <p className="mt-4">
                      Las controversias derivadas de este Aviso se someterán a la jurisdicción de
                      los tribunales de [Ciudad Autónoma de Buenos Aires / ciudad en España], según
                      corresponda.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">9. Actualizaciones</h3>
                    <p>
                      Este Aviso de Confidencialidad se actualizó por última vez el 6 de julio de
                      2026. Glastor se reserva el derecho de modificarlo para adaptarlo a cambios
                      legislativos o jurisprudenciales.
                    </p>

                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Contacto: Para cualquier consulta sobre este Aviso de Confidencialidad, puede
                      contactarnos en{' '}
                      <a href="mailto:legal@glastor.com" className="text-brand hover:underline">
                        legal@glastor.com
                      </a>
                      .
                    </p>
                  </div>
                )}

                {activeDoc === 'defensa-consumidor' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">
                      Política de Defensa del Consumidor
                    </h2>
                    <p className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest">
                      Fecha de entrada en vigor: 6 de julio de 2026
                    </p>
                    <p>
                      En Glastor, operamos globalmente y respetamos los derechos consagrados en la
                      Ley de Defensa del Consumidor de la República Argentina (Ley 24.240), su
                      Decreto Reglamentario y disposiciones complementarias (Disposición 954/2025 y
                      Disposición 3/2026), así como las directivas equivalentes en la Unión Europea
                      (Directiva 2011/83/UE) para la prestación de servicios digitales.
                    </p>
                    <p className="mt-4">
                      Esta política explica sus derechos como consumidor y los mecanismos que
                      ponemos a su disposición para ejercerlos.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      1. Información de la empresa y datos de contacto
                    </h3>
                    <p>
                      GLASTOR® es una empresa proveedora de servicios de ingeniería de software,
                      consultoría tecnológica y soluciones digitales B2B, pero también respetamos
                      los derechos de los consumidores en los términos de la ley.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Titular:</strong> ANDRES ANTONIO CARDOSO
                      </li>
                      <li>
                        <strong>CUIT:</strong> 23253165669 (Responsable Inscripto)
                      </li>
                      <li>
                        <strong>Dominio:</strong> GLASTOR.ES
                      </li>
                      <li>
                        <strong>Email de Contacto:</strong>{' '}
                        <a href="mailto:ventas@glastor.es" className="text-brand hover:underline">
                          ventas@glastor.es
                        </a>
                      </li>
                      <li>
                        <strong>Dirección Postal:</strong> 9 de Julio 614, Tristán Suárez, Buenos
                        Aires (CP: 1806), Argentina
                      </li>
                    </ul>
                    <p className="mt-4">
                      <strong>Atención al consumidor:</strong> Disponemos de un servicio de atención
                      al consumidor a través del correo{' '}
                      <a
                        href="mailto:atencionconsumidor@glastor.com"
                        className="text-brand hover:underline"
                      >
                        atencionconsumidor@glastor.com
                      </a>{' '}
                      y del teléfono [+[número de contacto]], con horario de atención de lunes a
                      viernes de 9:00 a 17:00 horas (8 horas diarias), en cumplimiento de la
                      normativa aplicable.
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">2. Botón de arrepentimiento</h3>
                    <p>
                      En cumplimiento del artículo 34 de la Ley 24.240 y la Disposición 954/2025,
                      nuestro sitio web glastor.es cuenta con un "BOTÓN DE ARREPENTIMIENTO" visible
                      en lugar destacado en la página de inicio y en el primer acceso.
                    </p>
                    <p className="mt-4">
                      A través de este botón, usted puede solicitar la revocación de la aceptación
                      del producto adquirido o del servicio contratado dentro del plazo legal de 10
                      (diez) días corridos desde la fecha de entrega del producto o contratación del
                      servicio.
                    </p>
                    <p className="mt-4">
                      <strong>Importante:</strong> Para hacer uso de este derecho, no requerimos
                      registración previa ni ningún otro trámite adicional. Únicamente solicitaremos
                      la verificación de su identidad a través de medios razonables y habituales,
                      con fines exclusivos de seguridad y prevención de fraudes.
                    </p>
                    <p className="mt-4">
                      <strong>
                        Exenciones al derecho de arrepentimiento (art. 1116 CCCN y art. 3 Disp.
                        954/2025):
                      </strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Productos o servicios que hayan sido efectivamente utilizados o consumidos.
                      </li>
                      <li>
                        Contrataciones de productos o servicios con fines de reventa o integración
                        en procesos productivos (B2B).
                      </li>
                      <li>Productos perecederos.</li>
                      <li>
                        Contratos de servicios con fecha determinada (ej. turismo, hotelería), donde
                        se requiere 24 horas de antelación.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      3. Botón de baja de servicios
                    </h3>
                    <p>
                      En cumplimiento del artículo 10 ter de la Ley 24.240 y la Disposición
                      954/2025, nuestro sitio web cuenta con un "BOTÓN DE BAJA DE SERVICIO" visible
                      en lugar destacado en la página de inicio.
                    </p>
                    <p className="mt-4">
                      A través de este botón, usted puede solicitar la baja de cualquier servicio
                      contratado a distancia o por medios electrónicos.
                    </p>
                    <p className="mt-4">
                      <strong>Procedimiento de baja:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        Usted solicita la baja a través del botón, sin necesidad de registración
                        previa.
                      </li>
                      <li>
                        En un plazo máximo de 24 (veinticuatro) horas, le enviaremos por el mismo
                        medio un código de identificación de su solicitud.
                      </li>
                      <li>
                        Adoptaremos las medidas necesarias para efectivizar la baja en el menor
                        tiempo posible.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      4. Información precontractual y condiciones de contratación
                    </h3>
                    <p>
                      Antes de formalizar cualquier contratación a través de nuestro sitio web,
                      ponemos a su disposición, en un lugar de fácil acceso, la siguiente
                      información:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Identidad de la empresa:</strong> nombre, CUIT, domicilio físico y
                        electrónico, correo electrónico, número de teléfono.
                      </li>
                      <li>
                        <strong>Características principales del servicio:</strong> alcance,
                        entregables, metodología y equipo propuesto.
                      </li>
                      <li>
                        <strong>Condiciones de contratación:</strong> precio total con impuestos
                        incluidos (IVA u otros), forma de pago, y condiciones de garantía.
                      </li>
                      <li>
                        <strong>Plazo de entrega:</strong> estimación del plazo de ejecución del
                        servicio.
                      </li>
                      <li>
                        <strong>Derecho de arrepentimiento y baja:</strong> explicación clara del
                        botón de arrepentimiento y el botón de baja de servicios.
                      </li>
                      <li>
                        <strong>Sistemas de reputación</strong> o valoraciones de otros
                        consumidores, si los hubiera.
                      </li>
                      <li>
                        <strong>
                          Acceso a las condiciones generales y particulares de contratación:
                        </strong>{' '}
                        Las presentes condiciones y el contrato específico (MSA o SOW) estarán
                        disponibles de forma fácil y directa desde la plataforma digital, sin
                        remisiones a otros documentos o sitios de Internet.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">5. Derechos del consumidor</h3>
                    <p>
                      Usted, como consumidor, tiene los siguientes derechos reconocidos por la Ley
                      24.240 y la normativa europea:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Información adecuada:</strong> Acceso a información veraz, clara y
                        detallada sobre los bienes y servicios ofertados antes de la compra.
                      </li>
                      <li>
                        <strong>Trato digno y equitativo:</strong> Relación de consumo basada en la
                        buena fe y el respeto a su dignidad como consumidor.
                      </li>
                      <li>
                        <strong>Protección de datos:</strong> Sus datos personales serán tratados de
                        conformidad con la Ley 25.326 y el RGPD, como se detalla en nuestra Política
                        de Privacidad.
                      </li>
                      <li>
                        <strong>Libertad de elección:</strong> Puede elegir libremente entre los
                        servicios que ofrecemos, sin cláusulas abusivas.
                      </li>
                      <li>
                        <strong>Mecanismos de reclamo:</strong> Puede presentar reclamos a través de
                        los canales que ponemos a su disposición (correo electrónico, teléfono,
                        formulario web).
                      </li>
                      <li>
                        <strong>Garantía legal:</strong> Los servicios profesionales gozan de una
                        garantía de 6 (seis) meses desde su finalización, conforme al art. 11 de la
                        Ley 24.240.
                      </li>
                      <li>
                        <strong>Responsabilidad solidaria:</strong> Glastor responde como proveedor
                        de los servicios, junto con otros actores de la cadena, por los daños que se
                        deriven del servicio.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">6. Garantía y postventa</h3>
                    <p>
                      <strong>Garantía legal (Argentina):</strong> Los servicios prestados por
                      Glastor gozan de la garantía legal establecida por la Ley 24.240, que es de 6
                      (seis) meses para servicios profesionales, contados desde la fecha de
                      finalización del proyecto. Durante este período, Glastor se obliga a corregir
                      gratuitamente cualquier defecto imputable a la prestación del servicio.
                    </p>
                    <p className="mt-4">
                      <strong>Garantía en España:</strong> Los servicios digitales están sujetos a
                      la garantía legal establecida por la normativa de consumo de la UE, que puede
                      incluir la conformidad del servicio con el contrato durante un plazo
                      determinado.
                    </p>
                    <p className="mt-4">
                      <strong>Soporte post-venta:</strong> Los servicios de soporte post-entrega se
                      acordarán en el contrato específico (MSA o SOW) y podrán incluir corrección de
                      errores, mantenimiento evolutivo y SLA (Service Level Agreement).
                    </p>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      7. Procedimiento de reclamos
                    </h3>
                    <p>
                      Si no queda satisfecho con nuestros servicios o con la atención recibida,
                      puede presentar un reclamo a través de los siguientes canales:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Correo electrónico:</strong>{' '}
                        <a
                          href="mailto:reclamos@glastor.com"
                          className="text-brand hover:underline"
                        >
                          reclamos@glastor.com
                        </a>
                      </li>
                      <li>
                        <strong>Teléfono:</strong> [+[número de contacto]]
                      </li>
                      <li>
                        <strong>Formulario de contacto:</strong> Disponible en nuestro sitio web.
                      </li>
                    </ul>
                    <p className="mt-4">
                      Nos comprometemos a responder a su reclamo en un plazo máximo de [5 días
                      hábiles].
                    </p>
                    <p className="mt-4">
                      <strong>Autoridades de control:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        En Argentina: Agencia de Acceso a la Información Pública (AAIP) -{' '}
                        <a
                          href="https://www.argentina.gob.ar/aaip"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          www.argentina.gob.ar/aaip
                        </a>
                        .
                      </li>
                      <li>
                        En España: Agencia Española de Protección de Datos (AEPD) y, para
                        consumidores, las autoridades de consumo autonómicas.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">8. Actualizaciones</h3>
                    <p>
                      Esta Política de Defensa del Consumidor se actualizó por última vez el 6 de
                      julio de 2026, en consonancia con la normativa argentina vigente (Disposición
                      954/2025 y Disposición 3/2026) y las directivas europeas. Glastor se reserva
                      el derecho de modificarla para adaptarla a cambios legislativos.
                    </p>

                    <p className="mt-8 pt-8 border-t border-white/10 text-sm text-zinc-500">
                      Contacto: Para cualquier consulta sobre esta política, puede contactarnos en{' '}
                      <a href="mailto:legal@glastor.com" className="text-brand hover:underline">
                        legal@glastor.com
                      </a>
                      .
                    </p>
                  </div>
                )}

                {activeDoc === 'rgpd' && (
                  <div>
                    <h2 className="mb-8 border-b border-white/10 pb-4">Marco RGPD / LPD 2026</h2>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      Responsable del Tratamiento y Delegado de Protección de Datos (DPO)
                    </h3>
                    <p>
                      En cumplimiento del Reglamento General de Protección de Datos (RGPD) europeo y
                      la Ley de Protección de Datos (LPD) argentina, le informamos que el
                      responsable del tratamiento de sus datos personales es GLASTOR®.
                    </p>
                    <p className="mt-4">
                      Hemos designado un Delegado de Protección de Datos (DPO) como punto de
                      contacto para todas las cuestiones relacionadas con la privacidad y el
                      ejercicio de sus derechos.
                    </p>
                    <p className="mt-4">
                      <strong>Contacto del DPO:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Correo electrónico:</strong>{' '}
                        <a href="mailto:dpo@glastor.dev" className="text-brand hover:underline">
                          dpo@glastor.dev
                        </a>
                      </li>
                      <li>
                        <strong>Asunto recomendado:</strong> "Protección de Datos - [Su nombre
                        completo]"
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      Garantía de los Derechos ARCO+
                    </h3>
                    <p>
                      Garantizamos los derechos reconocidos por la normativa vigente, ampliando el
                      clásico ARCO para incluir las nuevas facultades establecidas en 2026. Puede
                      ejercer sus derechos de forma gratuita en cualquier momento enviando una
                      solicitud a nuestro DPO, acompañada de una copia de su documento de identidad.
                    </p>
                    <p className="mt-4">A continuación, se detalla el alcance de cada derecho:</p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        <strong>Derecho de Acceso:</strong> Tiene derecho a obtener confirmación
                        sobre si estamos tratando datos personales que le conciernan, así como a
                        acceder a dichos datos y a la información sobre el tratamiento (origen,
                        destinatarios, plazos de conservación, etc.).
                      </li>
                      <li>
                        <strong>Derecho de Rectificación:</strong> Tiene derecho a solicitar la
                        corrección de sus datos personales si son inexactos o incompletos.
                      </li>
                      <li>
                        <strong>Derecho de Cancelación (Derecho al Olvido):</strong> Tiene derecho a
                        solicitar la eliminación de sus datos personales cuando, entre otros
                        motivos, ya no sean necesarios para los fines que motivaron su recogida, o
                        retire su consentimiento.
                      </li>
                      <li>
                        <strong>Derecho de Oposición:</strong> Tiene derecho a oponerse al
                        tratamiento de sus datos personales, especialmente para fines de marketing
                        directo o cuando el tratamiento esté basado en el interés legítimo del
                        responsable.
                      </li>
                      <li>
                        <strong>Derecho de Limitación del Tratamiento:</strong> Tiene derecho a
                        solicitar la suspensión del tratamiento de sus datos cuando impugne su
                        exactitud, o cuando el tratamiento sea ilícito pero se oponga a la
                        supresión.
                      </li>
                      <li>
                        <strong>Derecho a la Portabilidad:</strong> Tiene derecho a recibir los
                        datos personales que nos haya facilitado en un formato estructurado, de uso
                        común y lectura mecánica, y a transmitirlos a otro responsable sin que se lo
                        impidamos.
                      </li>
                      <li>
                        <strong>Derecho a Retirar el Consentimiento:</strong> Si el tratamiento está
                        basado en su consentimiento, tiene derecho a retirarlo en cualquier momento,
                        sin que ello afecte a la licitud del tratamiento basado en el consentimiento
                        previo a su retirada.
                      </li>
                    </ul>

                    <h3 className="text-white mt-12 mb-4 font-bold">
                      Plazos y Vías de Reclamación
                    </h3>
                    <p>
                      Nos comprometemos a atender y resolver su solicitud en el plazo máximo de un
                      mes desde su recepción. Si no queda satisfecho con nuestra respuesta, tiene
                      derecho a presentar una reclamación ante las autoridades de control:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-4">
                      <li>
                        En España: Agencia Española de Protección de Datos (AEPD) -{' '}
                        <a
                          href="https://www.aepd.es"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          www.aepd.es
                        </a>
                      </li>
                      <li>
                        En Argentina: Agencia de Acceso a la Información Pública (AAIP) -{' '}
                        <a
                          href="https://www.argentina.gob.ar/aaip"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          www.argentina.gob.ar/aaip
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {activeDoc === 'arrepentimiento' && (
                  <div>
                    <h2 className="mb-8 border-b border-red-500/20 pb-4 text-white">
                      Cancelación / Botón de Arrepentimiento
                    </h2>
                    <p>
                      De acuerdo con el artículo 34 de la Ley 24.240 y la Disposición 954/2025, los
                      clientes tienen el derecho de revocar la contratación de servicios dentro del
                      plazo de 10 días desde su aceptación, o solicitar la baja del servicio.
                    </p>

                    <Card className="mt-8 bg-zinc-900 border border-white/10 p-8 rounded-none shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                      <form
                        className="flex flex-col gap-6"
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert('Solicitud enviada a Legal.');
                        }}
                      >
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            Email de Contacto
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="tu@empresa.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            ID de Contrato / MSA
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="Ej: MSA-2026-XYZ"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            Motivo (Opcional)
                          </label>
                          <textarea
                            className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-red-500 transition-colors h-32"
                            placeholder="Dinos por qué te vas..."
                          ></textarea>
                        </div>
                        <Button
                          type="submit"
                          variant="destructive"
                          size="lg"
                          className="h-16 uppercase tracking-widest text-base mt-4 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                        >
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
