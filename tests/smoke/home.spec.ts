import { test, expect } from "@playwright/test";

test.describe("smoke: home", () => {
  test("renders without console errors and shows hero copy", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        // Vite dev injects HMR ping logs; ignore framework noise unrelated to app.
        if (/\[vite\]|favicon|DevTools/i.test(text)) return;
        errors.push(`console.error: ${text}`);
      }
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Chris Folmar", { exact: false }).first()).toBeVisible();

    expect(errors, errors.join("\n")).toHaveLength(0);
  });

  test("security headers are present on the HTML response", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status()).toBe(200);
    const headers = res.headers();
    const csp = headers["content-security-policy"];
    expect(csp).toBeTruthy();
    // Always-present pieces of the policy.
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    // Either nonce-based (production) or 'unsafe-inline' (dev, for
    // Vite's HMR preamble) — both are valid per-environment policies.
    const hasNonce = /script-src[^;]*nonce-/.test(csp);
    const hasUnsafeInline = /script-src[^;]*'unsafe-inline'/.test(csp);
    expect(hasNonce || hasUnsafeInline).toBe(true);
    if (process.env.NODE_ENV === "production") {
      expect(hasNonce).toBe(true);
      expect(hasUnsafeInline).toBe(false);
    }
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });
});
