-- Create architecture_modules table
CREATE TABLE IF NOT EXISTS architecture_modules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    base_price INTEGER NOT NULL,
    min_weeks INTEGER NOT NULL,
    max_weeks INTEGER NOT NULL,
    description TEXT NOT NULL
);

-- Create media_assets table
CREATE TABLE IF NOT EXISTS media_assets (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    format TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table (Normalized without JSONB variants)
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    status TEXT,
    price REAL,
    stock INTEGER,
    description TEXT,
    image TEXT,
    rating REAL,
    badges JSONB,
    material TEXT,
    dimensions TEXT,
    weight TEXT,
    reviews JSONB,
    gallery JSONB,
    publish_date TIMESTAMP,
    slug TEXT,
    seo JSONB,
    sales_count INTEGER DEFAULT 0,
    about_model TEXT,
    features TEXT,
    specifications TEXT
);

-- Create product_options table
CREATE TABLE IF NOT EXISTS product_options (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    title TEXT NOT NULL,
    values JSONB NOT NULL,
    CONSTRAINT fk_product_options_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    sku TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL,
    options JSONB NOT NULL,
    CONSTRAINT fk_product_variants_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create analytics_pageviews table
CREATE TABLE IF NOT EXISTS analytics_pageviews (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    path TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    referrer TEXT,
    screen_size TEXT,
    duration_seconds INTEGER DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    path TEXT NOT NULL,
    data TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes (Optimized)
CREATE INDEX IF NOT EXISTS idx_pageviews_session ON analytics_pageviews(session_id);
CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name);

CREATE INDEX IF NOT EXISTS idx_analytics_pageviews_timestamp ON analytics_pageviews(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_pageviews_path ON analytics_pageviews(path);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

CREATE INDEX IF NOT EXISTS idx_variants_product_id ON product_variants(product_id);
