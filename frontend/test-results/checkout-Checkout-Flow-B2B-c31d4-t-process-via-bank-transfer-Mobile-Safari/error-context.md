# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout Flow (B2B Bank Transfer) >> should complete a checkout process via bank transfer
- Location: e2e\checkout.spec.ts:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="email"]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - generic [ref=e11]:
            - generic [ref=e12]: 1/
            - text: "1"
          - button "next" [disabled] [ref=e13]:
            - img "next" [ref=e14]
        - link "Next.js 16.2.10 (stale) Turbopack" [ref=e17]:
          - /url: https://nextjs.org/docs/messages/version-staleness
          - img [ref=e18]
          - generic "There is a newer version (16.2.11) available, upgrade recommended!" [ref=e20]: Next.js 16.2.10 (stale)
          - generic [ref=e21]: Turbopack
      - dialog "Runtime TypeError" [ref=e23]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e30]: Runtime TypeError
              - generic [ref=e31]:
                - button "Copy Error Info" [ref=e32] [cursor=pointer]:
                  - img [ref=e33]
                - button "No related documentation found" [disabled] [ref=e35]:
                  - img [ref=e36]
                - button "Attach Node.js inspector" [ref=e38] [cursor=pointer]:
                  - img [ref=e39]
            - generic [ref=e51]: navigate is not a function. (In 'navigate('/tienda')', 'navigate' is an instance of Object)
          - generic [ref=e52]:
            - generic [ref=e53]:
              - paragraph [ref=e55]:
                - img [ref=e57]
                - generic [ref=e61]: src/app/checkout/page.tsx (59:7) @ Checkout.useEffect
                - button "Open in editor" [ref=e62] [cursor=pointer]:
                  - img [ref=e64]
              - generic [ref=e67]:
                - generic [ref=e68]: "57 | useEffect(() => {"
                - generic [ref=e69]: "58 | if (items.length === 0 && !isProcessing) {"
                - generic [ref=e70]: "> 59 | navigate('/tienda');"
                - generic [ref=e71]: "| ^"
                - generic [ref=e72]: "60 | }"
                - generic [ref=e73]: "61 | }, [items, navigate, isProcessing]);"
                - generic [ref=e74]: 62 |
            - generic [ref=e75]:
              - generic [ref=e76]:
                - paragraph [ref=e77]:
                  - text: Call Stack
                  - generic [ref=e78]: "50"
                - button "Show 49 ignore-listed frame(s)" [ref=e79] [cursor=pointer]:
                  - text: Show 49 ignore-listed frame(s)
                  - img [ref=e80]
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - text: Checkout.useEffect
                  - button "Open Checkout.useEffect in editor" [ref=e84] [cursor=pointer]:
                    - img [ref=e85]
                - text: src/app/checkout/page.tsx (59:7)
        - generic [ref=e87]: "1"
        - generic [ref=e88]: "2"
    - generic [ref=e93] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e94]:
        - img [ref=e95]
      - generic [ref=e100]:
        - button "Open issues overlay" [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]: "0"
            - generic [ref=e104]: "1"
          - generic [ref=e105]: Issue
        - button "Collapse issues badge" [ref=e106]:
          - img [ref=e107]
  - generic [ref=e110]:
    - img [ref=e111]
    - heading "This page couldn’t load" [level=1] [ref=e113]
    - paragraph [ref=e114]: Reload to try again, or go back.
    - generic [ref=e115]:
      - button "Reload" [ref=e117] [cursor=pointer]
      - button "Back" [ref=e118] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Checkout Flow (B2B Bank Transfer)', () => {
  4  |   test('should complete a checkout process via bank transfer', async ({ page, isMobile }) => {
  5  |     // 1. Ir al inicio donde están los Bestsellers (server side rendered)
  6  |     await page.goto('/');
  7  | 
  8  |     // 2. Añadir primer producto al carrito
  9  |     // Playwright detectará el botón usando su aria-label
  10 |     const addToCartBtn = page.locator('button[aria-label="Añadir al carrito"]').first();
  11 |     
  12 |     // Si estamos en móvil, la UI puede requerir scroll, pero Playwright hace autoscroll
  13 |     await expect(addToCartBtn).toBeVisible({ timeout: 15000 });
  14 |     await addToCartBtn.click();
  15 | 
  16 |     // Verificamos que el botón se deshabilite temporalmente (loading o success)
  17 |     await expect(addToCartBtn).toBeDisabled();
  18 | 
  19 |     // 3. Ir a checkout (Navegación directa para evitar inconsistencias de menús móviles y overlays)
  20 |     await page.goto('/checkout');
  21 |     await expect(page).toHaveURL(/\/checkout/);
  22 | 
  23 |     // 5. Deberíamos estar en /checkout
  24 |     await expect(page).toHaveURL(/\/checkout/);
  25 | 
  26 |     // 6. Rellenar el formulario
> 27 |     await page.fill('input[name="email"]', 'testb2b@glastor.es');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  28 |     await page.fill('input[name="firstName"]', 'John');
  29 |     await page.fill('input[name="lastName"]', 'Doe');
  30 |     await page.fill('input[name="company"]', 'Glastor Test Corp');
  31 |     await page.fill('input[name="address"]', 'Calle Falsa 123');
  32 |     await page.fill('input[name="city"]', 'Madrid');
  33 |     await page.fill('input[name="postalCode"]', '28001');
  34 | 
  35 |     // 7. Seleccionar método de pago: Transferencia Bancaria ( BANK )
  36 |     // Asumiendo que Transferencia es la opción por defecto o que podemos hacer click en ella
  37 |     const bankTransferRadio = page.locator('div').filter({ hasText: /^Transferencia Bancaria$/ });
  38 |     if (await bankTransferRadio.isVisible()) {
  39 |         await bankTransferRadio.click();
  40 |     }
  41 | 
  42 |     // 8. Verificar que el botón de completar orden requiere el Turnstile / humanidad,
  43 |     // Como es un test, podemos hacer un click y verificar que reaccione. Si hay Captcha real en test,
  44 |     // suele ser bloqueante, así que podemos chequear el comportamiento UI esperado.
  45 |     
  46 |     // 9. Comprobando resiliencia de animaciones
  47 |     // Hacer clic rápidamente en otro sitio no debería bloquear la página
  48 |     await page.mouse.click(0, 0);
  49 |     
  50 |     // Verificamos que los inputs sigan siendo interactivos (la cortina ya se fue)
  51 |     const emailInput = page.locator('input[name="email"]');
  52 |     await expect(emailInput).toBeEnabled();
  53 |   });
  54 | });
  55 | 
```