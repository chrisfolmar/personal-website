import { test, expect } from "@playwright/test";

test.describe("smoke: theme toggle", () => {
  test("dark-mode preference persists across reload", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("theme"));
    await page.reload();

    const toggle = page.locator("#theme-toggle, #mobile-theme-toggle").first();
    await expect(toggle).toBeVisible();

    const initiallyDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );

    await toggle.click();

    const afterToggle = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(afterToggle).toBe(!initiallyDark);

    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    expect(stored === "dark" || stored === "light").toBe(true);

    await page.reload();
    const afterReload = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(afterReload).toBe(afterToggle);
  });
});
