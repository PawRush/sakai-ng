import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page with all form elements', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check page title/heading
    await expect(page.locator('text=Welcome to PrimeLand!')).toBeVisible();
    await expect(page.locator('text=Sign in to continue')).toBeVisible();

    // Check for email input
    await expect(page.locator('#email1')).toBeVisible();
    
    // Check for password input
    await expect(page.locator('#password1')).toBeVisible();

    // Check for remember me checkbox
    await expect(page.locator('#rememberme1')).toBeVisible();

    // Check for sign in button
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  });

  test('should allow form interaction and login', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill in form
    const emailInput = page.locator('#email1');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');

    const passwordInput = page.locator('#password1 input');
    await passwordInput.fill('testpassword123');

    // Click sign in button
    await page.locator('button:has-text("Sign In")').click();

    // Should redirect to dashboard
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });
});
