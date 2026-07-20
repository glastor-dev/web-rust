# Bestsellers Price Style

## Purpose
Ensure the price display in the Bestsellers component matches the visual style and hierarchy of the main store product cards.

## Requirements

### Requirement: Show B2B Price Label
The bestsellers product card SHALL display a "PRECIO B2B" label above the numerical price to match the main store's card design.

#### Scenario: Bestsellers card renders price
- **WHEN** the bestsellers card displays a product with a valid price
- **THEN** it shows a "PRECIO B2B" label in a small, zinc-colored, mono font above the price.

### Requirement: Use Brand Style for Price
The bestsellers product card SHALL display the price using the large, bold, brand-colored font style (`text-brand`).

#### Scenario: Price styling matches store
- **WHEN** the bestsellers card displays the numerical price
- **THEN** the price is rendered in the `text-brand` color and `font-bold` weight.
