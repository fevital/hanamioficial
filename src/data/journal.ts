export const shop = "https://www.aromashanami.com.br";
export const author = {
  name: "Glaeli Baldim",
  path: "/autores/glaeli-baldim/",
  description:
    "Glaeli Baldim é a fundadora e criadora da HANAMI. Na coleção Pomar de Minas, transforma lembranças do sítio de sua infância em fragrâncias para a casa.",
};
export const categories = [
  {
    slug: "aromas-para-casa",
    name: "Aromas para Casa",
    title: "Aromas para casa: escolha, ambientes e rotina",
    description:
      "Escolha onde perfumar, ajuste a intensidade e considere quem divide a casa. Orientações para sala, quarto, lavabo e espaços integrados.",
    intro:
      "A sala recebe, o quarto pede outra atenção e a cozinha já tem seus próprios cheiros. Encontre um lugar para a fragrância considerando o que acontece em cada ambiente e quem vive ali.",
    image: "casa",
  },
  {
    slug: "difusores",
    name: "Difusores",
    title: "Difusores de aromas e de varetas: guias de uso",
    description:
      "Entenda os difusores de aromas e de varetas: escolha, posicionamento, refis e cuidados para perfumar a casa com equilíbrio.",
    intro:
      "Onde colocar o frasco, quando virar as varetas e como preparar a reposição? Entenda o conjunto antes de ajustar o uso e confira o que realmente vem em cada embalagem.",
    image: "difusores",
  },
  {
    slug: "sprays-de-ambiente",
    name: "Sprays de Ambiente",
    title: "Sprays de ambiente: aplicação, escolha e conservação",
    description:
      "Como aplicar spray no ar, decidir quando reaplicar e conservar o frasco. Entenda também a diferença entre spray e água de lençóis.",
    intro:
      "O spray permite escolher o momento de perfumar. Aprenda a direcionar a aplicação, avaliar a intensidade e separar o uso no ar do cuidado com os tecidos.",
    image: "sprays",
  },
  {
    slug: "agua-de-lencois",
    name: "Água de Lençóis",
    title: "Água de lençóis e água perfumada para tecidos",
    description:
      "Entenda a água de lençóis e a água perfumada para tecidos, com orientações para conferir compatibilidade e cuidar das peças.",
    intro:
      "Lençol, manta e cortina não são todos iguais. Veja como conferir o material, fazer o teste discreto e aplicar sem excesso, preservando o cuidado próprio de cada peça.",
    image: "agua-de-lencois",
  },
  {
    slug: "fragrancias",
    name: "Fragrâncias",
    title: "Fragrâncias para casa: notas e perfis da Pomar de Minas",
    description:
      "Compare Figo, Pitanga, Jabuticaba e Laranja Lima pelas notas publicadas. Entenda referências cítricas, verdes, florais, frutadas e amadeiradas.",
    intro:
      "Figo também tem folhas e um fundo amadeirado. Laranja Lima combina cítricos e flores. Leia as notas, descubra o que distingue as quatro composições e escolha qual quer conhecer primeiro.",
    image: "figo",
  },
  {
    slug: "guias",
    name: "Guias",
    title: "Guias HANAMI: como escolher e usar aromas para casa",
    description:
      "Guias práticos sobre difusores, sprays, água de lençóis e fragrâncias. Respostas claras para as dúvidas do dia a dia.",
    intro:
      "Uma dúvida de cada vez: comparar formatos, repor o difusor, testar um tecido ou escolher uma fragrância pela internet. Encontre o guia da tarefa que você quer resolver.",
    image: "casa",
  },
  {
    slug: "pomar-de-minas",
    name: "Pomar de Minas",
    title: "Pomar de Minas: a coleção de fragrâncias HANAMI",
    description:
      "Conheça as memórias de Glaeli que deram origem à Pomar de Minas e compare suas fragrâncias: Figo, Pitanga, Jabuticaba e Laranja Lima.",
    intro:
      "Jabuticabas que deixavam as mãos roxas, figos colhidos com a avó, suco de laranja lima e pitangas no sítio. Glaeli conta a origem da coleção; os guias mostram como conhecer cada fragrância e escolher seu formato.",
    image: "jabuticaba",
  },
  {
    slug: "hanami",
    name: "HANAMI",
    title: "HANAMI: Glaeli Baldim, história e produtos para casa",
    description:
      "Conheça Glaeli Baldim, a história da HANAMI e os formatos da marca. Veja como usar o Journal para escolher e cuidar dos seus produtos.",
    intro:
      "Por trás da HANAMI está Glaeli Baldim e um repertório que começa no sítio da infância. Conheça sua história, entenda os produtos da marca e encontre o caminho entre uma dúvida e uma escolha para casa.",
    image: "casa",
  },
] as const;
export const fragrances = [
  {
    slug: "figo",
    name: "Figo",
    note: "Folhas de figo e frutas encontram sândalo, vetiver e baunilha. Uma composição verde, amadeirada e doce, ligada à lembrança da colheita com a avó.",
  },
  {
    slug: "pitanga",
    name: "Pitanga",
    note: "Frutas e notas verdes, com violeta e musk. Pitanga parte da memória do pomar para uma composição frutada e floral.",
  },
  {
    slug: "jabuticaba",
    name: "Jabuticaba",
    note: "Frutas, um coração floral e musk no fundo. Jabuticaba guarda a referência das mãos roxas e da fruta comida no pé.",
  },
  {
    slug: "laranja-lima",
    name: "Laranja Lima",
    note: "Laranja e mandarina com notas verdes, flores e musk. O suco fresco da infância é o ponto de partida de Laranja Lima.",
  },
] as const;
export function getCategory(slug: string) {
  return categories.find(category => category.slug === slug) ?? categories[0];
}
