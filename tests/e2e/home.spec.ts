import { test, expect } from "@playwright/test";

test.describe("MASTeR Incubation Foundation Platform", () => {
  test("loads the homepage with institutional branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/MASTeR Incubation Foundation/i);
    await expect(page.getByRole("heading", { name: /Where Ideas Become/i })).toBeVisible();
    await expect(page.getByText(/StartupTN Recognised Pre-Incubation Centre/i)).toBeVisible();
  });

  test("navigates to apply page and sees multi-step form", async ({ page }) => {
    await page.goto("/apply");
    await expect(page.getByRole("heading", { name: /Apply for Incubation at MIF/i })).toBeVisible();
    await expect(page.getByText(/Step 01/i)).toBeVisible();
    await expect(page.getByPlaceholder(/e.g. Anand Kumar/i)).toBeVisible();
  });

  test("checks admin management dashboard", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: /Incubation Operations Management/i })).toBeVisible();
    await expect(page.getByText(/Application Intake Pipeline/i)).toBeVisible();
  });
});
