/**
 * Laboratório de Astrobiologia — IFCE Campus Acaraú
 * Script Principal: Acessibilidade (WCAG/eMAG), Bancada LaTEB,
 * Mapa Geográfico Real (Leaflet + OpenStreetMap) com Modal de Hover
 * e Redirecionamento para Páginas Dedicadas dos Eventos.
 *
 * Código seguro: manipulação estrita de nós DOM via textContent e createElement
 * (zero uso de innerHTML vulnerável a XSS).
 */
(function () {
  'use strict';

  /* ========================================================================
     1. DADOS CIENTÍFICOS E GEORREFERENCIADOS (IMUTÁVEIS)
     ======================================================================== */

  /** Modelos da Bancada Computacional LaTEB & Astrobiologia */
  const BIOINFO_MODELS = Object.freeze({
    uv: {
      tools: 'MEGA · IQ-TREE · AutoDock Vina · PyMOL',
      education: 'Iniciação Científica e Licenciatura',
      category: 'Astrobiologia e Genômica Evolutiva',
      title: 'Análise de Fotoliases em Microrganismos Resistentes à Radiação UV',
      description:
        'Microrganismos expostos ao sol forte do semiárido e de salinas costeiras dependem de enzimas como as fotoliases para reparar danos no DNA causados pela radiação ultravioleta. No laboratório, comparamos a estrutura tridimensional e a evolução dessas proteínas para entender como a vida resiste a ambientes extremos.',
      deliverables: [
        'Reconstrução de árvores filogenéticas e estudo de proteínas em microrganismos extremófilos.',
        'Modelagem molecular 3D nas estações de trabalho do projeto Biologando em Acaraú (FINEP).',
        'Produção de e-books e oficinas práticas de bioinformática para estudantes do ensino médio e licenciatura.'
      ]
    },
    halo: {
      tools: 'Clustal Omega · Modeller · ChimeraX · BioPython',
      education: 'Pesquisa Aplicada em Ambientes Costeiros e Salinas',
      category: 'Bioinformática Estrutural (Legado LaTEB)',
      title: 'Estabilidade de Proteínas em Bactérias e Arqueias de Salinas Costeiras',
      description:
        'As salinas do litoral norte cearense funcionam como laboratórios naturais para estudar como microrganismos sobrevivem à alta concentração de sal e baixa disponibilidade de água. A partir dos protocolos do LaTEB, analisamos no computador a estrutura de proteínas adaptadas a essas condições.',
      deliverables: [
        'Estudo da superfície de proteínas que mantêm sua função em ambientes com alta concentração de sal.',
        'Análise computacional de pigmentos microbianos como potenciais biossinais.',
        'Treinamento de estudantes de Biologia no uso dos bancos de dados públicos NCBI e PDB.'
      ]
    },
    edu: {
      tools: 'Arduino · Sensores e LEDs · Python (ESI) · E-books LaTEB',
      education: 'Licenciatura em Física, Biologia e PIBID',
      category: 'Tecnologias Educacionais e Ensino de Ciências',
      title: 'Fotossíntese sob Diferentes Espectros de Luz com Arduino e Seleção de Exoplanetas',
      description:
        'Unindo a tradição do LaTEB em ensino de ciências à instrumentação da Física, estudantes e professores montam experimentos com Arduino e LEDs para testar a fotossíntese em diferentes comprimentos de onda, além de desenvolver scripts em Python para cálculo do Índice de Similaridade com a Terra (ESI) em exoplanetas.',
      deliverables: [
        'Experimentos didáticos com Arduino apresentados no EANE e no I ENEASTRO.',
        'Algoritmo em Python para triagem de exoplanetas (projeto PIBIC Jr CNPq).',
        'Materiais didáticos abertos e oficinas para escolas públicas do Baixo Acaraú.'
      ]
    }
  });

  /**
   * Pontos Geográficos Reais para o Mapa (Leaflet)
   */
  const GEO_EXPEDITIONS = Object.freeze([
    {
      id: 'acarau',
      isOrigin: true,
      label: 'Acaraú · CE (Sede)',
      labelDir: 'left',
      lat: -2.8858,
      lng: -40.1200,
      coordsText: '02°53\'09"S 40°07\'12"W',
      code: 'Sede · Acaraú-CE',
      date: 'I ENEASTRO: 14 a 17 Out 2026 · Atuação Permanente',
      title: 'I ENEASTRO ("Vida e Universo"), LaTEB e Estação BRAMON',
      venue: 'IFCE Campus Acaraú — Litoral Oeste do Ceará',
      summary:
        'Sede do Laboratório de Astrobiologia e palco do I ENEASTRO (14 a 17/10/2026, integrado à VIII Semana da Biologia e ao PIBID, com apoio CAPES e FINEP), nosso primeiro grande evento organizado com o grupo atual.',
      highlights: [
        'I ENEASTRO ("Vida e Universo"): palestras com Dra. Evelyn Sanchez (SBAstrobio), Tatiane Peters, Prof. Heliomárzio Moreira, Prof. Saulo Machado e Planetário ECO.',
        'Pesquisa computacional no LaTEB: filogenia, modelagem 3D e algoritmo em Python para exoplanetas (PIBIC Jr CNPq).',
        'Monitoramento de meteoros (BRAMON) e observações do Clube de Astronomia (@cav.ifa) nas escolas.'
      ],
      url: '/eneastro-acarau'
    },
    {
      id: 'sp',
      isOrigin: false,
      label: 'São Paulo · SP (USP)',
      labelDir: 'right',
      lat: -23.5606,
      lng: -46.7314,
      coordsText: '23°33\'38"S 46°43\'53"W',
      code: 'São Paulo · USP',
      date: 'Novembro de 2025 · São Paulo, SP',
      title: 'Reunião da Sociedade Brasileira de Astrobiologia (SBAstrobio) — USP',
      venue: 'Instituto Oceanográfico da USP (Cidade Universitária)',
      summary:
        'Em São Paulo, o Prof. Dr. João Garcia Alves Filho apresentou à comunidade científica nacional o projeto de criação do primeiro Laboratório de Astrobiologia do Ceará, sediado no IFCE Campus Acaraú.',
      highlights: [
        'Apresentação das pesquisas com microrganismos da Caatinga e de salinas costeiras.',
        'Demonstração da estrutura de bioinformática construída no LaTEB.',
        'Diálogo e cooperação com pesquisadores da USP e da SBAstrobio.'
      ],
      url: '/sbastrobio-usp'
    },
    {
      id: 'al',
      isOrigin: false,
      label: 'Satuba / Maceió · AL',
      labelDir: 'right',
      lat: -9.5628,
      lng: -35.8239,
      coordsText: '09°33\'46"S 35°49\'26"W',
      code: 'Satuba · Alagoas',
      date: '04 a 06 de Junho de 2026 · Satuba, AL',
      title: 'XXIV EANE — IFAL Satuba e Escolha de Acaraú como Sede do EANE 2029',
      venue: 'Instituto Federal de Alagoas (IFAL) — Campus Satuba',
      summary:
        'Viagem da comitiva de estudantes de Física (Jeferson, Luma, Vitória, Ana Clara, Ailton) e Biologia (Junior e Luzia) com o Prof. Jorge Roberto ao XXIV EANE, onde Acaraú foi eleita sede oficial do EANE 2029.',
      highlights: [
        'Aprovação de Acaraú na plenária final como cidade-sede do EANE 2029.',
        'Apresentação de trabalhos sobre fotossíntese com Arduino/LEDs e ensino de astronomia.',
        'Integração com clubes de astronomia de todo o Nordeste.'
      ],
      url: '/xxiv-eane-satuba'
    },
    {
      id: 'rn',
      isOrigin: false,
      label: 'Caicó · RN',
      labelDir: 'left',
      lat: -6.4583,
      lng: -37.0978,
      coordsText: '06°27\'30"S 37°05\'52"W',
      code: 'Caicó · Rio Grande do Norte',
      date: 'Edição 2025 · Caicó, RN',
      title: 'XXIII EANE — Encontro de Astronomia do Nordeste no Seridó',
      venue: 'Caicó — Região do Seridó, Rio Grande do Norte',
      summary:
        'Primeira viagem da comitiva do laboratório ao Encontro de Astronomia do Nordeste, levando os primeiros trabalhos de astrobiologia, astroquímica e bioinformática feitos no campus.',
      highlights: [
        'Apresentação dos projetos iniciais de astrobiologia e ensino de ciências.',
        'Troca de experiências com professores e divulgadores científicos do Nordeste.',
        'Mobilização que inspirou a criação do I ENEASTRO em Acaraú.'
      ],
      url: '/xxiii-eane-caico'
    },
    {
      id: 'fortaleza',
      isOrigin: false,
      label: 'Fortaleza · CE',
      labelDir: 'right',
      lat: -3.7436,
      lng: -38.5356,
      coordsText: '03°44\'37"S 38°32\'08"W',
      code: 'Fortaleza · Reitoria IFCE',
      date: '14 de Setembro de 2026 · Fortaleza, CE',
      title: 'Reunião na Reitoria do IFCE e Projeto Biologando em Acaraú (FINEP)',
      venue: 'Reitoria do Instituto Federal do Ceará — Fortaleza/CE',
      summary:
        'Encontro com o Reitor Prof. Wally Menezes, a Pró-Reitora de Pesquisa Prof.ª Joélia Marques, o Diretor Prof. Rubens, o Prof. Jorge Roberto e o Prof. Dr. João Garcia para fortalecimento do laboratório e apoio ao I ENEASTRO.',
      highlights: [
        'Articulação institucional com o Reitor Prof. Wally Menezes e a PRPI.',
        'Infraestrutura de computadores de alto desempenho via projeto Biologando em Acaraú (FINEP).',
        'Apoio institucional para realização do I ENEASTRO no Campus Acaraú.'
      ],
      url: '/reitoria-fortaleza'
    }
  ]);

  /** Acervo de Trabalhos Publicados, Apresentações em Congressos e Produções LaTEB */
  const PUBLICATIONS_CATALOG = Object.freeze([
    {
      id: 'pub-01',
      category: 'astrobiologia',
      categoryLabel: 'Astrobiologia & Extremófilos',
      venue: 'Reunião Oficial SBAstrobio · IO-USP',
      location: 'São Paulo · SP',
      title: 'Implementação do Laboratório de Astrobiologia no IFCE Campus Acaraú: Extremófilos da Caatinga e Zonas Costeiras sob Abordagem In Silico',
      abstract:
        'Apresentação institucional e científica na Universidade de São Paulo detalhando o pioneirismo do laboratório no Ceará, voltado à prospecção e análise evolutiva de microrganismos adaptados a altos índices de radiação UV e salinidade.',
      authors: 'Alves Filho, J. G.; Equipe Lab. Astrobiologia IFCE Acaraú'
    },
    {
      id: 'pub-02',
      category: 'astrobiologia',
      categoryLabel: 'Astrobiologia & Ensino',
      venue: 'XXIV EANE · IFAL Satuba',
      location: 'Satuba / Maceió · AL',
      title: 'Modelagem Didática de Fotossíntese e Habitabilidade com Arduino e LEDs: Conectando Física e Biologia na Astrobiologia',
      abstract:
        'Desenvolvimento de aparato experimental controlado por microcontrolador para simular espectros luminosos e avaliar respostas fotossintéticas, promovendo a aprendizagem ativa de conceitos astrobiológicos na licenciatura e ensino médio.',
      authors: 'Discentes de Física e Biologia; Roberto, J.; Alves Filho, J. G.'
    },
    {
      id: 'pub-03',
      category: 'lateb',
      categoryLabel: 'Bioinformática & Legado LaTEB',
      venue: 'Acervo Científico LaTEB · IFCE',
      location: 'Acaraú · CE',
      title: 'Inferência Filogenética, Alinhamento de Sequências e Docagem Molecular 3D Aplicados ao Estudo de Adaptação Microbiana',
      abstract:
        'Pipeline computacional estruturado no Laboratório de Tecnologias Educacionais e Bioinformática (LaTEB) para anotação funcional de genes, predição tridimensional de proteínas e análise de conservação evolutiva.',
      authors: 'Alves Filho, J. G.; Grupo de Pesquisa LaTEB / IFCE Acaraú'
    },
    {
      id: 'pub-04',
      category: 'astrobiologia',
      categoryLabel: 'Astrobiologia & Astroquímica',
      venue: 'XXIII EANE · Seridó',
      location: 'Caicó · RN',
      title: 'Astrobiologia e Bioinformática no Norte Cearense: Perspectivas de Pesquisa Interdisciplinar e Divulgação Científica no IFCE Acaraú',
      abstract:
        'Trabalho apresentado na vigésima terceira edição do Encontro de Astronomia do Nordeste, articulando os fundamentos da origem da vida, evolução molecular e estratégias de interiorização da pesquisa astronômica.',
      authors: 'Comitiva IFCE Acaraú; Alves Filho, J. G.; Roberto, J.'
    },
    {
      id: 'pub-05',
      category: 'lateb',
      categoryLabel: 'Tecnologias Educacionais (LaTEB)',
      venue: 'Produção Didática & Extensão LaTEB',
      location: 'Baixo Acaraú · CE',
      title: 'Produção de E-books Educacionais e Sequências Didáticas de Biologia Celular, Molecular e Bioinformática para o Ensino Médio',
      abstract:
        'Conjunto de materiais didáticos digitais abertos e ações preparatórias (incluindo suporte a aulões ENEM) desenvolvidos pelo LaTEB para fortalecer o ensino público de ciências na microrregião do litoral oeste cearense.',
      authors: 'Equipe LaTEB — Laboratório de Tecnologias Educacionais e Bioinformática'
    },
    {
      id: 'pub-06',
      category: 'astronomia',
      categoryLabel: '1º Evento do Grupo Atual (@astrobiologiaifce)',
      venue: 'I ENEASTRO & VIII Semana da Biologia (CAPES / FINEP)',
      location: 'Acaraú · CE',
      title: 'I Encontro de Ensino de Astronomia do Ceará (I ENEASTRO — "Vida e Universo"): Nosso Primeiro Evento com o Grupo Atual',
      abstract:
        'Realizado de 14 a 17 de outubro de 2026 no IFCE Campus Acaraú com apoio da CAPES (PAEP-EB) e Biologando em Acaraú (FINEP), reunindo Dra. Evelyn Sanchez (SBAstrobio), Tatiane Peters, Prof. Heliomárzio Moreira, Prof. Saulo Machado, Planetário ECO, PIBID e @cav.ifa.',
      authors: 'Alves Filho, J. G.; Silva, J. R. P.; Comissão Organizadora I ENEASTRO'
    },
    {
      id: 'pub-07',
      category: 'astronomia',
      categoryLabel: 'Monitoramento Astronômico (PIBIC)',
      venue: 'Edital PIBIC · Rede BRAMON & IFCE Acaraú',
      location: 'Acaraú · CE',
      title: 'Monitoramento Sistemático de Meteoros no Litoral Oeste do Ceará em Parceria com a Rede BRAMON',
      abstract:
        'Projeto de iniciação científica (PIBIC) voltado à captura astrométrica contínua de meteoros e bólidos a partir do Campus Acaraú, determinando trajetórias atmosféricas, órbitas heliocêntricas e fluxos de matéria interplanetária.',
      authors: 'Silva, J. R. P. (Coord.); Bolsistas PIBIC IFCE · Estação BRAMON / @cav.ifa'
    },
    {
      id: 'pub-08',
      category: 'lateb',
      categoryLabel: 'Infraestrutura & Computação Científica',
      venue: 'Projeto Biologando em Acaraú · FAIFCE / FINEP',
      location: 'Acaraú & Fortaleza · CE',
      title: 'Modelagem Tridimensional e Simulações Computacionais de Alto Desempenho para Popularização da Biologia e Astrobiologia',
      abstract:
        'Implementação de infraestrutura computacional avançada financiada via edital FINEP, permitindo processamento local de dinâmicas moleculares, filogenias extensas e visualização científica 3D no Campus Acaraú.',
      authors: 'Alves Filho, J. G.; Silva, J. R. P.; Equipe Biologando em Acaraú'
    },
    {
      id: 'pub-09',
      category: 'lateb',
      categoryLabel: 'Astrobiologia Computacional (PIBIC Jr CNPq)',
      venue: 'Edital PIBIC Jr CNPq · LaTEB / Lab. Astrobiologia',
      location: 'Acaraú · CE',
      title: 'Desenvolvimento e Aprimoramento de um Algoritmo Python para Seleção de Exoplanetas com Base no Índice de Similaridade com a Terra (ESI)',
      abstract:
        'Desenvolvimento de ferramenta computacional em linguagem Python no âmbito do LaTEB e Laboratório de Astrobiologia para triagem automatizada de catálogos exoplanetários segundo parâmetros astrofísicos de habitabilidade e ESI.',
      authors: 'Alves Filho, J. G. (Coord.); Bolsista PIBIC Jr CNPq · LaTEB / IFCE Acaraú'
    },
    {
      id: 'pub-10',
      category: 'astronomia',
      categoryLabel: 'Inovação Didática & Equidade (PIBITI / PIBIC AF)',
      venue: 'Editais PIBITI & PIBIC AF · IFCE Acaraú',
      location: 'Acaraú · CE',
      title: 'Ensino de Astronomia a partir de Histórias em Quadrinhos sobre o Sistema Solar & Representatividade Feminina na Biologia',
      abstract:
        'Frentes integradas de divulgação científica e análise bibliométrica: produção de HQs didáticas sobre o Sistema Solar (PIBITI, Coord. Prof. Me. Jorge Roberto) e estudo documental sobre autoria e visibilidade feminina nas Ciências Biológicas (PIBIC AF, Coord. Prof. Dr. João Garcia).',
      authors: 'Silva, J. R. P.; Alves Filho, J. G.; Discentes Bolsistas PIBITI e PIBIC AF'
    }
  ]);

  /* ========================================================================
     2. UTILITÁRIOS SEGUROS DE ARMAZENAMENTO
     ======================================================================== */
  function safeGetStorage(key, fallback) {
    try {
      const val = window.localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function safeSetStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // Ignora silenciosamente caso bloqueado
    }
  }

  /* ========================================================================
     3. CONTROLES DE TEMA (SISTEMA / CLARO / ESCURO PADRÃO) E ACESSIBILIDADE
     ======================================================================== */
  function initAccessibilityControls() {
    const htmlEl = document.documentElement;
    const themeBtns = document.querySelectorAll('.theme-btn');
    const btnContrast = document.getElementById('btn-contrast');
    const btnDec = document.getElementById('btn-font-decrease');
    const btnRes = document.getElementById('btn-font-reset');
    const btnInc = document.getElementById('btn-font-increase');

    const SCALES = ['90', '100', '110', '120'];
    const THEMES = ['system', 'light', 'dark'];

    const systemLightMedia =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: light)')
        : null;

    function resolveTheme(themeOption) {
      if (themeOption === 'light') return 'light';
      if (themeOption === 'dark') return 'dark';
      if (systemLightMedia && systemLightMedia.matches) return 'light';
      return 'dark';
    }

    function syncBrandLogos(resolvedTheme, isHighContrast) {
      const showLightLogo = resolvedTheme === 'light' && !isHighContrast;

      // Atualiza imagens únicas com atributo data-src-dark / data-src-light (garante que apenas 1 logo apareça por vez)
      const themeLogos = document.querySelectorAll('.js-theme-logo');
      themeLogos.forEach(function (img) {
        const targetSrc = showLightLogo
          ? img.getAttribute('data-src-light')
          : img.getAttribute('data-src-dark');
        if (targetSrc) {
          img.setAttribute('src', targetSrc);
        }
      });

      // Fallback caso alguma página tenha classes .brand-logo--dark / .brand-logo--light
      const darkLogos = document.querySelectorAll('.brand-logo--dark');
      const lightLogos = document.querySelectorAll('.brand-logo--light');
      darkLogos.forEach(function (img) {
        img.hidden = showLightLogo;
        img.style.display = showLightLogo ? 'none' : 'block';
      });
      lightLogos.forEach(function (img) {
        img.hidden = !showLightLogo;
        img.style.display = showLightLogo ? 'block' : 'none';
      });

      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        const currentHref = favicon.getAttribute('href') || '';
        const prefix = currentHref.indexOf('../') === 0 ? '../assets/' : 'assets/';
        favicon.setAttribute(
          'href',
          prefix + (showLightLogo ? 'logo-lab-preta.png' : 'logo-lab-branca.png')
        );
      }
    }

    function applyTheme(themeOption) {
      const validTheme = THEMES.includes(themeOption) ? themeOption : 'dark';
      const resolved = resolveTheme(validTheme);
      const isHighContrast = htmlEl.getAttribute('data-contrast') === 'high';

      htmlEl.setAttribute('data-theme', validTheme);
      htmlEl.setAttribute('data-resolved-theme', resolved);

      themeBtns.forEach(function (btn) {
        const isCurrent = btn.getAttribute('data-theme-option') === validTheme;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-pressed', String(isCurrent));
      });

      syncBrandLogos(resolved, isHighContrast);
    }

    // Modo Escuro como padrão quando o visitante acessa pela primeira vez
    const savedTheme = safeGetStorage('ifce_astrobio_theme', 'dark');
    const savedContrast = safeGetStorage('ifce_astrobio_contrast', 'normal');
    const savedScale = safeGetStorage('ifce_astrobio_font_scale', '100');

    if (savedContrast === 'high') {
      htmlEl.setAttribute('data-contrast', 'high');
      if (btnContrast) btnContrast.setAttribute('aria-pressed', 'true');
    }

    applyTheme(savedTheme);

    themeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const chosen = btn.getAttribute('data-theme-option') || 'dark';
        applyTheme(chosen);
        safeSetStorage('ifce_astrobio_theme', chosen);
      });
    });

    if (systemLightMedia && typeof systemLightMedia.addEventListener === 'function') {
      systemLightMedia.addEventListener('change', function () {
        const currentMode = htmlEl.getAttribute('data-theme') || 'dark';
        if (currentMode === 'system') {
          applyTheme('system');
        }
      });
    }

    if (SCALES.includes(savedScale)) {
      htmlEl.setAttribute('data-font-scale', savedScale);
    }

    if (btnContrast) {
      btnContrast.addEventListener('click', function () {
        const current = htmlEl.getAttribute('data-contrast') === 'high' ? 'high' : 'normal';
        const next = current === 'high' ? 'normal' : 'high';
        htmlEl.setAttribute('data-contrast', next);
        btnContrast.setAttribute('aria-pressed', String(next === 'high'));
        safeSetStorage('ifce_astrobio_contrast', next);
        const resolved = htmlEl.getAttribute('data-resolved-theme') || 'dark';
        syncBrandLogos(resolved, next === 'high');
      });
    }

    function updateScale(newScale) {
      htmlEl.setAttribute('data-font-scale', newScale);
      safeSetStorage('ifce_astrobio_font_scale', newScale);
    }

    if (btnDec) {
      btnDec.addEventListener('click', function () {
        const curr = htmlEl.getAttribute('data-font-scale') || '100';
        const idx = SCALES.indexOf(curr);
        if (idx > 0) updateScale(SCALES[idx - 1]);
      });
    }

    if (btnRes) {
      btnRes.addEventListener('click', function () {
        updateScale('100');
      });
    }

    if (btnInc) {
      btnInc.addEventListener('click', function () {
        const curr = htmlEl.getAttribute('data-font-scale') || '100';
        const idx = SCALES.indexOf(curr);
        if (idx !== -1 && idx < SCALES.length - 1) updateScale(SCALES[idx + 1]);
      });
    }
  }

  /* ========================================================================
     4. BARRA LATERAL (DRAWER) DE OPÇÕES, ACESSIBILIDADE E NAVEGAÇÃO (☰)
     ======================================================================== */
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const drawer = document.getElementById('options-drawer');
    const backdrop = document.getElementById('options-drawer-backdrop');
    const closeBtn = document.getElementById('options-drawer-close');
    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.hidden = false;
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.hidden = true;
    }

    toggleBtn.addEventListener('click', function () {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeDrawer();
        toggleBtn.focus();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    const drawerLinks = drawer.querySelectorAll('.drawer-nav-link');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
        toggleBtn.focus();
      }
    });
  }

  /* ========================================================================
     5. BANCADA INTERATIVA DE BIOINFORMÁTICA (LEGADO LaTEB)
     ======================================================================== */
  function initBioinformaticsWorkbench() {
    const tabs = document.querySelectorAll('.workbench-tab');
    const panel = document.getElementById('panel-bioinfo');
    if (!tabs.length || !panel) return;

    const elLocus = document.getElementById('bio-locus-id');
    const elPipeline = document.getElementById('bio-pipeline-tag');
    const elFasta = document.getElementById('bio-fasta-view');
    const elTools = document.getElementById('bio-tools');
    const elEducation = document.getElementById('bio-education');
    const elCategory = document.getElementById('bio-category');
    const elTitle = document.getElementById('bio-title');
    const elDesc = document.getElementById('bio-description');
    const elDeliverables = document.getElementById('bio-deliverables');

    function selectModel(targetKey, clickedTab) {
      const data = BIOINFO_MODELS[targetKey];
      if (!data) return;

      tabs.forEach(function (t) {
        const isCurrent = t === clickedTab;
        t.classList.toggle('is-active', isCurrent);
        t.setAttribute('aria-selected', String(isCurrent));
      });

      if (clickedTab && clickedTab.id) {
        panel.setAttribute('aria-labelledby', clickedTab.id);
      }

      if (elLocus) elLocus.textContent = data.locusId;
      if (elPipeline) elPipeline.textContent = data.pipeline;
      if (elFasta) {
        const codeNode = document.createElement('code');
        codeNode.textContent = data.fasta;
        elFasta.replaceChildren(codeNode);
      }
      if (elTools) elTools.textContent = data.tools;
      if (elEducation) elEducation.textContent = data.education;
      if (elCategory) elCategory.textContent = data.category;
      if (elTitle) elTitle.textContent = data.title;
      if (elDesc) elDesc.textContent = data.description;

      if (elDeliverables) {
        const items = data.deliverables.map(function (itemText) {
          const li = document.createElement('li');
          li.textContent = itemText;
          return li;
        });
        elDeliverables.replaceChildren(...items);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const key = tab.getAttribute('data-target');
        selectModel(key, tab);
      });
    });
  }

  /* ========================================================================
     6. MAPA GEOGRÁFICO REAL (LEAFLET) + MODAL NO HOVER + CLIQUE PARA PÁGINA
     ======================================================================== */
  function initRealGeographicMap() {
    const mapContainer = document.getElementById('real-brazil-map');
    if (!mapContainer || typeof window.L === 'undefined') return;

    const L = window.L;

    // Elementos do Modal de Hover
    const hoverModal = document.getElementById('map-hover-modal');
    const closeBtn = document.getElementById('hover-modal-close');
    const elCode = document.getElementById('hover-modal-code');
    const elDate = document.getElementById('hover-modal-date');
    const elTitle = document.getElementById('hover-modal-title');
    const elVenue = document.getElementById('hover-modal-venue');
    const elSummary = document.getElementById('hover-modal-summary');
    const elList = document.getElementById('hover-modal-list');
    const elCoords = document.getElementById('hover-modal-coords');
    const elLink = document.getElementById('hover-modal-link');
    const quickCards = document.querySelectorAll('.map-point-card');
    const viewButtons = document.querySelectorAll('.map-view-btn[data-map-view]');

    // Inicializa o mapa enquadrando o Brasil deslocado à esquerda do modal flutuante
    const map = L.map(mapContainer, {
      center: [-13.2, -31.5],
      zoom: 4,
      minZoom: 3,
      maxZoom: 17,
      scrollWheelZoom: false
    });

    // Camadas Cartográficas Reais (Mapa Topográfico Padrão + Visão de Satélite com Rótulos Híbridos)
    const primaryTileUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    const fallbackTileUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    const satelliteTileUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const satelliteLabelsUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

    const baseLayer = L.tileLayer(primaryTileUrl, {
      attribution:
        'Tiles &copy; Esri &mdash; IBGE, USGS, NOAA, GIS User Community',
      maxZoom: 18
    }).addTo(map);

    const satelliteLayer = L.tileLayer(satelliteTileUrl, {
      attribution:
        'Imagery &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      maxZoom: 18
    });

    const satelliteLabelsLayer = L.tileLayer(satelliteLabelsUrl, {
      maxZoom: 18,
      pane: 'overlayPane'
    });

    let isSatelliteActive = false;
    let currentHoveredPointId = null;

    let switchedToFallback = false;
    baseLayer.on('tileerror', function () {
      if (!switchedToFallback) {
        switchedToFallback = true;
        baseLayer.setUrl(fallbackTileUrl);
      }
    });

    const originPoint = GEO_EXPEDITIONS[0]; // Acaraú - CE
    const routePolylines = {};
    const markerElements = {};

    function updateRouteColors(activePointId) {
      const inactiveColor = isSatelliteActive ? '#63B3ED' : '#1B4B78';
      const inactiveOpacity = isSatelliteActive ? 0.72 : 0.48;
      const activeColor = isSatelliteActive ? '#F6AD55' : '#B85630';

      Object.keys(routePolylines).forEach(function (key) {
        const poly = routePolylines[key];
        if (key === activePointId) {
          poly.setStyle({ color: activeColor, weight: 3.5, opacity: 0.98, dashArray: null });
          poly.bringToFront();
        } else {
          poly.setStyle({ color: inactiveColor, weight: 2, opacity: inactiveOpacity, dashArray: '6, 6' });
        }
      });
    }

    // Botão de Alternância para Visão de Satélite
    const satelliteBtn = document.getElementById('map-satellite-toggle');
    const satelliteLabel = document.getElementById('map-satellite-label');
    if (satelliteBtn) {
      satelliteBtn.addEventListener('click', function () {
        isSatelliteActive = !isSatelliteActive;
        satelliteBtn.classList.toggle('is-active', isSatelliteActive);
        satelliteBtn.setAttribute('aria-pressed', String(isSatelliteActive));

        if (satelliteLabel) {
          satelliteLabel.textContent = isSatelliteActive ? 'Visão Satélite (Ativa)' : 'Visão Satélite';
        }

        if (isSatelliteActive) {
          if (map.hasLayer(baseLayer)) map.removeLayer(baseLayer);
          satelliteLayer.addTo(map);
          satelliteLabelsLayer.addTo(map);
        } else {
          if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
          if (map.hasLayer(satelliteLabelsLayer)) map.removeLayer(satelliteLabelsLayer);
          baseLayer.addTo(map);
        }

        updateRouteColors(currentHoveredPointId);
      });
    }

    // Função segura que popula e exibe o Modal ao passar o mouse (hover) sobre um ponto
    function openHoverModal(pointData) {
      if (!hoverModal || !pointData) return;
      currentHoveredPointId = pointData.id;

      if (elCode) elCode.textContent = pointData.code;
      if (elDate) elDate.textContent = pointData.date;
      if (elTitle) elTitle.textContent = pointData.title;
      if (elVenue) elVenue.textContent = pointData.venue;
      if (elSummary) elSummary.textContent = pointData.summary;
      if (elCoords) elCoords.textContent = 'COORD: ' + pointData.coordsText;
      if (elLink) elLink.setAttribute('href', pointData.url);

      if (elList) {
        const items = pointData.highlights.map(function (txt) {
          const li = document.createElement('li');
          li.textContent = txt;
          return li;
        });
        elList.replaceChildren(...items);
      }

      hoverModal.classList.add('is-visible');
      hoverModal.setAttribute('aria-hidden', 'false');

      // Destaca a linha de rota correspondente e o pino ativo
      updateRouteColors(pointData.id);

      Object.keys(markerElements).forEach(function (key) {
        const el = markerElements[key];
        if (el) {
          el.classList.toggle('is-hovered', key === pointData.id);
        }
      });

      quickCards.forEach(function (card) {
        card.classList.toggle('is-active', card.getAttribute('data-point-id') === pointData.id);
      });
    }

    function closeHoverModal() {
      if (!hoverModal) return;
      hoverModal.classList.remove('is-visible');
      hoverModal.setAttribute('aria-hidden', 'true');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeHoverModal);
    }

    // Cria as rotas geográficas ligando Acaraú-CE a cada destino e adiciona os marcadores
    GEO_EXPEDITIONS.forEach(function (point) {
      if (!point.isOrigin) {
        const latlngs = [
          [originPoint.lat, originPoint.lng],
          [point.lat, point.lng]
        ];
        const polyline = L.polyline(latlngs, {
          color: '#1B4B78',
          weight: 2,
          opacity: 0.5,
          dashArray: '6, 6'
        }).addTo(map);
        routePolylines[point.id] = polyline;
      }

      // Constrói o elemento DOM do marcador de forma segura, alternando lado da etiqueta para nunca sobrepor
      const dirClass = point.labelDir === 'left' ? ' geo-pin--dir-left' : ' geo-pin--dir-right';
      const pinContainer = document.createElement('div');
      pinContainer.className =
        'geo-pin' + (point.isOrigin ? ' geo-pin--origin' : '') + dirClass;
      pinContainer.setAttribute('role', 'button');
      pinContainer.setAttribute('tabindex', '0');
      pinContainer.setAttribute(
        'aria-label',
        point.label + ' — ' + point.title + '. Passe o mouse para ver o resumo ou clique para abrir a página dedicada.'
      );

      const pulseSpan = document.createElement('span');
      pulseSpan.className = 'geo-pin__pulse';

      const coreSpan = document.createElement('span');
      coreSpan.className = 'geo-pin__core';

      const tagSpan = document.createElement('span');
      tagSpan.className = 'geo-pin__tag';
      tagSpan.textContent = point.label;

      pinContainer.append(pulseSpan, coreSpan, tagSpan);

      const customIcon = L.divIcon({
        className: 'geo-pin-wrapper',
        html: pinContainer,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([point.lat, point.lng], {
        icon: customIcon,
        riseOnHover: true
      }).addTo(map);

      markerElements[point.id] = pinContainer;

      // Ao passar o mouse encima do ponto -> Abre o modal mostrando o que foi feito no local
      marker.on('mouseover', function () {
        openHoverModal(point);
      });

      // Ao clicar/tocar no ponto -> Em telas touch abre primeiro o resumo; no desktop (ou 2º toque) abre a página dedicada
      marker.on('click', function () {
        const isTouchOrSmall =
          window.innerWidth <= 820 ||
          (typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches);
        const isAlreadyShowingThisPoint =
          hoverModal &&
          hoverModal.classList.contains('is-visible') &&
          elCode &&
          elCode.textContent === point.code;

        if (isTouchOrSmall && !isAlreadyShowingThisPoint) {
          openHoverModal(point);
        } else {
          window.location.href = point.url;
        }
      });

      // Suporte a teclado no pino
      pinContainer.addEventListener('focus', function () {
        openHoverModal(point);
      });
      pinContainer.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          window.location.href = point.url;
        }
      });
    });

    // Interação nos cartões rápidos abaixo do mapa (hover abre o modal e destaca no mapa)
    quickCards.forEach(function (card) {
      const pid = card.getAttribute('data-point-id');
      const found = GEO_EXPEDITIONS.find(function (p) {
        return p.id === pid;
      });
      if (found) {
        card.addEventListener('mouseenter', function () {
          openHoverModal(found);
        });
        card.addEventListener('focus', function () {
          openHoverModal(found);
        });
      }
    });

    // Botões de enquadramento da câmera do mapa (deslocados para manter os pinos à esquerda do modal)
    const MAP_VIEWS = {
      brasil: { center: [-13.2, -31.5], zoom: 4 },
      nordeste: { center: [-6.4, -34.2], zoom: 6 },
      ceara: { center: [-3.35, -38.1], zoom: 8 }
    };

    viewButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const viewKey = btn.getAttribute('data-map-view');
        const targetView = MAP_VIEWS[viewKey];
        if (!targetView) return;

        viewButtons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });

        map.flyTo(targetView.center, targetView.zoom, { duration: 0.9 });
      });
    });

    // Em telas desktop, exibe inicialmente o modal da missão nacional (São Paulo - USP); em telas menores deixa o mapa livre até o toque
    if (window.innerWidth > 820) {
      openHoverModal(GEO_EXPEDITIONS[1]);
    }

    window.addEventListener('resize', function () {
      map.invalidateSize();
    });
  }

  /* ========================================================================
     7. MINI-MAPA NAS PÁGINAS DEDICADAS DE CADA EVENTO (eventos/*.html)
     ======================================================================== */
  function initEventVenueMiniMap() {
    const miniMapEl = document.getElementById('venue-mini-map');
    if (!miniMapEl || typeof window.L === 'undefined') return;

    const lat = parseFloat(miniMapEl.getAttribute('data-lat') || '-2.8858');
    const lng = parseFloat(miniMapEl.getAttribute('data-lng') || '-40.1200');
    const zoom = parseInt(miniMapEl.getAttribute('data-zoom') || '15', 10);
    const label = miniMapEl.getAttribute('data-label') || 'Local do Evento';

    const L = window.L;
    const miniMap = L.map(miniMapEl, {
      center: [lat, lng],
      zoom: zoom,
      scrollWheelZoom: false
    });

    const miniBaseLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; OpenStreetMap contributors',
        maxZoom: 18
      }
    ).addTo(miniMap);

    const miniSatLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Imagery &copy; Esri',
        maxZoom: 18
      }
    );

    const miniSatLabels = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        pane: 'overlayPane'
      }
    );

    // Controle de Visão de Satélite também no mini-mapa das páginas de eventos
    const SatControl = L.Control.extend({
      options: { position: 'topright' },
      onAdd: function () {
        const btn = L.DomUtil.create('button', 'map-view-btn map-satellite-btn');
        btn.type = 'button';
        btn.textContent = '🛰 Satélite';
        btn.setAttribute('aria-pressed', 'false');
        let satOn = false;
        L.DomEvent.disableClickPropagation(btn);
        btn.addEventListener('click', function () {
          satOn = !satOn;
          btn.classList.toggle('is-active', satOn);
          btn.setAttribute('aria-pressed', String(satOn));
          btn.textContent = satOn ? '🗺 Mapa' : '🛰 Satélite';
          if (satOn) {
            if (miniMap.hasLayer(miniBaseLayer)) miniMap.removeLayer(miniBaseLayer);
            miniSatLayer.addTo(miniMap);
            miniSatLabels.addTo(miniMap);
          } else {
            if (miniMap.hasLayer(miniSatLayer)) miniMap.removeLayer(miniSatLayer);
            if (miniMap.hasLayer(miniSatLabels)) miniMap.removeLayer(miniSatLabels);
            miniBaseLayer.addTo(miniMap);
          }
        });
        return btn;
      }
    });
    miniMap.addControl(new SatControl());

    const pinContainer = document.createElement('div');
    pinContainer.className = 'geo-pin geo-pin--dir-right';
    const pulseSpan = document.createElement('span');
    pulseSpan.className = 'geo-pin__pulse';
    const coreSpan = document.createElement('span');
    coreSpan.className = 'geo-pin__core';
    const tagSpan = document.createElement('span');
    tagSpan.className = 'geo-pin__tag';
    tagSpan.textContent = label;
    pinContainer.append(pulseSpan, coreSpan, tagSpan);

    const icon = L.divIcon({
      className: 'geo-pin-wrapper',
      html: pinContainer,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    L.marker([lat, lng], { icon: icon }).addTo(miniMap);
  }

  /* ========================================================================
     8. CATÁLOGO FILTRÁVEL DE PUBLICAÇÕES E TRABALHOS (DOM SEGURO)
     ======================================================================== */
  function initPublicationsCatalog() {
    const grid = document.getElementById('publications-grid');
    const emptyMsg = document.getElementById('publications-empty');
    const filterButtons = document.querySelectorAll('.filter-pill');
    const searchInput = document.getElementById('publication-search');

    if (!grid) return;

    let currentCategory = 'all';
    let currentQuery = '';

    function createPublicationCard(pub) {
      const article = document.createElement('article');
      article.className = 'pub-card';

      const topDiv = document.createElement('div');
      topDiv.className = 'pub-card__top';

      const catSpan = document.createElement('span');
      catSpan.className = 'pub-card__cat';
      catSpan.textContent = pub.categoryLabel;

      const venueSpan = document.createElement('span');
      venueSpan.className = 'pub-card__venue';
      venueSpan.textContent = pub.venue;

      topDiv.append(catSpan, venueSpan);

      const titleEl = document.createElement('h3');
      titleEl.className = 'pub-card__title';
      titleEl.textContent = pub.title;

      const abstractEl = document.createElement('p');
      abstractEl.className = 'pub-card__abstract';
      abstractEl.textContent = pub.abstract;

      const footerDiv = document.createElement('div');
      footerDiv.className = 'pub-card__footer';

      const authorsSpan = document.createElement('span');
      authorsSpan.textContent = pub.authors;

      const locSpan = document.createElement('span');
      locSpan.className = 'pub-card__location';
      locSpan.textContent = pub.location;

      footerDiv.append(authorsSpan, locSpan);

      article.append(topDiv, titleEl, abstractEl, footerDiv);
      return article;
    }

    function renderCatalog() {
      const normalizedQuery = currentQuery.trim().toLowerCase();

      const filtered = PUBLICATIONS_CATALOG.filter(function (item) {
        const matchesCat = currentCategory === 'all' || item.category === currentCategory;
        if (!matchesCat) return false;
        if (!normalizedQuery) return true;

        const haystack = [
          item.title,
          item.abstract,
          item.venue,
          item.location,
          item.categoryLabel,
          item.authors
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });

      const cards = filtered.map(createPublicationCard);
      grid.replaceChildren(...cards);

      if (emptyMsg) {
        emptyMsg.hidden = filtered.length > 0;
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentCategory = btn.getAttribute('data-filter') || 'all';
        filterButtons.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        renderCatalog();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        currentQuery = searchInput.value || '';
        renderCatalog();
      });
    }

    renderCatalog();
  }

  /* ========================================================================
     9. INDEXAÇÃO DIRETA DE IMAGENS DO INSTAGRAM + ÍCONES E FILTROS
     ======================================================================== */
  function initInstagramDirectGallery() {
    function createInstagramSvgIcon() {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'ig-icon');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');

      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', '2');
      rect.setAttribute('y', '2');
      rect.setAttribute('width', '20');
      rect.setAttribute('height', '20');
      rect.setAttribute('rx', '5');
      rect.setAttribute('ry', '5');

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z');

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', '17.5');
      line.setAttribute('y1', '6.5');
      line.setAttribute('x2', '17.51');
      line.setAttribute('y2', '6.5');

      svg.append(rect, path, line);
      return svg;
    }

    // Garante que todos os botões, cartões e links para o Instagram exibam o logo do Instagram
    const igLinks = document.querySelectorAll('a[href*="instagram.com"]:not(.ig-photo-card__media)');
    igLinks.forEach(function (link) {
      if (link.querySelector('.ig-icon')) return;
      const badgeTarget = link.querySelector('strong, .mono-tag');
      if (badgeTarget) {
        badgeTarget.prepend(createInstagramSvgIcon());
      } else {
        link.prepend(createInstagramSvgIcon());
      }
    });

    // Adiciona o logo do Instagram também nas etiquetas das fotos que abrem posts no Instagram
    const igMediaTags = document.querySelectorAll('.ig-photo-card__media[href*="instagram.com"] .ig-photo-card__tag');
    igMediaTags.forEach(function (tag) {
      if (!tag.querySelector('.ig-icon')) {
        tag.prepend(createInstagramSvgIcon());
      }
    });

    // Inicializa o carrossel interativo em cada publicação com múltiplas imagens (data-ig-slides)
    const slideContainers = document.querySelectorAll('[data-ig-slides]');
    slideContainers.forEach(function (container) {
      const rawSlides = container.getAttribute('data-ig-slides') || '';
      const slides = rawSlides
        .split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean);

      if (slides.length <= 1) return;

      const imgEl = container.querySelector('img');
      if (!imgEl) return;

      container.classList.add('ig-carousel');
      let currentIndex = 0;

      // Contador de slides (ex: 1 / 7)
      const counterBadge = document.createElement('span');
      counterBadge.className = 'ig-carousel__counter';
      counterBadge.setAttribute('aria-live', 'polite');
      counterBadge.textContent = '1 / ' + String(slides.length);

      // Botões Anterior e Próxima
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'ig-carousel__btn ig-carousel__btn--prev';
      prevBtn.setAttribute('aria-label', 'Foto anterior desta publicação');
      prevBtn.setAttribute('title', 'Foto anterior');
      prevBtn.textContent = '‹';

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'ig-carousel__btn ig-carousel__btn--next';
      nextBtn.setAttribute('aria-label', 'Próxima foto desta publicação');
      nextBtn.setAttribute('title', 'Próxima foto');
      nextBtn.textContent = '›';

      // Indicadores (bolinhas)
      const dotsWrap = document.createElement('div');
      dotsWrap.className = 'ig-carousel__dots';
      const dotButtons = [];
      const maxDots = Math.min(slides.length, 8);
      for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'ig-carousel__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Ir para foto ' + String(i + 1));
        dot.addEventListener('click', function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          goToSlide(i);
        });
        dotButtons.push(dot);
        dotsWrap.appendChild(dot);
      }

      function goToSlide(targetIdx) {
        currentIndex = (targetIdx + slides.length) % slides.length;
        imgEl.setAttribute('src', slides[currentIndex]);
        counterBadge.textContent = String(currentIndex + 1) + ' / ' + String(slides.length);

        const activeDotIdx = Math.min(currentIndex, maxDots - 1);
        dotButtons.forEach(function (d, idx) {
          d.classList.toggle('is-active', idx === activeDotIdx);
        });

        // Pré-carrega a próxima imagem do carrossel para transição instantânea
        const nextIdx = (currentIndex + 1) % slides.length;
        const preloadImg = new Image();
        preloadImg.src = slides[nextIdx];
      }

      prevBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        goToSlide(currentIndex - 1);
      });

      nextBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        goToSlide(currentIndex + 1);
      });

      // Suporte a gesto de deslizar (swipe) em telas sensíveis ao toque
      let touchStartX = null;
      container.addEventListener('touchstart', function (ev) {
        if (ev.touches && ev.touches.length === 1) {
          touchStartX = ev.touches[0].clientX;
        }
      }, { passive: true });

      container.addEventListener('touchend', function (ev) {
        if (touchStartX === null || !ev.changedTouches || !ev.changedTouches.length) return;
        const deltaX = ev.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex - 1);
          }
        }
      }, { passive: true });

      container.append(counterBadge, prevBtn, nextBtn, dotsWrap);
    });

    const indexedImages = document.querySelectorAll('.ig-indexed-img');
    indexedImages.forEach(function (img) {
      function applyFallback() {
        const fallback = img.getAttribute('data-fallback-src');
        if (fallback && img.getAttribute('src') !== fallback) {
          img.setAttribute('src', fallback);
        }
      }

      img.addEventListener('error', applyFallback);

      // Caso a imagem já tenha falhado antes do registro do listener
      if (img.complete && img.naturalWidth === 0) {
        applyFallback();
      }
    });

    const igFilterBtns = document.querySelectorAll('.ig-filter-btn');
    const igCards = document.querySelectorAll('#ig-photo-grid .ig-photo-card');
    if (!igFilterBtns.length || !igCards.length) return;

    igFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filterVal = btn.getAttribute('data-ig-filter') || 'all';

        igFilterBtns.forEach(function (b) {
          const isCurrent = b === btn;
          b.classList.toggle('is-active', isCurrent);
          b.setAttribute('aria-pressed', String(isCurrent));
        });

        igCards.forEach(function (card) {
          const cat = card.getAttribute('data-ig-category') || '';
          const shouldShow = filterVal === 'all' || cat === filterVal;
          card.hidden = !shouldShow;
        });
      });
    });
  }

  /* ========================================================================
     10. URLs LIMPAS (SEM /index.html OU #HASH) E ROLAGEM SUAVE AO TOPO / SEÇÕES
     ======================================================================== */
  function initScrollToTop() {
    // Remove /index.html ou #hash residual da barra de endereços para manter a URL sempre limpa
    if (window.history && typeof window.history.replaceState === 'function') {
      const currentPath = window.location.pathname || '/';
      if (currentPath.endsWith('/index.html') && window.location.protocol !== 'file:') {
        const cleanPath = currentPath.replace(/\/index\.html$/, '/') || '/';
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }

      if (window.location.hash && window.location.protocol !== 'file:') {
        const targetId = window.location.hash.slice(1);
        const targetEl = targetId ? document.getElementById(targetId) : null;
        if (targetEl) {
          window.setTimeout(function () {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }, 80);
        }
      }
    }

    function scrollToPageTop(ev) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Todos os links que apontam para #topo (incluindo brand-lockup na home, rodapé e botão Voltar ao topo)
    const topLinks = document.querySelectorAll('a[href="#topo"]');
    topLinks.forEach(function (link) {
      link.addEventListener('click', scrollToPageTop);
    });

    // Links de seções internas (#sobre-laboratorio, #viagens-nordeste-brasil, etc.) rolam suavemente sem poluir a URL com #...
    const sectionLinks = document.querySelectorAll('a[href^="#"]:not([href="#topo"]):not([href="#"])');
    sectionLinks.forEach(function (link) {
      link.addEventListener('click', function (ev) {
        const hash = link.getAttribute('href') || '';
        const id = hash.slice(1);
        const sectionEl = id ? document.getElementById(id) : null;
        if (sectionEl) {
          ev.preventDefault();
          sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.history && typeof window.history.replaceState === 'function') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }
      });
    });

    // Em páginas internas, se o usuário já rolou a página e clicar na logo, sobe para o topo primeiro; se já estiver no topo, vai para "/"
    const brandLockups = document.querySelectorAll('.brand-lockup');
    brandLockups.forEach(function (lockup) {
      if (lockup.getAttribute('href') !== '#topo') {
        lockup.addEventListener('click', function (ev) {
          if (window.scrollY > 120) {
            scrollToPageTop(ev);
          }
        });
      }
    });

    // Clique nas logos do rodapé em páginas internas também sobe para o topo
    const footerLogos = document.querySelectorAll('.footer-ifce-img, .footer-logo-img');
    footerLogos.forEach(function (img) {
      if (!img.closest('a')) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', scrollToPageTop);
      }
    });
  }

  /* ========================================================================
     11. INICIALIZAÇÃO GERAL
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    initAccessibilityControls();
    initMobileNav();
    initScrollToTop();
    initBioinformaticsWorkbench();
    initRealGeographicMap();
    initEventVenueMiniMap();
    initInstagramDirectGallery();
    initPublicationsCatalog();
  });
})();
