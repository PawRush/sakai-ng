import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should load dashboard with all widgets', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that we're on the dashboard
    await expect(page).toHaveURL('/');

    // Verify main layout is present
    await expect(page.locator('.layout-main')).toBeVisible();

    // Check for stats widget
    await expect(page.locator('app-stats-widget')).toBeVisible();

    // Check for recent sales widget
    await expect(page.locator('app-recent-sales-widget')).toBeVisible();

    // Check for best selling widget
    await expect(page.locator('app-best-selling-widget')).toBeVisible();
  });

  test('should have functional navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check sidebar is present
    await expect(page.locator('.layout-sidebar')).toBeVisible();

    // Check topbar is present
    await expect(page.locator('.layout-topbar')).toBeVisible();

    // Verify menu is present
    await expect(page.locator('.layout-menu')).toBeVisible();
  });
});
