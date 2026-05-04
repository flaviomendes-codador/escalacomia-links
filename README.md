# escalacomia.com.br — Página de Links

## Atualizar links

Edite `links/index.html`. Cada link ativo é uma tag `<a>` com o atributo `href`.

- **Diagnóstico:** procure `data-event="click_diagnostico"` → mude o `href`
- **Dicas:** procure `data-event="click_dicas"` → mude o `href`

## Trocar a foto

Substitua `links/assets/flavio.jpg`. Use foto com rosto centralizado — o CSS recorta em círculo 120×120.

## Ativar Google Analytics

No `links/index.html`, descomente o bloco `<!-- GA4 -->` e substitua `GA-XXXXXXXX` pelo ID real do GA4.

## Desbloquear um card

1. Troque `<div class="card card--locked"` por `<a class="card card--active"`
2. Adicione `href="..."`, `target="_blank"`, `rel="noopener noreferrer"`, `data-event="nome_do_evento"`
3. Remova o `<div class="card__header">` e o `<span class="card__badge">`
4. Adicione `<span class="card__arrow" aria-hidden="true">→</span>` antes de fechar a tag `</a>`

## Deploy — GitHub Pages

1. Crie o repositório no GitHub (pode ser privado)
2. Faça push deste diretório para o branch `main`
3. No GitHub: **Settings → Pages → Branch: main → / (root)**
4. Em **Settings → Pages → Custom domain**: digite `escalacomia.com.br`
5. No seu DNS, configure:
   - `A @ 185.199.108.153`
   - `A @ 185.199.109.153`
   - `A @ 185.199.110.153`
   - `A @ 185.199.111.153`
   - `CNAME www flaviomendes-codador.github.io`

O arquivo `CNAME` na raiz já está configurado. O GitHub Pages ativa HTTPS automaticamente após propagação do DNS (até 24h).
