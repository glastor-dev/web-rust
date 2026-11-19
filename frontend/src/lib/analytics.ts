/**
 * Client-side event tracker (legacy Rust store /api/analytics/event disabled
 * for static-first deployment; PostHog handles active telemetry when configured).
 */
export const trackEvent = async (_eventName: string, _data?: string) => {
  // No-op when legacy backend is disabled
};
