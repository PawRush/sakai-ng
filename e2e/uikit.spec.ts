import { test, expect } from '@playwright/test';

test.describe('UI Kit Components', () => {
  test('should display button demo page with all button types', async ({ page }) => {
    await page.goto('/uikit/button');
    await page.waitForLoadState('networkidle');

    // Check for various button sections
    await expect(page.locator('text=Default')).toBeVisible();
    await expect(page.locator('text=Severities')).toBeVisible();
    await expect(page.getByText('Outlined', { exact: true })).toBeVisible();

    // Check for buttons with different severities
    await expect(page.locator('button:has-text("Primary")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Secondary")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Success")').first()).toBeVisible();
  });

  test('should display input demo page', async ({ page }) => {
    await page.goto('/uikit/input');
    await page.waitForLoadState('networkidle');

    const inputText = page.locator('input[pInputText]').first();
    await expect(inputText).toBeVisible();
  });

  test('should display table demo page with data', async ({ page }) => {
    await page.goto('/uikit/table');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('p-table').first()).toBeVisible();
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });
    
    const rows = page.locator('p-table tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should display chart demo page', async ({ page }) => {
    await page.goto('/uikit/charts');
    await page.waitForLoadState('networkidle');

    const charts = page.locator('canvas');
    const chartCount = await charts.count();
    expect(chartCount).toBeGreaterThan(0);
  });

  test('should display panel demo page', async ({ page }) => {
    await page.goto('/uikit/panel');
    await page.waitForLoadState('networkidle');

    const panels = page.locator('p-panel, p-accordion, p-fieldset');
    await expect(panels.first()).toBeVisible();
  });

  test('should display menu demo page', async ({ page }) => {
    await page.goto('/uikit/menu');
    await page.waitForLoadState('networkidle');

    const menus = page.locator('p-menubar, p-menu, p-tieredmenu');
    await expect(menus.first()).toBeVisible();
  });

  test('should display message demo page', async ({ page }) => {
    await page.goto('/uikit/message');
    await page.waitForLoadState('networkidle');

    const messages = page.locator('p-message, p-messages');
    await expect(messages.first()).toBeVisible();
  });

  test('should display file upload demo page', async ({ page }) => {
    await page.goto('/uikit/file');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('p-fileupload').first()).toBeVisible();
  });

  test('should display tree demo page', async ({ page }) => {
    await page.goto('/uikit/tree');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('p-tree')).toBeVisible();
  });

  test('should display form layout demo page', async ({ page }) => {
    await page.goto('/uikit/formlayout');
    await page.waitForLoadState('networkidle');

    const forms = page.locator('form, .field, input');
    await expect(forms.first()).toBeVisible();
  });
});
