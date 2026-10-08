export const shop = "https://www.aromashanami.com.br";
export const author = {
  name: "Glaeli Baldim",
  path: "/autores/glaeli-baldim/",
  description:
    "Glaeli Baldim escreve sobre fragrâncias para casa, aromas, bem-estar, experiências sensoriais e a criação da HANAMI.",
};
export const categories = [
  {
    slug: "aromas-para-casa",
    name: "Aromas para Casa",
    title: "Aromas para casa: escolhas e pequenos rituais",
    description:
      "Como escolher aromas para casa e criar uma experiência acolhedora em cada ambiente, respeitando sua rotina e suas preferências.",
    intro:
      "Uma casa se constrói também nas pequenas percepções. Explore formas de escolher um aroma, organizar os ambientes e dar espaço aos rituais que fazem sentido para você.",
    image: "casa",
  },
  {
    slug: "difusores",
    name: "Difusores",
    title: "Difusores de aromas e de varetas: guias de uso",
    description:
      "Entenda os difusores de aromas e de varetas: escolha, posicionamento, refis e cuidados para perfumar a casa com equilíbrio.",
    intro:
      "Um frasco, algumas varetas e uma escolha que acompanha o cotidiano. Aqui, reunimos orientações para conhecer os formatos e usar seu difusor de acordo com o rótulo.",
    image: "difusores",
  },
  {
    slug: "sprays-de-ambiente",
    name: "Sprays de Ambiente",
    title: "Sprays de ambiente: escolha e uso consciente",
    description:
      "Guias sobre spray de ambiente, spray de aromas e perfume para casa. Descubra como escolher e usar cada formato na rotina.",
    intro:
      "Há momentos que pedem um gesto breve. Conheça o universo dos sprays, a diferença entre os usos e o cuidado de escolher um perfume que respeite o ambiente.",
    image: "sprays",
  },
  {
    slug: "agua-de-lencois",
    name: "Água de Lençóis",
    title: "Água de lençóis e água perfumada para tecidos",
    description:
      "Entenda a água de lençóis e a água perfumada para tecidos, com orientações para conferir compatibilidade e cuidar das peças.",
    intro:
      "O cuidado com os tecidos começa antes de perfumar. Reunimos leituras sobre rótulos, compatibilidade e pequenos gestos para a roupa de casa.",
    image: "agua-de-lencois",
  },
  {
    slug: "fragrancias",
    name: "Fragrâncias",
    title: "Fragrâncias para casa: figo, pitanga e outras inspirações",
    description:
      "Explore figo, pitanga, jabuticaba e laranja lima. Leituras para conhecer referências olfativas e escolher fragrâncias para sua casa.",
    intro:
      "Entre o nome de uma fruta e a experiência de um perfume existe um universo a descobrir. As referências são um convite; cada composição tem sua própria expressão.",
    image: "figo",
  },
  {
    slug: "guias",
    name: "Guias",
    title: "Guias HANAMI: como escolher e usar aromas para casa",
    description:
      "Guias práticos sobre difusores, sprays, água de lençóis e fragrâncias. Respostas claras para as dúvidas do dia a dia.",
    intro:
      "Boas escolhas começam com boas perguntas. Encontre orientações práticas para conhecer os produtos, interpretar as instruções e cuidar dos seus ambientes.",
    image: "casa",
  },
  {
    slug: "pomar-de-minas",
    name: "Pomar de Minas",
    title: "Pomar de Minas: a coleção de fragrâncias HANAMI",
    description:
      "Conheça a coleção Pomar de Minas e suas quatro fragrâncias: Figo, Pitanga, Jabuticaba e Laranja Lima. Inspiração para a casa.",
    intro:
      "Figo, Pitanga, Jabuticaba e Laranja Lima dão nome às quatro fragrâncias da coleção Pomar de Minas. Um ponto de partida para pensar a casa com mais atenção aos sentidos.",
    image: "jabuticaba",
  },
  {
    slug: "hanami",
    name: "HANAMI",
    title: "HANAMI: aromas, casa e olhar editorial",
    description:
      "Conheça a HANAMI, marca de fragrâncias para casa, e o olhar de Glaeli Baldim sobre aromas, experiências sensoriais e cotidiano.",
    intro:
      "A HANAMI se dedica às fragrâncias para casa e à aromatização de ambientes. Este é nosso espaço de conversa sobre escolhas, inspiração e pequenos rituais.",
    image: "casa",
  },
] as const;
export const fragrances = [
  {
    slug: "figo",
    name: "Figo",
    note: "Uma referência para explorar nuances e preferências.",
  },
  {
    slug: "pitanga",
    name: "Pitanga",
    note: "O nome de uma fruta, muitas possibilidades de interpretação.",
  },
  {
    slug: "jabuticaba",
    name: "Jabuticaba",
    note: "Uma inspiração que convida a olhar o cotidiano com calma.",
  },
  {
    slug: "laranja-lima",
    name: "Laranja Lima",
    note: "Um convite a descobrir sua própria leitura da fragrância.",
  },
] as const;
export function getCategory(slug: string) {
  return categories.find(category => category.slug === slug) ?? categories[0];
}
