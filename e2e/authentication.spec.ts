import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check page title/heading
    await expect(page.locator('text=Welcome to PrimeLand!')).toBeVisible();
    await expect(page.locator('text=Sign in to continue')).toBeVisible();
  });

  test('should have email input field', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for email label and input
    await expect(page.locator('label[for="email1"]')).toBeVisible();
    const emailInput = page.locator('#email1');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('placeholder', 'Email address');
  });

  test('should have password input field', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for password label and input
    await expect(page.locator('label[for="password1"]')).toBeVisible();
    const passwordInput = page.locator('#password1');
    await expect(passwordInput).toBeVisible();
  });

  test('should have remember me checkbox', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for remember me checkbox
    const rememberMeCheckbox = page.locator('#rememberme1');
    await expect(rememberMeCheckbox).toBeVisible();
    await expect(page.locator('label[for="rememberme1"]')).toHaveText('Remember me');
  });

  test('should have forgot password link', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for forgot password link
    await expect(page.locator('text=Forgot password?')).toBeVisible();
  });

  test('should have sign in button', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for sign in button
    const signInButton = page.locator('button:has-text("Sign In")');
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeEnabled();
  });

  test('should allow typing in email field', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('#email1');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('should allow typing in password field', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // PrimeNG password component wraps an input element
    const passwordInput = page.locator('#password1 input');
    await passwordInput.fill('testpassword123');
    // Password field should have value (but we can't read it directly)
    const value = await passwordInput.inputValue();
    expect(value).toBe('testpassword123');
  });

  test('should toggle remember me checkbox', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // PrimeNG checkbox component - need to find the actual input element
    const checkboxContainer = page.locator('p-checkbox[id="rememberme1"]');

    // Click the checkbox container to toggle
    await checkboxContainer.click();
    await page.waitForTimeout(200);

    // Verify it was checked by looking for the checked class or aria-checked
    const isChecked = await checkboxContainer.locator('input').isChecked();
    expect(isChecked).toBeTruthy();

    // Click to uncheck
    await checkboxContainer.click();
    await page.waitForTimeout(200);
    const isUnchecked = await checkboxContainer.locator('input').isChecked();
    expect(isUnchecked).toBeFalsy();
  });

  test('should redirect to dashboard on sign in button click', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill in form
    await page.locator('#email1').fill('test@example.com');
    await page.locator('#password1 input').fill('testpassword123');

    // Click sign in button
    const signInButton = page.locator('button:has-text("Sign In")');
    await signInButton.click();

    // Should redirect to dashboard (root path)
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  test('should display logo/branding', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for logo SVG
    const logo = page.locator('svg').first();
    await expect(logo).toBeVisible();
  });

  test('should display configurator', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check for floating configurator component - it exists but may be initially hidden
    const configurator = page.locator('app-floating-configurator');
    const count = await configurator.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have proper styling and layout', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Check main container is centered
    const container = page.locator('.flex.items-center.justify-center.min-h-screen');
    await expect(container).toBeVisible();
  });
});
