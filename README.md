# Ev Start Tech — Landing Page

Landing page institucional da **Ev Start Tech Assistência Técnica & Acessórios**, focada em geração de contatos via WhatsApp para conserto de celulares na Freguesia do Ó, Vila Palmeiras, Inajar de Souza e região da Zona Norte de São Paulo.

## Stack

HTML5 semântico, CSS3 (mobile-first, sem frameworks) e JavaScript vanilla — sem dependências externas, focado em performance máxima.

## Estrutura

```
index.html          Página única (hero, serviços, marcas, diferenciais, depoimentos, localização, FAQ)
css/style.css        Estilos (paleta preto / azul royal / branco / prata)
js/script.js          Menu mobile, scroll reveal, botão voltar ao topo
assets/img/           Imagens e favicon
robots.txt             Diretivas para crawlers
sitemap.xml             Sitemap XML
site.webmanifest        Manifest PWA básico
```

## SEO

- Dados estruturados (Schema.org): `ElectronicsStore` (LocalBusiness), `BreadcrumbList` e `FAQPage` via JSON-LD
- Meta tags Open Graph e Twitter Card
- Title, meta description e canonical otimizados
- `robots.txt` e `sitemap.xml`

## Contato

- **Endereço:** R. Alexandre Fuzaro, 529 — Jardim Primavera, São Paulo - SP, 02755-080
- **WhatsApp/Telefone:** (11) 91225-1681
- **Horário:** Seg. a sáb. 09h–19h · Dom. 09h–14h

## Como visualizar localmente

Basta abrir o arquivo `index.html` em um navegador, ou servir a pasta com qualquer servidor estático:

```bash
npx serve .
```
