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
      locusId: 'LOCUS: PHRB_EXTREMO_CE // 478 aa',
      pipeline: 'Pipeline: BLASTp → MAFFT → IQ-TREE → Modelagem 3D',
      fasta: [
        '>Deinococcus_sp_Ref      [Motivo Conservado de Ligação ao Cofator FAD]',
        '412  T G Y P F I D A N M R E L V A T G W N R N H V R M V A S F  440',
        '>Isolado_Caatinga_Model  [Análise Homologia Estrutural — LaTEB/IFCE]',
        '412  T G Y P F I D A N M R E L V A T G W N R N H V R M V A S F  440',
        '     * * * * * * * * * * * * * * * * * * * * * * * * * * * * *',
        '     [Região catalítica de reparo de dímeros de pirimidina induzidos por UV]'
      ].join('\n'),
      tools: 'MEGA / IQ-TREE / AutoDock Vina / PyMOL',
      education: 'Iniciação Científica & Práticas de Licenciatura',
      category: 'ASTROBIOLOGIA & GENÔMICA EVOLUTIVA',
      title: 'Análise Filogenética e Estrutural de Fotoliases em Microrganismos Resistentes à Radiação UV',
      description:
        'Microrganismos expostos à intensa insolação do semiárido e de salinas costeiras dependem de enzimas altamente eficientes, como as fotoliases de DNA, para reverter danos causados pela radiação ultravioleta. Por meio das rotinas de bioinformática consolidadas no LaTEB, realizamos alinhamentos múltiplos, inferência de árvores filogenéticas e docagem molecular para comparar a conservação evolutiva dessas proteínas frente a ambientes análogos planetários.',
      deliverables: [
        'Reconstrução filogenética e análise de domínios conservados em procariotos extremófilos.',
        'Modelagem molecular tridimensional em estações de trabalho de alto desempenho do campus.',
        'Transposição didática em e-books e oficinas de bioinformática para estudantes do ensino médio e graduação.'
      ]
    },
    halo: {
      locusId: 'LOCUS: BOP_HALO_COSTAL // 262 aa',
      pipeline: 'Pipeline: UniProtKB → Clustal Omega → AlphaFold/Modeller → Docagem',
      fasta: [
        '>Halobacterium_salinarum [Hélice Transmembrana C — Bolsão do Retinal]',
        '082  R Y A D W L F T T P L L L L D L A L L V D A D Q G T I L A  110',
        '>Halofilo_Salinas_CE     [Simulação de Estabilidade Osmótica — LaTEB]',
        '082  R Y A D W L F T T P L L L V D L A L L V D A D Q G T I L A  110',
        '     * * * * * * * * * * * * * : * * * * * * * * * * * * * * *',
        '     [Resíduos Asp85 e Asp96 essenciais para o bombeamento de prótons]'
      ].join('\n'),
      tools: 'Clustal Omega / Modeller / ChimeraX / BioPython',
      education: 'Pesquisa Aplicada em Ambientes Costeiros e Salinas',
      category: 'BIOINFORMÁTICA ESTRUTURAL (HERANÇA LaTEB)',
      title: 'Estabilidade Proteica e Bioenergética em Arqueias e Bactérias Halofílicas Costeiras',
      description:
        'Ambientes hipersalinos do litoral norte cearense funcionam como laboratórios naturais para compreender como a vida suporta baixa atividade de água e elevada força iônica — condições relevantes para oceanos subsuperficiais de luas geladas e paleolagos marcianos. Herdamos do LaTEB os protocolos de análise de carga superficial de proteínas halofílicas e bombas de prótons ativadas por luz.',
      deliverables: [
        'Mapeamento de resíduos ácidos superficiais responsáveis pela solvatação em alta concentração de NaCl.',
        'Análise in silico de rodopsinas microbianas como biossinais espectroscópicos primitivos.',
        'Formação de estudantes de Biologia em bancos de dados estruturais (PDB e NCBI).'
      ]
    },
    edu: {
      locusId: 'LOCUS: RBCL_SPECTRA_EDU // 475 aa + ARDUINO',
      pipeline: 'Pipeline: Filogenia rbcL → Prototipagem Arduino/LEDs → Ensino Investigativo',
      fasta: [
        '>Synechococcus_Cyanobact [Sítio Ativo Rubisco — Fixação de Carbono]',
        '195  G G L D F T K D D E N V N S Q P F M R W R D R F L F C A E  223',
        '>Chlorella_Ensino_IFCE   [Modelo Didático LaTEB & Astrobiologia]',
        '195  G G L D F T K D D E N V N S Q P F M R W R D R F L F C A E  223',
        '     * * * * * * * * * * * * * * * * * * * * * * * * * * * * *',
        '     [Integração entre evolução da fotossíntese e espectros luminosos]'
      ].join('\n'),
      tools: 'Arduino IDE / Espectrofotometria LED / NCBI / E-books LaTEB',
      education: 'Licenciatura em Física, Biologia & PIBID',
      category: 'TECNOLOGIAS EDUCACIONAIS & ENSINO DE CIÊNCIAS',
      title: 'Modelagem Didática da Fotossíntese sob Diferentes Espectros Estelares com Arduino e Bioinformática',
      description:
        'Unindo a tradição do LaTEB em tecnologias educacionais à instrumentação física, estudantes e professores desenvolvem aparatos experimentais com microcontroladores Arduino e matrizes de LEDs para investigar a resposta fotossintética em diferentes comprimentos de onda, conectando a evolução molecular da enzima Rubisco à habitabilidade ao redor de diferentes tipos estelares (como anãs vermelhas M e estrelas tipo G).',
      deliverables: [
        'Protótipos de baixo custo com Arduino apresentados em encontros regionais como o EANE e o ENEASTRO.',
        'E-books e guias didáticos abertos para professores da educação básica do Baixo Acaraú.',
        'Aulões interdisciplinares e oficinas práticas integrando Biologia, Física e Computação.'
      ]
    }
  });

  /**
   * Pontos Geográficos Reais para o Mapa (Leaflet)
   * Ao passar o mouse (hover): abre modal detalhando o que foi realizado no local.
   * Ao clicar: redireciona direto para a página dedicada do evento (`url`).
   */
  const GEO_EXPEDITIONS = Object.freeze([
    {
      id: 'acarau',
      isOrigin: true,
      label: 'ACARAÚ · CE (SEDE)',
      labelDir: 'left',
      lat: -2.8858,
      lng: -40.1200,
      coordsText: '02°53\'09"S 40°07\'12"W',
      code: 'SEDE & 1º EVENTO DO GRUPO ATUAL // ACARAÚ-CE',
      date: 'I ENEASTRO: 14 a 17 Out 2026 · Atuação Permanente',
      title: 'I ENEASTRO ("Vida e Universo" — 1º Evento do Grupo Atual), LaTEB & Rede BRAMON',
      venue: 'IFCE Campus Acaraú — Litoral Oeste do Ceará',
      summary:
        'Sede do Laboratório de Astrobiologia e palco do I ENEASTRO (14 a 17/10/2026, integrado à VIII Semana da Biologia e ao PIBID, com apoio CAPES PAEP-EB e FINEP), nosso primeiro grande evento organizado com a formação atual do grupo.',
      highlights: [
        'I ENEASTRO ("Vida e Universo"): conferências com a Presidente da SBAstrobio (Dra. Evelyn Sanchez), Tatiane Peters, Prof. Heliomárzio Moreira, Prof. Saulo Machado e Planetário ECO.',
        'Bancada computacional herdada do LaTEB: filogenia, docagem molecular 3D e algoritmo Python para seleção de exoplanetas (ESI / PIBIC Jr CNPq).',
        'Monitoramento de meteoros (BRAMON / PIBIC) e ações do Clube de Astronomia (@cav.ifa) nas escolas de Acaraú.'
      ],
      url: 'eventos/eneastro-acarau.html'
    },
    {
      id: 'sp',
      isOrigin: false,
      label: 'SÃO PAULO · SP (USP)',
      labelDir: 'right',
      lat: -23.5606,
      lng: -46.7314,
      coordsText: '23°33\'38"S 46°43\'53"W',
      code: 'MISSÃO NACIONAL // SP-USP',
      date: 'Novembro de 2025 · São Paulo, SP',
      title: 'Reunião Oficial da Sociedade Brasileira de Astrobiologia (SBAstrobio) — USP',
      venue: 'Instituto Oceanográfico da USP (IO-USP) · Cidade Universitária',
      summary:
        'Em São Paulo, o Prof. Dr. João Garcia Alves Filho apresentou oficialmente à comunidade científica nacional o projeto de implementação do primeiro Laboratório de Astrobiologia do Estado do Ceará, sediado no IFCE Campus Acaraú.',
      highlights: [
        'Apresentação da pesquisa em microrganismos extremófilos da Caatinga e salinas costeiras resistentes a UV e NaCl.',
        'Demonstração da infraestrutura computacional de bioinformática herdada do LaTEB.',
        'Articulação de cooperação científica nacional com pesquisadores da USP e membros da SBAstrobio.'
      ],
      url: 'eventos/sbastrobio-usp.html'
    },
    {
      id: 'al',
      isOrigin: false,
      label: 'SATUBA / MACEIÓ · AL',
      labelDir: 'right',
      lat: -9.5628,
      lng: -35.8239,
      coordsText: '09°33\'46"S 35°49\'26"W',
      code: 'COMITIVA NORDESTE // XXIV EANE',
      date: '04 a 06 de Junho de 2026 · Satuba, AL',
      title: 'XXIV EANE — IFAL Campus Satuba & Conquista do EANE 2029 para Acaraú',
      venue: 'Instituto Federal de Alagoas (IFAL) — Campus Satuba / Maceió-AL',
      summary:
        'Participação da comitiva de estudantes de Física (Jeferson, Luma, Vitória, Ana Clara, Ailton) e Biologia (Junior e Luzia) com o Prof. Jorge Roberto no XXIV EANE, onde Acaraú foi eleita sede oficial do EANE 2029.',
      highlights: [
        'Conquista histórica na plenária final: Acaraú aprovada como cidade-sede oficial do EANE 2029.',
        'Apresentação de trabalhos sobre fotossíntese e habitabilidade planetária com Arduino/LEDs e ensino de astronomia.',
        'Fortalecimento da rede de clubes de astronomia do Nordeste (@cav.ifa e @astrobiologiaifce).'
      ],
      url: 'eventos/xxiv-eane-satuba.html'
    },
    {
      id: 'rn',
      isOrigin: false,
      label: 'CAICÓ · RN',
      labelDir: 'left',
      lat: -6.4583,
      lng: -37.0978,
      coordsText: '06°27\'30"S 37°05\'52"W',
      code: 'ESTREIA REGIONAL // XXIII EANE',
      date: 'Edição 2025 · Caicó, RN',
      title: 'XXIII EANE — Encontro de Astronomia do Nordeste no Seridó Potiguar',
      venue: 'Caicó — Região do Seridó, Rio Grande do Norte (RN)',
      summary:
        'Marco histórico da primeira viagem da comitiva do Laboratório de Astrobiologia do IFCE Campus Acaraú ao EANE, apresentando os primeiros trabalhos na interface entre astrobiologia, astroquímica e bioinformática.',
      highlights: [
        'Estreia dos projetos de astrobiologia e astroquímica desenvolvidos por estudantes do campus Acaraú.',
        'Compartilhamento de práticas de popularização científica em escolas públicas.',
        'Articulação regional que inspirou a criação do I ENEASTRO no Ceará.'
      ],
      url: 'eventos/xxiii-eane-caico.html'
    },
    {
      id: 'fortaleza',
      isOrigin: false,
      label: 'FORTALEZA · CE',
      labelDir: 'right',
      lat: -3.7436,
      lng: -38.5356,
      coordsText: '03°44\'37"S 38°32\'08"W',
      code: 'ARTICULAÇÃO & FOMENTO // FORTALEZA-CE',
      date: '14 de Setembro de 2026 · Fortaleza, CE',
      title: 'Reunião Oficial na Reitoria do IFCE & Infraestrutura FINEP (Biologando em Acaraú)',
      venue: 'Reitoria do Instituto Federal do Ceará (IFCE) — Fortaleza/CE',
      summary:
        'Reunião institucional com o Reitor Prof. Wally Menezes, a Pró-Reitora de Pesquisa Prof.ª Joélia Marques, o Diretor Prof. Rubens, o Prof. Jorge Roberto e o Prof. Dr. João Garcia para consolidação do laboratório e apoio ao I ENEASTRO.',
      highlights: [
        'Encontro com o Reitor Prof. Wally Menezes e a Pró-Reitora Prof.ª Joélia Marques (PRPI) em Fortaleza.',
        'Captação de estações de trabalho de alto desempenho via projeto Biologando em Acaraú (FAIFCE / FINEP).',
        'Articulação institucional para realização do I ENEASTRO e expansão da pesquisa em astrobiologia.'
      ],
      url: 'eventos/reitoria-fortaleza.html'
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
      const darkLogos = document.querySelectorAll('.brand-logo--dark');
      const lightLogos = document.querySelectorAll('.brand-logo--light');

      darkLogos.forEach(function (img) {
        img.hidden = showLightLogo;
      });
      lightLogos.forEach(function (img) {
        img.hidden = !showLightLogo;
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
     4. MENU MOBILE ACESSÍVEL
     ======================================================================== */
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('navegacao-principal');
    if (!toggleBtn || !nav) return;

    function closeMenu() {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    const links = nav.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
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
    const viewButtons = document.querySelectorAll('.map-view-btn');

    // Inicializa o mapa enquadrando o Brasil deslocado à esquerda do modal flutuante
    const map = L.map(mapContainer, {
      center: [-13.2, -31.5],
      zoom: 4,
      minZoom: 3,
      maxZoom: 17,
      scrollWheelZoom: false
    });

    // Camada Cartográfica Real (Esri ArcGIS World Topo Map — funciona 100% em file:// e http(s):// sem exigir API Key)
    const primaryTileUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    const fallbackTileUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    const baseLayer = L.tileLayer(primaryTileUrl, {
      attribution:
        'Tiles &copy; Esri &mdash; IBGE, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, METI, Esri China, and the GIS User Community',
      maxZoom: 18
    }).addTo(map);

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

    // Função segura que popula e exibe o Modal ao passar o mouse (hover) sobre um ponto
    function openHoverModal(pointData) {
      if (!hoverModal || !pointData) return;

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
      Object.keys(routePolylines).forEach(function (key) {
        const poly = routePolylines[key];
        if (key === pointData.id) {
          poly.setStyle({ color: '#B85630', weight: 3.5, opacity: 0.95, dashArray: null });
          poly.bringToFront();
        } else {
          poly.setStyle({ color: '#1B4B78', weight: 2, opacity: 0.48, dashArray: '6, 6' });
        }
      });

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

      // Ao clicar no ponto -> Vai direto para a página dedicada ao evento
      marker.on('click', function () {
        window.location.href = point.url;
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

    // Exibe inicialmente o modal da missão nacional (São Paulo - USP) para demonstrar o funcionamento
    openHoverModal(GEO_EXPEDITIONS[1]);
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

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; OpenStreetMap contributors',
        maxZoom: 18
      }
    ).addTo(miniMap);

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
     9. INDEXAÇÃO DIRETA DE IMAGENS DO INSTAGRAM + FALLBACK LOCAL E FILTROS
     ======================================================================== */
  function initInstagramDirectGallery() {
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
     10. INICIALIZAÇÃO GERAL
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    initAccessibilityControls();
    initMobileNav();
    initBioinformaticsWorkbench();
    initRealGeographicMap();
    initEventVenueMiniMap();
    initInstagramDirectGallery();
    initPublicationsCatalog();
  });
})();
