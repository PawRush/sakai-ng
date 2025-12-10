import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display dashboard page', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check that we're on the dashboard
    await expect(page).toHaveURL('/');

    // Verify main layout is present
    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();
  });

  test('should display stats widgets', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for stats widget component
    const statsWidget = page.locator('app-stats-widget');
    await expect(statsWidget).toBeVisible();

    // Verify stats cards are displayed
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
  });

  test('should display recent sales widget', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for recent sales widget
    const recentSalesWidget = page.locator('app-recent-sales-widget');
    await expect(recentSalesWidget).toBeVisible();
  });

  test('should display best selling widget', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for best selling widget
    const bestSellingWidget = page.locator('app-best-selling-widget');
    await expect(bestSellingWidget).toBeVisible();
  });

  test('should display revenue stream widget', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for revenue stream widget
    const revenueWidget = page.locator('app-revenue-stream-widget');
    await expect(revenueWidget).toBeVisible();
  });

  test('should display notifications widget', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for notifications widget
    const notificationsWidget = page.locator('app-notifications-widget');
    await expect(notificationsWidget).toBeVisible();
  });

  test('should have functional sidebar navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check sidebar is present
    const sidebar = page.locator('.layout-sidebar');
    await expect(sidebar).toBeVisible();

    // Verify menu is present
    const menu = page.locator('.layout-menu');
    await expect(menu).toBeVisible();
  });

  test('should have functional topbar', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check topbar is present
    const topbar = page.locator('.layout-topbar');
    await expect(topbar).toBeVisible();
  });

  test('should display page title or logo', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check that the page has some branding or title
    const hasLogo = await page.locator('.layout-topbar svg, .layout-topbar img').count() > 0;
    const hasTitle = await page.locator('.layout-topbar').textContent();

    expect(hasLogo || hasTitle).toBeTruthy();
  });
});
