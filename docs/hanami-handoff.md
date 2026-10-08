# HANAMI Journal — entrega

## Conteúdo e navegação

- 200 artigos em português brasileiro, conforme as dez cotas de content-plan.json.
- Todos incluem link contextual para https://www.aromashanami.com.br, além de links internos e CTAs específicos.
- Oito categorias: Aromas para Casa, Difusores, Sprays de Ambiente, Água de Lençóis, Fragrâncias, Guias, Pomar de Minas e HANAMI.
- Quatro hubs de fragrâncias: Figo, Pitanga, Jabuticaba e Laranja Lima.
- Página da autora Glaeli Baldim e página Sobre.
- Home, cabeçalho, rodapé, cards e artigos redesenhados com a paleta HANAMI.
- Ilustrações locais decorativas substituem fotos ainda não fornecidas. Não representam produtos reais.
- Três textos de história/criação exibem notas editoriais sobre informações ainda não confirmadas. Nenhuma trajetória, formação ou característica de produto foi inventada.

## Validação final

Em 8 de outubro de 2026:

- pnpm.cmd run build: exit code 0.
- astro check: 65 arquivos, zero erros, avisos ou sugestões.
- Astro: 296 páginas HTML geradas, incluindo a página de encaminhamento de /about/ para /sobre/.
- Pagefind: 200 artigos em português.
- Auditoria integrada: 19.539 referências locais conferidas, sem destinos ausentes.
- Sitemap, robots.txt, RSS, canonical, Open Graph e JSON-LD conferidos.
- Doze rotas/arquivos representativos responderam HTTP 200 na prévia local, incluindo home, categoria paginada, artigo, autora, hub, busca, JavaScript/WASM do Pagefind, RSS, sitemap, robots e imagem social.
- Os relatórios detalhados estão em content-validation.json e build-validation.json.
- A inspeção visual e de interações no navegador não foi possível: o navegador integrado estava indisponível. Foram verificadas a compilação, o HTML e as respostas HTTP; não se afirma teste visual de todos os tamanhos de tela.

## Hospedagem

A saída estática está em dist, incluindo dist/pagefind. O build mantém astro check, astro build e pagefind e não usa o comando Unix cp.

Domínio editorial configurado no código: https://blog.aromashanami.com.br/.
Loja oficial: https://www.aromashanami.com.br/.

Nenhuma configuração externa de DNS, Hostinger ou GitHub foi alterada. Os conteúdos demonstrativos originais permanecem arquivados fora das coleções publicadas.
