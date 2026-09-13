import { test, expect } from "@playwright/test";

test.describe("smoke: writing", () => {
  test("features one writing piece from 2024, 2025, and 2026", async ({ page }) => {
    await page.goto("/writing");

    const startHere = page.getByTestId("writing-start-here");
    await expect(startHere).toBeVisible();
    await expect(startHere.getByRole("link")).toHaveCount(3);
    await expect(
      startHere.getByRole("link", {
        name: /How to Increase Project Throughput by 300%/,
      }),
    ).toHaveAttribute(
      "href",
      "https://builders.fullscript.com/posts/how-to-increase-project-throughput",
    );
    await expect(
      startHere.getByRole("link", {
        name: /Elevating Your Team Through Effective Feedback/,
      }),
    ).toHaveAttribute(
      "href",
      "https://builders.fullscript.com/posts/elevating-your-team-through-effective-feedback-insights-from-a-fullscript-technical-lead",
    );
    await expect(
      startHere.locator('a[href="/case-studies/scaling-bse-throughput"]'),
    ).toHaveCount(0);

    const featuredText = await startHere.textContent();
    expect(featuredText?.match(/2024/g)).toHaveLength(1);
    expect(featuredText?.match(/2025/g)).toHaveLength(1);
    expect(featuredText?.match(/2026/g)).toHaveLength(1);
  });

  test("category chip narrows visible posts", async ({ page }) => {
    await page.goto("/writing");
    await expect(page.getByTestId("writing-category-filters")).toBeVisible();

    const allChip = page.getByTestId("category-chip-all");
    await expect(allChip).toBeVisible();

    const articlesBefore = await page.locator("article, a[href^='/blog/']").count();
    expect(articlesBefore).toBeGreaterThan(0);

    // Click the first non-"All" chip.
    const chips = page.getByTestId(/^category-chip-(?!count-)/);
    const chipCount = await chips.count();
    expect(chipCount).toBeGreaterThan(1);

    let narrowed = false;
    for (let i = 0; i < chipCount; i++) {
      const chip = chips.nth(i);
      const testId = await chip.getAttribute("data-testid");
      if (!testId || testId === "category-chip-all") continue;
      await chip.click();
      await page.waitForURL(/category=/);
      const after = await page.locator("article, a[href^='/blog/']").count();
      if (after !== articlesBefore && after > 0) {
        narrowed = true;
        break;
      }
    }
    expect(narrowed, "selecting a category chip should change the visible card count").toBe(true);
  });
});
