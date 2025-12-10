# Playwright E2E Test Suite for Sakai-NG

This directory contains comprehensive end-to-end tests for the Sakai-NG Angular 20 admin application using Playwright.

## Test Coverage

### 1. Dashboard Tests (`dashboard.spec.ts`)
Tests the main dashboard page functionality:
- Dashboard page loading and rendering
- Stats widgets display
- Recent sales widget
- Best selling products widget
- Revenue stream widget
- Notifications widget
- Sidebar navigation
- Topbar functionality
- Page branding/logo

**Total Tests:** 9 tests

### 2. Authentication Tests (`authentication.spec.ts`)
Tests the login and authentication flow:
- Login page display and layout
- Email and password input fields
- Remember me checkbox functionality
- Forgot password link
- Sign in button
- Form input validation
- Navigation after successful login
- Logo and branding display
- Configurator component

**Total Tests:** 13 tests

### 3. CRUD Operations Tests (`crud.spec.ts`)
Tests the product management CRUD interface:
- Product table display
- Toolbar with action buttons (New, Delete, Export)
- Search functionality
- Table columns and sorting
- Product data display
- Creating new products
- Editing existing products
- Deleting products
- Bulk selection and deletion
- Pagination controls
- Product ratings and status tags
- Product images
- Dialog interactions (open/cancel)

**Total Tests:** 16 tests

### 4. UI Kit Components Tests (`uikit.spec.ts`)
Tests various PrimeNG UI components:
- Button variations (severities, icons, rounded, loading)
- Split buttons
- Button groups
- Input components
- Table components
- List components
- Chart components
- Panel components
- Overlay components
- Menu components
- Message components
- File upload
- Tree components
- Form layouts
- Timeline
- Media components

**Total Tests:** 23 tests

### 5. Responsive Layout Tests (`responsive.spec.ts`)
Tests responsive behavior across different devices:
- Desktop layout (1920x1080)
- Tablet layout (iPad Pro)
- Mobile layout (iPhone 12)
- Landscape mobile layout
- Small desktop layout (1366x768)
- Ultra-wide layout (2560x1440)
- Viewport resizing
- Touch gestures and scrolling

**Total Tests:** 16 tests across multiple device configurations

## Running the Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```

### View Test Report
```bash
npm run test:e2e:report
```

### Run Specific Test File
```bash
npx playwright test dashboard.spec.ts
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Base URL:** http://localhost:4200
- **Browsers:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Automatic dev server:** Starts Angular dev server before tests
- **Screenshots:** Captured on failure
- **Traces:** Enabled on first retry
- **Parallel execution:** Enabled for faster test runs

## Key Testing Patterns

### PrimeNG Component Interactions
PrimeNG components often wrap native HTML elements. When interacting with them:

```typescript
// For password fields
await page.locator('#password1 input').fill('password');

// For checkboxes
await page.locator('p-checkbox[id="rememberme1"]').click();

// For input numbers
await page.locator('#price input').fill('99.99');

// For buttons with icons
const editButton = page.locator('button').filter({ has: page.locator('.pi-pencil') });
```

### Waiting for Elements
```typescript
// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for specific elements
await page.waitForSelector('p-table tbody tr', { timeout: 10000 });

// Wait for text content
await expect(page.locator('text=Product Details')).toBeVisible();
```

### Dialog Handling
```typescript
// Wait for dialog by its title/content
await page.waitForSelector('text=Product Details', { timeout: 10000 });

// Verify dialog is hidden
await expect(page.locator('text=Product Details')).toBeHidden();
```

## Test Maintenance

- Update selectors if PrimeNG components or application structure changes
- Add new tests when new features are added
- Keep timeouts reasonable (default 30s, extend for slow operations)
- Use data-testid attributes for more stable selectors when possible
- Run tests locally before committing

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e
```

## Troubleshooting

### Tests timing out
- Increase timeout in test or config
- Check if dev server is running properly
- Verify network conditions

### Elements not found
- Check if selectors match current markup
- Ensure page has loaded completely
- Verify PrimeNG version matches expected structure

### Tests passing locally but failing in CI
- Check CI browser versions
- Ensure all dependencies are installed
- Verify environment variables and configuration

## Contributing

When adding new tests:
1. Follow existing naming conventions
2. Group related tests in describe blocks
3. Use meaningful test descriptions
4. Clean up test data when needed
5. Ensure tests can run independently
6. Document complex interactions
