// ===== Conteúdo narrativo — A REVOLUÇÃO DOS CRAVOS (25 de Abril de 1974) =====
// Ficheiro puramente de dados, sem lógica de jogo.
//
// Os 4 bosses são símbolos, não pessoas: a Censura, a PIDE, o Regime e o Esquecimento.
// (ids internos: censura, pide, regime, esquecimento)

export const REGION_INTRO = {
  origens: {
    vanberto: "Viajámos no tempo até aos anos da ditadura. Vamos descobrir como se vivia sem liberdade... e quem teve coragem de resistir!",
    arrival: "Bem-vindo ao Estado Novo — a ditadura, a censura e quem lhe resistiu. 🏛️"
  },
  desenvolvimento: {
    vanberto: "Sinto o peso do medo no ar... a PIDE vigia, a guerra não acaba e os capitães estão cansados!",
    arrival: "Bem-vindo a Guerra e Medo — a polícia política, a guerra colonial e o nascimento do MFA. 🪖"
  },
  protecao: {
    vanberto: "É a noite de 24 de abril de 1974! Prepara-te: vamos viver a revolução, minuto a minuto!",
    arrival: "A Revolução dos Cravos começa: as senhas na rádio, Salgueiro Maia e o fim da ditadura. 🌹"
  },
  participacao: {
    vanberto: "A ditadura caiu, mas ainda há muito a fazer: eleições, direitos e uma democracia para construir!",
    arrival: "Construir a Democracia — os três D, a descolonização, as primeiras eleições livres e o 25 de Abril hoje. 🕊️"
  }
};

// "{N}" é substituído pelo número real de saltos necessários (def.hp, já com o +1 do modo Difícil aplicado)
// no momento em que o texto é mostrado — ver startBossFight(). Nunca escrever o número diretamente.
export const BOSS_OBJECTIVE = {
  censura:      "Desvia-te dos carimbos «CENSURADO» 🟥 que o Lápis Azul atira e salta-lhe em cima {N} vezes para o vencer!",
  pide:         "Desvia-te dos dossiês 🗂️ que a PIDE lança na horizontal e salta-lhe em cima {N} vezes para a vencer!",
  regime:       "Ele patrulha depressa a atirar decretos 📜 — apanha o ritmo e salta-lhe em cima {N} vezes para o vencer!",
  esquecimento: "Ele anda muito depressa a atirar orbes sombrios 🔮! Salta-lhe em cima {N} vezes para o vencer e não deixes Abril ser esquecido!"
};

// Diálogo de boss, por boss.
// "reaction" = fala do VanBerto's ANTES do boss se apresentar (pressentir o perigo).
// "rally"    = fala do VanBerto's DEPOIS da ameaça do boss, mesmo antes do combate começar.
export const BOSS_INTRO_VB = {
  censura: {
    reaction: "Ugh, sinto que estão a riscar tudo à minha volta... as palavras desaparecem!",
    rally: "Vamos mostrar-lhe que a liberdade de dizer o que pensamos não se risca!"
  },
  pide: {
    reaction: "Sinto olhos a vigiar-nos de todos os lados... é a polícia política!",
    rally: "Não vai resultar! A coragem de quem resistiu dá-nos força!"
  },
  regime: {
    reaction: "Este é o último reduto da ditadura... mas já se ouve o povo na rua!",
    rally: "Vamos mostrar-lhe que, com cravos e coragem, nenhum regime resiste!"
  },
  esquecimento: {
    reaction: "Está tudo tão nublado aqui dentro... como se já ninguém se lembrasse de Abril.",
    rally: "Enquanto nos lembrarmos, o esquecimento não vence! Vamos a isso!"
  }
};

// Uma única fala de vitória por boss, ligada à lição que acabou de ser recuperada.
export const BOSS_VICTORY_VB = {
  censura: "Conseguimos! Já ninguém nos risca as palavras!",
  pide: "Vencemos! Ninguém volta a ser preso por pensar de forma diferente!",
  regime: "A ditadura caiu e o povo ganhou a liberdade! Viva o 25 de Abril!",
  esquecimento: "Enquanto lembrarmos, a liberdade nunca se apaga! 25 de Abril sempre!"
};

// Frases curtas mostradas (sem parar o jogo, só um "floatie") sempre que se apanha um objeto de conhecimento
// no combate do boss da PIDE.
export const KNOWLEDGE_FACTS = [
  "🌹 O cravo é o símbolo da liberdade.",
  "📻 «Grândola, Vila Morena» foi uma senha.",
  "✊ Resistir também é um ato de coragem.",
  "🗳️ Em 1975, todos puderam votar.",
  "🕊️ A liberdade defende-se todos os dias."
];

// Falas curtas do boss em marcos de HP durante o combate.
export const BOSS_HP_TAUNTS = {
  censura: {
    atStart: ["Vou riscar tudo o que disseres!", "Silêncio! Ninguém pode saber!", "Esta frase está proibida!"],
    hp2: ["Argh! O meu lápis partiu-se...", "Não contava com esse salto!", "Ainda tenho tinta de sobra!"],
    hp1: ["Não... as palavras estão a fugir-me!", "Isto não pode ser...", "A verdade não se risca!"]
  },
  pide: {
    atStart: ["Estou a ver-te!", "Ninguém escapa ao meu dossiê!", "Achas mesmo que me vais vencer?"],
    hp2: ["Isso foi sorte!", "Não contava com esse salto...", "Grrr, vou apontar o teu nome!"],
    hp1: ["Não! Descobriram o meu disfarce!", "Isto não pode ser...", "A coragem... é mais forte que o medo!"]
  },
  regime: {
    atStart: ["Eu mando aqui há muitos anos!", "Ninguém desobedece ao Regime!", "Decreto: saltar é proibido!"],
    hp2: ["Essa amolgou-me a medalha!", "O povo não se pode juntar!", "Ainda tenho muitos decretos!"],
    hp1: ["Não... estão a juntar-se na rua!", "Os meus decretos... já ninguém os lê!", "Isto não pode ser o fim!"]
  },
  esquecimento: {
    atStart: ["Ninguém se vai lembrar de Abril!", "Tudo se esquece com o tempo...", "Vou apagar a memória de todos!"],
    hp2: ["Impossível! Alguém se lembra!", "Isso não devia ter acontecido...", "Grrr, mais depressa da próxima vez!"],
    hp1: ["Não... a memória está a vencer!", "Os cravos... voltam a florir!", "Isto não pode ser o fim!"]
  }
};

// Um "letreiro"/NPC por nível — alinhado por artIdx (0-19), tal como HISTORY[].
export const NPC_SIGNS = [
  { emoji:"🏛️", text:"Sabias que o Estado Novo durou 41 anos, de 1933 a 1974?" },
  { emoji:"⛪", text:"«Deus, Pátria e Família» era o lema do regime. E a liberdade? Nem uma palavra." },
  { emoji:"✏️", text:"Os censores riscavam os jornais com um lápis azul antes de serem publicados." },
  { emoji:"✊", text:"Humberto Delgado ficou conhecido como o «General sem Medo». Foi assassinado em 1965." },
  { emoji:"🗳️", text:"Sem partidos livres e sem eleições livres, o povo não escolhia quem o governava." },
  { emoji:"🕵️", text:"A PIDE tinha informadores por todo o lado. Por isso, muita gente tinha medo de falar." },
  { emoji:"🪖", text:"A Guerra Colonial durou 13 anos, de 1961 a 1974, em Angola, na Guiné e em Moçambique." },
  { emoji:"🚂", text:"Muitos emigrantes passaram a fronteira «a salto», de noite, a caminho de França." },
  { emoji:"🎖️", text:"Os capitães juntaram-se em segredo e formaram o MFA, o Movimento das Forças Armadas." },
  { emoji:"🗺️", text:"O posto de comando da revolução ficava no quartel da Pontinha, em Lisboa." },
  { emoji:"📻", text:"«E Depois do Adeus» às 22h55 e «Grândola, Vila Morena» depois da meia-noite: as senhas!" },
  { emoji:"🐎", text:"Salgueiro Maia chegou ao Terreiro do Paço e os soldados recusaram disparar contra ele." },
  { emoji:"🏰", text:"Marcelo Caetano rendeu-se no Largo do Carmo e a ditadura acabou ao fim do dia." },
  { emoji:"🌹", text:"Celeste Caeiro ofereceu cravos aos soldados, que os puseram nas espingardas." },
  { emoji:"🔓", text:"Depois do 25 de Abril, os presos políticos foram libertados e a PIDE/DGS foi extinta." },
  { emoji:"📜", text:"O programa do MFA tinha três D: Democratizar, Descolonizar e Desenvolver." },
  { emoji:"🎉", text:"No 1.º de Maio de 1974, centenas de milhares de pessoas festejaram nas ruas de Lisboa." },
  { emoji:"🌍", text:"Em 1974 e 1975, Guiné-Bissau, Moçambique, Cabo Verde, São Tomé e Príncipe e Angola ficaram independentes." },
  { emoji:"🗳️", text:"A 25 de abril de 1975, os portugueses votaram nas primeiras eleições livres: mais de 90% foram votar!" },
  { emoji:"🕊️", text:"O 25 de Abril é feriado nacional: o Dia da Liberdade. 25 de Abril sempre!" }
];
