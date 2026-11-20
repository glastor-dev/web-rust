export type SchemaType = 'Organization' | 'Product' | 'WebSite';

interface SEOProps {
  schemaType?: SchemaType;
  dynamicSchema?: any;
}

export function SEO({ schemaType = 'Organization', dynamicSchema }: SEOProps) {
  let schema = dynamicSchema;

  if (!schema && schemaType === 'Organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GLASTOR',
      url: 'https://glastor.es',
      logo: 'https://glastor.es/icons/favicon-512x512.png',
      description:
        'Agencia de ingeniería de software B2B especializada en Rust, AI Privacy (pii-veil), DevSecOps Supply Chain y arquitecturas de alto rendimiento.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'founder@glastor.es',
        telephone: '+5491132578591',
      },
      sameAs: [
        'https://github.com/glastor-core',
        'https://github.com/glastor-dev',
        'https://pii-veil.glastor.es',
        'https://www.youtube.com/@glastor-es',
        'https://wa.me/5491132578591',
        'https://t.me/glastordev',
        'https://instagram.com/glastordev',
      ],
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
