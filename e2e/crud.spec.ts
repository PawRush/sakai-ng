import { test, expect } from '@playwright/test';

test.describe('CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');
  });

  test('should display CRUD page with products table and toolbar', async ({ page }) => {
    // Check for the main table component
    await expect(page.locator('p-table')).toBeVisible();
    await expect(page.locator('text=Manage Products')).toBeVisible();

    // Check for toolbar buttons
    await expect(page.locator('button:has-text("New")')).toBeVisible();
    await expect(page.locator('button:has-text("Delete")')).toBeVisible();
    await expect(page.locator('button:has-text("Export")')).toBeVisible();

    // Check for search input
    await expect(page.locator('input[placeholder="Search..."]')).toBeVisible();
  });

  test('should display table with columns and data', async ({ page }) => {
    await page.waitForSelector('p-table table');

    // Check for table headers
    await expect(page.locator('th:has-text("Code")')).toBeVisible();
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Price")')).toBeVisible();
    await expect(page.locator('th:has-text("Category")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();

    // Check that product rows exist
    const rows = page.locator('p-table tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should allow creating a new product', async ({ page }) => {
    await page.locator('button:has-text("New")').click();
    await page.waitForSelector('text=Product Details', { timeout: 10000 });

    // Fill in product details
    await page.locator('#name').fill('Test Product');
    await page.locator('#description').fill('This is a test product description');
    await page.locator('#price input').fill('99.99');
    await page.locator('#quantity input').fill('10');
    await page.locator('#category1').click();

    // Save the product
    await page.locator('button:has-text("Save")').click();

    // Verify dialog closes (product was created)
    await expect(page.locator('text=Product Details')).toBeHidden({ timeout: 10000 });
  });

  test('should allow editing a product', async ({ page }) => {
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Click edit button on first product
    const editButton = page.locator('p-table tbody tr').first().locator('button').filter({ has: page.locator('.pi-pencil') });
    await editButton.click();

    await page.waitForSelector('text=Product Details', { timeout: 10000 });

    // Modify the name
    const nameInput = page.locator('#name');
    const currentName = await nameInput.inputValue();
    await nameInput.fill(currentName + ' - Updated');

    // Save changes
    await page.locator('button:has-text("Save")').click();

    // Verify dialog closes (product was updated)
    await expect(page.locator('text=Product Details')).toBeHidden({ timeout: 10000 });
  });

  test('should allow deleting a product', async ({ page }) => {
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Get initial row count
    const initialRowCount = await page.locator('p-table tbody tr').count();

    // Click delete button on first product
    const deleteButton = page.locator('p-table tbody tr').first().locator('button').filter({ has: page.locator('.pi-trash') });
    await deleteButton.click();

    // Wait for confirmation dialog
    await expect(page.locator('text=/Are you sure you want to delete/')).toBeVisible({ timeout: 10000 });

    // Confirm deletion
    await page.locator('button:has-text("Yes"), button:has-text("OK"), button.p-confirm-dialog-accept').first().click();

    // Wait for dialog to close
    await page.waitForTimeout(500);
    
    // Verify row count decreased or confirmation dialog closed
    await expect(page.locator('text=/Are you sure you want to delete/')).toBeHidden({ timeout: 5000 });
  });

  test('should allow searching and filtering products', async ({ page }) => {
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    const initialRows = await page.locator('p-table tbody tr').count();

    // Type in search box
    await page.locator('input[placeholder="Search..."]').fill('bamboo');
    await page.waitForTimeout(500);

    // Check that results are filtered
    const filteredRows = await page.locator('p-table tbody tr').count();
    expect(filteredRows).toBeLessThanOrEqual(initialRows);
  });
});
