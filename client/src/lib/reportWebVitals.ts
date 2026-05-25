import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

function send(metric: Metric) {
  try {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      path: typeof window !== "undefined" ? window.location.pathname : "",
    });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/vitals", blob);
      return;
    }
    fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* swallow — telemetry must never break the page */
  }
}

export function reportWebVitals() {
  if (typeof window === "undefined") return;
  onCLS(send);
  onFCP(send);
  onINP(send);
  onLCP(send);
  onTTFB(send);
}
