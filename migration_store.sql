-- ================================================================
-- KineBytes Shop — Database Migration
-- Run in the SAME Supabase project as KineByte (shared auth.users)
-- ================================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  stock_status TEXT DEFAULT 'in-stock' CHECK (stock_status IN ('in-stock', 'low-stock', 'out-of-stock')),
  condition TEXT DEFAULT 'new' CHECK (condition IN ('new', 'preorder', 'bundle')),
  features TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  accent TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT
  USING (true);


-- 2. Product Variants
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price_delta NUMERIC(10,2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product variants are publicly readable"
  ON public.product_variants FOR SELECT
  USING (true);


-- 3. Product Specifications
CREATE TABLE IF NOT EXISTS public.product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product specs are publicly readable"
  ON public.product_specifications FOR SELECT
  USING (true);


-- 4. Orders (linked to auth.users — shared with KineByte)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reference TEXT NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'fulfilled', 'cancelled')),
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can see their own orders
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Service role (webhook) can update orders
-- (handled by service_role key, no RLS policy needed)


-- 5. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  variant_label TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  line_total NUMERIC(10,2) NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users can view items of their own orders
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can insert items into their own orders
CREATE POLICY "Users can insert own order items"
  ON public.order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );


-- ================================================================
-- INDEXES for KineByte cross-query performance
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe ON public.orders(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);


-- ================================================================
-- SEED DATA — Insert mock products
-- ================================================================
INSERT INTO public.products (id, slug, name, short_description, description, category, price, compare_at_price, rating, review_count, stock_status, condition, features, tags, accent, is_featured)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'cono-interactivo-pro', 'Cono Interactivo Pro', 'Cono luminoso con telemetría y respuesta inmediata.', 'Diseñado para pruebas de agilidad, velocidad y reacción con control desde panel web y sincronización con múltiples dispositivos.', 'interactive-hardware', 149, 179, 4.9, 42, 'in-stock', 'new', ARRAY['Control por ESP32', 'LED RGB de alta visibilidad', 'Modo reacción y timing', 'Sincronización multiunidad'], ARRAY['featured', 'athletics', 'hardware'], 'from-emerald-500/25 via-emerald-500/10 to-transparent', true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'sensor-beam-agility', 'Sensor Beam Agility', 'Sensor para medir paso, reacción y precisión.', 'Un módulo de detección pensado para automatizar pruebas de agilidad con métricas exportables al dashboard.', 'sensors', 99, 119, 4.7, 31, 'low-stock', 'new', ARRAY['Latencia 2ms', 'Lecturas precisas', 'Montaje rápido'], ARRAY['sensor', 'tracking', 'field'], 'from-cyan-500/25 via-cyan-500/10 to-transparent', false),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'training-pack-pro', 'Training Pack Pro', 'Bundle completo para sesiones de alto rendimiento.', 'Incluye hardware, soporte de software y presets de entrenamiento para implementar una estación KineBytes completa.', 'training-packs', 499, 599, 5.0, 18, 'in-stock', 'bundle', ARRAY['3 Conos Interactivos Pro', '1 Sensor Beam Agility', '1 Licencia Software Pro'], ARRAY['bundle', 'academy', 'featured'], 'from-violet-500/25 via-violet-500/10 to-transparent', true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'software-license-pro', 'Licencia Software Pro', 'Acceso al dashboard y módulos avanzados.', 'Activa analítica avanzada, reportes, administración de dispositivos y roles de subadmin en una sola licencia.', 'software', 49, NULL, 4.8, 72, 'in-stock', 'new', ARRAY['Dashboard completo', 'Roles avanzados', 'Exportación CSV/PDF'], ARRAY['software', 'subscription', 'featured'], 'from-amber-500/25 via-amber-500/10 to-transparent', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'accessories-maintenance-kit', 'Kit de Mantenimiento', 'Accesorios para calibración, soporte y reemplazo.', 'Incluye soportes, cables y piezas de repuesto para asegurar continuidad operacional en campo.', 'accessories', 39, NULL, 4.6, 24, 'in-stock', 'bundle', ARRAY['Cables reforzados', 'Herramientas base', 'Soportes modulares'], ARRAY['accessory', 'maintenance'], 'from-sky-500/25 via-sky-500/10 to-transparent', false)
ON CONFLICT (slug) DO NOTHING;

-- Seed product variants
INSERT INTO public.product_variants (product_id, label, price_delta, stock)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Graphite', 0, 14),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Kine Cyan', 10, 8),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Standard', 0, 5),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Pack 3 Conos', 0, 9),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Pack 6 Conos', 320, 4),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Mensual', 0, 999),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Anual (ahorra 20%)', 371, 999),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Maintenance Kit', 0, 27);

-- Seed product specifications
INSERT INTO public.product_specifications (product_id, label, value, sort_order)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Autonomía', '10 h', 1),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Conectividad', 'WiFi + BLE', 2),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Peso', '420 g', 3),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Rango', '15 m', 1),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Batería', '48 h', 2),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Instalación', '1 día', 1),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Soporte', 'Incluido 6 meses', 2),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Duración', 'Mensual', 1),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Usuarios', 'Ilimitados', 2),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Contenido', '8 piezas', 1),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Compatibilidad', 'Todo el ecosistema', 2);
