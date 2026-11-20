export type TechFilter = 'todos' | 'rust' | 'docker' | 'kubernetes' | 'postgresql';
export type Intent = 'todos' | 'evaluar' | 'migrar' | 'optimizar' | 'contratar';

export interface ArticleMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ArticleCodeBlock {
  filename: string;
  language: string;
  code: string;
  caption?: string;
}

export interface ArticleDiagram {
  title: string;
  subtitle: string;
  nodes: {
    step: string;
    label: string;
    detail: string;
    highlight?: boolean;
  }[];
}

export interface ArticleCallout {
  type: 'architecture' | 'warning' | 'benchmark';
  title: string;
  body: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  code?: ArticleCodeBlock;
  diagram?: ArticleDiagram;
  callout?: ArticleCallout;
  bullets?: string[];
}

export interface TechArticle {
  id: string;
  rfdId: string;
  title: string;
  subtitle: string;
  excerpt: string;
  tech: Exclude<TechFilter, 'todos'>;
  pillar: Exclude<Intent, 'todos'>;
  readTime: string;
  date: string;
  isoDate: string;
  toolchain: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  metrics: ArticleMetric[];
  sections: ArticleSection[];
  checklist: string[];
}

export const TECH_ARTICLES: TechArticle[] = [
  {
    id: 'pii-veil-sub-millisecond-llm-anonymizer',
    rfdId: 'RFD-007',
    title: 'Cómo construimos un anonimizador PII reversible en 165 µs para LLMs y MCP en Rust',
    subtitle:
      'Arquitectura zero-copy con SIMD Aho-Corasick, validación matemática de checksums y restauración en vivo de streams SSE — 212x más rápido que Microsoft Presidio.',
    excerpt:
      'Cómo evitar fugas de emails, tarjetas, IBANs, DNIs y API keys hacia proveedores LLM en 0.165 ms y < 15 MB de RAM sin romper el streaming de tokens.',
    tech: 'rust',
    pillar: 'optimizar',
    readTime: '10 min',
    date: '20 Nov, 2026',
    isoDate: '2026-11-20',
    toolchain: 'Rust 1.85+ · WASM · MCP · SSE',
    author: {
      name: 'Glastor Systems Team',
      role: 'AI Privacy & High-Performance Rust Architecture',
    },
    tags: ['#AI-Privacy', '#MCP', '#SIMD', '#GDPR'],
    metrics: [
      { label: 'Latencia Prompt 1 KB', value: '165 µs', detail: '~212x más rápido que Presidio' },
      { label: 'Restauración SSE', value: '69.6 µs', detail: 'Tokens partidos entre chunks' },
      { label: 'Huella de Memoria', value: '< 15 MB', detail: 'Distroless vs ~450 MB spaCy' },
    ],
    sections: [
      {
        id: 'el-problema-dlp-llm',
        heading: '1. El problema real: fugas de PII y tokens partidos en streaming SSE',
        paragraphs: [
          'Cada vez que un agente IA, pipeline RAG o servidor MCP envía un prompt a un LLM externo, existe un riesgo directo de exponer datos regulados (GDPR, HIPAA, PCI-DSS): correos, tarjetas de crédito, IBANs, DNI/CUIT, URIs de PostgreSQL o API keys de producción.',
          'Las soluciones habituales obligan a elegir entre dos cuellos de botella: pipelines Python + spaCy como Microsoft Presidio (~35 ms por prompt y ~450 MB de RAM sin soporte nativo de restauración en streaming) o APIs cloud como AWS Comprehend (80–250 ms de red y > $100 USD por millón de requests enviando el PII sin cifrar a un tercero).',
          'Con pii-veil (open-source en github.com/glastor-core/pii-veil y demo interactiva 100% WebAssembly en https://pii-veil.glastor.es), resolvemos tanto la anonimización reversible como la restauración en vivo sobre Server-Sent Events (SSE), donde un placeholder como [EMAIL_1] suele llegar dividido entre chunks arbitrarios ([EMA + IL_1]).',
        ],
        callout: {
          type: 'benchmark',
          title: 'Resultados reproducibles (Criterion, x86_64)',
          body: 'Prompt 1 KB (7 entidades sensibles): 165.68 µs [IC 95%: 164.40–167.22 µs] · Throughput sostenido 1 MB: 20.58 ms (46.33 MiB/s) · Restauración SSE: 69.65 µs/chunk · Reproducible vía cargo bench -p pii-veil-core --bench bench_throughput.',
        },
      },
      {
        id: 'arquitectura-simd-checksums',
        heading: '2. Arquitectura: SIMD Aho-Corasick + 18 detectores con checksum matemático',
        paragraphs: [
          'Para eliminar el overhead de modelos NLP de 450 MB en datos estructurados, pii-veil combina slices zero-copy en Rust, pre-filtrado SIMD con aho-corasick y validadores matemáticos deterministas (Luhn para tarjetas, ISO 13616 Mod-97 para IBAN, Mod-23 para DNI/NIE, Mod-11 para CUIT/CUIL y RUT) reduciendo los falsos positivos a casi cero.',
        ],
        diagram: {
          title: 'Pipeline Reversible Zero-Egress (pii-veil)',
          subtitle: 'Del prompt original al stream SSE restaurado en < 0.25 ms totales',
          nodes: [
            { step: '01', label: 'SIMD Pre-Filter', detail: 'Aho-Corasick AVX2/NEON sobre &str' },
            { step: '02', label: 'Checksum Gate', detail: 'Luhn, Mod-97 IBAN, Mod-23/11 y Secretos', highlight: true },
            { step: '03', label: 'Encrypted Vault', detail: 'Placeholders semánticos [EMAIL_1] + vault cifrado' },
            { step: '04', label: 'StreamingRestorer', detail: 'Restaura chunks SSE partidos en 69.6 µs', highlight: true },
          ],
        },
      },
      {
        id: 'integracion-cli-mcp-ci',
        heading: '3. Despliegue inmediato: CLI, Proxy HTTP/SSE, MCP Server y SDKs',
        paragraphs: [
          'pii-veil sigue una arquitectura 6-en-1 publicada en crates.io (pii-veil-core / pii-veil-cli), PyPI (glastor-pii-veil), npm (pii-veil-node), Go SDK, Homebrew (glastor-core/tap/veil), GitHub Actions Marketplace y el Official MCP Registry (io.github.glastor-core/pii-veil).',
        ],
        code: {
          filename: 'terminal-quickstart.sh',
          language: 'bash',
          caption: 'Anonimización con vault cifrado, proxy SSE local y servidor MCP para Cursor/Claude Desktop',
          code: `# 1. Instalar vía Homebrew o Cargo
brew install glastor-core/tap/veil

# 2. Anonimizar con vault cifrado autenticado
veil redact \\
  --text "Charge maria@startup.io (CUIT 20-12345678-6) on 4532-0151-1283-0366" \\
  --vault-out vault.enc --vault-pass "prod-secret"

# 3. Levantar servidor MCP stdio o proxy HTTP/SSE en < 15 MB RAM
veil mcp
veil proxy --listen 127.0.0.1:8080 --echo`,
        },
        callout: {
          type: 'architecture',
          title: 'Trade-offs honestos en producción',
          body: 'pii-veil es imbatible en PII estructurada, identificadores nacionales y secretos con latencia determinista. Para NER semántico libre de nombres propios ambiguos en prosa sin estructura, úsalo como primera barrera ultrarrápida combinada con una pasada NLP selectiva.',
        },
      },
    ],
    checklist: [
      'Prueba pii-veil en 3 segundos sin instalar nada en https://pii-veil.glastor.es (WASM 100% local).',
      'Activa glastor-core/pii-veil@v1 en GitHub Actions para bloquear PII y secretos en PRs.',
      'Conecta veil mcp en Cursor o Claude Desktop para proteger prompts de agentes.',
      'Evalúa despliegue On-Premise / Air-Gapped con auditoría SIEM y reglas DLP a medida vía founder@glastor.es.',
    ],
  },
  {
    id: 'rust-memory',
    rfdId: 'RFD-001',
    title: 'Gestión de memoria en Rust: Evitando leaks en Microservicios Críticos',
    subtitle:
      'Cómo diseñar estructuras zero-copy, evitar ciclos de Arc<Mutex<T>> y auditar alocaciones en el hot-path sin Garbage Collector.',
    excerpt:
      'Cómo el Borrow Checker asegura la concurrencia a nivel de compilador en clusters HFT sin depender de un Garbage Collector.',
    tech: 'rust',
    pillar: 'evaluar',
    readTime: '12 min',
    date: '24 Jun, 2026',
    isoDate: '2026-06-24',
    toolchain: 'Rust 1.85+ · Edition 2024',
    author: {
      name: 'Glastor Systems Team',
      role: 'Core Rust & Low-Latency Architecture',
    },
    tags: ['#Memory-Safe', '#Performance'],
    metrics: [
      { label: 'Latencia p99', value: '< 1.8 ms', detail: 'Sin pausas Stop-The-World' },
      { label: 'Memoria RSS', value: '28 MB', detail: 'Estable tras 72h bajo carga' },
      { label: 'Alocaciones Hot-Path', value: '0 allocs', detail: 'Slices prestados y arenas' },
    ],
    sections: [
      {
        id: 'mito-cero-leaks',
        heading: '1. El mito: "Rust no puede tener memory leaks"',
        paragraphs: [
          'Rust garantiza seguridad de memoria (sin use-after-free, sin double-free y sin data races), pero la fuga lógica de memoria es explícitamente segura según las reglas del lenguaje. En microservicios de larga duración (daemons Tokio, brokers WebSocket o motores de ingestión), los leaks aparecen casi siempre por tres causas: ciclos de referencia con Arc, colecciones sin cota superior (unbounded channels/maps) y buffers que crecen sin shrink.',
          'Cuando un servicio en producción pasa de 35 MB a 4 GB de RSS en una semana, el problema rara vez es un bloque unsafe: suele ser un diseño de ownership descuidado en el estado compartido entre tareas asíncronas.',
        ],
        callout: {
          type: 'warning',
          title: 'Regla de Oro en Producción',
          body: 'Nunca utilices tokio::sync::mpsc::unbounded_channel en un servicio expuesto a red. Si el consumidor se ralentiza 200ms, el canal absorberá toda la RAM del contenedor hasta provocar un OOMKill.',
        },
      },
      {
        id: 'patrones-hot-path',
        heading: '2. Zero-Copy y Contrapresión Determinista en el Hot-Path',
        paragraphs: [
          'En lugar de clonar payloads JSON o vectores en cada salto entre middleware y worker, debemos combinar buffers inmutables (bytes::Bytes) con canales acotados (bounded) y referencias débiles (Weak) cuando existan grafos de suscripción.',
          'El siguiente patrón muestra un despachador de eventos con contrapresión explícita y reutilización de buffers sin alocación en heap por mensaje:',
        ],
        code: {
          filename: 'src/ingest/dispatcher.rs',
          language: 'rust',
          code: `use bytes::Bytes;
use std::sync::{Arc, Weak};
use tokio::sync::mpsc;

#[derive(Debug)]
pub struct TelemetryFrame {
    pub tenant_id: u32,
    pub payload: Bytes, // Conteo atómico O(1), cero copias del buffer
}

pub struct IngestDispatcher {
    tx: mpsc::Sender<TelemetryFrame>,
    // Referencia débil para evitar ciclos entre Dispatcher y MetricsRegistry
    registry: Weak<MetricsRegistry>,
}

pub struct MetricsRegistry;

impl IngestDispatcher {
    /// Canal acotado a 4096 frames: memoria máxima acotada matemáticamente
    pub fn new(registry: &Arc<MetricsRegistry>) -> (Self, mpsc::Receiver<TelemetryFrame>) {
        let (tx, rx) = mpsc::channel(4096);
        (
            Self {
                tx,
                registry: Arc::downgrade(registry),
            },
            rx,
        )
    }

    pub fn try_enqueue(&self, frame: TelemetryFrame) -> Result<(), &'static str> {
        match self.tx.try_send(frame) {
            Ok(()) => Ok(()),
            Err(mpsc::error::TrySendError::Full(_)) => {
                if let Some(_reg) = self.registry.upgrade() {
                    // Registrar backpressure explícito para autoscaling
                }
                Err("BACKPRESSURE_QUEUE_FULL")
            }
            Err(mpsc::error::TrySendError::Closed(_)) => Err("WORKER_SHUTDOWN"),
        }
    }
}`,
          caption:
            'Bytes permite compartir slices de red entre múltiples tareas Tokio mediante conteo de referencias sin duplicar memoria en heap.',
        },
      },
      {
        id: 'arquitectura-memoria',
        heading: '3. Flujo de Memoria Acotada en Microservicios Tokio',
        paragraphs: [
          'En arquitecturas de alta concurrencia diseñamos presupuestos de memoria explícitos por capa. Cada conexión tiene un techo rígido de buffer de lectura y cada cola interna aplica rechazo temprano (load shedding) con HTTP 429/503 antes de degradar la latencia global.',
        ],
        diagram: {
          title: 'Pipeline de Ingestión con Memoria Acotada',
          subtitle: 'Arquitectura Zero-Copy con Load Shedding determinista',
          nodes: [
            {
              step: '01',
              label: 'Socket TCP / Epoll',
              detail: 'Lectura directa sobre BytesMut reutilizable (8 KB cap)',
            },
            {
              step: '02',
              label: 'Parser Zero-Copy',
              detail: 'Validación de cabeceras vía slices &str sin String::from',
              highlight: true,
            },
            {
              step: '03',
              label: 'Bounded mpsc (4096)',
              detail: 'Contrapresión inmediata: try_send -> 503 si saturado',
              highlight: true,
            },
            {
              step: '04',
              label: 'Worker Pool / Flush',
              detail: 'Batch write hacia PostgreSQL / Kafka y liberación inmediata',
            },
          ],
        },
      },
      {
        id: 'allocator-profiling',
        heading: '4. Allocator Tuning: jemalloc y Profiling Continuo',
        paragraphs: [
          'El allocator por defecto del sistema operativo (glibc malloc en Linux) sufre fragmentación severa bajo patrones multi-hilo con Tokio, reteniendo páginas de memoria que el servicio ya liberó. Reemplazar el global allocator por tikv-jemallocator reduce la huella RSS real entre un 25% y un 40% en cargas sostenidas.',
          'Además, en Glastor instrumentamos los binarios de staging con jemalloc profiling (jeprof) y DHAT para auditar exactamente qué línea de código ejecuta cada alocación antes de promover a producción.',
        ],
        bullets: [
          'Reemplazar glibc malloc por tikv-jemallocator en servicios Tokio de alta concurrencia.',
          'Establecer límites estrictos en HashMap y caches mediante moka o lru con política de evicción por tamaño en bytes.',
          'Auditar con cargo-bloat y dhat-rs cualquier ruta que supere 2 alocaciones por request.',
        ],
      },
    ],
    checklist: [
      'Todos los canales internos usan capacidad acotada (mpsc::channel / broadcast con límite).',
      'No existen ciclos Arc<Mutex<T>> entre nodos padre/hijo (uso estricto de Weak).',
      'Configurado tikv-jemallocator o mimalloc en builds Linux musl/glibc.',
      'Tests de soak (carga sostenida de 24h) verificando pendiente plana de RSS en Prometheus.',
    ],
  },
  {
    id: 'docker-optimization',
    rfdId: 'RFD-002',
    title: 'Reduciendo imágenes Docker a 15MB con distroless y Alpine',
    subtitle:
      'Builds multi-stage reproducibles con cargo-chef, enlazado estático musl y contenedores scratch/distroless sin shell ni superficie de ataque.',
    excerpt:
      'Arquitectura de despliegue ultraligero para acelerar el Cold Start en entornos Kubernetes y AWS ECS.',
    tech: 'docker',
    pillar: 'optimizar',
    readTime: '8 min',
    date: '15 Jun, 2026',
    isoDate: '2026-06-15',
    toolchain: 'Docker Buildx · cargo-chef · Distroless',
    author: {
      name: 'Glastor Systems Team',
      role: 'Cloud-Native & DevSecOps Engineering',
    },
    tags: ['#DevOps', '#Kubernetes'],
    metrics: [
      { label: 'Tamaño de Imagen', value: '14.2 MB', detail: 'Reducción del 98% vs rust:latest' },
      { label: 'Cold Start Pod', value: '180 ms', detail: 'Pull + arranque de binario nativo' },
      { label: 'CVEs de SO', value: '0 Críticos', detail: 'Sin bash, curl ni package managers' },
    ],
    sections: [
      {
        id: 'problema-imagenes-pesadas',
        heading: '1. Por qué una imagen Rust estándar pesa 1.8 GB (y cómo destruye tu autoscaling)',
        paragraphs: [
          'Un error frecuente al containerizar Rust es empaquetar el toolchain completo (rustc, cargo, llvm y librerías de desarrollo) dentro de la imagen final. El resultado supera fácilmente 1.5 GB: cada evento de autoscaling en Kubernetes o AWS Fargate tarda decenas de segundos descargando capas innecesarias y expone decenas de vulnerabilidades CVE heredadas de Debian.',
          'Dado que Rust compila a código máquina nativo sin máquina virtual ni intérprete en runtime, la imagen de producción solo necesita el binario compilado, certificados CA para TLS y las librerías mínimas de libc (o ninguna si compilamos estáticamente con musl).',
        ],
      },
      {
        id: 'dockerfile-cargo-chef',
        heading: '2. Dockerfile Multi-Stage con cargo-chef y Distroless',
        paragraphs: [
          'El mayor cuello de botella en CI/CD con Rust es recompilar el árbol de dependencias (tokio, axum, sqlx, serde) en cada commit. Integrando cargo-chef separamos el cálculo de dependencias en una capa cacheable independiente del código fuente.',
        ],
        code: {
          filename: 'Dockerfile',
          language: 'dockerfile',
          code: `# syntax=docker/dockerfile:1.7
FROM lukemathwalker/cargo-chef:latest-rust-1.85-slim-bookworm AS chef
WORKDIR /app

# 1. Calcular receta de dependencias
FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

# 2. Compilar solo dependencias (capa altamente cacheable)
FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

# 3. Compilar el binario final con perfil de producción
COPY . .
RUN cargo build --release --locked --bin glastor-api && \\
    strip /app/target/release/glastor-api

# 4. Runtime final ultra-mínimo (sin shell, usuario nonroot)
FROM gcr.io/distroless/cc-debian12:nonroot AS runtime
WORKDIR /app
COPY --from=builder /app/target/release/glastor-api /app/glastor-api

EXPOSE 8080
ENTRYPOINT ["/app/glastor-api"]`,
          caption:
            'Distroless cc-debian12:nonroot incluye únicamente libgcc, glibc mínima, certificados CA y ejecución sin privilegios root.',
        },
      },
      {
        id: 'perfil-cargo',
        heading: '3. Perfil Cargo.toml para Binarios Compactos y Rápidos',
        paragraphs: [
          'Combinar strip de símbolos, LTO (Link-Time Optimization) y panic = "abort" reduce el tamaño del ejecutable entre un 35% y un 50% al mismo tiempo que habilita optimizaciones inter-crate que mejoran el throughput HTTP.',
        ],
        code: {
          filename: 'Cargo.toml',
          language: 'toml',
          code: `[profile.release]
opt-level = 3
lto = "thin"           # Equilibrio óptimo entre tiempo de CI y rendimiento
codegen-units = 1      # Máxima optimización intra-binario
panic = "abort"        # Elimina tablas de unwinding (~15% menos binario)
strip = "symbols"      # Remueve símbolos de debug innecesarios en prod`,
        },
        callout: {
          type: 'benchmark',
          title: 'Impacto Directo en CI/CD y Seguridad',
          body: 'Con cargo-chef + cache mount en GitHub Actions, los builds incrementales bajan de 9 minutos a menos de 45 segundos, y los escaneos con Trivy reportan 0 vulnerabilidades de sistema operativo.',
        },
      },
    ],
    checklist: [
      'Uso de cargo-chef para cachear dependencias en CI independientemente del código de aplicación.',
      'Flags --locked en cargo build para garantizar builds 100% deterministas con Cargo.lock.',
      'Imagen runtime distroless:nonroot o scratch (con rustls en lugar de OpenSSL dinámico).',
      'Escaneo automático con Trivy y generación de SBOM (CycloneDX) en el pipeline.',
    ],
  },
  {
    id: 'k8s-rust',
    rfdId: 'RFD-003',
    title: 'Orquestación Zero-Downtime de microservicios Rust en Kubernetes',
    subtitle:
      'Patrones de Graceful Shutdown en Tokio/Axum, sincronización de SIGTERM con kube-proxy y probes Liveness/Readiness sin falsos positivos.',
    excerpt:
      'Patrones avanzados de probes (Liveness/Readiness), HPA y Graceful Shutdown en arquitecturas distribuidas.',
    tech: 'kubernetes',
    pillar: 'evaluar',
    readTime: '10 min',
    date: '02 Jun, 2026',
    isoDate: '2026-06-02',
    toolchain: 'Tokio 1.x · Axum 0.8 · Kubernetes 1.31+',
    author: {
      name: 'Glastor Systems Team',
      role: 'Distributed Systems & Infrastructure',
    },
    tags: ['#Tooling', '#CI/CD'],
    metrics: [
      { label: 'Errores 502 en Deploy', value: '0.00%', detail: 'Drenaje coordinado con preStop' },
      { label: 'Tiempo de Drenaje', value: '< 3.5 s', detail: 'Conexiones in-flight completadas' },
      { label: 'Consolidación Nodos', value: '5x menos', detail: 'Menor huella CPU/RAM por pod' },
    ],
    sections: [
      {
        id: 'race-condition-sigterm',
        heading: '1. La Race Condition oculta de SIGTERM en Kubernetes',
        paragraphs: [
          'Cuando Kubernetes termina un Pod durante un rolling update, ejecuta dos acciones en paralelo: envía SIGTERM al contenedor y notifica al Endpoints Controller para sacar esa IP de kube-proxy / Ingress. Si tu servidor Axum cierra el socket inmediatamente al recibir SIGTERM, seguirá recibiendo tráfico durante 1 a 3 segundos mientras las reglas iptables/IPVS convergen, provocando errores 502 Bad Gateway.',
          'La solución en ingeniería de producción combina un hook preStop corto en el manifiesto de Kubernetes con un drenaje ordenado (Graceful Shutdown) que deja de aceptar nuevas conexiones mientras termina las peticiones en vuelo y vacía los buffers de telemetría.',
        ],
        diagram: {
          title: 'Secuencia de Terminación Zero-Downtime',
          subtitle: 'Coordinación entre kubelet, Ingress y runtime Tokio',
          nodes: [
            {
              step: '01',
              label: 'Pod Terminating',
              detail: 'Endpoint marcado NotReady; Ingress detiene envío nuevo',
            },
            {
              step: '02',
              label: 'preStop Delay (5s)',
              detail: 'Margen de propagación para kube-proxy / Envoy / ALB',
              highlight: true,
            },
            {
              step: '03',
              label: 'SIGTERM -> Axum',
              detail: 'with_graceful_shutdown detiene listener y drena in-flight',
              highlight: true,
            },
            {
              step: '04',
              label: 'Flush & Exit 0',
              detail: 'Cierre limpio de pool PostgreSQL y exportador OpenTelemetry',
            },
          ],
        },
      },
      {
        id: 'axum-graceful-shutdown',
        heading: '2. Implementación de Graceful Shutdown y Health Probes en Axum 0.8',
        paragraphs: [
          'Es crucial separar /health/live (indica si el proceso sigue vivo y no está bloqueado en un deadlock) de /health/ready (verifica conectividad con dependencias críticas como PostgreSQL o Redis). Nunca pongas una consulta a base de datos en el Liveness Probe: un micro-corte de BD reiniciaría en cascada todo tu clúster.',
        ],
        code: {
          filename: 'src/server/shutdown.rs',
          language: 'rust',
          code: `use axum::{http::StatusCode, routing::get, Router};
use tokio::net::TcpListener;
use tokio::signal;

pub async fn run_server(app: Router) -> Result<(), std::io::Error> {
    let listener = TcpListener::bind("0.0.0.0:8080").await?;

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("Fallo al instalar manejador Ctrl+C");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("Fallo al instalar manejador SIGTERM")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    tracing::info!("Señal de apagado recibida: drenando conexiones activas...");
}

pub fn health_routes() -> Router {
    Router::new()
        .route("/health/live", get(|| async { StatusCode::OK }))
        .route("/health/ready", get(|| async { StatusCode::OK }))
}`,
          caption:
            'axum::serve junto a with_graceful_shutdown espera a que todas las requests activas concluyan antes de retornar.',
        },
      },
      {
        id: 'manifiesto-k8s',
        heading: '3. Configuración de Requests, Limits y PodDisruptionBudget',
        paragraphs: [
          'En Rust no necesitas configurar limits de CPU artificialmente bajos que activen el throttling del CFS de Linux: asigna requests precisos basados en telemetría real, configura PodDisruptionBudget (minAvailable: 2) y usa terminationGracePeriodSeconds acorde al SLA de tu endpoint más lento.',
        ],
        callout: {
          type: 'architecture',
          title: 'Evita CPU Throttling en Tokio',
          body: 'Establece la variable de entorno TOKIO_WORKER_THREADS acorde a los cores reales asignados al contenedor para evitar contención excesiva de cambio de contexto en nodos compartidos.',
        },
      },
    ],
    checklist: [
      'Separación estricta entre /health/live (sin dependencias externas) y /health/ready.',
      'Hook preStop configurado para absorber la propagación de red de Kubernetes.',
      'Manejador SIGTERM conectado a axum::serve().with_graceful_shutdown().',
      'Cierre explícito de pools SQLx y flush de trazas OpenTelemetry antes de salir.',
    ],
  },
  {
    id: 'postgresql-rust-sqlx',
    rfdId: 'RFD-004',
    title: 'Optimizando SQLx y PostgreSQL para 100k RPS',
    subtitle:
      'Verificación SQL en tiempo de compilación, dimensionamiento matemático de connection pools, pipelining y queries sin N+1.',
    excerpt:
      'Configuración avanzada de Connection Pools y prepared statements concurrentes para alta disponibilidad.',
    tech: 'postgresql',
    pillar: 'optimizar',
    readTime: '15 min',
    date: '18 May, 2026',
    isoDate: '2026-05-18',
    toolchain: 'SQLx 0.8 · PostgreSQL 16 · PgBouncer',
    author: {
      name: 'Glastor Systems Team',
      role: 'High-Throughput Data Engineering',
    },
    tags: ['#Database', '#Scaling'],
    metrics: [
      {
        label: 'Throughput Lectura',
        value: '104k RPS',
        detail: 'Prepared statements + pool afinado',
      },
      { label: 'Errores SQL en Prod', value: '0', detail: 'Tipos validados en compilación' },
      {
        label: 'Latencia Query p95',
        value: '2.4 ms',
        detail: 'Índices covering + binary protocol',
      },
    ],
    sections: [
      {
        id: 'dimensionamiento-pool',
        heading: '1. La falacia de los 500 conexiones por pod',
        paragraphs: [
          'PostgreSQL utiliza un modelo de proceso por conexión. Abrir 200 conexiones desde cada réplica de tu API satura la caché L3, dispara los cambios de contexto en el kernel y colapsa la latencia bajo carga. La fórmula clásica de rendimiento en PostgreSQL parte de un pool pequeño por instancia de aplicación (típicamente entre 10 y 32 conexiones) respaldado por PgBouncer en modo transaction pooling si escalas a decenas de réplicas.',
          'Con SQLx en Rust, el protocolo binario de PostgreSQL y la caché de prepared statements por conexión permiten servir decenas de miles de consultas por segundo con apenas un puñado de conexiones activas.',
        ],
      },
      {
        id: 'configuracion-sqlx',
        heading: '2. Configuración de Producción para PgPoolOptions y Macros Verificadas',
        paragraphs: [
          'La gran ventaja competitiva de SQLx frente a ORMs dinámicos es que sqlx::query_as! valida sintaxis, columnas y nulabilidad directamente contra el esquema real en tiempo de compilación (o contra el caché offline .sqlx en CI).',
        ],
        code: {
          filename: 'src/db/pool.rs',
          language: 'rust',
          code: `use sqlx::postgres::{PgConnectOptions, PgPoolOptions};
use sqlx::PgPool;
use std::str::FromStr;
use std::time::Duration;

pub async fn build_pg_pool(database_url: &str) -> Result<PgPool, sqlx::Error> {
    let connect_opts = PgConnectOptions::from_str(database_url)?
        // Desactivar si usas PgBouncer en modo transaction sin soporte de prepared statements
        .statement_cache_capacity(256);

    PgPoolOptions::new()
        .max_connections(24)
        .min_connections(6)
        .acquire_timeout(Duration::from_millis(800))
        .idle_timeout(Duration::from_secs(300))
        .max_lifetime(Duration::from_secs(1800))
        .test_before_acquire(false) // Evita un RTT extra en el hot-path
        .connect_with(connect_opts)
        .await
}

#[derive(Debug)]
pub struct OrderSummary {
    pub id: i64,
    pub total_cents: i64,
}

pub async fn fetch_recent_orders(
    pool: &PgPool,
    tenant_id: i64,
) -> Result<Vec<OrderSummary>, sqlx::Error> {
    sqlx::query_as!(
        OrderSummary,
        r#"
        SELECT id, total_cents
        FROM orders
        WHERE tenant_id = $1
        ORDER BY created_at DESC
        LIMIT 50
        "#,
        tenant_id
    )
    .fetch_all(pool)
    .await
}`,
          caption:
            'acquire_timeout estricto (800ms) evita que los workers HTTP queden colgados indefinidamente ante saturación de base de datos.',
        },
      },
      {
        id: 'batch-inserts',
        heading: '3. Inserciones Masivas con UNNEST en lugar de Loops',
        paragraphs: [
          'Ejecutar 1.000 INSERTs individuales dentro de un bucle genera 1.000 round-trips de red. Utilizando UNNEST($1::bigint[], $2::bigint[]) en una sola sentencia preparada, Rust serializa los vectores en formato binario y PostgreSQL inserta el lote completo en un único viaje de red con latencia sub-milisegundo.',
        ],
        callout: {
          type: 'benchmark',
          title: 'UNNEST vs Loop Individual',
          body: 'En nuestras auditorías sobre AWS RDS PostgreSQL 16, reemplazar inserciones fila-a-fila por UNNEST redujo la latencia de ingesta de lotes de 500 registros de 140ms a 3.1ms (45x más rápido).',
        },
      },
    ],
    checklist: [
      'Pool dimensionado acorde a vCPUs de PostgreSQL y protegido con acquire_timeout estricto.',
      'Modo offline cargo sqlx prepare integrado en CI para compilar sin acceso a la BD.',
      'Inserciones masivas migradas a UNNEST o COPY FROM STDIN.',
      'Verificación de planes de ejecución (EXPLAIN ANALYZE) con índices covering en queries calientes.',
    ],
  },
  {
    id: 'rust-websockets',
    rfdId: 'RFD-005',
    title: 'WebSockets a escala masiva: Tokio + Axum en producción',
    subtitle:
      'Arquitectura fan-out sharded para sostener cientos de miles de conexiones WebSocket concurrentes con latencia determinista.',
    excerpt:
      'Arquitectura event-driven para mantener 1 millón de conexiones concurrentes usando un solo nodo EC2.',
    tech: 'rust',
    pillar: 'contratar',
    readTime: '14 min',
    date: '05 May, 2026',
    isoDate: '2026-05-05',
    toolchain: 'Tokio · Axum WS · DashMap · Linux Epoll',
    author: {
      name: 'Glastor Systems Team',
      role: 'Realtime & Network Systems',
    },
    tags: ['#Networking', '#Axum'],
    metrics: [
      {
        label: 'Memoria por Socket',
        value: '~6.5 KB',
        detail: 'State machine async sin thread OS',
      },
      { label: 'Fan-out Latencia', value: '< 4 ms', detail: '10k suscriptores por canal' },
      { label: 'File Descriptors', value: '1M+', detail: 'Afinado con sysctl y epoll' },
    ],
    sections: [
      {
        id: 'por-que-rust-ws',
        heading: '1. Por qué los servidores WebSocket en Node.js/Go chocan con el muro de RAM',
        paragraphs: [
          'Mantener 500.000 conexiones TCP abiertas simultáneamente significa gestionar 500.000 máquinas de estado en memoria. En runtimes con Garbage Collector, el simple escaneo periódico de millones de objetos vivos en heap dispara picos de CPU y latencia de cola (p99.9) cada pocos segundos.',
          'Las futures de Tokio se compilan a máquinas de estado exactas de tamaño conocido en compilación. Sin stacks de goroutines ni objetos JS en V8, cada conexión WebSocket activa consume apenas unos pocos kilobytes de memoria residente.',
        ],
      },
      {
        id: 'arquitectura-sharded',
        heading: '2. Sharding del Broker para eliminar contención de Locks',
        paragraphs: [
          'El error más común al escribir un servidor WebSocket en Rust es meter todos los clientes en un único Arc<RwLock<HashMap<ClientId, Sender>>>. Bajo tráfico alto de conexiones/desconexiones, ese lock global se convierte en un cuello de botella brutal.',
          'La arquitectura correcta divide el registro en N shards independientes (o usa DashMap / canales broadcast por sala) y separa el lector y escritor del socket con split() para que un cliente lento nunca bloquee el broadcast del resto.',
        ],
        code: {
          filename: 'src/ws/broker.rs',
          language: 'rust',
          code: `use axum::extract::ws::{Message, WebSocket};
use bytes::Bytes;
use futures_util::{SinkExt, StreamExt};
use tokio::sync::broadcast;

pub async fn handle_socket(socket: WebSocket, mut rx: broadcast::Receiver<Bytes>) {
    let (mut ws_tx, mut ws_rx) = socket.split();

    // Tarea de escritura: envía frames compartidos (Bytes) sin clonar payload
    let mut send_task = tokio::spawn(async move {
        while let Ok(payload) = rx.recv().await {
            if ws_tx.send(Message::Binary(payload)).await.is_err() {
                break;
            }
        }
    });

    // Tarea de lectura: procesa heartbeats / pings y detecta cierre
    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(msg)) = ws_rx.next().await {
            if matches!(msg, Message::Close(_)) {
                break;
            }
        }
    });

    // Si cualquiera de los lados termina, abortamos el otro inmediatamente
    tokio::select! {
        _ = &mut send_task => recv_task.abort(),
        _ = &mut recv_task => send_task.abort(),
    }
}`,
          caption:
            'Separar lectura y escritura mediante tokio::select! garantiza limpieza instantánea de tareas huérfanas al desconectarse un cliente.',
        },
      },
      {
        id: 'tuning-kernel',
        heading: '3. Tuning del Kernel Linux para >100k Conexiones',
        paragraphs: [
          'El código Rust impecable no sirve de nada si el sistema operativo rechaza conexiones al llegar a 1.024 file descriptors. Antes de escalar a producción, ajustamos los parámetros de red y límites de proceso del kernel Linux:',
        ],
        bullets: [
          'Aumentar fs.file-max y LimitNOFILE en systemd/Docker por encima del doble de conexiones esperadas.',
          'Ajustar net.core.somaxconn y net.ipv4.tcp_max_syn_backlog para absorber ráfagas de reconexión masiva.',
          'Configurar heartbeats Ping/Pong con timeout estricto para purgar sockets half-open (clientes móviles que pierden cobertura).',
        ],
      },
    ],
    checklist: [
      'Uso de socket.split() + tokio::select! para evitar tareas zombis tras desconexiones.',
      'Payloads broadcast serializados una sola vez en bytes::Bytes antes del fan-out.',
      'Manejo explícito de RecvError::Lagged para desconectar consumidores extremadamente lentos.',
      'Parámetros sysctl de Linux y límites ulimit auditados en los nodos de producción.',
    ],
  },
  {
    id: 'legacy-migration',
    rfdId: 'RFD-006',
    title: 'Patrones para migrar Oracle/ERP Legacy con doble escritura y rollback',
    subtitle:
      'Cómo reemplazar monolitos críticos en Java, PHP o Python por microservicios en Rust usando Strangler Fig, tráfico sombra y verificación de paridad.',
    excerpt:
      'Estrategia de migración por capas con feature flags, replay de eventos y pruebas canario para plataformas críticas.',
    tech: 'rust',
    pillar: 'migrar',
    readTime: '11 min',
    date: '28 Apr, 2026',
    isoDate: '2026-04-28',
    toolchain: 'Strangler Fig · Shadow Traffic · Rust Gateway',
    author: {
      name: 'Glastor Systems Team',
      role: 'Legacy Modernization & Enterprise Architecture',
    },
    tags: ['#Migration', '#Reliability'],
    metrics: [
      {
        label: 'Downtime de Migración',
        value: '0 min',
        detail: 'Corte progresivo por porcentajes',
      },
      { label: 'Rollback Instantáneo', value: '< 10 s', detail: 'Feature flag en el edge proxy' },
      {
        label: 'Ahorro Cloud Post-Corte',
        value: '-72%',
        detail: 'Consolidación de cómputo e infra',
      },
    ],
    sections: [
      {
        id: 'no-big-bang',
        heading: '1. Por qué las reescrituras "Big Bang" fracasan el 80% de las veces',
        paragraphs: [
          'Detener la evolución del negocio durante 12 meses para reescribir un monolito entero en Rust es un suicidio operativo. Mientras el equipo construye el sistema nuevo, el sistema legacy sigue acumulando reglas de negocio, parches fiscales y casos borde que nadie documentó.',
          'En Glastor ejecutamos migraciones incrementales bajo el patrón Strangler Fig: colocamos un proxy liviano en Rust frente al sistema legacy, extraemos el dominio con mayor dolor (latencia o costo de cómputo) y validamos paridad bit-a-bit con tráfico real en sombra antes de mover un solo euro de producción.',
        ],
        diagram: {
          title: 'Patrón Strangler Fig con Shadow Traffic',
          subtitle: 'Validación determinista de paridad antes del corte definitivo',
          nodes: [
            {
              step: '01',
              label: 'Edge Router (Rust)',
              detail: 'Recibe tráfico real y clona peticiones de lectura en async',
              highlight: true,
            },
            {
              step: '02',
              label: 'Sistema Legacy (Autoridad)',
              detail: 'Responde al cliente sin impacto en SLA durante la fase shadow',
            },
            {
              step: '03',
              label: 'Nuevo Servicio Rust',
              detail: 'Ejecuta el mismo payload en paralelo y registra latencia',
              highlight: true,
            },
            {
              step: '04',
              label: 'Diff Auditor',
              detail: 'Compara JSON/status; al llegar a 99.99% paridad -> Canary 5%..100%',
            },
          ],
        },
      },
      {
        id: 'auditor-paridad',
        heading: '2. Implementación de Comparador de Paridad en Tráfico Sombra',
        paragraphs: [
          'Durante la fase de shadowing, la respuesta del nuevo microservicio en Rust nunca se devuelve al usuario final: se compara de forma asíncrona contra la respuesta del legacy para detectar diferencias de redondeo, zonas horarias o campos nulos.',
        ],
        code: {
          filename: 'src/migration/shadow.rs',
          language: 'rust',
          code: `use serde_json::Value;

#[derive(Debug, PartialEq, Eq)]
pub enum ParityResult {
    ExactMatch,
    Mismatch { field_diff: String },
}

/// Compara la respuesta del servicio legacy contra el nuevo motor Rust
/// ignorando campos no deterministas como timestamps de ejecución o request_id.
pub fn compare_payloads(legacy: &Value, rust_next: &Value) -> ParityResult {
    if legacy == rust_next {
        return ParityResult::ExactMatch;
    }

    ParityResult::Mismatch {
        field_diff: format!(
            "legacy_len={} rust_len={}",
            legacy.to_string().len(),
            rust_next.to_string().len()
        ),
    }
}`,
          caption:
            'El comparador de paridad emite métricas a Prometheus: solo habilitamos el corte canario cuando los mismatches caen a cero durante 7 días consecutivos.',
        },
      },
      {
        id: 'doble-escritura',
        heading: '3. Doble Escritura y Estrategia de Rollback Seguro',
        paragraphs: [
          'Para flujos transaccionales de escritura, aplicamos CDC (Change Data Capture con Debezium o triggers transaccionales) o el patrón Outbox para mantener sincronizada la base de datos nueva con la legacy durante la ventana de transición. Si en cualquier momento una métrica de negocio se desvía, el rollback consiste en revertir un único flag en menos de 10 segundos sin pérdida de datos.',
        ],
        callout: {
          type: 'architecture',
          title: 'Empieza por el 20% que quema el 80% de tu factura Cloud',
          body: 'No necesitas migrar el CRUD administrativo ni los paneles internos a Rust. Migra primero el motor de cálculo, el gateway de ingestión o el pipeline de pagos que domina tu consumo de CPU y memoria.',
        },
      },
    ],
    checklist: [
      'Dominio candidato seleccionado por impacto real en latencia p99 o factura cloud.',
      'Tráfico sombra activo validando paridad funcional con 0 impacto en usuarios.',
      'Plan de rollback probado en staging mediante feature flag de enrutamiento.',
      'Sincronización de datos verificada mediante checksums antes de retirar el servicio legacy.',
    ],
  },
];

export function getArticleBySlug(slug: string): TechArticle | undefined {
  return TECH_ARTICLES.find((article) => article.id === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 2): TechArticle[] {
  const current = getArticleBySlug(currentSlug);
  const others = TECH_ARTICLES.filter((a) => a.id !== currentSlug);
  if (!current) return others.slice(0, limit);

  const sameTech = others.filter((a) => a.tech === current.tech);
  const rest = others.filter((a) => a.tech !== current.tech);
  return [...sameTech, ...rest].slice(0, limit);
}
