import { test, expect } from "@playwright/test";

test.describe("smoke: archive banner", () => {
  test("/blog/4 shows the archive banner", async ({ page }) => {
    await page.goto("/blog/4");
    const banner = page.getByTestId("archive-banner");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/older take|archive/i);
  });
});
