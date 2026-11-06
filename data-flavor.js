// ===== Frases soltas e mensagens de "tempero" — A REVOLUÇÃO DOS CRAVOS =====
// PRAISE, PAUSE_TIPS, LEVEL_ENTRY_PHRASES, DYNAMIC_MSGS_CORRECT, DYNAMIC_MSGS_WRONG,
// VB_LEVEL_INTRO, VB_HIT, VB_QUIZ_CORRECT, VB_QUIZ_WRONG, VB_STAR_POWER, VB_PERFECT_LEVEL

export const PRAISE = ["🌹 Excelente!", "✊ Muito bem!", "📻 Boa resposta!", "🎉 Fantástico!", "✨ Brilhante!", "🏆 Continua assim!"];

// PAUSE_TIPS são sobre MECÂNICAS de jogo (agachar, super-salto, power-ups, tipos de vilão).
export const PAUSE_TIPS = [
  "🔽 <b>Agachar:</b> Prime ↓, S ou o botão 'Agachar' para te esquivares de ataques altos e passares por baixo de obstáculos!",
  "🌟 <b>Cravo dourado:</b> Apanha-o e atropela os censores durante 8 segundos — +50 pontos cada!",
  "✊ <b>Punho cerrado:</b> Fica protegido por 8s e absorve um golpe de qualquer censor.",
  "🕊️ <b>Pomba:</b> Dá um segundo salto no ar — ótimo para plataformas altas!",
  "❓ <b>Bloco surpresa:</b> Passa por cima dos blocos <b>❓</b> para revelar itens escondidos!",
  "🟠 <b>Trampolim:</b> Salta numa plataforma laranja para voar muito mais alto que o normal.",
  "🥇 <b>Bónus:</b> Completa um nível sem perder vidas para ganhar +50 pontos extra!",
  "🔴 Carimbo — lento e previsível. 🔵 Lápis azul — salta às vezes. 🟢 Informador — persegue-te!",
  "❤️ <b>Coração:</b> Apanha-o para ganhar +1 vida (máximo 5 ao mesmo tempo).",
  "🦘 <b>Nível dos Trampolins:</b> Os vãos são intransponíveis sem trampolim — procura-os no chão!",
  "🔥 <b>Nível da Lava:</b> O chão queima! Mantém-te sempre em cima das plataformas.",
  "🏃 <b>Nível da Esteira:</b> Todas as plataformas se movem — observa o ritmo antes de saltar!"
];

// Frase curta mostrada ao entrar em cada nível — alinhada por posição no array LEVELS (0-19), NÃO por artIdx.
export const LEVEL_ENTRY_PHRASES = [
  "Uma ditadura chamada Estado Novo! 🏛️",
  "Deus, Pátria e Família... e pouca liberdade! ⛪",
  "O lápis azul riscava tudo! ✏️",
  "Houve quem tivesse coragem de resistir! ✊",
  "Sem eleições livres, não há democracia! 🗳️",
  "A PIDE estava sempre a vigiar! 🕵️",
  "Treze anos de guerra em África! 🪖",
  "Tantos partiram à procura de uma vida melhor! 🚂",
  "Os capitães juntam-se em segredo! 🎖️",
  "O plano está pronto na Pontinha! 🗺️",
  "Atenção à rádio: as senhas vão tocar! 📻",
  "Salgueiro Maia avança para Lisboa! 🐎",
  "Todos os olhos no Largo do Carmo! 🏰",
  "O povo na rua com cravos na mão! 🌹",
  "As portas das prisões abrem-se! 🔓",
  "Democratizar, Descolonizar, Desenvolver! 📜",
  "1.º de Maio: festa em liberdade! 🎉",
  "Novos países falam português! 🌍",
  "Pela primeira vez, todos votam livremente! 🗳️",
  "25 de Abril sempre! 🕊️"
];

export const DYNAMIC_MSGS_CORRECT = [
  "🌟 Fantástico!", "✨ Excelente!", "🎉 És incrível!",
  "🌹 Sabia que conseguias!", "🏆 Lição aprendida!", "✊ Muito bem!"
];

export const DYNAMIC_MSGS_WRONG = [
  "💪 Quase!", "🔄 Vamos tentar novamente!", "📚 Aprender também é vencer!",
  "❤️ Não desistas!", "💡 Próxima vez consegues!"
];

// Fala mais longa do VanBerto's à entrada de cada nível — indexada por posição no array LEVELS (0-19).
// O motor usa sempre VB_LEVEL_INTRO[0] no arranque do jogo.
export const VB_LEVEL_INTRO = [
  "Viajámos até 1933, o ano em que nasceu o Estado Novo! 🏛️ Vamos descobrir como era viver numa ditadura?",
  "«Deus, Pátria e Família»! ⛪ Vamos ver como era a vida de todos os dias?",
  "Cuidado com o lápis azul! ✏️ Vamos descobrir o que a censura riscava?",
  "Houve quem não tivesse medo! ✊ Vamos conhecer quem resistiu à ditadura?",
  "Sem liberdade de falar, de votar, de nos juntarmos... 🗳️ Vamos perceber o que faltava?",
  "A PIDE vigiava toda a gente! 🕵️ Vamos descobrir o que fazia a polícia política?",
  "Treze anos de guerra em África! 🪖 Vamos perceber porque foi tão importante acabar com ela?",
  "Tantos portugueses partiram a salto! 🚂 Vamos ver porque saíram do país?",
  "Os capitães reuniram-se em segredo! 🎖️ Vamos ver como nasceu o MFA?",
  "O plano da revolução está pronto! 🗺️ Vamos conhecer o posto de comando da Pontinha?",
  "A rádio vai dar o sinal! 📻 Vamos ouvir as senhas da revolução?",
  "Salgueiro Maia avança para o Terreiro do Paço! 🐎 Vamos com ele?",
  "Todos os olhos no Largo do Carmo! 🏰 Vamos ver a ditadura render-se?",
  "O povo saiu à rua! 🌹 Vamos ver os cravos nas espingardas?",
  "As prisões abriram as portas! 🔓 Vamos ver o regresso da liberdade?",
  "Democratizar, Descolonizar e Desenvolver! 📜 Vamos conhecer o programa do MFA?",
  "Pela primeira vez em décadas, o 1.º de Maio é festa em liberdade! 🎉 Vamos celebrar?",
  "Novos países, a falar português! 🌍 Vamos perceber o que foi a descolonização?",
  "Pela primeira vez, todos podem votar livremente! 🗳️ Vamos às urnas?",
  "O 25 de Abril chegou até hoje! 🕊️ Último nível — dá tudo!"
];

export const VB_HIT = [
  "Ups! Perdemos uma vida, mas os heróis de Abril nunca desistem! 💪",
  "Autsch! Cuida-te! Os censores estão rápidos hoje! 🔴",
  "Ai! Respira fundo e vamos de novo! ❤️",
  "Atenção aos censores! Já consegues! ✊",
  "Não faz mal! Cada erro ensina algo novo! 📚",
  "Vamos lá, capitão de Abril! Ainda temos vidas! 🌟"
];

export const VB_QUIZ_CORRECT = [
  "INCRÍVEL! Sabias mesmo a resposta! 🏆",
  "Que craque! Lição aprendida! ✨",
  "Fantástico! Estou tão orgulhoso de ti! 🎉",
  "Isso mesmo! O 25 de Abril agradece! 🌹",
  "Brilhante! Nada te escapa! 🌟",
  "Que resposta! Mereces um cravo! 🌹"
];

export const VB_QUIZ_WRONG = [
  "Quase! Aprende e vai mais forte na próxima! 📖",
  "Não faz mal! Errar também é aprender! 💡",
  "Boa tentativa! Desta vez não foi, mas chegas lá! 💪",
  "Até os heróis erram — o importante é tentar! ❤️",
  "Relê a dica e tenta outra vez! 🔄"
];

export const VB_STAR_POWER = [
  "CRAVO DOURADO! Agora és IMPARÁVEL! 🌟",
  "Uau, o cravo dourado! Vai atropelar tudo! 💥",
  "SUPER VANBERTO'S ATIVADO! 🌹",
  "Cravo apanhado! 8 segundos de glória! ✨"
];

export const VB_PERFECT_LEVEL = [
  "PERFEITO! Nenhuma vida perdida! Lendário! 🏆",
  "Uau! Passaste o nível sem um arranhão! ⭐",
  "Impecável! Guardião da Liberdade nível máximo! 🌟",
  "Incrível! Isso merecia um bónus extra! 🎉"
];
