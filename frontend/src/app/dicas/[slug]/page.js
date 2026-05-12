import { fetchAPI } from "@/services/api";
import TipDetailClient from "./TipDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const tips = await fetchAPI("/content/tips/");
    const tip = tips.find((t) => t.slug === slug);

    if (!tip) return { title: "Dica não encontrada | Orquídea Profissional" };

    return {
      title: `${tip.title} | Orquídea Profissional`,
      description: tip.summary,
      openGraph: {
        title: tip.title,
        description: tip.summary,
        images: [tip.image || "/images/placeholders/tip-placeholder.jpg"],
      },
    };
  } catch (error) {
    return { title: "Dicas Profissionais | Orquídea Profissional" };
  }
}

export default async function TipDetailPage({ params }) {
  const { slug } = await params;
  let tip = null;

  try {
    const tips = await fetchAPI("/content/tips/");
    tip = tips.find((t) => t.slug === slug);
  } catch (error) {
    console.error("Erro ao carregar dica no servidor:", error);
  }

  return <TipDetailClient tip={tip} />;
}
