import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  ogImage?: string;
}

export function SEO({
  title,
  description,
  url = 'https://glastor.es',
  ogImage = 'https://glastor.es/images/og-image.jpg',
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph Metadata (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema.org Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'GLASTOR',
          url: 'https://glastor.es',
          logo: 'https://glastor.es/icons/favicon-512x512.png',
          description:
            'Agencia de software B2B especializada en Rust y arquitecturas de alto rendimiento.',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'ventas@glastor.es',
            telephone: '+5491132578591',
          },
          sameAs: [
            'https://github.com/glastor-dev',
            'https://wa.me/5491132578591',
            'https://t.me/glastordev',
            'https://instagram.com/glastordev',
          ],
        })}
      </script>
    </Helmet>
  );
}
