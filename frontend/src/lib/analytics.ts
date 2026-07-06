export const trackEvent = async (eventName: string, data?: string) => {
  try {
    const payload = {
      event_name: eventName,
      path: window.location.pathname,
      data: data || null,
    };

    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.debug('Failed to track event:', error);
  }
};
