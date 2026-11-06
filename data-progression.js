// ===== Sistemas de progressão: mapa, artefactos, conquistas — A REVOLUÇÃO DOS CRAVOS =====
// MAP_REGIONS, ARTEFACTS, ARTEFACT_SETS, SET_REACTIONS, ACHIEVEMENTS_DEFS

// Mantém os 20 níveis e a sua dificuldade intactos (só o TEMA de cada
// nível mudou, ver data-levels.js). Os 4 mundos e as posições dos bosses
// mantêm-se exatamente iguais à estrutura original.
export const MAP_REGIONS = [
  { id:"origens",        icon:"🏛️", name:"O Estado Novo",              sub:"A ditadura, a censura e quem resistiu",              levels:[0,1,2,3,4],
    mapBg:"map-mundo1.webp",
    nodePos:[{x:12,y:78},{x:28,y:64},{x:44,y:76},{x:60,y:62},{x:78,y:72}] },
  { id:"desenvolvimento",icon:"🪖", name:"Guerra e Medo",              sub:"A PIDE, a guerra colonial e os capitães",           levels:[5,6,7,8],
    mapBg:"map-mundo2.webp",
    nodePos:[{x:14,y:76},{x:36,y:66},{x:58,y:74},{x:80,y:62}] },
  { id:"protecao",       icon:"🌹", name:"A Revolução dos Cravos",     sub:"As senhas, Salgueiro Maia e o Largo do Carmo",      levels:[9,10,11,12,13,14],
    mapBg:"map-mundo3.webp",
    nodePos:[{x:8,y:80},{x:22,y:66},{x:38,y:78},{x:54,y:62},{x:70,y:74},{x:86,y:60}] },
  { id:"participacao",   icon:"🕊️", name:"Construir a Democracia",     sub:"O programa do MFA, a liberdade e Abril hoje",       levels:[15,16,17,18,19],
    mapBg:"map-mundo4.webp",
    nodePos:[{x:12,y:76},{x:30,y:64},{x:48,y:76},{x:66,y:62},{x:84,y:72}] },
  { id:"base",           icon:"🏠", name:"Quartel do VanBerto's",      sub:"O teu ponto de partida",                            levels:[] },
];

export const ARTEFACTS = [
  // idx 0-4 — Conjunto: O Estado Novo
  { emoji:"🏛️", name:"Chave do Estado Novo",   short:"A Ditadura de Salazar",     color:"#d9b26a", glow:"rgba(217,178,106,0.6)", vanberto:"1933! Começou uma ditadura que durou até 1974!", set:0 },
  { emoji:"⛪", name:"Medalha do Lema",         short:"Deus, Pátria e Família",    color:"#ffc060", glow:"rgba(255,192,96,0.6)",  vanberto:"Havia pobreza e pouca escola... e pouca liberdade!", set:0 },
  { emoji:"✏️", name:"Lápis Azul",              short:"A Censura",                 color:"#6fa8ff", glow:"rgba(111,168,255,0.6)", vanberto:"A censura cortava, mas a verdade não se apaga!", set:0 },
  { emoji:"✊", name:"Punho da Resistência",    short:"Quem Resistiu",             color:"#ff7a6a", glow:"rgba(255,122,106,0.6)", vanberto:"Mesmo com medo, houve quem lutasse pela liberdade!", set:0 },
  { emoji:"🗳️", name:"Urna Vazia",              short:"Sem Liberdades",            color:"#e0a0ff", glow:"rgba(224,160,255,0.6)", vanberto:"Sem eleições livres, não há democracia!", set:0 },
  // idx 5-8 — Conjunto: Guerra e Medo
  { emoji:"🕵️", name:"Chapéu da PIDE",         short:"A Polícia Política",        color:"#9aa4b8", glow:"rgba(154,164,184,0.6)", vanberto:"A PIDE vigiava todos. Hoje já não!", set:1 },
  { emoji:"🪖", name:"Capacete de África",      short:"A Guerra Colonial",         color:"#9fc070", glow:"rgba(159,192,112,0.6)", vanberto:"Treze anos de guerra: era preciso acabar com ela!", set:1 },
  { emoji:"🚂", name:"Bilhete a Salto",         short:"A Fuga: Emigração",         color:"#60d0e0", glow:"rgba(96,208,224,0.6)",  vanberto:"Tanta gente partiu à procura de uma vida melhor!", set:1 },
  { emoji:"🎖️", name:"Estrela dos Capitães",   short:"O Movimento dos Capitães",  color:"#ffe060", glow:"rgba(255,224,96,0.6)",  vanberto:"Os capitães juntaram-se para mudar o país!", set:1 },
  // idx 9-14 — Conjunto: A Revolução
  { emoji:"🗺️", name:"Mapa do Plano",          short:"O Plano de Otelo",          color:"#ffc060", glow:"rgba(255,192,96,0.6)",  vanberto:"Tudo planeado em segredo, na Pontinha!", set:2 },
  { emoji:"📻", name:"Rádio das Senhas",        short:"As Senhas na Rádio",        color:"#ff9060", glow:"rgba(255,144,96,0.6)",  vanberto:"«Grândola, Vila Morena»! O sinal para avançar!", set:2 },
  { emoji:"🐎", name:"Espora de Maia",          short:"Salgueiro Maia",            color:"#d0a070", glow:"rgba(208,160,112,0.6)", vanberto:"Os soldados recusaram disparar. Que coragem!", set:2 },
  { emoji:"🏰", name:"Chave do Carmo",          short:"O Largo do Carmo",          color:"#d9b26a", glow:"rgba(217,178,106,0.6)", vanberto:"A ditadura rendeu-se ao fim do dia!", set:2 },
  { emoji:"🌹", name:"Cravo de Celeste",        short:"O Povo e os Cravos",        color:"#ff3a4a", glow:"rgba(255,58,74,0.6)",   vanberto:"Cravos nas espingardas! Uma revolução sem violência!", set:2 },
  { emoji:"🔓", name:"Cadeado Aberto",          short:"Os Presos Libertados",      color:"#80ff9a", glow:"rgba(128,255,154,0.6)", vanberto:"Os presos políticos voltaram a ser livres!", set:2 },
  // idx 15-19 — Conjunto: Construir a Democracia
  { emoji:"📜", name:"Programa dos 3 D",        short:"O Programa do MFA",         color:"#ffd36a", glow:"rgba(255,211,106,0.6)", vanberto:"Democratizar, Descolonizar, Desenvolver!", set:3 },
  { emoji:"🎉", name:"Bandeira do 1.º de Maio", short:"O 1.º de Maio",             color:"#ff6b6b", glow:"rgba(255,107,107,0.6)", vanberto:"Em 1974, festa na rua e liberdade para todos!", set:3 },
  { emoji:"🌍", name:"Mapa da Lusofonia",       short:"A Descolonização",          color:"#60e0a0", glow:"rgba(96,224,160,0.6)",  vanberto:"Novos países independentes, falando português!", set:3 },
  { emoji:"🗳️", name:"Boletim de Voto",         short:"Primeiras Eleições Livres", color:"#8ab8ff", glow:"rgba(138,184,255,0.6)", vanberto:"Em 1975, todos puderam votar!", set:3 },
  { emoji:"🕊️", name:"Pomba da Liberdade",     short:"Abril Hoje",                color:"#ffffff", glow:"rgba(255,255,255,0.6)", vanberto:"A liberdade defende-se todos os dias!", set:3 },
];

export const ARTEFACT_SETS = [
  { name:"O Estado Novo",              icon:"🏛️", bonus:150 },
  { name:"Guerra e Medo",              icon:"🪖", bonus:150 },
  { name:"A Revolução dos Cravos",     icon:"🌹", bonus:150 },
  { name:"Construir a Democracia",     icon:"🕊️", bonus:200 },
];

export const SET_REACTIONS = [
  "🏛️ Conjunto ESTADO NOVO completo! Já sabes como se vivia sem liberdade!",
  "🪖 Conjunto GUERRA E MEDO completo! Percebes porque os capitães disseram «basta»!",
  "🌹 Conjunto REVOLUÇÃO completo! Estiveste lá, de cravo na mão!",
  "🕊️ Conjunto COMPLETO! GUARDIÃO DA LIBERDADE — o 25 de Abril está em boas mãos!",
];

export const ACHIEVEMENTS_DEFS = [
  { id:"primeiros_passos", tier:"🥉", name:"Primeiros Passos",        desc:"Completa o primeiro nível." },
  { id:"curioso",          tier:"🥉", name:"Curioso",                  desc:"Lê 10 curiosidades." },
  { id:"explorador",       tier:"🥈", name:"Explorador",               desc:"Encontra todos os segredos de um nível." },
  { id:"sabio",            tier:"🥈", name:"Sábio",                    desc:"Acerta 20 perguntas." },
  { id:"caca_tesouros",    tier:"🏆", name:"Caçador de Tesouros",      desc:"Encontra todas as salas secretas do jogo." },
  { id:"guardiao",         tier:"🥇", name:"Guardião da Liberdade",desc:"Completa o jogo." },
  { id:"mestre",           tier:"🥇", name:"Mestre da História",        desc:"Acerta todas as perguntas à primeira tentativa." },
  { id:"lenda",            tier:"🏆", name:"Capitão de Abril",            desc:"100% de conclusão — todos os níveis e todas as estrelas." },
];
