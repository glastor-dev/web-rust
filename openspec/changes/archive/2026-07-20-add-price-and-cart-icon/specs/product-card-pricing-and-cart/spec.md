## ADDED Requirements

### Requirement: Show Product Price
The `ProductCard` component SHALL display the formatted numerical price of the product if `product.price > 0`. 

#### Scenario: Product has a valid price
- **WHEN** the `product.price` is greater than 0
- **THEN** the product card shows the formatted price (e.g., "$389.000") in the UI instead of "Ver precio".

#### Scenario: Product price is 0 or null
- **WHEN** the `product.price` is 0 or not provided
- **THEN** the product card shows "Ver precio" or "Consultar" as a fallback.

### Requirement: Quick Add to Cart Icon
The `ProductCard` component SHALL display a cart icon button (e.g., `ShoppingCart` from `lucide-react`) in place of the text "COTIZAR".

#### Scenario: User clicks add to cart
- **WHEN** the user clicks the cart icon on a product card
- **THEN** an action should be dispatched to add the product to the shopping cart, and visual feedback (e.g., a toast notification) should appear.
