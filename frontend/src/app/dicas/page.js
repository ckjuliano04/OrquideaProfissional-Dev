import { fetchAPI } from "@/services/api";
import DicasClient from "./DicasClient";

export const metadata = {
  title: "Dicas e Técnicas Profissionais | Orquídea Profissional",
  description:
    "Aprenda técnicas exclusivas de panificação, confeitaria e segredos da cozinha industrial com nossos mestres técnicos.",
  openGraph: {
    title: "Dicas e Técnicas Profissionais | Orquídea Profissional",
    description:
      "Hub de conhecimento técnico para profissionais da panificação.",
    images: ["/images/seo/dicas-og.jpg"],
  },
};

export default async function DicasPage() {
  let tips = [];
  try {
    tips = await fetchAPI("/content/tips/");
  } catch (error) {
    console.error("Erro ao carregar dicas no servidor:", error);
  }

  return <DicasClient initialTips={tips} />;
}
