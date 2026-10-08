import { defineAstroPaperConfig } from "./src/types/config";
export default defineAstroPaperConfig({
  site: {
    url: "https://blog.aromashanami.com.br/",
    title: "HANAMI Journal | Aromas para Casa",
    description: "Conteúdos sobre aromas para casa, difusores, sprays de ambiente, águas de lençóis, fragrâncias e bem-estar. Inspire-se com a HANAMI.",
    author: "Glaeli Baldim",
    profile: "https://blog.aromashanami.com.br/autores/glaeli-baldim/",
    ogImage: "hanami-og.png",
    lang: "pt-BR",
    timezone: "America/Sao_Paulo",
    dir: "ltr",
  },
  posts: { perPage: 12, perIndex: 6, scheduledPostMargin: 15 * 60 * 1000 },
  features: { lightAndDarkMode: false, dynamicOgImage: false, showArchives: true, showBackButton: true, editPost: { enabled: false }, search: "pagefind" },
  socials: [],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=", linkTitle: "Compartilhar no WhatsApp" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=", linkTitle: "Compartilhar no Pinterest" },
    { name: "mail", url: "mailto:?subject=Uma%20leitura%20do%20HANAMI%20Journal&body=", linkTitle: "Compartilhar por e-mail" },
  ],
});