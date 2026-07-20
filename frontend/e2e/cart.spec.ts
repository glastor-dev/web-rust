import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Flow', () => {
  test('should open and close the cart drawer', async ({ page }) => {
    await page.goto('/tienda');

    // Find the cart button in the header (lucide ShoppingBag icon is used)
    // We can find it by its aria-label if it had one, or by looking for the nav button
    // It is inside a button in the header. We'll click the second button in the header right-actions.
    // A robust way is finding the button that triggers the drawer.
    // The cart button usually has the ShoppingBag icon inside.
    const cartButton = page.locator('header button').filter({ has: page.locator('svg.lucide-shopping-bag') }).first();
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    // Verify the Cart Drawer is visible
    // The Cart Drawer has a text like "CESTA DE COMPRA"
    const drawerTitle = page.getByText('CESTA DE COMPRA').first();
    await expect(drawerTitle).toBeVisible();

    // Close the cart
    const closeBtn = page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first();
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // Verify it closed
    await expect(drawerTitle).toBeHidden();
  });
});
