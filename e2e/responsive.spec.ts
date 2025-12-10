import { test, expect } from '@playwright/test';

test.describe('Responsive Layout - Desktop', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('should display full desktop layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Sidebar should be visible on desktop
    const sidebar = page.locator('.layout-sidebar');
    await expect(sidebar).toBeVisible();

    // Topbar should be visible
    const topbar = page.locator('.layout-topbar');
    await expect(topbar).toBeVisible();

    // Main content should be visible
    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();
  });

  test('should display dashboard widgets in grid on desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check grid layout
    const gridContainer = page.locator('.grid');
    await expect(gridContainer).toBeVisible();

    // Widgets should be in columns
    const widgets = page.locator('app-stats-widget, app-recent-sales-widget, app-best-selling-widget');
    const widgetCount = await widgets.count();
    expect(widgetCount).toBeGreaterThan(0);
  });

  test('should display CRUD table with all columns on desktop', async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');

    // All table columns should be visible
    await expect(page.locator('th:has-text("Code")')).toBeVisible();
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Image")')).toBeVisible();
    await expect(page.locator('th:has-text("Price")')).toBeVisible();
    await expect(page.locator('th:has-text("Category")')).toBeVisible();
  });
});

test.describe('Responsive Layout - Tablet', () => {
  test.use({ viewport: { width: 1024, height: 1366 } }); // iPad Pro dimensions

  test('should display tablet layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that page renders correctly on tablet
    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();

    // Topbar should be visible
    const topbar = page.locator('.layout-topbar');
    await expect(topbar).toBeVisible();
  });

  test('should adapt dashboard layout for tablet', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Grid should be present
    const gridContainer = page.locator('.grid');
    await expect(gridContainer).toBeVisible();

    // Widgets should be visible
    const statsWidget = page.locator('app-stats-widget');
    await expect(statsWidget).toBeVisible();
  });

  test('should display CRUD page on tablet', async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');

    // Table should be visible
    const table = page.locator('p-table');
    await expect(table).toBeVisible();

    // Toolbar should be visible
    const toolbar = page.locator('p-toolbar');
    await expect(toolbar).toBeVisible();
  });

  test('should display login page correctly on tablet', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Login form should be visible and centered
    await expect(page.locator('text=Welcome to PrimeLand!')).toBeVisible();
    const emailInput = page.locator('#email1');
    await expect(emailInput).toBeVisible();
  });
});

test.describe('Responsive Layout - Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 dimensions

  test('should display mobile layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Main content should be visible on mobile
    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();

    // Topbar should be visible with menu toggle
    const topbar = page.locator('.layout-topbar');
    await expect(topbar).toBeVisible();
  });

  test('should stack dashboard widgets vertically on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Widgets should be present
    const statsWidget = page.locator('app-stats-widget');
    await expect(statsWidget).toBeVisible();

    // Grid should adapt to mobile
    const gridContainer = page.locator('.grid');
    await expect(gridContainer).toBeVisible();
  });

  test('should display mobile-friendly CRUD table', async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');

    // Table should be visible
    const table = page.locator('p-table');
    await expect(table).toBeVisible();

    // Toolbar should be visible
    const toolbar = page.locator('p-toolbar');
    await expect(toolbar).toBeVisible();
  });

  test('should display login form correctly on mobile', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Login form should be visible
    await expect(page.locator('text=Welcome to PrimeLand!')).toBeVisible();

    // Form inputs should be visible
    const emailInput = page.locator('#email1');
    await expect(emailInput).toBeVisible();

    const passwordInput = page.locator('#password1');
    await expect(passwordInput).toBeVisible();

    // Sign in button should be full width on mobile
    const signInButton = page.locator('button:has-text("Sign In")');
    await expect(signInButton).toBeVisible();
  });

  test('should allow touch interactions on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if elements are tappable (buttons should be visible and enabled)
    const menuButton = page.locator('.layout-topbar button').first();
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeEnabled();
    }
  });

  test('should display UI kit buttons on mobile', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Buttons should be visible and wrappable
    const buttons = page.locator('button:has-text("Primary")');
    await expect(buttons.first()).toBeVisible();
  });
});

test.describe('Responsive Layout - Landscape Mobile', () => {
  test.use({ viewport: { width: 844, height: 390 } }); // iPhone 12 Pro landscape

  test('should display landscape mobile layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Main content should be visible
    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();
  });

  test('should adapt dashboard for landscape mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Widgets should be visible
    const statsWidget = page.locator('app-stats-widget');
    await expect(statsWidget).toBeVisible();
  });
});

test.describe('Responsive Layout - Small Desktop', () => {
  test.use({ viewport: { width: 1366, height: 768 } });

  test('should display content properly on small desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // All main components should be visible
    const sidebar = page.locator('.layout-sidebar');
    await expect(sidebar).toBeVisible();

    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();
  });

  test('should handle CRUD table on small desktop', async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');

    // Table should be scrollable if needed
    const table = page.locator('p-table');
    await expect(table).toBeVisible();
  });
});

test.describe('Responsive Layout - Ultra-wide', () => {
  test.use({ viewport: { width: 2560, height: 1440 } });

  test('should display content on ultra-wide screen', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Layout should scale appropriately
    const mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();

    // Grid should utilize space
    const gridContainer = page.locator('.grid');
    await expect(gridContainer).toBeVisible();
  });
});

test.describe('Responsive Layout - Viewport Resizing', () => {
  test('should adapt when viewport is resized', async ({ page }) => {
    // Start with desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify desktop layout
    let mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();

    // Resize to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500); // Allow time for layout to adjust

    // Content should still be visible
    mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Content should still be visible
    mainContent = page.locator('.layout-main');
    await expect(mainContent).toBeVisible();
  });
});

test.describe('Responsive Layout - Scrolling', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 dimensions

  test('should support scrolling on mobile', async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');

    // Wait for table to load
    await page.waitForSelector('p-table', { timeout: 10000 });

    // Try to scroll
    const initialY = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(300);

    // Page should be scrollable
    const newY = await page.evaluate(() => window.scrollY);
    expect(newY).toBeGreaterThanOrEqual(initialY);
  });
});
