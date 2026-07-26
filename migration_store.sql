-- ==============================================================================
-- KINEBYTES SHOP — MIGRACIÓN COMPLETA Y SEGURA PARA SUPABASE
-- Este script es 100% idempotente (se puede ejecutar múltiples veces sin errores).
-- Ejecutar en el SQL Editor del mismo proyecto Supabase que KineByte.
-- ==============================================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TABLA: CATEGORÍAS DE PRODUCTO (categories)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  accent TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categorias accesibles públicamente" ON public.categories;
CREATE POLICY "Categorias accesibles públicamente"
  ON public.categories FOR SELECT
  USING (true);


-- ------------------------------------------------------------------------------
-- 2. TABLA: PRODUCTOS (products)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  rating NUMERIC(2,1) DEFAULT 5.0,
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

DROP POLICY IF EXISTS "Productos accesibles públicamente" ON public.products;
CREATE POLICY "Productos accesibles públicamente"
  ON public.products FOR SELECT
  USING (true);


-- ------------------------------------------------------------------------------
-- 3. TABLA: VARIANTES DE PRODUCTO (product_variants)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price_delta NUMERIC(10,2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  sku TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asegura que la columna sku exista incluso si la tabla se creó previamente
ALTER TABLE public.product_variants ADD COLUMN IF NOT EXISTS sku TEXT;

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Variantes accesibles públicamente" ON public.product_variants;
CREATE POLICY "Variantes accesibles públicamente"
  ON public.product_variants FOR SELECT
  USING (true);


-- ------------------------------------------------------------------------------
-- 4. TABLA: ESPECIFICACIONES TÉCNICAS (product_specifications)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Especificaciones accesibles públicamente" ON public.product_specifications;
CREATE POLICY "Especificaciones accesibles públicamente"
  ON public.product_specifications FOR SELECT
  USING (true);


-- ------------------------------------------------------------------------------
-- 5. TABLA: HISTORIAL DE PEDIDOS (orders) — Vinculado a auth.users
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reference TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  payment_method TEXT DEFAULT 'card',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'fulfilled', 'cancelled')),
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver su propio historial de pedidos" ON public.orders;
CREATE POLICY "Usuarios pueden ver su propio historial de pedidos"
  ON public.orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden registrar sus propios pedidos" ON public.orders;
CREATE POLICY "Usuarios pueden registrar sus propios pedidos"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios pedidos" ON public.orders;
CREATE POLICY "Usuarios pueden actualizar sus propios pedidos"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);


-- ------------------------------------------------------------------------------
-- 6. TABLA: ÍTEMS DE CADA PEDIDO (order_items)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  variant_label TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL,
  line_total NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver items de sus pedidos" ON public.order_items;
CREATE POLICY "Usuarios pueden ver items de sus pedidos"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuarios pueden registrar items de sus pedidos" ON public.order_items;
CREATE POLICY "Usuarios pueden registrar items de sus pedidos"
  ON public.order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );


-- ------------------------------------------------------------------------------
-- 7. VISTA: COMPRAS DE HARDWARE / SOFTWARE POR USUARIO (para KineByte Dashboard)
-- ------------------------------------------------------------------------------
DROP VIEW IF EXISTS public.user_purchased_products CASCADE;

CREATE OR REPLACE VIEW public.user_purchased_products
WITH (security_invoker = true)
AS
SELECT
  o.user_id,
  o.id AS order_id,
  o.reference AS order_reference,
  o.status AS order_status,
  oi.product_id,
  p.slug AS product_slug,
  oi.product_name,
  p.category AS product_category,
  oi.variant_label,
  oi.quantity,
  oi.unit_price,
  o.created_at AS purchased_at
FROM public.orders o
JOIN public.order_items oi ON o.id = oi.order_id
LEFT JOIN public.products p ON oi.product_id = p.id;

GRANT SELECT ON public.user_purchased_products TO authenticated, anon, service_role;


-- ------------------------------------------------------------------------------
-- 8. FUNCIONES Y TRIGGERS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_products_updated_at ON public.products;
CREATE TRIGGER tr_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_orders_updated_at ON public.orders;
CREATE TRIGGER tr_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


-- ------------------------------------------------------------------------------
-- 9. ÍNDICES DE RENDIMIENTO
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe ON public.orders(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);


-- ==============================================================================
-- 10. DATOS INICIALES (SEED DATA)
-- ==============================================================================

-- Categorías
INSERT INTO public.categories (slug, name, description, icon, accent, sort_order)
VALUES
  ('interactive-hardware', 'Hardware Interactivo', 'Conos, módulos y dispositivos listos para entrenamiento en campo.', '⚡', 'from-emerald-500/20 to-emerald-500/5', 1),
  ('sensors', 'Sensores', 'Componentes para medir velocidad, reacción, carga y precisión.', '📡', 'from-cyan-500/20 to-cyan-500/5', 2),
  ('training-packs', 'Training Packs', 'Bundles para acelerar la implementación en equipos y academias.', '🎯', 'from-violet-500/20 to-violet-500/5', 3),
  ('software', 'Software', 'Licencias y módulos digitales para dashboards y analítica.', '💻', 'from-amber-500/20 to-amber-500/5', 4),
  ('accessories', 'Accesorios', 'Baterías, soportes, kits de montaje y mantenimiento.', '🔧', 'from-sky-500/20 to-sky-500/5', 5)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon, accent = EXCLUDED.accent;


-- Productos
INSERT INTO public.products (id, slug, name, short_description, description, category, price, compare_at_price, rating, review_count, stock_status, condition, features, tags, accent, is_featured)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'cono-interactivo-pro', 'Cono Interactivo Pro', 'Cono luminoso con telemetría y respuesta inmediata.', 'Diseñado para pruebas de agilidad, velocidad y reacción con control desde panel web y sincronización con múltiples dispositivos. Incluye firmware actualizable OTA y compatibilidad con el ecosistema completo KineBytes.', 'interactive-hardware', 149, 179, 4.9, 42, 'in-stock', 'new', ARRAY['Control por ESP32', 'LED RGB de alta visibilidad', 'Modo reacción y timing', 'Sincronización multiunidad', 'Firmware OTA', 'IP65 resistente al agua'], ARRAY['featured', 'athletics', 'hardware'], 'from-emerald-500/25 via-emerald-500/10 to-transparent', true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'sensor-beam-agility', 'Sensor Beam Agility', 'Sensor para medir paso, reacción y precisión.', 'Un módulo de detección pensado para automatizar pruebas de agilidad con métricas exportables al dashboard. Latencia ultra-baja de 2ms para mediciones profesionales.', 'sensors', 99, 119, 4.7, 31, 'low-stock', 'new', ARRAY['Latencia 2ms', 'Lecturas precisas', 'Montaje rápido', 'Doble sensor infrarrojo'], ARRAY['sensor', 'tracking', 'field'], 'from-cyan-500/25 via-cyan-500/10 to-transparent', false),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'training-pack-pro', 'Training Pack Pro', 'Bundle completo para sesiones de alto rendimiento.', 'Incluye hardware, soporte de software y presets de entrenamiento para implementar una estación KineBytes completa. Ideal para academias y equipos profesionales.', 'training-packs', 499, 599, 5.0, 18, 'in-stock', 'bundle', ARRAY['3 Conos Interactivos Pro', '1 Sensor Beam Agility', '1 Licencia Software Pro (3 meses)', 'Kit de montaje incluido', 'Soporte prioritario'], ARRAY['bundle', 'academy', 'featured'], 'from-violet-500/25 via-violet-500/10 to-transparent', true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'software-license-pro', 'Licencia Software Pro', 'Acceso al dashboard y módulos avanzados.', 'Activa analítica avanzada, reportes, administración de dispositivos y roles de subadmin en una sola licencia. Integración directa con el dashboard KineByte.', 'software', 49, NULL, 4.8, 72, 'in-stock', 'new', ARRAY['Dashboard completo', 'Roles avanzados', 'Exportación CSV/PDF', 'API access'], ARRAY['software', 'subscription', 'featured'], 'from-amber-500/25 via-amber-500/10 to-transparent', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'accessories-maintenance-kit', 'Kit de Mantenimiento', 'Accesorios para calibración, soporte y reemplazo.', 'Incluye soportes, cables y piezas de repuesto para asegurar continuidad operacional en campo. Compatible con todo el ecosistema KineBytes.', 'accessories', 39, NULL, 4.6, 24, 'in-stock', 'bundle', ARRAY['Cables reinforced', 'Herramientas base', 'Soportes modulares', 'Estuche de transporte'], ARRAY['accessory', 'maintenance'], 'from-sky-500/25 via-sky-500/10 to-transparent', false),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'reaction-pad-elite', 'Reaction Pad Elite', 'Panel de reacción táctil con métricas en tiempo real.', 'Panel de pared con sensores capacitivos para medir tiempo de reacción táctil. Se integra con el dashboard para comparar sesiones y generar informes de progreso.', 'interactive-hardware', 229, 269, 4.8, 15, 'in-stock', 'new', ARRAY['8 zonas táctiles', 'Display LED integrado', 'Modos de juego preconfigurados', 'Bluetooth 5.0'], ARRAY['hardware', 'reaction', 'training'], 'from-emerald-500/25 via-emerald-500/10 to-transparent', false),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'speed-gate-duo', 'Speed Gate Duo', 'Puertas de velocidad con cronómetro automático.', 'Par de sensores inalámbricos para medir sprints, parciales y aceleraciones. Conectividad WiFi para transmisión directa al dashboard.', 'sensors', 189, NULL, 4.5, 8, 'in-stock', 'new', ARRAY['Par de sensores', 'Cronómetro 0.001s', 'WiFi directo', 'Batería 72h'], ARRAY['sensor', 'speed', 'sprint'], 'from-cyan-500/25 via-cyan-500/10 to-transparent', false),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'team-license-enterprise', 'Licencia Team Enterprise', 'Licencia para equipos con roles y analytics avanzados.', 'Pensada para clubes y academias. Incluye multi-coach, roles de administrador, reportes comparativos entre atletas y exportación programática vía API.', 'software', 149, 199, 4.9, 11, 'in-stock', 'new', ARRAY['Multi-coach', 'Comparación de atletas', 'Exportación API', 'Soporte prioritario'], ARRAY['software', 'enterprise', 'teams'], 'from-amber-500/25 via-amber-500/10 to-transparent', false)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    features = EXCLUDED.features;


-- Limpieza previa de variantes y especificaciones de semillas para evitar duplicados
DELETE FROM public.product_specifications WHERE product_id IN (
  'a1b2c3d4-0001-4000-8000-000000000001',
  'a1b2c3d4-0002-4000-8000-000000000002',
  'a1b2c3d4-0003-4000-8000-000000000003',
  'a1b2c3d4-0004-4000-8000-000000000004',
  'a1b2c3d4-0005-4000-8000-000000000005',
  'a1b2c3d4-0006-4000-8000-000000000006',
  'a1b2c3d4-0007-4000-8000-000000000007',
  'a1b2c3d4-0008-4000-8000-000000000008'
);

DELETE FROM public.product_variants WHERE product_id IN (
  'a1b2c3d4-0001-4000-8000-000000000001',
  'a1b2c3d4-0002-4000-8000-000000000002',
  'a1b2c3d4-0003-4000-8000-000000000003',
  'a1b2c3d4-0004-4000-8000-000000000004',
  'a1b2c3d4-0005-4000-8000-000000000005',
  'a1b2c3d4-0006-4000-8000-000000000006',
  'a1b2c3d4-0007-4000-8000-000000000007',
  'a1b2c3d4-0008-4000-8000-000000000008'
);

-- Variantes
INSERT INTO public.product_variants (product_id, label, price_delta, stock, sku)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Graphite', 0, 14, 'KB-CONE-PRO-BLK'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Kine Cyan', 10, 8, 'KB-CONE-PRO-CYN'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Field Lime', 10, 5, 'KB-CONE-PRO-LIM'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Standard', 0, 5, 'KB-BEAM-STD'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Pack 3 Conos', 0, 9, 'KB-PACK-PRO-3'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Pack 6 Conos', 320, 4, 'KB-PACK-PRO-6'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Mensual', 0, 999, 'KB-SW-PRO-M'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Anual (ahorra 20%)', 371, 999, 'KB-SW-PRO-Y'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Maintenance Kit', 0, 27, 'KB-KIT-MAIN'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Standard', 0, 10, 'KB-PAD-STD'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Pro (12 zonas)', 70, 6, 'KB-PAD-PRO'),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Par (2 gates)', 0, 12, 'KB-GATE-DUO'),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Pack 4 gates', 180, 5, 'KB-GATE-QUAD'),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Mensual', 0, 999, 'KB-SW-TEAM-M'),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Anual (ahorra 25%)', 1043, 999, 'KB-SW-TEAM-Y');

-- Especificaciones Técnicas
INSERT INTO public.product_specifications (product_id, label, value, sort_order)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Autonomía', '10 h', 1),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Conectividad', 'WiFi + BLE', 2),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Peso', '420 g', 3),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Dimensiones', '15 × 15 × 22 cm', 4),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Batería', 'Li-Po 3000mAh', 5),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Rango', '15 m', 1),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Batería', '48 h', 2),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Compatibilidad', 'KineBytes suite', 3),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Peso', '280 g', 4),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Instalación', '1 día', 1),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Soporte', 'Incluido 6 meses', 2),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Ahorro', '20%', 3),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Duración', 'Mensual', 1),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Usuarios', 'Ilimitados', 2),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Integración', 'Supabase ready', 3),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Contenido', '8 piezas', 1),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Uso', 'Field support', 2),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Compatibilidad', 'Todo el ecosistema', 3),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Zonas', '8 capacitivas', 1),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Batería', '12 h', 2),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Montaje', 'Pared/Trípode', 3),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Precisión', '±1ms', 1),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Rango', '30 m', 2),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Batería', '72 h', 3),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Coaches', 'Hasta 10', 1),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Atletas', 'Ilimitados', 2),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Almacenamiento', '100 GB', 3);
