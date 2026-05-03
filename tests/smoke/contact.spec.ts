import { test, expect } from "@playwright/test";

test.describe("smoke: contact", () => {
  test("submitting empty form surfaces validation errors", async ({ page }) => {
    await page.goto("/contact");

    const submit = page.getByRole("button", { name: /send|submit/i }).first();
    await expect(submit).toBeVisible();
    await submit.click();

    // Wait for the form-level validation to render. shadcn's FormMessage
    // renders an element with role=alert and aria-live=polite for each
    // invalid field.
    const alerts = page.locator("[aria-live='polite']");
    await expect(alerts.first()).toBeVisible();
    const visibleAlerts = await alerts.evaluateAll(
      (els) => els.filter((el) => (el.textContent ?? "").trim().length > 0).length,
    );
    expect(visibleAlerts).toBeGreaterThan(0);

    // The browser stayed on /contact (no successful submit redirect).
    expect(page.url()).toMatch(/\/contact$/);
  });
});
