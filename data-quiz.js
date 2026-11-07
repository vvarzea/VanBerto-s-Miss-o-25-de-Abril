// ===== Conteúdo educativo e perguntas do quiz — A REVOLUÇÃO DOS CRAVOS (25 de Abril de 1974) =====
// HISTORY, QUIZ_TIPS, QUIZ_ARTICLE, QUIZ_BY_THEME, QUIZ_BY_THEME_AVANCADO
// Alinhado por artIdx (0-19), na ordem cronológica dos 20 níveis.
//
// Formato de cada pergunta: Q(pergunta, respostaCerta, [erradas...], explicação).
// A resposta certa vem sempre primeiro nos dados; o jogo baralha a ordem ao mostrar.
// Fácil: 1 certa + 2 erradas (3 opções). Difícil/Extremo: 1 certa + 3 erradas (4 opções).

const Q = (q, ok, bad, exp) => ({ q, a: [{ t: ok, ok: true }, ...bad.map(t => ({ t, ok: false }))], exp });

export const HISTORY = [
  { title: "🏛️ A Ditadura de Salazar",
    text: "Em 28 de maio de 1926, um golpe militar pôs fim à I República. Em 1933 nasceu o Estado Novo, uma ditadura dirigida por António de Oliveira Salazar, que governou como presidente do Conselho de Ministros durante 36 anos. Não havia eleições livres, nem partidos, nem liberdade para dizer o que se pensava." },
  { title: "⛪ Deus, Pátria e Família",
    text: "O regime dizia que os portugueses deviam viver segundo o lema «Deus, Pátria e Família». Muita gente era pobre, vivia no campo e tinha poucos estudos: no início dos anos 70, mais de um quarto dos portugueses não sabia ler nem escrever." },
  { title: "✏️ A Censura e o Lápis Azul",
    text: "Antes de saírem, os jornais, os livros, as canções e os filmes passavam pela censura. Os censores riscavam com um lápis azul tudo o que o regime não queria que as pessoas lessem ou ouvissem. Os jornais saíam com cortes e a verdade ficava escondida." },
  { title: "✊ Quem Resistiu",
    text: "Mesmo com medo, muitas pessoas lutaram pela liberdade: faziam jornais clandestinos, greves e juntavam-se em movimentos de oposição. Em 1958, o general Humberto Delgado candidatou-se à Presidência da República e ficou conhecido como o «General sem Medo». Foi assassinado em 1965 por agentes da polícia política." },
  { title: "🔇 Sem Liberdades",
    text: "Não havia liberdade de expressão, de reunião nem de associação. Os partidos estavam proibidos (só existia o do regime), as greves eram ilegais e as eleições não eram livres. As mulheres tinham menos direitos do que os homens." },
  { title: "🕵️ A PIDE, a Polícia Política",
    text: "A PIDE era a polícia política do regime (mais tarde chamada DGS). Vigiava, prendia e interrogava quem criticava o governo. Muitos presos políticos estiveram em prisões como Caxias e Peniche, ou no campo do Tarrafal, em Cabo Verde." },
  { title: "🪖 A Guerra Colonial",
    text: "Entre 1961 e 1974, Portugal combateu em Angola, na Guiné e em Moçambique, que eram então colónias portuguesas e queriam ser independentes. Os rapazes eram obrigados a ir para a tropa e muitos partiam para África durante anos. Muitos morreram, ficaram feridos ou nunca mais voltaram a ser os mesmos." },
  { title: "🚂 A Fuga: Emigração",
    text: "Com tanta pobreza e com a guerra, centenas de milhares de portugueses partiram para o estrangeiro, sobretudo para França. Muitos faziam a viagem «a salto», atravessando fronteiras às escondidas, à procura de trabalho e de uma vida melhor." },
  { title: "🎖️ O Movimento dos Capitães",
    text: "Cansados da guerra, muitos oficiais do exército começaram a reunir-se em segredo em 1973. Do chamado «Movimento dos Capitães» nasceu o Movimento das Forças Armadas, o MFA. O seu objetivo era acabar com a ditadura e com a guerra." },
  { title: "🗺️ O Plano de Otelo",
    text: "O major Otelo Saraiva de Carvalho preparou o plano da revolução. O posto de comando ficou instalado no quartel da Pontinha, em Lisboa. O plano tinha de ser secreto, rápido e, se possível, sem derramar sangue." },
  { title: "📻 As Senhas na Rádio",
    text: "Na noite de 24 de abril de 1974, a rádio passou duas senhas. Às 22h55, a canção «E Depois do Adeus» avisou que a operação estava em marcha. Pouco depois da meia-noite, «Grândola, Vila Morena», de Zeca Afonso, foi o sinal para avançar." },
  { title: "🐎 Salgueiro Maia",
    text: "O capitão Salgueiro Maia saiu de Santarém com os seus homens e chegou ao Terreiro do Paço, em Lisboa, ao amanhecer. Mais tarde, quando um comandante do regime mandou disparar contra ele, os soldados recusaram-se e juntaram-se aos revoltosos. Foi o momento mais tenso do dia e acabou sem um único tiro." },
  { title: "🏰 O Largo do Carmo",
    text: "Marcelo Caetano, o chefe do governo, refugiou-se no quartel do Carmo, em Lisboa. Salgueiro Maia cercou o quartel e, ao fim do dia, Caetano rendeu-se ao general Spínola. A ditadura tinha acabado, quase sem tiros." },
  { title: "🌹 O Povo e os Cravos",
    text: "As pessoas saíram à rua para apoiar os militares. Celeste Caeiro, funcionária de um restaurante de Lisboa, ofereceu cravos aos soldados e eles puseram-nos nas espingardas. Por isso, a revolução ficou conhecida como a Revolução dos Cravos." },
  { title: "🔓 Os Presos Libertados",
    text: "Nos dias seguintes, os presos políticos saíram das prisões, como Caxias e Peniche, e a PIDE/DGS foi extinta. Os exilados começaram a regressar a Portugal. Na rua, a alegria era enorme." },
  { title: "📜 O Programa do MFA",
    text: "O MFA tinha um programa resumido em três D: Democratizar, Descolonizar e Desenvolver. Uma Junta de Salvação Nacional, chefiada pelo general Spínola, assumiu o governo durante a mudança, com o compromisso de preparar eleições livres." },
  { title: "🎉 O 1.º de Maio",
    text: "Em 1 de maio de 1974, centenas de milhares de pessoas encheram as ruas de Lisboa para celebrar a liberdade. A censura prévia foi abolida, os partidos passaram a existir à luz do dia e as pessoas puderam, finalmente, dizer o que pensavam." },
  { title: "🌍 A Descolonização",
    text: "Em 1974 e 1975, as colónias portuguesas em África alcançaram a independência: a Guiné-Bissau, Moçambique, Cabo Verde, São Tomé e Príncipe e Angola. Muitos portugueses que lá viviam regressaram a Portugal e ficaram conhecidos como «retornados»." },
  { title: "🗳️ As Primeiras Eleições Livres",
    text: "Em 25 de abril de 1975, um ano depois da revolução, os portugueses votaram em eleições livres para escolher quem ia escrever a nova Constituição. Mais de nove em cada dez eleitores votaram! A Constituição foi aprovada em 1976 e garantiu direitos e liberdades a todos." },
  { title: "🕊️ Abril Hoje",
    text: "Hoje, o 25 de Abril é feriado nacional e celebra-se o Dia da Liberdade. Portugal é uma democracia, onde podemos votar, falar, escrever e escolher. Mas a liberdade é uma conquista que temos de proteger e de lembrar todos os dias!" }
];

// Frase-resumo mostrada depois de cada pergunta («Lembra-te»).
export const QUIZ_TIPS = {
  estado_novo:       "O Estado Novo foi uma ditadura que durou de 1933 a 1974, sem eleições livres nem partidos.",
  vida_quotidiana:   "Antes de 1974 havia muita pobreza, muitos analfabetos e pouca liberdade de escolha.",
  censura:           "A censura riscava com lápis azul o que o regime não queria que se soubesse.",
  oposicao:          "Mesmo com medo, muita gente resistiu: Humberto Delgado foi o «General sem Medo».",
  sem_liberdades:    "Sem liberdade de expressão, de reunião, de greve nem partidos livres, não há democracia.",
  pide:              "A PIDE era a polícia política: vigiava, prendia e interrogava quem criticava o regime.",
  guerra_colonial:   "A Guerra Colonial durou de 1961 a 1974 e foi uma das principais razões da revolução.",
  emigracao:         "Muitos portugueses emigraram, sobretudo para França, fugindo à pobreza e à guerra.",
  mfa:               "O MFA nasceu do Movimento dos Capitães e queria acabar com a ditadura e com a guerra.",
  plano_otelo:       "Otelo Saraiva de Carvalho coordenou as operações a partir do posto de comando da Pontinha.",
  senhas_radio:      "«E Depois do Adeus» e «Grândola, Vila Morena» foram as senhas do 25 de Abril.",
  salgueiro_maia:    "Salgueiro Maia comandou a coluna de Santarém que ocupou o Terreiro do Paço.",
  largo_carmo:       "Marcelo Caetano rendeu-se no Largo do Carmo e a ditadura acabou ao fim do dia.",
  cravos:            "Os cravos vermelhos deram nome à revolução: foi um dia de festa e quase sem violência.",
  presos_libertados: "Depois do 25 de Abril, os presos políticos foram libertados e a PIDE/DGS foi extinta.",
  programa_mfa:      "O programa do MFA tinha três D: Democratizar, Descolonizar e Desenvolver.",
  primeiro_maio:     "Em 1974, o 1.º de Maio foi celebrado em liberdade, com a censura prévia abolida.",
  descolonizacao:    "Entre 1974 e 1975, as colónias africanas tornaram-se países independentes.",
  eleicoes_livres:   "A 25 de abril de 1975, todos os portugueses adultos puderam votar em eleições livres.",
  abril_hoje:        "O 25 de Abril é o Dia da Liberdade: lembrar o passado ajuda a proteger a democracia."
};

// Etiqueta curta («📜 …») mostrada por cima da pergunta; null = sem etiqueta.
export const QUIZ_ARTICLE = {
  estado_novo:       "1926 · 1933",
  vida_quotidiana:   "Deus, Pátria e Família",
  censura:           "Lápis azul",
  oposicao:          "1958 · 1965",
  sem_liberdades:    null,
  pide:              "PIDE/DGS",
  guerra_colonial:   "1961 – 1974",
  emigracao:         null,
  mfa:               "MFA · 1973",
  plano_otelo:       "Pontinha",
  senhas_radio:      "24 de abril",
  salgueiro_maia:    "Terreiro do Paço",
  largo_carmo:       "25 de abril",
  cravos:            "Cravos",
  presos_libertados: null,
  programa_mfa:      "3 D",
  primeiro_maio:     "1.º de Maio de 1974",
  descolonizacao:    "1974 – 1975",
  eleicoes_livres:   "25/4/1975",
  abril_hoje:        "Dia da Liberdade"
};

// ============================================================================
// FÁCIL — 3 opções (1 certa + 2 erradas)
// ============================================================================
export const QUIZ_BY_THEME = {
  estado_novo: [
    Q("Em que ano começou o Estado Novo, a ditadura que durou até 1974?", "Em 1933", ["Em 1910", "Em 1945"], "A Constituição de 1933 deu origem ao Estado Novo, um regime sem eleições livres e sem partidos, que durou até ao 25 de Abril de 1974."),
    Q("Quem governou Portugal durante a maior parte do Estado Novo?", "António de Oliveira Salazar", ["O general Humberto Delgado", "O capitão Salgueiro Maia"], "Salazar foi presidente do Conselho de Ministros durante 36 anos e dirigiu o país como chefe da ditadura até 1968."),
    Q("O que aconteceu em 28 de maio de 1926?", "Um golpe militar acabou com a I República", ["Foram feitas as primeiras eleições livres", "Começou a Guerra Colonial"], "Em 28 de maio de 1926, um golpe militar derrubou a I República e abriu caminho à ditadura que duraria até 1974."),
    Q("Como se chamava o regime que existia em Portugal antes de 1974?", "Estado Novo", ["I República", "Monarquia Constitucional"], "O regime chamava-se Estado Novo. Era uma ditadura: o poder estava concentrado e as pessoas não podiam escolher livremente quem as governava."),
    Q("Quantos partidos políticos podiam existir livremente no Estado Novo?", "Só o do regime, a União Nacional", ["Muitos, tal como hoje", "Dois, que se alternavam no governo"], "Os outros partidos estavam proibidos. Só existia a organização do regime, a União Nacional, por isso as eleições não eram verdadeiramente livres."),
    Q("Antes de 25 de abril de 1974, os portugueses podiam escolher livremente o governo?", "Não, as eleições não eram livres", ["Sim, havia eleições livres todos os anos", "Sim, mas só os homens podiam votar"], "Numa ditadura, quem manda não é escolhido livremente pelo povo. No Estado Novo, a oposição era perseguida e as eleições eram controladas pelo regime."),
    Q("Quanto tempo durou, aproximadamente, a ditadura em Portugal (de 1926 a 1974)?", "Quase 48 anos", ["Cerca de 10 anos", "Cerca de 100 anos"], "Entre o golpe de 28 de maio de 1926 e a revolução de 25 de abril de 1974 passaram quase 48 anos."),
    Q("O que é uma ditadura?", "Um regime onde o poder está concentrado e não há eleições livres", ["Um regime em que todos os cidadãos votam todos os dias em tudo", "Um jogo de tabuleiro onde se disputam cargos políticos"], "Numa ditadura, quem governa não é escolhido em eleições livres e as liberdades das pessoas são limitadas. Numa democracia, o povo escolhe os governantes.")
  ],
  vida_quotidiana: [
    Q("Qual era o lema do regime?", "Deus, Pátria e Família", ["Liberdade, Igualdade e Fraternidade", "Trabalho, Saúde e Educação"], "«Deus, Pátria e Família» resumia os valores que o Estado Novo dizia defender e que queria impor a todos os portugueses."),
    Q("No início dos anos 70, muitas pessoas em Portugal...", "Não sabiam ler nem escrever", ["Tinham computador em casa", "Viajavam de avião todas as semanas"], "Em 1970, mais de um quarto dos portugueses era analfabeto. Muitas crianças deixavam cedo a escola para trabalhar."),
    Q("Porque é que muitas crianças deixavam a escola cedo?", "Porque tinham de trabalhar para ajudar a família", ["Porque as escolas só abriam ao domingo", "Porque a lei proibia as crianças de aprender"], "Havia muita pobreza e as famílias precisavam de todas as ajudas. Por isso, muitas crianças deixavam cedo os estudos para trabalhar no campo ou nas fábricas."),
    Q("Onde viviam muitas famílias portuguesas nessa época?", "No campo, em casas simples e com pouco dinheiro", ["Em grandes prédios de luxo, no centro das cidades", "Em ilhas privadas, com piscina e serviço de mesa"], "Portugal era um país pobre e muito rural. Muitas casas não tinham água canalizada, eletricidade nem casa de banho."),
    Q("O que eram os «três F» associados ao regime?", "Fado, Fátima e Futebol", ["Fábrica, Frio e Fome", "Festa, Feira e Folclore"], "Diz-se que o regime incentivava o Fado, Fátima e o Futebol, como formas de distrair as pessoas dos problemas do país."),
    Q("Que imagens havia muitas vezes nas salas de aula?", "O crucifixo e os retratos dos governantes", ["Mapas do espaço e fotografias de astronautas", "Cartazes a pedir mais liberdade"], "As escolas seguiam as ideias do regime. Era comum ver o crucifixo e os retratos do chefe do governo e do Presidente da República."),
    Q("Como se chamava a organização de jovens criada pelo regime?", "Mocidade Portuguesa", ["Juventude do Mundo", "Clube dos Jovens Cientistas"], "A Mocidade Portuguesa, criada em 1936, tentava ensinar os jovens a seguir as ideias do Estado Novo."),
    Q("A ponte que hoje se chama Ponte 25 de Abril, em Lisboa, tinha antes outro nome. Qual?", "Ponte Salazar", ["Ponte Vasco da Gama", "Ponte da Liberdade"], "Inaugurada em 1966, chamava-se Ponte Salazar. Depois da revolução, o nome mudou para Ponte 25 de Abril.")
  ],
  censura: [
    Q("O que fazia a censura?", "Cortava o que o regime não queria que se soubesse", ["Corrigia os erros dos jornais", "Escolhia as melhores fotografias das revistas"], "A censura lia tudo o que ia ser publicado e cortava o que criticava o regime ou mostrava problemas do país."),
    Q("Que objeto simbolizava a censura?", "O lápis azul", ["A caneta dourada", "O carimbo verde"], "Os censores riscavam com um lápis azul as palavras e as frases que não deviam ser publicadas. Por isso se fala no «lápis azul da censura»."),
    Q("O que acontecia aos jornais antes de serem publicados?", "Eram lidos e cortados pelos censores", ["Eram só contados e arquivados", "Eram traduzidos para francês"], "Antes de ir para a tipografia, cada notícia era lida pelos censores, que cortavam o que não era autorizado."),
    Q("Para que servia a censura?", "Para esconder críticas ao governo e controlar a informação", ["Para proteger as crianças de desenhos animados muito violentos", "Para ajudar os jornais a vender mais exemplares todos os dias"], "O regime queria que as pessoas só soubessem o que lhe convinha. Por isso censurava notícias, livros, filmes, peças de teatro e canções."),
    Q("Antes de 1974, as pessoas podiam criticar o governo em público sem risco?", "Não, podiam ser vigiadas e presas", ["Sim, podiam falar à vontade, sem risco nenhum", "Sim, mas só em dias de feriado nacional"], "Quem criticava o regime arriscava-se a ser vigiado, despedido ou preso pela polícia política."),
    Q("Que tipo de coisas eram censuradas?", "Jornais, livros, canções, filmes e peças de teatro", ["Só os livros de receitas e os manuais de cozinha", "Só as cartas enviadas pelos emigrantes portugueses em França"], "A censura controlava quase tudo o que as pessoas liam, ouviam ou viam, incluindo a rádio e a televisão."),
    Q("O que quer dizer «liberdade de imprensa»?", "Poder publicar notícias sem censura prévia", ["Poder imprimir jornais só às terças", "Poder ler apenas o jornal do governo"], "Com liberdade de imprensa, os jornalistas podem informar sem que alguém corte o que escrevem antes de publicar."),
    Q("Quando foi abolida a censura prévia?", "Logo depois do 25 de Abril de 1974", ["No tempo da I República, em 1910", "Quando começou a Guerra Colonial, em 1961"], "Com a revolução, a censura prévia acabou e voltou a ser possível publicar e dizer o que se pensa.")
  ],
  oposicao: [
    Q("Quem ficou conhecido como o «General sem Medo»?", "Humberto Delgado", ["Salgueiro Maia", "Otelo Saraiva de Carvalho"], "O general Humberto Delgado enfrentou o regime e tornou-se um símbolo da oposição à ditadura."),
    Q("Em que ano Humberto Delgado se candidatou à Presidência da República?", "Em 1958", ["Em 1926", "Em 1974"], "Nas eleições presidenciais de 1958, Delgado concorreu contra o candidato do regime e levou multidões às ruas."),
    Q("Como eram os jornais da oposição?", "Clandestinos, feitos às escondidas", ["Vendidos em todas as bancas", "Pagos pelo governo"], "Como a censura não os deixava circular, os opositores faziam jornais e panfletos em segredo."),
    Q("O que é uma greve?", "Parar de trabalhar para reivindicar direitos", ["Uma festa de rua com música e fogo de artifício", "Um tipo de eleição para escolher os governantes"], "Numa greve, os trabalhadores param de trabalhar para pedir melhores salários ou condições. Antes de 1974, as greves eram proibidas."),
    Q("O que quer dizer «clandestino»?", "Feito em segredo, às escondidas", ["Feito à frente de toda a gente", "Feito pelo governo"], "Era clandestino aquilo que tinha de ser feito em segredo, porque a polícia política perseguia quem se opunha ao regime."),
    Q("Como terminou a vida de Humberto Delgado?", "Foi assassinado em 1965 por agentes da PIDE", ["Foi eleito Presidente da República em 1958", "Morreu tranquilamente em casa, muitos anos depois de 1974"], "Em 1965, Delgado foi morto perto da fronteira de Espanha por agentes da polícia política."),
    Q("Quem eram os «exilados»?", "Pessoas obrigadas a viver fora do país por serem perseguidas", ["Turistas estrangeiros que visitavam Portugal nas férias de verão", "Soldados portugueses em missão de serviço em África"], "Muitos opositores tiveram de sair de Portugal para não serem presos. Voltaram depois do 25 de Abril."),
    Q("Porque era difícil resistir à ditadura?", "Porque quem protestava podia ser preso", ["Porque era proibido ter amigos fora da escola", "Porque ninguém queria mudar de governo"], "A polícia política vigiava os opositores e as prisões estavam cheias de pessoas que só queriam liberdade.")
  ],
  sem_liberdades: [
    Q("Qual destas liberdades não existia antes de 1974?", "Escolher livremente o governo", ["Ir à praia nas férias de verão", "Brincar na rua com os amigos"], "Antes do 25 de Abril, as pessoas não escolhiam livremente quem as governava, porque não havia eleições livres."),
    Q("Podiam existir vários partidos políticos livremente?", "Não, só havia o do regime", ["Sim, tal como acontece hoje em dia", "Sim, mas só quatro de cada vez"], "Os partidos de oposição eram proibidos. Só o partido do regime podia atuar livremente."),
    Q("O que é a liberdade de expressão?", "Poder dizer o que pensamos sem medo", ["Poder falar apenas quando o governo manda", "Poder falar só em casa"], "Com liberdade de expressão, cada pessoa pode dar a sua opinião, mesmo que seja diferente da do governo."),
    Q("As mulheres tinham os mesmos direitos que os homens?", "Não, tinham menos direitos", ["Sim, em tudo", "Sim, mas só no trabalho"], "Antes de 1974, as mulheres tinham menos direitos do que os homens. Por exemplo, o marido era considerado o chefe da família."),
    Q("O que é um sindicato?", "Uma associação que defende os direitos dos trabalhadores", ["Uma loja que vende ferramentas para as fábricas", "Uma empresa que organiza transportes de mercadorias e pessoas"], "Os sindicatos livres eram proibidos no Estado Novo. Só depois de 1974 os trabalhadores puderam organizar-se livremente."),
    Q("O que é a liberdade de reunião?", "Poder juntar-nos com outros para debater ideias", ["Poder faltar às aulas sempre que apetecer", "Poder entrar em qualquer casa sem pedir licença"], "Com liberdade de reunião, as pessoas podem juntar-se em encontros e manifestações pacíficas. Antes de 1974, estava muito limitada."),
    Q("Numa democracia, quem pode votar?", "Todos os cidadãos adultos", ["Só os cidadãos mais ricos do país", "Só os militares e os polícias"], "Em democracia, o voto é universal: todos os cidadãos adultos podem votar, em segredo e sem medo."),
    Q("Qual destas coisas é um direito numa democracia?", "Criticar o governo sem ser preso", ["Escolher sozinho todas as leis", "Não cumprir regras nenhumas"], "Numa democracia, podemos criticar quem governa. É uma das liberdades que o 25 de Abril trouxe.")
  ],
  pide: [
    Q("O que era a PIDE?", "A polícia política do regime", ["A polícia que regula o trânsito", "Um clube de futebol de Lisboa"], "A PIDE era a polícia política do Estado Novo: vigiava, prendia e interrogava quem se opunha ao regime."),
    Q("O que fazia a PIDE?", "Vigiava, prendia e interrogava opositores", ["Ensinava as crianças a ler e a escrever", "Tratava de entregar as cartas e os jornais"], "A PIDE tinha agentes e informadores por todo o país, e muitos presos políticos eram maltratados nos interrogatórios."),
    Q("Que nome passou a ter a PIDE a partir de 1969?", "DGS (Direção-Geral de Segurança)", ["GNR (Guarda Nacional Republicana)", "PSP (Polícia de Segurança Pública)"], "Em 1969, a PIDE mudou de nome para DGS, mas continuou a fazer o mesmo trabalho."),
    Q("Em que país ficava o campo de prisioneiros do Tarrafal?", "Em Cabo Verde", ["Em Angola", "Na Madeira"], "O campo do Tarrafal, na ilha de Santiago, foi aberto em 1936 para prender opositores do regime."),
    Q("Que fortaleza junto ao mar serviu de prisão política?", "A de Peniche", ["A de Sagres", "O Castelo de São Jorge"], "A Fortaleza de Peniche foi uma das principais prisões políticas do regime. Hoje é um museu."),
    Q("O que é um «informador»?", "Quem contava à polícia o que os outros diziam", ["Quem lia as notícias na rádio de manhã até à noite", "Quem vendia jornais à porta dos cafés"], "A PIDE tinha muitos informadores, por isso as pessoas tinham medo de falar de política, até com vizinhos."),
    Q("Porque tinham medo muitas pessoas?", "Porque a PIDE podia prender sem avisar", ["Porque as ruas não tinham iluminação", "Porque faltava a eletricidade"], "Quem era preso pela polícia política podia ficar muito tempo sem julgamento e sem ver a família."),
    Q("O que aconteceu à PIDE/DGS depois do 25 de Abril?", "Foi extinta", ["Passou a organizar as eleições", "Ficou a vigiar a democracia"], "Pouco depois da revolução, a polícia política foi extinta, e os seus arquivos hoje podem ser consultados.")
  ],
  guerra_colonial: [
    Q("Entre que anos decorreu a Guerra Colonial?", "De 1961 a 1974", ["De 1914 a 1918", "De 1939 a 1945"], "A Guerra Colonial começou em 1961, em Angola, e só terminou com a revolução de 1974."),
    Q("Em que territórios africanos combateu Portugal?", "Angola, Guiné e Moçambique", ["Marrocos, Egito e Tunísia", "Brasil, Índia e Timor"], "A guerra decorreu em três frentes, em Angola, na Guiné e em Moçambique, que eram então colónias portuguesas."),
    Q("O que queriam os movimentos de libertação das colónias?", "A independência dos seus países", ["Continuar a ser colónias para sempre", "Mudar a capital de Portugal"], "Os povos das colónias queriam governar-se a si próprios e tornar-se países independentes."),
    Q("O que era o serviço militar obrigatório?", "Os rapazes tinham de ir para a tropa", ["Só os voluntários é que iam para a tropa", "Só as raparigas é que iam para a tropa"], "Os rapazes eram chamados para a tropa e muitos eram enviados para a guerra em África durante dois anos ou mais."),
    Q("Como se sentiam muitas famílias com filhos na guerra?", "Com saudades e medo por eles", ["Muito felizes e descansadas", "Indiferentes"], "Muitas famílias esperavam notícias com angústia. Alguns soldados morreram e outros ficaram feridos."),
    Q("Porque ajudou a guerra a provocar a revolução?", "Porque os militares estavam cansados da guerra", ["Porque Portugal tinha ganho a guerra em poucas semanas", "Porque a guerra tinha terminado há muitos anos, em 1960"], "A guerra durava há 13 anos e não tinha solução militar. Os próprios militares foram quem decidiu mudar o país."),
    Q("Em que continente ficavam as colónias onde decorreu a guerra?", "Em África", ["Na Ásia", "Na América do Sul"], "Angola, a Guiné e Moçambique ficam em África. Portugal tinha ali colónias havia séculos."),
    Q("O que significa «colónia»?", "Território governado por outro país", ["Uma casa de férias de luxo junto à praia", "Uma ilha deserta, sem habitantes"], "Uma colónia é um território que é governado por outro país e cujos habitantes não decidem sozinhos o seu futuro.")
  ],
  emigracao: [
    Q("O que é emigrar?", "Sair do país para viver noutro", ["Voltar a viver na terra de origem", "Mudar de casa na mesma rua"], "Quem emigra deixa o seu país para viver e trabalhar noutro. Nos anos 60, saíram centenas de milhares de portugueses."),
    Q("Para que país emigraram muitos portugueses nos anos 60?", "Para França", ["Para o Japão", "Para a Rússia"], "A França precisava de trabalhadores e recebeu centenas de milhares de portugueses nos anos 60 e 70."),
    Q("Porque emigravam tantos portugueses?", "Para fugir à pobreza e à guerra", ["Para aprender a esquiar", "Porque o governo obrigava todos"], "Em Portugal havia pouco trabalho e salários baixos. Muitos jovens emigravam também para evitar a guerra colonial."),
    Q("O que significava ir «a salto»?", "Passar a fronteira às escondidas", ["Saltar à corda durante o recreio", "Viajar de avião em classe executiva"], "Muitos emigrantes não tinham passaporte e atravessavam a fronteira escondidos, muitas vezes a pé e de noite."),
    Q("Onde viviam muitos emigrantes portugueses em França?", "Em bairros de lata, os «bidonvilles»", ["Em grandes palácios perto de Paris", "Em castelos medievais no campo francês"], "Muitos viveram em bairros de lata, com poucas condições, nos arredores de Paris."),
    Q("O que mandavam os emigrantes para a família?", "Dinheiro e cartas", ["Pedras do caminho", "Nada, nunca escreviam"], "As remessas dos emigrantes ajudaram muitas famílias portuguesas e a economia do país."),
    Q("Que língua tinham de aprender os emigrantes em França?", "O francês", ["O japonês", "O russo"], "Para trabalhar e viver em França, os emigrantes tinham de aprender francês."),
    Q("Hoje ainda há portugueses a emigrar?", "Sim, muitos vivem e trabalham noutros países", ["Não, depois de 1974 nunca mais ninguém emigrou", "Só as pessoas que têm mais de cem anos de idade"], "Hoje, os portugueses emigram por escolha ou para procurar trabalho, mas já ninguém precisa de fugir à ditadura.")
  ],
  mfa: [
    Q("O que significa MFA?", "Movimento das Forças Armadas", ["Movimento Feliz dos Alunos", "Museu das Forças Aéreas"], "O MFA reuniu militares de várias armas e patentes, determinados a acabar com a ditadura e com a guerra."),
    Q("Quem fez a revolução do 25 de Abril?", "Militares, apoiados pelo povo", ["Só os políticos do governo", "Estrangeiros que chegaram de barco"], "Foram militares do MFA que derrubaram o regime, mas o povo saiu à rua para os apoiar."),
    Q("Que posto militar tinham muitos dos líderes do movimento?", "Capitão", ["General", "Marinheiro"], "O movimento nasceu entre oficiais intermédios, sobretudo capitães, e por isso se fala nos «capitães de Abril»."),
    Q("O que queria o MFA?", "Acabar com a ditadura e com a guerra", ["Dar mais poderes ao governo", "Continuar a guerra por mais anos"], "O MFA queria democracia, o fim da guerra colonial e uma vida melhor para os portugueses."),
    Q("Que livro do general Spínola, publicado em 1974, criticava a guerra?", "Portugal e o Futuro", ["Os Lusíadas", "Mensagem"], "O livro «Portugal e o Futuro», de fevereiro de 1974, defendia uma solução política para a guerra e abalou o regime."),
    Q("Como foi preparada a revolução?", "Em segredo", ["Na televisão, em direto", "Com cartazes pela cidade"], "Os militares reuniram-se escondidos, para a PIDE não descobrir o plano."),
    Q("Porque estavam os capitães descontentes?", "Porque a guerra durava há anos, sem fim à vista", ["Porque queriam ser cantores e artistas de televisão", "Porque tinham poucos dias de férias por ano"], "Passavam anos em África, longe das famílias, numa guerra que não via fim."),
    Q("Em que dia foi a revolução?", "25 de abril de 1974", ["25 de dezembro de 1973", "1 de maio de 1975"], "A revolução começou na madrugada de 25 de abril de 1974, uma quinta-feira, e acabou com a ditadura ao fim do dia.")
  ],
  plano_otelo: [
    Q("Quem coordenou as operações militares do 25 de Abril?", "Otelo Saraiva de Carvalho", ["O general Humberto Delgado", "O ditador António Salazar"], "Otelo Saraiva de Carvalho planeou e coordenou a revolução a partir do posto de comando."),
    Q("Onde ficava o posto de comando do MFA?", "No quartel da Pontinha, em Lisboa", ["No Castelo de Guimarães, no Minho", "Na Torre de Belém, junto ao Tejo"], "O posto de comando ficou no quartel da Pontinha, de onde Otelo dava as ordens e recebia notícias."),
    Q("Qual era o principal objetivo do plano?", "Derrubar a ditadura com o mínimo de violência", ["Prender todos os cantores e todos os artistas do país", "Fechar todas as escolas até ao fim do ano"], "O plano queria acabar com o regime de forma rápida e com o mínimo de violência."),
    Q("Porque era importante controlar a rádio e a televisão?", "Para avisar o povo e dar os comunicados", ["Para passar mais telenovelas aos domingos", "Para fechar os estúdios para sempre"], "Os militares precisavam de comunicar com o país e de evitar que o regime desse a sua versão dos acontecimentos."),
    Q("Que locais os militares ocuparam?", "Rádios, aeroporto, ministérios e quartéis", ["Só parques, jardins e miradouros das cidades", "Só estádios de futebol e pavilhões desportivos"], "Ocupar estes locais permitia controlar as comunicações e o poder."),
    Q("Que palavra descreve melhor o plano da revolução?", "Secreto", ["Público", "Barulhento"], "Se o regime soubesse do plano, poderia reprimir a revolta. Por isso tudo foi preparado em segredo."),
    Q("Em que cidade se concentrou a maior parte da ação?", "Em Lisboa", ["Em Faro", "Em Braga"], "Lisboa era a capital e a sede do governo. Houve ações noutras zonas, mas foi aqui que se decidiu a revolução."),
    Q("O que é um posto de comando?", "O local onde se coordenam as operações", ["Uma loja onde os militares compram fardas", "Um posto de abastecimento de combustível"], "O posto de comando é o centro de onde se dão ordens e se recebe informação durante uma operação.")
  ],
  senhas_radio: [
    Q("Que canção foi a primeira senha, às 22h55 de 24 de abril?", "«E Depois do Adeus»", ["«Grândola, Vila Morena»", "«A Portuguesa»"], "«E Depois do Adeus», de Paulo de Carvalho, avisou os militares de que a operação ia começar."),
    Q("Que canção foi a segunda senha, depois da meia-noite?", "«Grândola, Vila Morena»", ["«E Depois do Adeus»", "«Fado Português»"], "«Grândola, Vila Morena», de Zeca Afonso, foi o sinal para as tropas avançarem."),
    Q("Quem escreveu e cantou «Grândola, Vila Morena»?", "Zeca Afonso (José Afonso)", ["Amália Rodrigues, a rainha do fado", "Paulo de Carvalho, o cantor da Eurovisão"], "José Afonso, conhecido por Zeca Afonso, era um cantor de intervenção, muito ligado à luta pela liberdade."),
    Q("Quem cantou «E Depois do Adeus»?", "Paulo de Carvalho", ["Zeca Afonso", "Carlos do Carmo"], "Paulo de Carvalho cantou esta canção na Eurovisão de 1974."),
    Q("Para que serviam as senhas?", "Para avisar os militares de que ia começar", ["Para abrir os cofres dos bancos", "Para anunciar o fim de um programa de rádio"], "A rádio passou as canções como sinais combinados, que só quem estava no segredo percebia."),
    Q("De que vila alentejana fala a canção «Grândola, Vila Morena»?", "Grândola", ["Évora", "Beja"], "Grândola fica no Alentejo e a canção fala de fraternidade e de um povo que é quem mais ordena."),
    Q("Porque foram escolhidas canções para dar o sinal?", "Para a mensagem passar despercebida", ["Porque eram as canções mais antigas do mundo", "Porque eram as canções mais curtas da rádio"], "Ouvir uma canção na rádio parecia normal, por isso a PIDE não suspeitou."),
    Q("Em que noite foram passadas as senhas?", "Na noite de 24 para 25 de abril", ["Na noite de 31 de dezembro", "Na noite de 1 de maio"], "As senhas foram passadas na noite de 24 para 25 de abril de 1974.")
  ],
  salgueiro_maia: [
    Q("Qual era o posto de Salgueiro Maia?", "Capitão", ["General", "Cabo"], "Fernando Salgueiro Maia era capitão e comandou uma das ações mais importantes do 25 de Abril."),
    Q("De que cidade partiu a coluna de Salgueiro Maia?", "De Santarém", ["De Coimbra", "De Setúbal"], "A coluna saiu da Escola Prática de Cavalaria, em Santarém, e seguiu para Lisboa durante a noite."),
    Q("Para onde seguiu a coluna?", "Para o Terreiro do Paço, em Lisboa", ["Para a Torre dos Clérigos", "Para o Castelo de Guimarães"], "O Terreiro do Paço tinha os ministérios, por isso ocupá-lo era decisivo."),
    Q("O que fizeram os soldados mandados contra Maia?", "Recusaram-se a disparar e juntaram-se a ele", ["Dispararam sobre a coluna sem parar, durante horas", "Fugiram para França no primeiro comboio"], "Quando lhes mandaram disparar, vários soldados recusaram-se e aderiram à revolução."),
    Q("O que ocupou a coluna no Terreiro do Paço?", "Ministérios e edifícios do governo", ["Um grande museu de arte antiga e moderna", "Um estádio de futebol da capital"], "Os ministérios eram o centro do poder, e os militares do MFA tomaram-nos sem grande violência."),
    Q("Que outro nome tem o Terreiro do Paço?", "Praça do Comércio", ["Praça da República", "Praça da Alegria"], "O Terreiro do Paço também se chama Praça do Comércio e fica junto ao rio Tejo, em Lisboa."),
    Q("Como ficou conhecido Salgueiro Maia?", "Como um dos heróis do 25 de Abril", ["Como Presidente da República", "Como treinador de futebol"], "Salgueiro Maia é lembrado pela coragem e por ter evitado derramamento de sangue."),
    Q("Que tipo de veículos levou a coluna?", "Viaturas militares e blindados", ["Aviões de papel e balões de ar quente", "Comboios e elétricos da cidade"], "A coluna levava viaturas e blindados, mas as ordens eram para evitar a violência.")
  ],
  largo_carmo: [
    Q("Onde se refugiou Marcelo Caetano?", "No quartel do Carmo", ["No Palácio de Belém", "No aeroporto"], "Caetano refugiou-se no quartel da GNR, no Largo do Carmo, em Lisboa."),
    Q("A quem entregou Caetano o poder?", "Ao general António de Spínola", ["Ao antigo ditador António Salazar", "Ao futuro primeiro-ministro Mário Soares"], "Caetano pediu para entregar o poder a Spínola, para que «não caísse na rua»."),
    Q("Em que cidade fica o Largo do Carmo?", "Em Lisboa", ["No Porto", "Em Faro"], "O Largo do Carmo fica no centro de Lisboa, e foi aqui que a ditadura chegou ao fim."),
    Q("O que se passou no Largo do Carmo?", "Marcelo Caetano rendeu-se", ["Começou a Guerra Colonial", "Foi inaugurada uma ponte"], "Ao fim do dia 25 de abril, Caetano rendeu-se e o regime caiu."),
    Q("Para onde foi exilado Marcelo Caetano?", "Primeiro para a Madeira e depois para o Brasil", ["Para a Rússia, onde viveu até ao fim da vida", "Para o Japão, onde se tornou professor universitário"], "Depois de se render, Caetano foi para a Madeira e dali seguiu para o Brasil, onde viveu até morrer."),
    Q("Quem esperava junto ao quartel?", "Muito povo, à espera da rendição", ["Ninguém, estava tudo deserto", "Um circo"], "Uma multidão juntou-se no Largo do Carmo para apoiar os militares."),
    Q("Em que veículo saiu Caetano do quartel?", "Num carro blindado", ["Numa carruagem", "Num elétrico"], "Caetano saiu protegido por um blindado, para evitar problemas com a multidão."),
    Q("Como terminou o dia 25 de abril?", "Com o fim da ditadura", ["Com mais um ano de ditadura", "Com o regresso de Salazar"], "Foi um dia de festa e de esperança: a ditadura tinha acabado quase sem tiros.")
  ],
  cravos: [
    Q("De que cor eram os cravos que se tornaram símbolo da revolução?", "Vermelhos", ["Azuis", "Verdes"], "Os cravos vermelhos tornaram-se o símbolo do 25 de Abril."),
    Q("Quem ofereceu cravos aos soldados?", "Celeste Caeiro", ["Zeca Afonso", "Amália Rodrigues"], "Celeste Caeiro trabalhava num restaurante em Lisboa e ofereceu cravos aos soldados."),
    Q("Onde puseram os soldados os cravos?", "Nos canos das espingardas", ["Nos chapéus", "Nos bolsos das calças"], "Os soldados puseram cravos nas espingardas. A imagem correu o mundo: uma revolução feita com flores."),
    Q("Porque se chama «Revolução dos Cravos»?", "Por causa das flores oferecidas aos soldados", ["Porque os soldados eram jardineiros", "Porque se plantaram cravos no Terreiro do Paço"], "As flores mostraram que o povo apoiava os militares e que a revolução era pacífica."),
    Q("O que simboliza o cravo vermelho?", "A liberdade e a paz", ["A guerra e a violência", "O dinheiro e a riqueza"], "O cravo é hoje o símbolo da liberdade conquistada em 25 de abril de 1974."),
    Q("Como reagiu o povo à revolução?", "Saiu à rua a apoiar os militares", ["Ficou escondido em casa, com medo", "Fugiu do país no primeiro dia"], "Apesar do pedido para ficarem em casa, milhares de pessoas saíram à rua para apoiar os militares."),
    Q("Em que dia e mês se celebra a revolução?", "25 de abril", ["25 de dezembro", "1 de janeiro"], "O 25 de Abril é feriado nacional e chama-se Dia da Liberdade."),
    Q("A revolução foi violenta?", "Foi quase sem violência", ["Foi uma longa guerra civil", "Houve milhares de mortos"], "Foi uma revolução quase pacífica. Houve poucas vítimas, sobretudo por disparos de agentes da PIDE.")
  ],
  presos_libertados: [
    Q("O que aconteceu aos presos políticos depois do 25 de Abril?", "Foram libertados", ["Ficaram presos mais um ano", "Foram enviados para o Tarrafal"], "Nos dias seguintes à revolução, os presos políticos foram libertados e acolhidos com alegria."),
    Q("Que fortaleza perto de Lisboa foi prisão política?", "Caxias", ["Palácio de Queluz", "Torre de Belém"], "A Fortaleza de Caxias foi uma prisão política do regime."),
    Q("Em que localidade ficava a fortaleza-prisão que hoje é museu?", "Peniche", ["Sintra", "Aveiro"], "A Fortaleza de Peniche foi prisão política e hoje alberga um museu sobre a resistência."),
    Q("Quem regressou do exílio em abril de 1974?", "Mário Soares e Álvaro Cunhal", ["Salazar e Caetano", "Eusébio e Amália"], "Mário Soares e Álvaro Cunhal, dois dos principais opositores, regressaram a Portugal pouco depois do 25 de Abril."),
    Q("Que polícia foi extinta?", "A PIDE/DGS", ["A PSP", "A GNR"], "A polícia política foi extinta e os seus arquivos hoje são consultáveis."),
    Q("Que sentimento dominava nas ruas?", "Alegria", ["Tristeza", "Raiva"], "As pessoas cantavam, abraçavam-se e festejavam a liberdade."),
    Q("O que é um preso político?", "Alguém preso por criticar o governo", ["Alguém que rouba em lojas e supermercados", "Um político que visita as prisões"], "Os presos políticos não tinham cometido crimes comuns: estavam presos por defenderem a liberdade."),
    Q("O que é o exílio?", "Viver fora do país por ser perseguido", ["Uma viagem de férias ao estrangeiro", "Um tipo de prisão com muralhas altas"], "No exílio, as pessoas vivem longe da sua terra por não poderem lá viver em segurança.")
  ],
  programa_mfa: [
    Q("Quais eram os três D do programa do MFA?", "Democratizar, Descolonizar e Desenvolver", ["Dançar, Desenhar, Dormir e Descansar muito", "Desistir, Dividir e Desligar tudo"], "Os três D resumiam o programa: dar democracia ao país, acabar com a guerra colonial e melhorar a vida de todos."),
    Q("O que quer dizer «democratizar»?", "Dar ao povo liberdade e direito de votar", ["Fechar o parlamento e acabar com as eleições", "Proibir todos os partidos políticos do país"], "Democratizar é construir um país onde o povo escolhe quem o governa e tem direitos e liberdades."),
    Q("O que quer dizer «descolonizar»?", "Dar independência às colónias", ["Construir mais colónias", "Ocupar novos territórios"], "Descolonizar é permitir que as colónias se tornem países independentes."),
    Q("O que quer dizer «desenvolver»?", "Melhorar a vida das pessoas e do país", ["Cortar todas as estradas e todas as pontes", "Fechar as escolas e os hospitais"], "Desenvolver é criar escolas, hospitais, empregos e melhores condições de vida."),
    Q("Quem liderou a Junta de Salvação Nacional?", "O general António de Spínola", ["Otelo Saraiva de Carvalho", "Humberto Delgado"], "A Junta de Salvação Nacional governou provisoriamente depois do 25 de Abril, chefiada por Spínola."),
    Q("Que objetivo tinha a Junta de Salvação Nacional?", "Governar até haver eleições livres", ["Governar para sempre, sem nunca haver eleições", "Reabrir a PIDE e a censura"], "A Junta devia assegurar a transição até haver eleições livres."),
    Q("O que prometeu o MFA aos portugueses?", "Eleições livres", ["Mais censura", "Mais guerra"], "O MFA prometeu eleições livres e cumpriu: em 1975 e 1976 houve eleições."),
    Q("Quem escreveu o programa dos três D?", "O MFA", ["A PIDE", "Os censores"], "O programa foi escrito por militares do MFA, antes da revolução.")
  ],
  primeiro_maio: [
    Q("O que se celebra no 1.º de Maio?", "O Dia do Trabalhador", ["O Dia da Árvore", "O Natal"], "O 1.º de Maio é o Dia do Trabalhador, em que se lembram os direitos de quem trabalha."),
    Q("Quantas pessoas desfilaram em Lisboa no 1.º de Maio de 1974?", "Centenas de milhares", ["Só dez pessoas", "Ninguém, estava proibido"], "Foi uma enorme manifestação de alegria e de liberdade, a primeira em décadas."),
    Q("O que é a liberdade de associação?", "Poder criar partidos, sindicatos e clubes", ["Poder entrar em qualquer casa sem licença", "Poder faltar ao trabalho sempre que se quer"], "Depois do 25 de Abril, as pessoas puderam criar associações, partidos e sindicatos."),
    Q("O que mudou depois do 25 de Abril?", "Passou a haver partidos livres", ["Os partidos foram proibidos", "Só havia um partido"], "Os partidos que estavam proibidos passaram a poder atuar à luz do dia."),
    Q("O que aconteceu à censura prévia?", "Foi abolida", ["Foi reforçada", "Foi alargada"], "A censura prévia acabou, e a imprensa passou a ser livre."),
    Q("O que é um partido político?", "Um grupo de pessoas com ideias para governar o país", ["Uma festa de aniversário com muitos convidados", "Um clube desportivo de bairro, com equipa de futebol"], "Os partidos apresentam ideias e candidatos, e os cidadãos escolhem nas eleições."),
    Q("Depois de 1974, o que passou a ser permitido aos trabalhadores?", "Fazer greve", ["Ser presos por protestar", "Nunca descansar"], "O direito à greve foi reconhecido, e hoje é um direito fundamental."),
    Q("Como se celebrou o 1.º de Maio de 1974?", "Com manifestações e festa nas ruas", ["Com recolher obrigatório", "Com silêncio em todo o país"], "As ruas encheram-se de bandeiras, cravos e cantares de liberdade.")
  ],
  descolonizacao: [
    Q("Qual destes países se tornou independente em 11 de novembro de 1975?", "Angola", ["Moçambique", "Cabo Verde"], "Angola proclamou a independência em 11 de novembro de 1975."),
    Q("Qual destes países é uma antiga colónia portuguesa?", "Cabo Verde", ["Marrocos", "Egito"], "Cabo Verde foi colónia portuguesa e tornou-se independente em 1975."),
    Q("Como se chamam os portugueses que regressaram das colónias?", "Retornados", ["Exilados", "Emigrantes"], "Centenas de milhares de pessoas voltaram a Portugal depois das independências."),
    Q("Que língua oficial mantêm essas antigas colónias?", "O português", ["O francês", "O japonês"], "Estes países mantiveram o português como língua oficial."),
    Q("Qual destes países ficou independente em 1975?", "São Tomé e Príncipe", ["Portugal continental", "Espanha"], "São Tomé e Príncipe tornou-se independente a 12 de julho de 1975."),
    Q("Porque era a descolonização um dos três D?", "Porque a guerra e o domínio colonial tinham de acabar", ["Porque ninguém queria ficar com as colónias africanas", "Porque as colónias eram apenas pequenas ilhas"], "O MFA queria acabar com a guerra e permitir que os povos decidissem o seu futuro."),
    Q("O que significa «independência»?", "Um país governar-se a si próprio", ["Um país ser governado por outro", "Um país não ter governo"], "Independência é a liberdade de um povo decidir o seu futuro."),
    Q("Que país africano foi o primeiro a ver reconhecida a independência por Portugal, em 1974?", "A Guiné-Bissau", ["Angola", "Moçambique"], "Portugal reconheceu a independência da Guiné-Bissau em setembro de 1974.")
  ],
  eleicoes_livres: [
    Q("Quando foram as primeiras eleições livres depois da revolução?", "A 25 de abril de 1975", ["A 25 de abril de 1974", "A 1 de maio de 1976"], "Um ano depois da revolução, os portugueses votaram livremente para escolher a Assembleia Constituinte."),
    Q("Para que serviam essas eleições?", "Para escolher a Assembleia Constituinte", ["Para escolher o campeão de futebol", "Para escolher um novo rei"], "A Assembleia Constituinte tinha de escrever a nova Constituição do país."),
    Q("O que é uma Constituição?", "A lei mais importante do país", ["Um livro de receitas tradicionais portuguesas", "Um jornal publicado todas as manhãs"], "A Constituição define os direitos dos cidadãos e a organização do Estado."),
    Q("Em que ano foi aprovada a Constituição da democracia?", "Em 1976", ["Em 1933", "Em 1900"], "A Constituição de 1976 garante direitos e liberdades que antes não existiam."),
    Q("Quem passou a poder votar?", "Todos os cidadãos adultos, homens e mulheres", ["Só os homens mais ricos e mais instruídos do país", "Só os militares e os polícias"], "Depois do 25 de Abril, todos os cidadãos adultos passaram a poder votar."),
    Q("Quantos eleitores votaram em 1975?", "Mais de nove em cada dez", ["Menos de metade", "Só um em cada dez"], "A participação foi enorme: mais de 90% dos eleitores votaram."),
    Q("Como se vota numa democracia?", "Em segredo, numa urna", ["Em voz alta, ao microfone", "Pela rádio"], "O voto é secreto, para que cada pessoa possa escolher sem medo."),
    Q("Porque são importantes as eleições livres?", "Porque as pessoas escolhem quem as governa", ["Porque é sempre o mesmo partido a ganhar, sem surpresas", "Porque os votos podem ser comprados"], "Sem eleições livres, não há democracia.")
  ],
  abril_hoje: [
    Q("Como se chama o 25 de Abril?", "Dia da Liberdade", ["Dia do Trabalhador", "Dia do Pai"], "O 25 de Abril é o Dia da Liberdade, em que se celebra a revolução de 1974."),
    Q("O 25 de Abril é feriado?", "Sim, feriado nacional", ["Não, é um dia normal", "Só em Lisboa"], "É feriado em todo o país, e há desfiles, concertos e cerimónias."),
    Q("Que símbolo se usa nas celebrações?", "O cravo vermelho", ["A rosa branca", "A tulipa amarela"], "O cravo vermelho recorda a revolução pacífica de 1974."),
    Q("Que ponte de Lisboa tem o nome da revolução?", "Ponte 25 de Abril", ["Ponte Vasco da Gama", "Ponte D. Luís"], "A ponte sobre o Tejo passou a chamar-se 25 de Abril depois da revolução."),
    Q("Em que ano entrou Portugal na CEE, hoje União Europeia?", "Em 1986", ["Em 1974", "Em 2002"], "Portugal entrou na Comunidade Económica Europeia em 1 de janeiro de 1986."),
    Q("Que direito temos hoje que não havia antes?", "Votar em eleições livres", ["Ser vigiado pela polícia política", "Ter censura nos jornais"], "Hoje podemos votar, criticar, associar-nos e escolher livremente."),
    Q("Porque lembramos o 25 de Abril?", "Para valorizar a liberdade e a democracia", ["Para esquecer o passado e não falar mais dele", "Para voltar a ter uma ditadura em Portugal"], "Lembrar ajuda a proteger a liberdade e a não repetir os erros do passado."),
    Q("Que frase se ouve nas celebrações?", "«25 de Abril sempre!»", ["«Viva a censura!»", "«Salazar para sempre!»"], "A frase «25 de Abril sempre!» lembra que a liberdade se defende todos os dias.")
  ]
};

// ============================================================================
// DIFÍCIL e EXTREMO — 4 opções (1 certa + 3 erradas), mais datas, nomes e conceitos
// ============================================================================
export const QUIZ_BY_THEME_AVANCADO = {
  estado_novo: [
    Q("Que organização política foi, na prática, o partido único do Estado Novo?", "A União Nacional", ["O Partido Republicano", "O Partido Socialista", "A Aliança Democrática"], "A União Nacional, criada em 1930, era a organização do regime. Não admitia verdadeira concorrência política."),
    Q("Em que ano Salazar deixou a chefia do governo?", "Em 1968", ["Em 1958", "Em 1961", "Em 1974"], "Em 1968, Salazar ficou incapacitado depois de uma queda e foi substituído por Marcelo Caetano. Morreu em 1970."),
    Q("Quem sucedeu a Salazar como chefe do governo?", "Marcelo Caetano", ["Américo Tomás", "Craveiro Lopes", "António de Spínola"], "Marcelo Caetano governou de 1968 até ao 25 de Abril de 1974, tentando manter o regime com pequenas mudanças."),
    Q("O que foi o plebiscito de 1933?", "A votação que aprovou a Constituição do Estado Novo", ["A votação que proclamou a República em Portugal", "A eleição de Salazar para Presidente da República", "O referendo que pôs fim à Guerra Colonial"], "Nesse plebiscito, os votos de quem não participou foram contados como favoráveis, o que dá bem a ideia de como o regime controlava as votações."),
    Q("Que cargo ocupou Salazar durante o Estado Novo?", "Presidente do Conselho de Ministros", ["Presidente da República", "Presidente da Assembleia Nacional", "Ministro da Guerra"], "O Presidente da República era outra figura (como Óscar Carmona e Américo Tomás); o verdadeiro poder estava com Salazar, que dirigia o governo."),
    Q("Quantos anos durou o Estado Novo (de 1933 a 1974)?", "41 anos", ["10 anos", "20 anos", "60 anos"], "Entre a aprovação da Constituição, em 1933, e o 25 de Abril de 1974, passaram 41 anos.")
  ],
  vida_quotidiana: [
    Q("A que correspondiam os «três F» do regime?", "Fado, Fátima e Futebol", ["Fábrica, Fome e Frio", "Família, Fé e Fábrica", "Festa, Feira e Foguete"], "Era uma forma de resumir as atividades que o regime incentivava, mantendo o povo distraído e longe da política."),
    Q("Que organização de juventude foi criada pelo regime em 1936?", "A Mocidade Portuguesa", ["A Juventude Comunista", "A Legião Estudantil", "A Cruz Vermelha Jovem"], "A Mocidade Portuguesa era uma organização obrigatória para muitos jovens, onde se ensinavam os valores do regime."),
    Q("Que meio de comunicação passou a emitir regularmente em Portugal em 1957?", "A televisão (RTP)", ["A internet", "O telemóvel", "O computador pessoal"], "A RTP começou a emitir em 1957. Mas a televisão era controlada pelo regime, tal como a rádio e a imprensa."),
    Q("Qual era, aproximadamente, a taxa de analfabetismo em Portugal em 1970?", "Cerca de 26%", ["Cerca de 2%", "Cerca de 50%", "Cerca de 75%"], "Mais de um quarto da população não sabia ler nem escrever, uma percentagem muito acima da dos países da Europa Ocidental."),
    Q("Que ponte inaugurada em 1966 tinha o nome do chefe do governo?", "A Ponte Salazar", ["A Ponte Vasco da Gama", "A Ponte da Arrábida", "A Ponte D. Maria Pia"], "A Ponte Salazar passou a chamar-se Ponte 25 de Abril depois da revolução."),
    Q("Em 1964, a escolaridade obrigatória foi alargada para quantos anos?", "6 anos", ["4 anos", "9 anos", "12 anos"], "Só em 1964 a escolaridade obrigatória passou de 4 para 6 anos, e a escola continuou a ser inacessível a muitas crianças pobres.")
  ],
  censura: [
    Q("Como se chamava a censura feita antes de os textos serem publicados?", "Exame prévio", ["Revisão posterior", "Auditoria pública", "Controlo remoto"], "O exame prévio era feito antes da publicação. Mudou de nome em 1972, mas continuou a cortar tudo o que o regime não queria."),
    Q("O que queria dizer «Visado pela Comissão de Censura» num jornal?", "Que o texto tinha sido lido e aprovado pela censura", ["Que o texto estava totalmente proibido pelo regime", "Que o jornal tinha sido multado pela censura", "Que o texto era uma tradução de outra língua"], "Era a marca de que os censores tinham lido o texto e autorizado a sua publicação, muitas vezes depois de cortes."),
    Q("O que podia acontecer a uma canção que criticasse o regime?", "Ser proibida na rádio ou ter versos cortados", ["Ganhar um prémio nacional de música e poesia", "Ser traduzida para inglês e vendida no estrangeiro", "Ser ensinada nas escolas como exemplo de poesia"], "Muitos cantores de intervenção, como Zeca Afonso, tinham canções proibidas ou limitadas."),
    Q("O que é «propaganda»?", "Informação que promove ideias de forma parcial", ["Um tipo de lei aprovada pelo parlamento em cada ano", "Um tipo de eleição realizada nas escolas do país", "Um jornal desportivo publicado todos os domingos"], "O regime usava a propaganda para mostrar uma imagem positiva de si próprio, enquanto a censura escondia os problemas."),
    Q("Que direito fundamental violava a censura?", "A liberdade de expressão", ["O direito à saúde", "O direito ao voto das mulheres", "O direito à habitação"], "A liberdade de expressão permite a cada pessoa dizer, escrever e publicar o que pensa, sem censura prévia."),
    Q("O que garante hoje a Constituição portuguesa em relação à imprensa?", "Liberdade de imprensa, sem censura", ["Controlo prévio do governo sobre os jornais", "Proibição de críticas ao governo", "Só jornais pertencentes ao Estado"], "A Constituição de 1976 consagra a liberdade de expressão e de imprensa e proíbe a censura.")
  ],
  oposicao: [
    Q("Quem foi o candidato da oposição à Presidência da República em 1958?", "Humberto Delgado", ["Mário Soares", "Álvaro Cunhal", "Salgueiro Maia"], "Delgado enfrentou o candidato do regime e despertou grande entusiasmo popular."),
    Q("Quem venceu oficialmente essas eleições?", "Américo Tomás", ["Humberto Delgado", "Craveiro Lopes", "Marcelo Caetano"], "A vitória do candidato do regime foi muito contestada, e depois destas eleições o regime mudou as regras para impedir novas surpresas."),
    Q("Onde foi assassinado Humberto Delgado em 1965?", "Perto de Badajoz, em Espanha", ["No Rossio, em pleno centro de Lisboa", "No campo do Tarrafal, em Cabo Verde", "No Brasil, durante o exílio"], "Agentes da PIDE atraíram-no a uma armadilha junto à fronteira e mataram-no."),
    Q("Como se chamou o movimento de oposição formado em 1945?", "Movimento de Unidade Democrática (MUD)", ["União Geral de Trabalhadores (UGT)", "Partido Social Democrata (PSD)", "Centro Democrático e Social (CDS)"], "O MUD reuniu opositores ao regime, mas foi ilegalizado pouco depois."),
    Q("Em que ano foi fundado o Partido Socialista?", "Em 1973", ["Em 1945", "Em 1958", "Em 1975"], "O PS foi fundado em 1973, na Alemanha, por opositores portugueses exilados e outros, entre os quais Mário Soares."),
    Q("Que partido clandestino, fundado em 1921, resistiu durante a ditadura?", "O Partido Comunista Português", ["O Partido Socialista", "O Partido Social Democrata", "O CDS"], "O PCP foi um dos partidos mais perseguidos, e muitos dos seus militantes passaram anos presos.")
  ],
  sem_liberdades: [
    Q("O que distingue uma democracia de uma ditadura?", "Os governantes são escolhidos em eleições livres", ["Os governantes nunca mudam, seja qual for a vontade do povo", "Só há um partido, que decide tudo", "Só se vota quando o governo quer, e em quem quer"], "Numa democracia, o poder pertence ao povo, que o exerce através de eleições livres."),
    Q("O que garante hoje a Constituição às mulheres?", "Igualdade de direitos em relação aos homens", ["Menos direitos do que os homens em quase tudo", "A proibição de votar e de trabalhar fora de casa", "Só direitos dentro de casa e na igreja"], "A Constituição de 1976 estabeleceu a igualdade entre homens e mulheres."),
    Q("Qual é a idade mínima para votar em Portugal?", "18 anos", ["16 anos", "21 anos", "25 anos"], "A idade mínima de voto desceu para os 18 anos depois da revolução."),
    Q("O que é o pluralismo político?", "A existência de vários partidos e opiniões", ["O partido único e uma única opinião oficial", "A proibição de debates políticos nas ruas", "Um regime sem eleições nem partidos"], "O pluralismo permite que diferentes ideias convivam e disputem o voto das pessoas."),
    Q("Que direito dos trabalhadores era proibido durante o Estado Novo?", "O direito à greve", ["O direito de viajar", "O direito de ler", "O direito de petição"], "As greves eram proibidas, e quem as organizava podia ser preso."),
    Q("Em que ano foi aprovada a Declaração Universal dos Direitos Humanos?", "Em 1948", ["Em 1933", "Em 1974", "Em 1989"], "A Declaração foi aprovada pela ONU em 1948, mas em Portugal só se tornou realidade depois de 1974.")
  ],
  pide: [
    Q("Em que ano foi criada a PIDE?", "Em 1945", ["Em 1926", "Em 1933", "Em 1961"], "A PIDE foi criada em 1945, e herdou a missão de polícias anteriores, como a PVDE."),
    Q("Em que ano a PIDE passou a chamar-se DGS?", "Em 1969", ["Em 1958", "Em 1961", "Em 1974"], "A mudança de nome, no tempo de Marcelo Caetano, não alterou as práticas da polícia política."),
    Q("Onde ficava a sede da PIDE em Lisboa?", "Na Rua António Maria Cardoso", ["Na Rua Augusta", "Na Avenida da Liberdade", "No Largo do Carmo"], "Foi à porta desta sede que, no dia 25 de abril, agentes dispararam sobre a multidão."),
    Q("Em que ano foi aberto o campo do Tarrafal?", "Em 1936", ["Em 1926", "Em 1945", "Em 1961"], "O campo do Tarrafal, em Cabo Verde, ficou conhecido como o «Campo da Morte Lenta»."),
    Q("O que aconteceu à porta da sede da PIDE a 25 de abril?", "Agentes dispararam e morreram quatro pessoas", ["Os agentes juntaram-se aos militares da revolução", "Foi inaugurado um museu sobre a resistência", "Não aconteceu nada de especial nesse dia"], "Foram as únicas vítimas mortais do dia da revolução. Mais tarde os agentes renderam-se."),
    Q("O que significa a sigla PIDE?", "Polícia Internacional e de Defesa do Estado", ["Polícia de Intervenção e Defesa do Exército", "Programa Internacional de Defesa Europeia", "Polícia Interna de Defesa Escolar"], "A PIDE era a polícia política do Estado Novo, com agentes, informadores e prisões próprias.")
  ],
  guerra_colonial: [
    Q("Em que ano começou a guerra em Angola?", "Em 1961", ["Em 1958", "Em 1964", "Em 1970"], "Em 1961 começaram os confrontos em Angola, e Portugal respondeu enviando tropas."),
    Q("Em que ano começou a luta armada em Moçambique?", "Em 1964", ["Em 1961", "Em 1963", "Em 1968"], "A FRELIMO iniciou a luta armada em setembro de 1964."),
    Q("Em que ano começou a luta armada na Guiné?", "Em 1963", ["Em 1961", "Em 1964", "Em 1967"], "O PAIGC iniciou a luta em janeiro de 1963, e a Guiné tornou-se uma das frentes mais difíceis para Portugal."),
    Q("Que líder do PAIGC foi assassinado em 1973?", "Amílcar Cabral", ["Agostinho Neto", "Samora Machel", "Eduardo Mondlane"], "Amílcar Cabral, líder do PAIGC, foi assassinado em janeiro de 1973. A independência da Guiné foi proclamada meses depois."),
    Q("Como se chamava a frente de libertação de Moçambique?", "FRELIMO", ["MPLA", "PAIGC", "UNITA"], "A Frente de Libertação de Moçambique liderou a luta armada contra o domínio colonial."),
    Q("Como designava o regime as colónias a partir de 1951?", "Províncias ultramarinas", ["Estados livres", "Territórios independentes", "Países aliados"], "Era uma forma de dizer que os territórios faziam parte de Portugal, para responder às pressões internacionais.")
  ],
  emigracao: [
    Q("Qual foi o principal destino da emigração portuguesa nos anos 60?", "França", ["Estados Unidos", "Japão", "Reino Unido"], "Entre os anos 60 e 70, muitos portugueses emigraram para França, país que precisava de mão de obra."),
    Q("O que eram os «bidonvilles»?", "Bairros de barracas onde viviam imigrantes", ["Bairros de luxo nos arredores das grandes cidades", "Hotéis de montanha para turistas ricos", "Escolas de línguas para adultos"], "Em Champigny-sur-Marne, por exemplo, viveram milhares de portugueses em barracas, sem condições."),
    Q("Que cordilheira atravessavam muitos emigrantes a caminho de França?", "Os Pirenéus", ["Os Alpes", "Os Andes", "Os Cárpatos"], "Muitos atravessavam os Pirenéus a pé, de noite, por caminhos perigosos."),
    Q("O que são as «remessas dos emigrantes»?", "O dinheiro que enviavam às famílias", ["As malas de viagem que levavam consigo", "As cartas oficiais enviadas ao consulado", "Os impostos pagos em França"], "Esse dinheiro ajudou muitas famílias e teve peso na economia portuguesa."),
    Q("Que palavra descreve quem passa a fronteira sem autorização?", "Clandestino", ["Turista", "Diplomata", "Peregrino"], "Os emigrantes «a salto» eram clandestinos: passavam as fronteiras sem documentos."),
    Q("Porque saíam muitos jovens portugueses nessa época?", "Fugiam à guerra e procuravam salários melhores", ["Queriam aprender a esquiar nos Pirenéus", "Eram obrigados pelo governo a partir", "Procuravam um clima mais frio e chuvoso"], "Havia pobreza, salários baixos e uma guerra de que muitos jovens queriam escapar.")
  ],
  mfa: [
    Q("Em que mês de 1973 houve a primeira reunião secreta de capitães, em Évora?", "Em setembro", ["Em janeiro", "Em abril", "Em dezembro"], "A reunião de 9 de setembro de 1973, no Monte Sobral, nas Alcáçovas, é considerada o início do movimento."),
    Q("Que livro de Spínola foi publicado em fevereiro de 1974?", "«Portugal e o Futuro»", ["«Mensagem», de Fernando Pessoa", "«Os Lusíadas», de Luís de Camões", "«Terra Fria», de Ferreira de Castro"], "O livro defendia uma solução política para a guerra, e foi um dos sinais de que o regime estava a perder apoio."),
    Q("O que aconteceu em 16 de março de 1974?", "Uma coluna das Caldas da Rainha marchou sobre Lisboa", ["Spínola foi eleito Presidente da República", "Foi aprovada a nova Constituição democrática", "Começou a guerra em Angola, que durou 13 anos"], "O levantamento das Caldas da Rainha falhou, mas serviu de ensaio para a revolução de 25 de abril."),
    Q("Quem eram os «capitães de Abril»?", "Oficiais de patente intermédia do exército", ["Marinheiros de patente superior da Armada", "Capitães dos barcos de pesca de Peniche", "Generais ao serviço do regime"], "Os capitães eram os oficiais que mais sofriam com a guerra e que perceberam que ela não tinha solução militar."),
    Q("Que dois generais foram demitidos em março de 1974?", "Costa Gomes e Spínola", ["Kaúlza de Arriaga e Silvino", "Otelo e Maia", "Delgado e Caetano"], "Costa Gomes e Spínola recusaram participar numa cerimónia de apoio ao regime e foram afastados."),
    Q("O que é um «golpe de Estado»?", "A tomada do poder pela força", ["Uma eleição democrática", "Um tratado de paz", "Uma festa nacional"], "O 25 de Abril foi um golpe militar que se transformou numa revolução, porque o povo saiu à rua e mudou o regime.")
  ],
  plano_otelo: [
    Q("Em que quartel funcionou o posto de comando do MFA?", "Regimento de Engenharia 1, na Pontinha", ["Quartel do Carmo, no centro de Lisboa", "Regimento de Cavalaria 7, em Lisboa", "Escola Prática de Cavalaria, em Santarém"], "Era um quartel discreto, junto de Lisboa, e foi de lá que Otelo dirigiu as operações."),
    Q("Que força militar tinha sede no Largo do Carmo?", "A GNR", ["A Marinha", "A Força Aérea", "A PSP"], "O quartel do Carmo era da Guarda Nacional Republicana (GNR), onde Marcelo Caetano se refugiou."),
    Q("Quantas senhas na rádio decidiram o arranque da operação?", "Duas", ["Uma", "Quatro", "Dez"], "Uma senha confirmava que tudo estava pronto, e a outra dava a ordem para avançar."),
    Q("Qual a vantagem de manter o plano em segredo?", "Surpreender o regime e evitar confrontos", ["Ter mais tempo para dormir antes da ação", "Poder pedir autorização prévia à PIDE", "Dar mais tempo à censura para agir"], "A surpresa foi essencial: o regime só reagiu quando já era tarde."),
    Q("Que general assumiu a chefia da Junta de Salvação Nacional?", "António de Spínola", ["Costa Gomes", "Carmona", "Kaúlza de Arriaga"], "Spínola ganhou prestígio com o livro «Portugal e o Futuro» e foi escolhido para liderar a Junta.")
  ],
  senhas_radio: [
    Q("A que horas passou «E Depois do Adeus» nos Emissores Associados de Lisboa?", "Às 22h55", ["Às 20h00", "Às 23h30", "À 01h00"], "Foi o primeiro sinal, emitido às 22h55 de 24 de abril de 1974."),
    Q("Em que rádio passou «Grândola, Vila Morena»?", "Rádio Renascença", ["Rádio Clube Português", "Emissora Nacional", "Rádio Comercial"], "Foi emitida pouco depois da meia-noite, no programa «Limite», da Rádio Renascença."),
    Q("Em que ano foi lançado o álbum «Cantigas do Maio», onde está «Grândola»?", "Em 1971", ["Em 1964", "Em 1974", "Em 1980"], "O álbum foi gravado em França, em 1971, e a canção ficou para sempre ligada à revolução."),
    Q("Em que concurso participou «E Depois do Adeus» em 1974?", "Festival da Eurovisão", ["Festival de Sanremo", "Festival da Canção do Brasil", "Festival de Cannes"], "A canção representou Portugal na Eurovisão, no início de abril de 1974."),
    Q("A quem foi dedicada «Grândola, Vila Morena»?", "À Sociedade Musical Fraternidade Operária Grandolense", ["Ao Presidente da República e a todos os ministros do governo", "À polícia política do regime, que a tinha proibido", "Ao clube de futebol da vila de Grândola e aos seus sócios"], "Zeca Afonso escreveu a canção depois de visitar a coletividade de Grândola."),
    Q("Qual o nome do programa da Rádio Renascença que passou a segunda senha?", "«Limite»", ["«Companheiros da Alegria»", "«Café Concerto»", "«Cinco Minutos de Jazz»"], "O programa «Limite» foi o local escolhido para dar a segunda senha, e o seu autor sabia a razão.")
  ],
  salgueiro_maia: [
    Q("Em que unidade militar servia Salgueiro Maia?", "Escola Prática de Cavalaria, em Santarém", ["Regimento de Infantaria 5, nas Caldas", "Escola Naval, na base do Alfeite", "Academia Militar, na Amadora"], "Foi dali que partiu a coluna que ocupou o Terreiro do Paço."),
    Q("Em que ano morreu Salgueiro Maia?", "Em 1992", ["Em 1974", "Em 1980", "Em 2000"], "Salgueiro Maia morreu em 1992, com 47 anos, e continua a ser recordado como herói de Abril."),
    Q("O que fizeram os blindados mandados contra Maia no Terreiro do Paço?", "Não obedeceram à ordem de disparar", ["Dispararam sobre a coluna durante horas", "Fugiram para o Porto sem avisar", "Bloquearam a ponte sobre o Tejo"], "A recusa dos soldados evitou um confronto e mudou o rumo do dia."),
    Q("Em que localidade nasceu Salgueiro Maia?", "Castelo de Vide", ["Santarém, no Ribatejo", "Lisboa, na capital", "Évora, no Alentejo"], "Nasceu em 1944, em Castelo de Vide, no Alto Alentejo."),
    Q("Que local de Lisboa foi o objetivo principal da coluna de Maia?", "O Terreiro do Paço, sede dos ministérios", ["O Estádio da Luz, casa do Benfica", "O Aeroporto da Portela, em Lisboa", "A estátua do Cristo Rei, junto ao rio Tejo, em Almada"], "Controlar o Terreiro do Paço significava controlar o centro do poder político.")
  ],
  largo_carmo: [
    Q("Que força militar tinha o quartel do Carmo como sede?", "A GNR", ["A Marinha", "A Força Aérea", "A PSP"], "A GNR tinha ali o seu comando, e o quartel foi cercado por Salgueiro Maia."),
    Q("Porque pediu Caetano para entregar o poder a Spínola?", "Para que o poder não caísse na rua", ["Porque Spínola era seu familiar", "Porque Spínola tinha vencido eleições", "Para ganhar tempo"], "Caetano temia que o poder fosse tomado por forças mais radicais, e queria entregá-lo a alguém que considerava seguro."),
    Q("Para que ilha foi Caetano exilado?", "Madeira", ["Açores", "Cabo Verde", "Porto Santo"], "Caetano seguiu para a Madeira e depois para o Brasil."),
    Q("Em que país morreu Marcelo Caetano?", "No Brasil, em 1980", ["Em Portugal, em Lisboa", "Em França, em Paris", "Em Espanha, em Madrid"], "Caetano viveu no exílio até à morte, no Rio de Janeiro."),
    Q("Que veículo blindado transportou Caetano para fora do quartel?", "Um Chaimite", ["Um Panhard", "Um Jeep", "Um Unimog"], "O Chaimite foi um veículo militar português, e ficou famoso com a imagem de Caetano a sair do Carmo.")
  ],
  cravos: [
    Q("Em que rua de Lisboa ficava o restaurante onde Celeste Caeiro trabalhava?", "Rua Braancamp", ["Rua Augusta", "Avenida da Liberdade", "Rua do Ouro"], "O restaurante fazia aniversário e ia oferecer flores aos clientes. Com a revolução, Celeste ofereceu-as aos soldados."),
    Q("Qual era a profissão de Celeste Caeiro?", "Empregada de restaurante", ["Soldado do exército português", "Jornalista de um jornal diário", "Professora do ensino primário"], "Celeste Caeiro trabalhava num restaurante e tornou-se, sem querer, um símbolo da revolução."),
    Q("O que fez um soldado com um dos cravos?", "Pô-lo no cano da espingarda", ["Deitou-o fora, com desprezo", "Ofereceu-o ao chefe da PIDE", "Plantou-o no jardim do quartel"], "A imagem de cravos nos canos das espingardas correu o mundo como símbolo de uma revolução pacífica."),
    Q("O que representa uma arma com uma flor?", "Paz e uma revolução sem violência", ["Uma ameaça ao povo e aos soldados", "Um jogo de rua popular nas cidades", "Uma publicidade a uma florista"], "Os cravos mostraram que os militares estavam ao lado do povo."),
    Q("Que cor de cravo ficou ligada ao 25 de Abril?", "Vermelho", ["Branco", "Amarelo", "Rosa"], "O cravo vermelho tornou-se o símbolo da revolução e é usado todos os anos nas comemorações.")
  ],
  presos_libertados: [
    Q("Quem regressou a Portugal a 28 de abril de 1974, num comboio vindo de Paris?", "Mário Soares", ["Álvaro Cunhal", "Salgueiro Maia", "Marcelo Caetano"], "Mário Soares foi recebido em Lisboa por uma multidão, na estação de Santa Apolónia."),
    Q("Que dirigente do PCP regressou do exílio a 30 de abril?", "Álvaro Cunhal", ["Mário Soares", "Humberto Delgado", "Otelo Saraiva de Carvalho"], "Álvaro Cunhal tinha estado preso e depois no exílio, e regressou a Portugal poucos dias depois da revolução."),
    Q("O que é hoje o Aljube, em Lisboa?", "O Museu do Aljube, sobre a Resistência", ["Um estádio de futebol para grandes jogos", "Um hospital universitário de Lisboa", "Um palácio onde vive o Presidente"], "O Aljube foi prisão política, e hoje é um museu que conta a história da resistência à ditadura."),
    Q("Onde estão guardados os arquivos da PIDE/DGS?", "No Arquivo Nacional da Torre do Tombo", ["Na Biblioteca de Alexandria, no Egito", "No Palácio de Belém, em Lisboa", "No Museu do Fado, em Alfama"], "Os arquivos podem ser consultados, e ajudam a conhecer a história e a lembrar as vítimas."),
    Q("O que é uma amnistia?", "Um perdão dado pelo Estado a certos crimes", ["Uma nova lei sobre o trânsito nas cidades", "Um tipo de eleição para escolher deputados", "Um prémio nacional dado aos cientistas"], "Depois do 25 de Abril, houve amnistias para presos políticos e para quem tinha sido condenado por razões políticas.")
  ],
  programa_mfa: [
    Q("Que órgão assumiu o poder a 25 de abril de 1974?", "A Junta de Salvação Nacional", ["A Assembleia Constituinte", "O Conselho de Estado", "O Supremo Tribunal"], "A Junta ficou no poder durante a transição, enquanto se preparavam as eleições."),
    Q("Quem foi o primeiro Presidente da República depois do 25 de Abril?", "António de Spínola", ["Costa Gomes", "Ramalho Eanes", "Mário Soares"], "Spínola ocupou o cargo de 15 de maio a 30 de setembro de 1974."),
    Q("Quem sucedeu a Spínola em setembro de 1974?", "Costa Gomes", ["Ramalho Eanes", "Mário Soares", "Otelo Saraiva de Carvalho"], "O general Costa Gomes foi Presidente até 1976."),
    Q("Quem foi o primeiro Presidente da República eleito democraticamente, em 1976?", "Ramalho Eanes", ["Mário Soares", "Costa Gomes", "Spínola"], "António Ramalho Eanes foi eleito em junho de 1976, já depois da nova Constituição."),
    Q("Quem foi o primeiro primeiro-ministro do governo constitucional, em 1976?", "Mário Soares", ["Ramalho Eanes", "Álvaro Cunhal", "Sá Carneiro"], "Mário Soares chefiou o I Governo Constitucional, depois das eleições legislativas de 1976."),
    Q("O que é um governo provisório?", "Um governo que funciona até haver eleições", ["Um governo que nunca muda de ministros", "Um governo escolhido pelos censores do regime", "Um governo sem ministros nem presidente"], "Depois do 25 de Abril, houve vários governos provisórios até se realizarem eleições livres.")
  ],
  primeiro_maio: [
    Q("O que mudou para o 1.º de Maio depois de 1974?", "Tornou-se feriado nacional", ["Foi proibido", "Foi passado para dezembro", "Foi substituído pelo Carnaval"], "O Dia do Trabalhador passou a ser feriado e a ser celebrado livremente."),
    Q("Que direito dos trabalhadores foi reconhecido pela lei em 1974?", "O direito à greve", ["O direito de ser preso", "O direito de ficar sem salário", "O direito à censura"], "A lei de 1974 reconheceu o direito à greve e hoje está na Constituição."),
    Q("Que medida protegeu os trabalhadores em maio de 1974?", "A criação do salário mínimo nacional", ["A proibição dos sindicatos em todo o país", "O fecho de todas as fábricas e oficinas", "O fim do trabalho aos fins de semana"], "O salário mínimo nacional foi criado em 1974, para garantir um valor mínimo para quem trabalha."),
    Q("Que partido clandestino passou a atuar à luz do dia?", "O Partido Comunista Português", ["A União Nacional, partido do regime", "A Legião Portuguesa, milícia do regime", "A Mocidade Portuguesa, organização juvenil"], "Com o fim da ditadura, os partidos puderam finalmente existir e fazer campanha."),
    Q("O que significa «liberdade sindical»?", "Poder criar e participar em sindicatos livres", ["Ser obrigado a trabalhar sem direito a descanso", "Ter um único sindicato, controlado pelo governo", "Proibir todas as greves e manifestações"], "A liberdade sindical permite aos trabalhadores defender os seus direitos de forma organizada.")
  ],
  descolonizacao: [
    Q("Em que data se tornou independente Moçambique?", "25 de junho de 1975", ["11 de novembro de 1975", "5 de julho de 1975", "24 de setembro de 1973"], "Moçambique proclamou a independência a 25 de junho de 1975, com Samora Machel como primeiro Presidente."),
    Q("Quem foi o primeiro Presidente de Moçambique independente?", "Samora Machel", ["Agostinho Neto", "Amílcar Cabral", "Mário Soares"], "Samora Machel liderou a FRELIMO e foi o primeiro Presidente do país."),
    Q("Quem foi o primeiro Presidente de Angola independente?", "Agostinho Neto", ["Samora Machel", "Amílcar Cabral", "Eduardo Mondlane"], "Agostinho Neto, líder do MPLA, tornou-se o primeiro Presidente de Angola em 1975."),
    Q("Qual é a capital de Cabo Verde?", "Praia", ["Mindelo", "Luanda", "Maputo"], "A Praia fica na ilha de Santiago."),
    Q("Quantas antigas colónias portuguesas em África se tornaram independentes em 1974-75?", "Cinco", ["Três", "Sete", "Nove"], "Foram Guiné-Bissau, Moçambique, Cabo Verde, São Tomé e Príncipe e Angola."),
    Q("Que acordo de janeiro de 1975 preparou a independência de Angola?", "O Acordo de Alvor", ["O Tratado de Tordesilhas", "O Acordo de Paris", "O Tratado de Windsor"], "O Acordo de Alvor previa uma transição pacífica, mas os movimentos angolanos acabaram por entrar em guerra civil.")
  ],
  eleicoes_livres: [
    Q("Que partido foi o mais votado nas eleições de 1975?", "O Partido Socialista", ["O Partido Comunista Português", "O PPD", "O CDS"], "O PS, liderado por Mário Soares, foi o mais votado, com cerca de 38% dos votos."),
    Q("Quando foi aprovada a Constituição da democracia?", "A 2 de abril de 1976", ["A 25 de abril de 1975", "A 1 de maio de 1974", "A 10 de junho de 1976"], "A Constituição foi aprovada pela Assembleia Constituinte a 2 de abril de 1976."),
    Q("Quando entrou em vigor a Constituição?", "A 25 de abril de 1976", ["A 2 de abril de 1976", "A 1 de janeiro de 1977", "A 10 de junho de 1976"], "Entrou em vigor exatamente dois anos depois da revolução, no dia 25 de abril de 1976."),
    Q("Qual a idade mínima de voto adotada em 1974?", "18 anos", ["21 anos", "16 anos", "25 anos"], "Baixar a idade de voto e abrir o voto a todos os adultos foi uma das grandes mudanças."),
    Q("Como se chama o Parlamento português?", "Assembleia da República", ["Congresso Nacional", "Cortes Gerais", "Senado"], "A Assembleia da República representa todos os cidadãos portugueses."),
    Q("O que é a soberania popular?", "O poder pertence ao povo", ["O poder pertence ao rei", "O poder pertence ao exército", "O poder pertence ao mais rico"], "Em democracia, o povo é soberano e escolhe os seus representantes.")
  ],
  abril_hoje: [
    Q("Em que ano o euro entrou em circulação em Portugal?", "Em 2002", ["Em 1974", "Em 1986", "Em 1999"], "As notas e moedas de euro começaram a circular em 1 de janeiro de 2002, substituindo o escudo."),
    Q("Que palavra de ordem se canta nas celebrações?", "«25 de Abril sempre!»", ["«Viva a censura!»", "«Salazar para sempre!»", "«Silêncio no país!»"], "A frase lembra que a liberdade conquistada deve ser defendida todos os dias."),
    Q("Quantos anos fez a revolução em 2024?", "50 anos", ["25 anos", "40 anos", "75 anos"], "Em 2024, celebraram-se os 50 anos do 25 de Abril, com cerimónias e eventos por todo o país."),
    Q("Quando aderiu Portugal à Comunidade Económica Europeia?", "A 1 de janeiro de 1986", ["A 25 de abril de 1974", "A 1 de janeiro de 2002", "A 25 de abril de 1976"], "A adesão foi assinada em 1985 e entrou em vigor a 1 de janeiro de 1986."),
    Q("Que valor da democracia devemos defender hoje?", "A liberdade de expressão e o direito de voto", ["A censura prévia sobre os jornais e livros", "O partido único a mandar em tudo", "A polícia política a vigiar as pessoas"], "A democracia exige participação: votar, informar-se e respeitar quem pensa de forma diferente."),
    Q("O que é o Dia da Liberdade?", "O feriado que celebra a revolução de 1974", ["Um dia de eleições para a Assembleia", "O dia em que se celebra a Constituição de 1976", "O dia dedicado à Europa e à União Europeia"], "O 25 de Abril é feriado nacional e recorda o dia em que acabou a ditadura em Portugal.")
  ]
};
