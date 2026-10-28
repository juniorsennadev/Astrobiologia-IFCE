# Laboratório de Astrobiologia — IFCE Campus Acaraú

Portal institucional e de divulgação científica do **Laboratório de Astrobiologia do Instituto Federal do Ceará (IFCE) – Campus Acaraú** (`@astrobiologiaifce` | `astrobiologia@acarau.ifce.edu.br`), integrando o legado científico e computacional do **LaTEB (Laboratório de Tecnologias Educacionais e Bioinformática)** e as ações de extensão do **Clube de Astronomia (`@cav.ifa`)**.

---

## Destaques do Portal

1. **Identidade Oficial & Modo Escuro/Claro/Sistema:**
   - Alternância nativa entre **Sistema (`◒`)**, **Claro (`☀`)** e **Escuro (`☾` — padrão)**, com troca automática da logo oficial do laboratório (`assets/logo-lab-branca.png` no modo escuro e `assets/logo-lab-preta.png` no modo claro), controle de escala tipográfica (`A-`, `A`, `A+`), modo de **Alto Contraste** (WCAG 2.1 AA / eMAG) e tradutor oficial **VLibras**.
2. **Herança do LaTEB & Bancada Computacional Interativa:**
   - Inspeção interativa de modelos de pesquisa em bioinformática estrutural, alinhamento FASTA, filogenia de extremófilos da Caatinga e ambientes hipersalinos costeiros, além de prototipagem didática com Arduino e LEDs.
3. **Mapa Geográfico Real (Leaflet + Esri ArcGIS World Topo Map):**
   - Rotas georreferenciadas partindo da sede em **Acaraú – CE** para **São Paulo – SP (IO-USP / SBAstrobio)**, **Satuba / Maceió – AL (XXIV EANE — conquista do EANE 2029)**, **Caicó – RN (XXIII EANE)** e **Fortaleza – CE (Reitoria IFCE & Projeto Biologando em Acaraú / FINEP)**, com modal de inspeção no hover e páginas dedicadas em `eventos/*.html`.
4. **Marco Histórico — I ENEASTRO ("Nosso Primeiro Evento com o Grupo Atual"):**
   - Seção especial e dossiê completo dedicados ao **I Encontro de Ensino de Astronomia do Ceará (14 a 17 de outubro de 2026 — Tema "Vida e Universo")**, integrado à VIII Semana da Biologia e ao Encontro do PIBID com apoio da **CAPES (PAEP-EB)** e **FINEP**.
5. **Acervo Fotográfico Indexado Direto do Instagram:**
   - Galeria filtrável indexada diretamente das publicações oficiais do `@astrobiologiaifce`, `@cav.ifa`, `@ifceacarau` e `@prof_joao_garcia`, acompanhada de espelhamento local automático em `assets/instagram/` para resiliência offline.

---

## Estrutura de Diretórios

```text
astrobiologia-ifce-acarau/
├── index.html                  # Página principal do portal
├── vercel.json                 # Configuração de deploy e cabeçalhos de segurança para a Vercel
├── .gitignore                  # Arquivos ignorados pelo Git
├── css/
│   └── styles.css              # Design System Editorial Científico (Dark/Light/System + Alto Contraste)
├── js/
│   └── main.js                 # Lógica modular e segura (zero innerHTML vulnerável)
├── eventos/                    # Dossiês dedicados a cada missão e sede científica
│   ├── eneastro-acarau.html
│   ├── sbastrobio-usp.html
│   ├── xxiv-eane-satuba.html
│   ├── xxiii-eane-caico.html
│   └── reitoria-fortaleza.html
└── assets/
    ├── logo-lab-branca.png     # Logo oficial para fundo escuro
    ├── logo-lab-preta.png      # Logo oficial para fundo claro
    └── instagram/              # Espelhamento local das fotos indexadas do Instagram e Portal IFCE
```

---

## Publicação na Vercel via GitHub

O projeto é 100% estático (HTML5, CSS3 e JavaScript Vanilla) e já inclui o arquivo `vercel.json` pré-configurado:
1. Suba este repositório para o seu GitHub.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. Mantenha **Framework Preset** como `Other` e **Root Directory** como `./` e clique em **Deploy**.
