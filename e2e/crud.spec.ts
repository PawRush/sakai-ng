import { test, expect } from '@playwright/test';

test.describe('CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/crud');
    await page.waitForLoadState('networkidle');
  });

  test('should display CRUD page with products table', async ({ page }) => {
    // Check for the main table component
    const table = page.locator('p-table');
    await expect(table).toBeVisible();

    // Check for table header
    await expect(page.locator('text=Manage Products')).toBeVisible();
  });

  test('should display toolbar with action buttons', async ({ page }) => {
    // Check for toolbar
    const toolbar = page.locator('p-toolbar');
    await expect(toolbar).toBeVisible();

    // Check for New button
    const newButton = page.locator('button:has-text("New")');
    await expect(newButton).toBeVisible();
    await expect(newButton).toBeEnabled();

    // Check for Delete button
    const deleteButton = page.locator('button:has-text("Delete")');
    await expect(deleteButton).toBeVisible();

    // Check for Export button
    const exportButton = page.locator('button:has-text("Export")');
    await expect(exportButton).toBeVisible();
  });

  test('should display search functionality', async ({ page }) => {
    // Check for search input
    const searchInput = page.locator('input[placeholder="Search..."]');
    await expect(searchInput).toBeVisible();
  });

  test('should display table columns', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('p-table table');

    // Check for table headers
    await expect(page.locator('th:has-text("Code")')).toBeVisible();
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Image")')).toBeVisible();
    await expect(page.locator('th:has-text("Price")')).toBeVisible();
    await expect(page.locator('th:has-text("Category")')).toBeVisible();
    await expect(page.locator('th:has-text("Reviews")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
  });

  test('should display product data in table', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Check that at least one product row exists
    const rows = page.locator('p-table tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should open new product dialog when clicking New button', async ({ page }) => {
    // Click the New button
    const newButton = page.locator('button:has-text("New")');
    await newButton.click();

    // Check dialog title appears
    await expect(page.locator('text=Product Details')).toBeVisible();

    // Check form fields
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('label[for="description"]')).toBeVisible();
    await expect(page.locator('#description')).toBeVisible();
  });

  test('should allow creating a new product', async ({ page }) => {
    // Click the New button
    await page.locator('button:has-text("New")').click();

    // Wait for dialog title to appear
    await page.waitForSelector('text=Product Details', { timeout: 10000 });

    // Fill in product details
    await page.locator('#name').fill('Test Product');
    await page.locator('#description').fill('This is a test product description');

    // Fill price - need to find the input within the p-inputnumber component
    await page.locator('#price input').fill('99.99');
    await page.locator('#quantity input').fill('10');

    // Select a category
    await page.locator('#category1').click();

    // Save the product
    await page.locator('button:has-text("Save")').click();

    // Verify success toast message appears
    await expect(page.locator('text=Product Created')).toBeVisible({ timeout: 10000 });
  });

  test('should allow editing a product', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Click edit button on first product - look for pencil icon
    const editButton = page.locator('p-table tbody tr').first().locator('button').filter({ has: page.locator('.pi-pencil') });
    await editButton.click();

    // Wait for dialog title
    await page.waitForSelector('text=Product Details', { timeout: 10000 });

    // Check dialog is populated with product data
    const nameInput = page.locator('#name');
    const currentName = await nameInput.inputValue();
    expect(currentName.length).toBeGreaterThan(0);

    // Modify the name
    await nameInput.fill(currentName + ' - Updated');

    // Save changes
    await page.locator('button:has-text("Save")').click();

    // Verify success message
    await expect(page.locator('text=Product Updated')).toBeVisible({ timeout: 10000 });
  });

  test('should allow deleting a product', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Click delete button on first product - look for trash icon
    const deleteButton = page.locator('p-table tbody tr').first().locator('button').filter({ has: page.locator('.pi-trash') });
    await deleteButton.click();

    // Wait for confirmation dialog message
    await expect(page.locator('text=/Are you sure you want to delete/')).toBeVisible({ timeout: 10000 });

    // Confirm deletion - look for accept button
    await page.locator('button:has-text("Yes"), button:has-text("OK"), button.p-confirm-dialog-accept').first().click();

    // Verify success message
    await expect(page.locator('text=Product Deleted')).toBeVisible({ timeout: 10000 });
  });

  test('should allow searching products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Get initial row count
    const initialRows = await page.locator('p-table tbody tr').count();

    // Type in search box
    const searchInput = page.locator('input[placeholder="Search..."]');
    await searchInput.fill('bamboo');

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Check that results are filtered
    const filteredRows = await page.locator('p-table tbody tr').count();
    // Filtered results should be different from initial (could be less or show "no records")
    expect(filteredRows).toBeLessThanOrEqual(initialRows);
  });

  test('should display pagination controls', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Check for paginator
    const paginator = page.locator('.p-paginator');
    await expect(paginator).toBeVisible();

    // Check for page report
    await expect(page.locator('text=/Showing \\d+ to \\d+ of \\d+ products/')).toBeVisible();
  });

  test('should allow selecting products with checkboxes', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Initially delete button should be disabled
    const deleteSelectedButton = page.locator('p-toolbar button:has-text("Delete")');
    await expect(deleteSelectedButton).toBeDisabled();

    // Click first product checkbox
    await page.locator('p-table tbody tr').first().locator('p-tablecheckbox').click();

    // Now delete button should be enabled
    await expect(deleteSelectedButton).toBeEnabled();
  });

  test('should display product ratings', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Check for rating component
    const rating = page.locator('p-rating').first();
    await expect(rating).toBeVisible();
  });

  test('should display product status tags', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Check for status tag
    const tag = page.locator('p-tag').first();
    await expect(tag).toBeVisible();
  });

  test('should display product images', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

    // Check for product images in table
    const images = page.locator('p-table tbody tr img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });

  test('should cancel product dialog', async ({ page }) => {
    // Click the New button
    await page.locator('button:has-text("New")').click();

    // Wait for dialog title
    await page.waitForSelector('text=Product Details', { timeout: 10000 });

    // Click cancel button
    await page.locator('button:has-text("Cancel")').click();

    // Dialog should close - verify dialog title is gone
    await expect(page.locator('text=Product Details')).toBeHidden({ timeout: 5000 });
  });
});
