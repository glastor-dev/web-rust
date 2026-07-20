import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    // Navigate to the root URL
    await page.goto('/');

    // Verify the page title (from layout/metadata)
    await expect(page).toHaveTitle(/Glastor/i);

    // Verify the Header is present (Logo check)
    const logoText = page.locator('header').getByText('GLASTOR');
    await expect(logoText).toBeVisible();

    // The GSAP text might be tricky to test if it animates slowly, so we rely on the logo.
  });

  test('header navigation links work', async ({ page }) => {
    await page.goto('/');

    // Click on Tienda link
    const tiendaLink = page.getByRole('link', { name: 'Tienda', exact: true });
    await expect(tiendaLink).toBeVisible();
    await tiendaLink.click();

    // Verify URL changed to /tienda
    await expect(page).toHaveURL(/.*\/tienda/);
  });
});
