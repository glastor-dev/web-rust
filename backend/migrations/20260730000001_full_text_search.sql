CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION unaccent_immutable(text)
RETURNS text AS $$
  SELECT public.unaccent('public.unaccent', $1)
$$ LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT;

ALTER TABLE products ADD COLUMN search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('spanish', unaccent_immutable(coalesce(name, ''))), 'A') ||
    setweight(to_tsvector('spanish', unaccent_immutable(coalesce(category, ''))), 'B') ||
    setweight(to_tsvector('spanish', unaccent_immutable(coalesce(description, ''))), 'C')
) STORED;

CREATE INDEX idx_products_search_vector ON products USING GIN(search_vector);

CREATE INDEX idx_products_name_trgm ON products USING GIN (unaccent_immutable(name) gin_trgm_ops);
CREATE INDEX idx_variants_sku_trgm ON product_variants USING GIN (sku gin_trgm_ops);
