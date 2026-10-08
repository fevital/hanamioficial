# HANAMI Journal

Blog editorial estático em Astro, em português brasileiro.

- Blog: https://blog.aromashanami.com.br/
- Loja: https://www.aromashanami.com.br/
- Autora: Glaeli Baldim

## Executar

Use Node compatível com engines em package.json e pnpm.

```sh
pnpm install
pnpm run build
pnpm run preview
```

No Windows com bloqueio de scripts PowerShell, use pnpm.cmd. O build executa astro check, astro build e pagefind --site dist. A pasta final é dist, incluindo dist/pagefind; não há comandos Unix nem necessidade de copiar o índice de volta para public.

A busca deve ser testada na prévia do build. O servidor de desenvolvimento não gera o índice Pagefind.

## Conteúdo

content-plan.json documenta as 200 pautas nas quantidades originais. docs/content-plan-review.md registra o escopo de cada grupo.

Artigos: src/content/posts/*.md. Campos adicionais: category, group, guide, fragrance, authorSlug, heroImage e heroImageAlt. Use editorialNotes apenas para uma nota editorial que deva aparecer publicamente. As instruções de redação do plano não devem ser copiadas para esse campo.

Categorias são definidas em src/data/journal.ts. O hub Guias reúne artigos com guide: true, sem duplicar os arquivos.

Cada artigo inclui um link contextual para a página principal da loja, https://www.aromashanami.com.br, além dos links internos e dos CTAs específicos. A validação confere essa regra nos 200 artigos do plano editorial.

As ilustrações locais em public/images/blog são placeholders decorativos, não fotografias dos produtos. A documentação nessa pasta explica como inserir fotos aprovadas.

## SEO e publicação

O domínio editorial e a imagem social estão em astro-paper.config.ts. A geração dinâmica de OG permanece desabilitada; a imagem estática public/hanami-og.png é utilizada como padrão.

O build preserva canonical, Open Graph, JSON-LD, sitemap, robots.txt e RSS. A busca e a página 404 têm noindex e não entram no sitemap.

O conteúdo de demonstração original foi arquivado em archive/astropaper, fora das coleções publicadas. A licença original do projeto está preservada.

Nenhuma configuração de DNS, Hostinger ou GitHub é administrada por este repositório. A saída estática para hospedagem está em dist.

## Verificações

```sh
node scripts/validate-content.mjs
pnpm run build
node scripts/validate-build.mjs
```

A validação de conteúdo confere distribuição, correspondência com o plano, duplicações de títulos e introduções e links. A validação do build confere páginas, metadados, JSON-LD, destinos locais, RSS, sitemap e artefatos Pagefind.
