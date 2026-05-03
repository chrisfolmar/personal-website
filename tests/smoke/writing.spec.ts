import { test, expect } from "@playwright/test";

test.describe("smoke: writing", () => {
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
