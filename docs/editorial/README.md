# Reformulação editorial do HANAMI Journal

Atualização: a matéria `hanami-significado-japones-e-inspiracao-da-marca` foi acrescentada após a reformulação, levando o acervo a 201 artigos (11 no grupo marca). A auditoria de reescrita continua comparando os 200 originais; os validadores de conteúdo e build incluem também a nova publicação.

Revisão de 8 de outubro de 2026. Os 200 artigos foram reescritos, preservando títulos, slugs, grupos e páginas existentes. Home, categorias, páginas das fragrâncias, Sobre, perfil de Glaeli, chamadas e metadados também foram revisados.

## Critério de escrita

- Responder à dúvida do título antes de desenvolver o contexto.
- Usar exemplos, decisões de compra, instruções de aplicação e diferenças reais entre formatos.
- Reservar histórias pessoais para fatos confirmados: sítio, irmãos, colheita com a avó e as quatro frutas relatadas por Glaeli.
- Diferenciar notas olfativas, ingredientes, intenção criativa e experiência individual.
- Manter um link contextual para a página principal da loja em cada matéria.
- Desenvolver mais os guias amplos; responder de modo direto às perguntas estreitas, sem aumentar o texto apenas para cumprir uma contagem.

## Pesquisa e limites das fontes

O catálogo em `sources.json` registra páginas consultadas. As referências pertinentes aparecem nos artigos. Informações da HANAMI foram verificadas no HTML público das páginas de produto, guardado no cache local durante o trabalho. Preços e disponibilidade não foram fixados nos textos.

Peter Paiva e sua loja foram consultados como referências educativas sobre formatos e componentes. Receitas, dosagens, validade e alegações de fornecedores não foram atribuídas aos produtos acabados da HANAMI. As instruções oficiais da marca prevalecem nos exemplos de uso.

Também foram consultadas fontes primárias para temas específicos: IFRA e Institute for Art and Olfaction; pesquisas sobre percepção olfativa; EPA; GINETEX; Philips; Woolmark; LILYSILK; ASPCA e Poison Control. As fontes veterinárias e toxicológicas não foram usadas para declarar a segurança de uma formulação HANAMI sem avaliação específica.

O Instagram não ficou acessível para leitura direta na pesquisa anterior. A história foi obtida do vídeo local fornecido pelo usuário, conforme a documentação em `../hanami-brand-story.md`. Não foram inventados ano de fundação, formação acadêmica, cidade de origem ou certificações.

## Verificação

`baseline.json` preserva títulos, grupos e hashes anteriores à reformulação. O hash do corpo normaliza espaços para evitar que somente uma formatação seja considerada uma reescrita.

Comandos:

```sh
node scripts/validate-editorial-rewrite.mjs
pnpm run check:content
pnpm run build
pnpm run check:site
```

`rewrite-validation.json` registra cobertura, preservação dos títulos e backlinks. Os validadores existentes verificam estrutura, cotas, duplicações, links internos, metadados, RSS, sitemap e índice de busca. Esses testes não substituem julgamento editorial ou uma avaliação sensorial dos produtos.

A revisão desta sessão não altera DNS, domínio ou configurações externas. O vídeo, as legendas, as fotografias e os arquivos de marca permanecem integrados ao site.
