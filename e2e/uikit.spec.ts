import { test, expect } from '@playwright/test';

test.describe('UI Kit Components', () => {
  test('should display button demo page', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for various button types
    await expect(page.locator('text=Default')).toBeVisible();
    await expect(page.locator('text=Severities')).toBeVisible();
    await expect(page.locator('text=Outlined')).toBeVisible();
  });

  test('should display different button severities', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for buttons with different severities
    await expect(page.locator('button:has-text("Primary")')).toBeVisible();
    await expect(page.locator('button:has-text("Secondary")')).toBeVisible();
    await expect(page.locator('button:has-text("Success")')).toBeVisible();
    await expect(page.locator('button:has-text("Info")')).toBeVisible();
    await expect(page.locator('button:has-text("Warn")')).toBeVisible();
    await expect(page.locator('button:has-text("Danger")')).toBeVisible();
  });

  test('should display icon buttons', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for Icons section
    await expect(page.locator('text=Icons')).toBeVisible();

    // Check for buttons with icons
    const iconButtons = page.locator('button .pi-bookmark');
    const count = await iconButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display rounded buttons', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for Rounded section
    await expect(page.locator('text=Rounded')).toBeVisible();
  });

  test('should display loading buttons', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for Loading section
    await expect(page.locator('text=Loading')).toBeVisible();

    // Click a loading button and verify it shows loading state
    const loadingButton = page.locator('button:has-text("Search")').first();
    await loadingButton.click();

    // Should show loading spinner
    await expect(page.locator('.pi-spinner')).toBeVisible({ timeout: 2000 });
  });

  test('should display split buttons', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for SplitButton section
    await expect(page.locator('text=SplitButton')).toBeVisible();

    // Check for split button component
    const splitButton = page.locator('p-splitbutton').first();
    await expect(splitButton).toBeVisible();
  });

  test('should display button groups', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for Group section
    await expect(page.locator('text=Group')).toBeVisible();

    // Check for button group
    const buttonGroup = page.locator('p-buttongroup').first();
    await expect(buttonGroup).toBeVisible();
  });

  test('should display input demo page', async ({ page }) => {
    await page.goto('/uikit/input');
    await page.waitForLoadState('networkidle');

    // Check that input demo page loads
    const inputText = page.locator('input[pInputText]').first();
    await expect(inputText).toBeVisible();
  });

  test('should display table demo page', async ({ page }) => {
    await page.goto('/uikit/table');
    await page.waitForLoadState('networkidle');

    // Check for table component
    const table = page.locator('p-table');
    await expect(table).toBeVisible();

    // Check for table data
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });
    const rows = page.locator('p-table tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should display list demo page', async ({ page }) => {
    await page.goto('/uikit/list');
    await page.waitForLoadState('networkidle');

    // Check for list components
    const listbox = page.locator('p-listbox, p-orderlist, p-picklist');
    await expect(listbox.first()).toBeVisible();
  });

  test('should display chart demo page', async ({ page }) => {
    await page.goto('/uikit/charts');
    await page.waitForLoadState('networkidle');

    // Check for chart canvases
    const charts = page.locator('canvas');
    const chartCount = await charts.count();
    expect(chartCount).toBeGreaterThan(0);
  });

  test('should display panel demo page', async ({ page }) => {
    await page.goto('/uikit/panel');
    await page.waitForLoadState('networkidle');

    // Check for panel components
    const panels = page.locator('p-panel, p-accordion, p-fieldset');
    await expect(panels.first()).toBeVisible();
  });

  test('should display overlay demo page', async ({ page }) => {
    await page.goto('/uikit/overlay');
    await page.waitForLoadState('networkidle');

    // Check for overlay trigger buttons
    const overlayButtons = page.locator('button');
    await expect(overlayButtons.first()).toBeVisible();
  });

  test('should display menu demo page', async ({ page }) => {
    await page.goto('/uikit/menu');
    await page.waitForLoadState('networkidle');

    // Check for menu components
    const menus = page.locator('p-menubar, p-menu, p-tieredmenu');
    await expect(menus.first()).toBeVisible();
  });

  test('should display message demo page', async ({ page }) => {
    await page.goto('/uikit/message');
    await page.waitForLoadState('networkidle');

    // Check for message components
    const messages = page.locator('p-message, p-messages');
    await expect(messages.first()).toBeVisible();
  });

  test('should display file upload demo page', async ({ page }) => {
    await page.goto('/uikit/file');
    await page.waitForLoadState('networkidle');

    // Check for file upload component
    const fileUpload = page.locator('p-fileupload');
    await expect(fileUpload).toBeVisible();
  });

  test('should display tree demo page', async ({ page }) => {
    await page.goto('/uikit/tree');
    await page.waitForLoadState('networkidle');

    // Check for tree component
    const tree = page.locator('p-tree');
    await expect(tree).toBeVisible();
  });

  test('should display form layout demo page', async ({ page }) => {
    await page.goto('/uikit/formlayout');
    await page.waitForLoadState('networkidle');

    // Check for form elements
    const forms = page.locator('form, .field, input');
    await expect(forms.first()).toBeVisible();
  });

  test('should navigate between UI kit pages using menu', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check sidebar menu is present
    const menu = page.locator('.layout-menu, .layout-sidebar');
    await expect(menu).toBeVisible();

    // Try to navigate to another UI kit page
    // Look for menu items
    const menuItems = page.locator('.layout-menu a');
    const menuCount = await menuItems.count();
    expect(menuCount).toBeGreaterThan(0);
  });

  test('should display miscellaneous components demo', async ({ page }) => {
    await page.goto('/uikit/misc');
    await page.waitForLoadState('networkidle');

    // Check for various misc components
    const miscComponents = page.locator('p-progressbar, p-badge, p-tag, p-chip');
    await expect(miscComponents.first()).toBeVisible();
  });

  test('should have interactive buttons that respond to clicks', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Test clicking a button
    const submitButton = page.locator('button:has-text("Submit")').first();
    await expect(submitButton).toBeEnabled();

    // Click should not throw error
    await submitButton.click();
  });

  test('should display disabled state correctly', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for disabled button
    const disabledButton = page.locator('button:has-text("Disabled")');
    await expect(disabledButton).toBeDisabled();
  });

  test('should display timeline demo page', async ({ page }) => {
    await page.goto('/uikit/timeline');
    await page.waitForLoadState('networkidle');

    // Check for timeline component
    const timeline = page.locator('p-timeline');
    await expect(timeline).toBeVisible();
  });

  test('should display media demo page', async ({ page }) => {
    await page.goto('/uikit/media');
    await page.waitForLoadState('networkidle');

    // Check for media components (carousel, image, etc.)
    const mediaComponents = page.locator('p-carousel, p-image, p-galleria');
    await expect(mediaComponents.first()).toBeVisible();
  });
});
