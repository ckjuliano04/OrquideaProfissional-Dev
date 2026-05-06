import ProductDetailClient from './ProductDetailClient';
import { normalizeProductDetail } from '@/services/normalizers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// 1. Gerador de Metadados Dinâmicos (SEO / OpenGraph)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const res = await fetch(`${API_URL}/products/${slug}/`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error();
    const product = await res.json();

    const title = `${product.name} | Orquídea Profissional`;
    const description = product.short_description || `Confira os detalhes técnicos de ${product.name} no portal Orquídea Profissional.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://orquideaprofissional.com.br/catalogo/${slug}`,
        siteName: 'Orquídea Profissional',
        images: [
          {
            url: product.image_url || 'https://orquideaprofissional.com.br/og-image.jpg',
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: 'pt_BR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [product.image_url],
      },
    };
  } catch (error) {
    return {
      title: 'Produto | Orquídea Profissional',
      description: 'Catálogo técnico de produtos Orquídea Profissional.',
    };
  }
}

// 2. Componente de Página (Server Component)
export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // Busca inicial no servidor para renderização rápida (SEO)
  let product = null;
  try {
    const res = await fetch(`${API_URL}/products/${slug}/`, { next: { revalidate: 60 } });
    if (res.ok) {
      const raw = await res.json();
      product = normalizeProductDetail(raw);
    }
  } catch (e) {}

  return <ProductDetailClient product={product} slug={slug} />;
}
