/**
 * Normalizers — Camada de proteção Backend ↔ Frontend
 * 
 * Cada função recebe os dados crus da API e retorna um objeto
 * com campos garantidos (nunca undefined/null onde não deveria).
 * Se o backend mudar um nome de campo, basta atualizar AQUI,
 * sem precisar caçar em 15 componentes diferentes.
 */

// ─────────────────────────────────────────────
// PRODUTO (Lista do Catálogo)
// ─────────────────────────────────────────────
export function normalizeProductList(raw) {
  if (!raw) return [];
  const items = Array.isArray(raw) ? raw : [];
  return items.map(p => ({
    id: p.id ?? 0,
    name: p.name ?? 'Produto sem nome',
    slug: p.slug ?? '',
    sku: p.sku ?? '',
    short_description: p.short_description ?? '',
    image_url: p.image_url ?? null,
    category: p.category ?? null,
    category_name: p.category_name ?? 'Sem categoria',
    is_featured: p.is_featured ?? false,
  }));
}

// ─────────────────────────────────────────────
// PRODUTO (Detalhe / Ficha Técnica)
// ─────────────────────────────────────────────
export function normalizeProductDetail(raw) {
  if (!raw) return null;
  return {
    id: raw.id ?? 0,
    name: raw.name ?? 'Produto',
    slug: raw.slug ?? '',
    sku: raw.sku ?? '',
    short_description: raw.short_description ?? '',
    full_description: raw.full_description ?? '',
    usage_tips: raw.usage_tips ?? '',
    application_text: raw.application_text ?? '',
    technical_info: raw.technical_info ?? '',
    package_info: raw.package_info ?? '',
    weight_info: raw.weight_info ?? '',
    shelf_life_info: raw.shelf_life_info ?? '',
    image_url: raw.image_url ?? null,
    is_active: raw.is_active ?? true,
    is_featured: raw.is_featured ?? false,
    category: raw.category ?? null,
    category_name: raw.category_name ?? 'Sem categoria',
    images: Array.isArray(raw.images) ? raw.images : [],
    files: Array.isArray(raw.files) ? raw.files : [],
    nutrition: raw.nutrition ? normalizeNutrition(raw.nutrition) : null,
    nutrition_rows: Array.isArray(raw.nutrition_rows) 
      ? raw.nutrition_rows.map(normalizeNutritionRow) 
      : [],
  };
}

// ─────────────────────────────────────────────
// TABELA NUTRICIONAL (Cabeçalho)
// ─────────────────────────────────────────────
function normalizeNutrition(raw) {
  return {
    serving_size: raw.serving_size ?? '-',
    household_measure: raw.household_measure ?? '-',
    portions_per_package: raw.portions_per_package ?? '-',
    footer_note: raw.footer_note ?? '',
    column_count: raw.column_count ?? 3,
    col_1_label: raw.col_1_label ?? '100g',
    col_2_label: raw.col_2_label ?? 'Porção',
    col_3_label: raw.col_3_label ?? '%VD*',
    col_4_label: raw.col_4_label ?? '',
    col_5_label: raw.col_5_label ?? '',
  };
}

// ─────────────────────────────────────────────
// TABELA NUTRICIONAL (Linha / Nutriente)
// ─────────────────────────────────────────────
function normalizeNutritionRow(raw) {
  return {
    id: raw.id ?? 0,
    label: raw.label ?? '-',
    value_100g: raw.value_100g ?? '-',
    value_serving: raw.value_serving ?? '-',
    vd_percentage: raw.vd_percentage ?? '-',
    value_4: raw.value_4 ?? '-',
    value_5: raw.value_5 ?? '-',
    sort_order: raw.sort_order ?? 0,
  };
}

// ─────────────────────────────────────────────
// CATEGORIAS
// ─────────────────────────────────────────────
export function normalizeCategories(raw) {
  if (!raw) return [];
  const items = Array.isArray(raw) ? raw : [];
  return items.map(c => ({
    id: c.id ?? 0,
    name: c.name ?? 'Categoria',
    parent: c.parent ?? null,
    description: c.description ?? '',
    sort_order: c.sort_order ?? 0,
  }));
}

// ─────────────────────────────────────────────
// TREINAMENTO (Lista)
// ─────────────────────────────────────────────
export function normalizeTrainingList(raw) {
  if (!raw) return [];
  const items = Array.isArray(raw) ? raw : [];
  return items.map(m => ({
    id: m.id ?? 0,
    title: m.title ?? 'Material sem título',
    description: m.description ?? '',
    content: m.content ?? '',
    audience_type: m.audience_type ?? 'Geral',
    videos: Array.isArray(m.videos) ? m.videos : [],
    files: Array.isArray(m.files) ? m.files : [],
  }));
}

// ─────────────────────────────────────────────
// TREINAMENTO (Detalhe)
// ─────────────────────────────────────────────
export function normalizeTrainingDetail(raw) {
  if (!raw) return null;
  return {
    id: raw.id ?? 0,
    title: raw.title ?? 'Material',
    description: raw.description ?? '',
    content: raw.content ?? '',
    audience_type: raw.audience_type ?? 'Geral',
    videos: Array.isArray(raw.videos) ? raw.videos.map(v => ({
      id: v.id ?? 0,
      title: v.title ?? 'Vídeo',
      video_url: v.video_url ?? '',
      video_file: v.video_file ?? null,
    })) : [],
    files: Array.isArray(raw.files) ? raw.files.map(f => ({
      id: f.id ?? 0,
      title: f.title ?? 'Arquivo',
      file_upload: f.file_upload ?? null,
      file_type: f.file_type ?? '',
    })) : [],
  };
}

// ─────────────────────────────────────────────
// CMS HOME
// ─────────────────────────────────────────────
export function normalizeHomeData(raw) {
  const currentYear = new Date().getFullYear();
  const yearsOfHistory = currentYear - 1953;

  const defaults = {
    hero_title: 'Excelência Técnica e Prática',
    hero_subtitle: 'Bem-vindo à plataforma definitiva para profissionais de panificação, confeitaria e culinária.',
    about_title: 'Tradição e Qualidade desde o início',
    about_text1: '',
    about_text2: '',
    about_stat1_title: `${yearsOfHistory} Anos`,
    about_stat1_desc: 'de tradição no mercado',
    about_stat2_title: 'Alta Tecnologia',
    about_stat2_desc: 'nas unidades produtivas',
    where_to_buy_title: 'Onde Comprar',
    where_to_buy_text: 'Nossos produtos profissionais estão disponíveis nos melhores distribuidores.',
    where_to_buy_phone: '0800 000 0000',
    where_to_buy_hours: 'Segunda a Sexta, das 08h às 18h',
    tips: [],
    brands: [],
  };

  if (!raw) return defaults;

  return {
    ...defaults,
    ...raw,
    about_stat1_title: `${yearsOfHistory} Anos`, // Força o cálculo dinâmico (sobrescreve o CMS)
    tips: Array.isArray(raw.tips) ? raw.tips.map(t => ({
      id: t.id ?? 0,
      title: t.title ?? 'Dica',
      description: t.description ?? '',
      link: t.link ?? '#',
      image_url: t.image_url ?? '',
    })) : defaults.tips,
    brands: Array.isArray(raw.brands) ? raw.brands.map(b => ({
      id: b.id ?? 0,
      name: b.name ?? 'Marca',
      link: b.link ?? '',
    })) : defaults.brands,
  };
}
