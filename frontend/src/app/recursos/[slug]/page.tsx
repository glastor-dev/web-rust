import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  Mail,
  ShieldAlert,
  Sparkles,
  Terminal,
} from 'lucide-react';
import {
  TECH_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  type ArticleCallout,
} from '@/data/articles.data';
import { CodeBlockCard } from '@/components/ui/CodeBlockCard';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TECH_ARTICLES.map((article) => ({
    slug: article.id,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado | Glastor Labs',
    };
  }

  return {
    title: `${article.title} | Glastor Labs (${article.rfdId})`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: 'article',
      publishedTime: article.isoDate,
      url: `https://glastor.es/recursos/${article.id}`,
    },
  };
}

function CalloutBox({ callout }: { callout: ArticleCallout }) {
  const styles = {
    warning: {
      border: 'border-amber-400/40 bg-amber-500/5',
      badge: 'text-amber-300',
      Icon: ShieldAlert,
    },
    benchmark: {
      border: 'border-brand/40 bg-brand/5',
      badge: 'text-brand',
      Icon: Sparkles,
    },
    architecture: {
      border: 'border-white/20 bg-white/[0.03]',
      badge: 'text-brand',
      Icon: Cpu,
    },
  }[callout.type];

  const Icon = styles.Icon;

  return (
    <div className={`my-8 border p-5 sm:p-6 ${styles.border}`}>
      <div
        className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-2 ${styles.badge}`}
      >
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{callout.title}</span>
      </div>
      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{callout.body}</p>
    </div>
  );
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.id, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.subtitle,
    datePublished: article.isoDate,
    author: {
      '@type': 'Organization',
      name: 'Glastor',
      url: 'https://glastor.es',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Glastor',
      url: 'https://glastor.es',
    },
    proficiencyLevel: 'Expert',
    keywords: article.tags.join(', '),
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-28 sm:pt-36 pb-24 selection:bg-brand selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Volver a Recursos</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            <span className="px-2 py-0.5 border border-brand/40 bg-brand/10 text-brand">
              {article.rfdId}
            </span>
            <span>{article.toolchain}</span>
          </div>
        </div>

        {/* Hero Header */}
        <header className="max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-brand uppercase tracking-widest px-2.5 py-1 bg-brand/5 border border-brand/20"
              >
                {tag}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
              {article.readTime}
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              · {article.date}
            </span>
          </div>

          <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-black tracking-tighter text-white uppercase leading-[0.95] mb-6">
            {article.title}
            <span className="text-brand">.</span>
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed">{article.subtitle}</p>
        </header>

        {/* Key Metrics Strip */}
        <section
          aria-label="Métricas de ingeniería"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          {article.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border border-white/10 bg-[#0a0a0a] p-5 flex flex-col justify-between"
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                {metric.label}
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-brand font-mono">
                {metric.value}
              </span>
              <span className="text-xs text-zinc-400 mt-1">{metric.detail}</span>
            </div>
          ))}
        </section>

        {/* 2-Column Article Body + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Technical Content */}
          <div className="lg:col-span-8 space-y-14">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-5">
                  {section.heading}
                </h2>

                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p
                      key={`${section.id}-p-${idx}`}
                      className="text-zinc-300 text-base sm:text-[17px] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-6 space-y-3 border-l-2 border-brand/40 pl-5">
                    {section.bullets.map((bullet, idx) => (
                      <li
                        key={`${section.id}-b-${idx}`}
                        className="text-zinc-300 text-sm sm:text-base leading-relaxed"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.diagram && (
                  <div className="my-8 border border-white/10 bg-[#090909] p-5 sm:p-6">
                    <div className="mb-5 border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand block mb-1">
                        // DIAGRAMA DE ARQUITECTURA
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                        {section.diagram.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        {section.diagram.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {section.diagram.nodes.map((node) => (
                        <div
                          key={node.step}
                          className={`p-4 border flex flex-col justify-between ${
                            node.highlight
                              ? 'border-brand/50 bg-brand/5'
                              : 'border-white/10 bg-[#050505]'
                          }`}
                        >
                          <div>
                            <span className="font-mono text-[10px] tracking-widest text-brand block mb-1">
                              STEP {node.step}
                            </span>
                            <div className="font-bold text-sm text-white mb-2">{node.label}</div>
                          </div>
                          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                            {node.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.code && (
                  <CodeBlockCard
                    filename={section.code.filename}
                    language={section.code.language}
                    code={section.code.code}
                    caption={section.code.caption}
                  />
                )}

                {section.callout && <CalloutBox callout={section.callout} />}
              </section>
            ))}

            {/* Production Readiness Checklist */}
            <section className="border border-brand/30 bg-[#0a0a0a] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-widest mb-3">
                <Terminal className="w-4 h-4" aria-hidden="true" />
                <span>Checklist de Producción Glastor</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-5">
                Verificación antes de desplegar
              </h2>
              <ul className="space-y-3">
                {article.checklist.map((item, idx) => (
                  <li
                    key={`check-${idx}`}
                    className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Table of Contents */}
              <nav
                aria-label="Índice del artículo"
                className="border border-white/10 bg-[#0a0a0a] p-6"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand block mb-4">
                  // ÍNDICE TÉCNICO
                </span>
                <ul className="space-y-3">
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-xs font-mono text-zinc-400 hover:text-brand transition-colors block leading-relaxed"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Author & Toolchain */}
              <div className="border border-white/10 bg-[#0a0a0a] p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                  Autoría Técnica
                </span>
                <div className="text-white font-bold text-sm">{article.author.name}</div>
                <div className="text-zinc-400 font-mono text-xs mt-1">{article.author.role}</div>
              </div>

              {/* Direct Engineering Review CTA */}
              <div className="border border-brand/30 bg-[#0a0a0a] p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand block mb-2">
                  Auditoría Directa
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  ¿Tu equipo está lidiando con este cuello de botella en producción? Revisamos tu
                  arquitectura en una sesión técnica directa.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/arquitectura"
                    className="w-full py-3 px-4 bg-brand text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>Configurador B2B</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <a
                    href="mailto:founder@glastor.es"
                    className="w-full py-2.5 px-4 border border-white/15 text-zinc-300 hover:border-brand hover:text-brand font-mono text-xs uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>founder@glastor.es</span>
                  </a>
                </div>
              </div>

              {/* Related Articles */}
              {related.length > 0 && (
                <div className="border border-white/10 bg-[#0a0a0a] p-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-4">
                    Siguientes Lecturas
                  </span>
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/recursos/${rel.id}`}
                        className="block group border-b border-white/5 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="text-[10px] font-mono text-brand uppercase tracking-widest">
                          {rel.rfdId} · {rel.readTime}
                        </span>
                        <div className="text-sm font-bold text-zinc-200 group-hover:text-brand transition-colors mt-1 leading-snug">
                          {rel.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>

      <div className="mt-24">
        <FinalCTA />
      </div>
    </main>
  );
}
