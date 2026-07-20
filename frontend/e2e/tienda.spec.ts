import { test, expect } from '@playwright/test';

test.describe('Store Page (Tienda)', () => {
  test('should load the store page and display filters', async ({ page }) => {
    await page.goto('/tienda');

    // Verify Hero title in store
    const storeHero = page.getByText('ARSENAL INDUSTRIAL');
    await expect(storeHero).toBeVisible();

    // The filter panel should have categories or brands
    // Assuming the word "Restablecer filtros" or similar appears if empty, 
    // or filter inputs exist. Let's look for search input or view toggles.
    const searchInput = page.getByPlaceholder('Buscar SKU o nombre...');
    await expect(searchInput).toBeVisible();

    // Check that grid/list toggles exist
    const gridToggle = page.locator('button[title="Vista de Cuadrícula"]');
    await expect(gridToggle).toBeVisible();
  });

  test('should show empty state if search yields no results', async ({ page }) => {
    await page.goto('/tienda');

    // Type a random string that shouldn't match anything
    const searchInput = page.getByPlaceholder('Buscar SKU o nombre...');
    await searchInput.fill('xyz123nonexistent');
    
    // Check if the empty state message appears
    const emptyMessage = page.getByText('No hay productos disponibles para tu búsqueda.');
    await expect(emptyMessage).toBeVisible();
  });
});
