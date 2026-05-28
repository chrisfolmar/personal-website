declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

const isEnabled = !import.meta.env.DEV && !!MEASUREMENT_ID;

export function initAnalytics(): void {
  if (!isEnabled) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string): void {
  if (!isEnabled) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
  });
}
