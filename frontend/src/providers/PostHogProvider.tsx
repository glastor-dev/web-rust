'use client';

import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    // Solo inicializar si existe una clave real y válida de PostHog
    if (typeof window !== 'undefined' && posthogKey && posthogKey !== 'phc_dummy_key') {
      import('posthog-js')
        .then((posthogModule) => {
          const posthog = posthogModule.default;
          posthog.init(posthogKey, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
            person_profiles: 'identified_only',
            capture_pageview: false,
            capture_pageleave: true,
          });
        })
        .catch((err) => console.debug('Failed to load PostHog', err));
    }
  }, []);

  return <>{children}</>;
}
