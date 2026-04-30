/*************************************************
 * VanBerto's — A Revolução dos Cravos  v2
 * Professora: Vanda Várzea
 *
 * Jogo educativo sobre o 25 de Abril de 1974.
 * Narrativa cronológica: do Estado Novo à democracia.
 * 10 capítulos · Factos históricos verificados.
 *************************************************/

window.addEventListener("DOMContentLoaded", () => {

  // ===== DOM =====
  const startOverlay   = document.getElementById("startOverlay");
  const howOverlay     = document.getElementById("howOverlay");
  const quizOverlay    = document.getElementById("quizOverlay");
  const historyOverlay = document.getElementById("historyOverlay");
  const historyText    = document.getElementById("historyText");
  const btnHistory     = document.getElementById("btnHistory");
  const quizQuestion   = document.getElementById("quizQuestion");
  const quizAnswers    = document.getElementById("quizAnswers");
  const quizFeedback   = document.getElementById("quizFeedback");
  const quizExplanation= document.getElementById("quizExplanation");
  const btnCloseQuiz   = document.getElementById("btnCloseQuiz");
  const btnStart       = document.getElementById("btnStart");
  const btnHow         = document.getElementById("btnHow");
  const btnCloseHow    = document.getElementById("btnCloseHow");
  const btnMute        = document.getElementById("btnMute");
  const btnPause       = document.getElementById("btnPause");
  const btnRestart     = document.getElementById("btnRestartLevel");
  const btnRestartGame = document.getElementById("btnRestartGame");
  const btnPresent     = document.getElementById("btnPresent");
  const playerNameInput= document.getElementById("playerName");
  const gameOverOverlay= document.getElementById("gameOverOverlay");
  const winOverlay     = document.getElementById("winOverlay");

  const hitFlash   = document.createElement("div"); hitFlash.id = "hitFlash";   document.body.appendChild(hitFlash);
  const bonusStars = document.createElement("div"); bonusStars.id = "bonusStars"; document.body.appendChild(bonusStars);

  let playerName = "";
  let presentationMode = false;
  let quizStreak = 0; // respostas certas consecutivas

  // ===== Áudio — original do Drummond =====
  let audioCtx = null, muted = false, highContrast = false;

  function ensureAudio() {
    if (muted) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  function beep({ freq=440, dur=0.08, type="square", vol=0.06, slideTo=null }) {
    if (muted || !audioCtx) return;
    const t0 = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }

  // Melodia de Grândola, Vila Morena
  function playGrandola() {
    if (muted) return;
    ensureAudio();
    const melody = [
      {f:392,d:0.18},{f:392,d:0.18},{f:392,d:0.18},
      {f:349,d:0.18},{f:311,d:0.18},{f:294,d:0.18},{f:262,d:0.28},
      {f:294,d:0.18},{f:311,d:0.18},{f:349,d:0.18},{f:392,d:0.36}
    ];
    let ms = 0;
    melody.forEach(n => {
      const dur = n.d, freq = n.f;
      setTimeout(() => beep({ freq, dur, type:"triangle", vol:0.045 }), ms * 1000);
      ms += n.d + 0.04;
    });
  }

  const SFX = {
    jump()    { beep({ freq:520, dur:0.08, type:"square",   vol:0.06,  slideTo:660  }); },
    coin()    { beep({ freq:900, dur:0.06, type:"square",   vol:0.055, slideTo:1400 }); },
    hit()     { beep({ freq:220, dur:0.10, type:"sawtooth", vol:0.055, slideTo:160  }); setTimeout(() => beep({ freq:140, dur:0.14, type:"square", vol:0.05, slideTo:110 }), 120); },
    door()    { beep({ freq:660, dur:0.10, type:"triangle", vol:0.055, slideTo:990  }); },
    doorOpen() {
      // Trinco a destrancar
      beep({ freq:280, dur:0.07, type:"square",   vol:0.05,  slideTo:320 });
      setTimeout(() => beep({ freq:440, dur:0.09, type:"triangle", vol:0.055, slideTo:660  }), 90);
      // Porta a abrir — glissando suave a subir
      setTimeout(() => beep({ freq:523, dur:0.12, type:"triangle", vol:0.055, slideTo:784  }), 200);
      setTimeout(() => beep({ freq:784, dur:0.14, type:"triangle", vol:0.055, slideTo:1046 }), 340);
      setTimeout(() => beep({ freq:1046,dur:0.18, type:"triangle", vol:0.055, slideTo:1318 }), 490);
    },
    power()   { beep({ freq:330, dur:0.10, type:"square",   vol:0.055, slideTo:880  }); },
    life()    { beep({ freq:740, dur:0.07, type:"triangle", vol:0.055, slideTo:1040 }); },
    win() {
      beep({ freq:523, dur:0.07, type:"square", vol:0.055, slideTo:659 });
      setTimeout(() => beep({ freq:659, dur:0.07, type:"square", vol:0.055, slideTo:784  }), 90);
      setTimeout(() => beep({ freq:784, dur:0.10, type:"square", vol:0.055, slideTo:1046 }), 180);
    },
    gameOver() {
      [330,262,196].forEach((n,i) => setTimeout(() => beep({ freq:n, dur:0.18, type:"square", vol:0.055, slideTo:n*0.75 }), i*220));
    },
    finalWin() {
      [523,659,784,1046,988,784,1046,1318].forEach((n,i) => setTimeout(() =>
        beep({ freq:n, dur:i<3?0.08:0.10, type:"square", vol:0.055, slideTo:n*1.12 }), i*95));
      setTimeout(() => beep({ freq:1568, dur:0.14, type:"triangle", vol:0.055, slideTo:1760 }), 8*95+80);
    }
  };
  // ===== Streak badge =====
  let streakTimeout = null;
  function showStreakBadge(streak) {
    const el = document.getElementById("streakBadge");
    if (!el) return;
    if (streakTimeout) clearTimeout(streakTimeout);
    const labels = ["","","🌹 2 seguidas!","✊ 3 seguidas!","⭐ 4 seguidas!","🔥 Incrível! 5 seguidas!"];
    const label = streak >= 2 ? (labels[Math.min(streak, 5)] || `🔥 ${streak} seguidas!`) : null;
    if (!label) { el.classList.remove("show"); return; }
    el.textContent = label;
    el.classList.add("show");
    streakTimeout = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // ===== Guardar =====
  const SAVE_KEY = "vanbertos_abril25_v2";
  function saveGame() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ muted, highContrast, currentLevel, score, lives })); } catch {}
  }
  function loadGame() {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
      if (typeof d.muted === "boolean") muted = d.muted;
      if (typeof d.highContrast === "boolean") { highContrast = d.highContrast; document.body.classList.toggle("high-contrast", highContrast); }
    } catch {}
  }

  // ===== Elogios =====
  const PRAISE = ["🌹 Excelente!", "✊ Muito bem!", "📰 Boa resposta!", "🕊️ Fantástico!", "⭐ Brilhante!", "🇵🇹 Continua assim!"];
  function pickPraise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

  function showFloat(scene, x, y, msg, color="#8b0000") {
    const t = scene.add.text(x, y, msg, { fontSize:"24px", fontStyle:"900", color, stroke:"#fdf6e3", strokeThickness:5 }).setOrigin(0.5).setDepth(999);
    scene.tweens.add({ targets:t, y:y-44, alpha:0, duration:640, ease:"Sine.easeOut", onComplete:()=>t.destroy() });
  }

  // ===== Quiz stats =====
  const quizStats = { total:0, correct:0, everWrong:false, errors:[] };
  const usedQuizByLevel = {};
  let lastQuizTheme = "estado_novo";

  function resetQuizStats() { quizStats.total=0; quizStats.correct=0; quizStats.everWrong=false; quizStats.errors=[]; quizStreak=0; }

  function pickQuizForLevel(levelIdx, theme) {
    const pool = QUIZ_BY_THEME[theme] || QUIZ_BY_THEME["estado_novo"];
    if (!usedQuizByLevel[levelIdx]) usedQuizByLevel[levelIdx] = new Set();
    const used = usedQuizByLevel[levelIdx];
    if (used.size >= pool.length) used.clear();
    let pick = Math.floor(Math.random() * pool.length), g = 0;
    while (used.has(pick) && g < 50) { pick = Math.floor(Math.random() * pool.length); g++; }
    used.add(pick);
    return pool[pick];
  }

  // =========================================================
  // "SABIAS QUE…?" — NARRATIVA CRONOLÓGICA (10 capítulos)
  // História contada na sequência dos acontecimentos reais.
  // Factos verificados e datados com precisão.
  // =========================================================
  const HISTORY = [
    {
      title: "📖 Cap. 1 · O Estado Novo",
      text: "Portugal viveu 48 anos sob ditadura. Em 1926 um golpe militar derrubou a república e instalou uma ditadura. Salazar tomou o poder em 1932 e criou o Estado Novo com a Constituição de 1933 — proibindo partidos de oposição, censurando os jornais e usando a PIDE para prender quem criticasse o governo. Desde 1961, Portugal travava guerras em África (Angola, Guiné-Bissau e Moçambique) para manter as suas colónias."
    },
    {
      title: "📖 Cap. 2 · O MFA — Os Capitães de Abril",
      text: "Em setembro de 1973, jovens capitães e majores cansados da guerra colonial fundaram secretamente o MFA — Movimento das Forças Armadas. Cerca de 200 militares planearam um golpe para derrubar o regime sem violência. O major Otelo Saraiva de Carvalho ficou responsável pelas operações. A contagem decrescente tinha começado."
    },
    {
      title: "📖 Cap. 3 · 24 abr. 22h55 — O Primeiro Sinal",
      text: "Na noite de 24 de abril de 1974, os militares do MFA estavam de ouvido colado ao rádio. Às 22h55, a Rádio Renascença tocou 'E Depois do Adeus', de Paulo de Carvalho — era o Sinal 1! Os soldados deviam preparar-se e aguardar a confirmação definitiva."
    },
    {
      title: "📖 Cap. 4 · 25 abr. 0h25 — Grândola!",
      text: "À meia-noite e vinte e cinco do dia 25 de abril de 1974, a Rádio Clube Português tocou 'Grândola, Vila Morena' de Zeca Afonso — uma canção proibida pelo regime! Era o Sinal 2: a revolução estava a começar. Os portões dos quartéis abriram-se e os tanques avançaram pelas ruas de Lisboa."
    },
    {
      title: "📖 Cap. 5 · Manhã do 25 abr. — Os Cravos",
      text: "Celeste Caeiro trabalhava no restaurante Franjinhas, que celebrava o seu 1.º aniversário com cravos para os clientes. Como o restaurante não abriu por causa da revolução, ela foi oferecer os cravos aos soldados. Um sargento colocou o cravo no cano da espingarda — e assim nasceu o símbolo eterno da Revolução dos Cravos!"
    },
    {
      title: "📖 Cap. 6 · 25 abr. 19h30 — A Rendição",
      text: "Marcello Caetano refugiou-se no Quartel do Carmo, em Lisboa, cercado por tanques e por milhares de portugueses a gritar 'Liberdade!'. Às 19h30 rendeu-se ao General António de Spínola. Quarenta e oito anos de ditadura acabavam numa tarde de primavera — quase sem uma gota de sangue."
    },
    {
      title: "📖 Cap. 7 · 1974–1975 — As Guerras Acabam",
      text: "Com o 25 de Abril, a PIDE foi extinta, os presos políticos foram libertados e a censura acabou. As colónias tornaram-se independentes: Guiné-Bissau em setembro de 1974, Moçambique em junho de 1975, Angola em novembro de 1975. Cerca de 800 000 portugueses regressaram de África — os chamados 'retornados'."
    },
    {
      title: "📖 Cap. 8 · 25 abr. 1975 — As Primeiras Eleições",
      text: "Exatamente um ano depois, a 25 de abril de 1975, os portugueses votaram livremente pela primeira vez em décadas! A participação foi de 91,7%. O Partido Socialista de Mário Soares ganhou com 37,9% dos votos. Era a Assembleia Constituinte — ia escrever a nova Constituição democrática de Portugal."
    },
    {
      title: "📖 Cap. 9 · 2 abr. 1976 — A Constituição",
      text: "A nova Constituição da República Portuguesa foi aprovada a 2 de abril de 1976 e entrou em vigor a 25 de abril desse ano — dois anos exatos após a revolução! O General Eanes foi eleito Presidente e Mário Soares tornou-se o primeiro Primeiro-Ministro constitucional. Portugal era uma democracia!"
    },
    {
      title: "📖 Cap. 10 · Hoje · 52 Anos de Liberdade",
      text: "O 25 de abril é o 'Dia da Liberdade' — feriado nacional de Portugal. A revolução foi quase pacífica: apenas quatro pessoas morreram, baleadas por agentes da PIDE junto à sua sede, na Rua António Maria Cardoso, em Lisboa. Em 1986, Portugal entrou na União Europeia. Em 2026, celebramos 52 anos de liberdade — e o cravo vermelho é para sempre o símbolo da democracia portuguesa!"
    }
  ];

  let pausedByTeacher = false;

  function showHistory(levelIndex, onDone) {
    const entry = HISTORY[levelIndex] || null;
    if (!entry) { onDone?.(); return; }
    awaitingStory = true;
    historyText.innerHTML = `<strong class="history-title">${entry.title}</strong>\n${entry.text}`;
    // Render chapter progress dots
    const dotsEl = document.getElementById("chapterProgress");
    if (dotsEl) {
      dotsEl.innerHTML = "";
      for (let i = 0; i < HISTORY.length; i++) {
        const dot = document.createElement("div");
        dot.className = "chapter-dot" + (i < levelIndex ? " done" : (i === levelIndex ? " current" : " future"));
        dot.title = `Capítulo ${i+1}`;
        dotsEl.appendChild(dot);
      }
    }
    historyOverlay.classList.remove("hidden");
    if (sceneRef) sceneRef.physics.pause();
    btnHistory.onclick = () => {
      historyOverlay.classList.add("hidden");
      awaitingStory = false;
      // Não resume física aqui — a callback de loadLevel trata disso
      onDone?.();
    };
  }

  // ===== Dicas =====
  const QUIZ_TIPS = {
    estado_novo:  "A ditadura durou 48 anos (1926–1974). O Estado Novo de Salazar foi criado com a Constituição de 1933. Marcello Caetano governava em 1974.",
    mfa:          "O MFA foi criado em setembro de 1973 por capitães e majores cansados da guerra colonial em África.",
    sinal1:       "'E Depois do Adeus' de Paulo de Carvalho, às 22h55 na Rádio Renascença, foi o primeiro sinal do MFA.",
    grandola:     "'Grândola, Vila Morena' de Zeca Afonso, às 0h25 na Rádio Clube Português, foi o sinal definitivo.",
    cravos:       "Celeste Caeiro, do restaurante Franjinhas, ofereceu cravos aos soldados na manhã do 25 de Abril.",
    rendição:     "Marcello Caetano rendeu-se às 19h30 no Quartel do Carmo, em Lisboa, ao General Spínola.",
    colonial:     "As colónias tornaram-se independentes: Guiné-Bissau (set. 1974), Moçambique (jun. 1975), Angola (nov. 1975).",
    eleicoes:     "A 25 de abril de 1975, nas primeiras eleições livres, o PS de Soares ganhou com 37,9%.",
    constituicao: "A Constituição foi aprovada a 2 de abril de 1976 e entrou em vigor a 25 de abril de 1976.",
    legado:       "O 25 de abril é o 'Dia da Liberdade'. Portugal entrou na CEE a 1 de janeiro de 1986."
  };

  // ===== Perguntas — historicamente verificadas =====
  const QUIZ_BY_THEME = {
    estado_novo: [
      { q:"Quantos anos durou a ditadura em Portugal até ao 25 de Abril?", a:[{t:"48 anos (1926–1974)",ok:true},{t:"25 anos (1949–1974)",ok:false},{t:"41 anos (1933–1974)",ok:false}], exp:"A ditadura começou com o golpe militar de 28 de maio de 1926 e acabou com o 25 de Abril de 1974 — 48 anos no total. O Estado Novo propriamente dito, com a Constituição de Salazar, data de 1933." },
      { q:"Quem governava Portugal quando aconteceu o 25 de Abril de 1974?", a:[{t:"Marcello Caetano",ok:true},{t:"António de Oliveira Salazar",ok:false},{t:"General António de Spínola",ok:false}], exp:"Salazar sofreu um AVC em setembro de 1968 e morreu em 1970. Marcello Caetano governou de 1968 até ao 25 de Abril de 1974." },
      { q:"O que era a PIDE?", a:[{t:"A polícia política do regime, que prendia e perseguia opositores",ok:true},{t:"O partido que governava Portugal",ok:false},{t:"O serviço de saúde pública",ok:false}], exp:"A PIDE (Polícia Internacional e de Defesa do Estado), criada em 1945, era a polícia política temida que prendia, torturava e vigiava os opositores do Estado Novo." },
      { q:"O que havia nos jornais durante o Estado Novo?", a:[{t:"Censura prévia — os textos eram aprovados antes de serem publicados",ok:true},{t:"Total liberdade de imprensa",ok:false},{t:"Só jornais estrangeiros eram permitidos",ok:false}], exp:"No Estado Novo existia censura prévia: os textos tinham de passar pelos censores do regime antes de serem publicados. O que criticasse o governo era cortado." },
      { q:"Com que Constituição Salazar criou o Estado Novo?", a:[{t:"A Constituição de 1933",ok:true},{t:"A Constituição de 1910",ok:false},{t:"A Constituição de 1926",ok:false}], exp:"Salazar tornou-se Presidente do Conselho em 1932 e criou o Estado Novo formalmente com a Constituição de 1933." },
    ],
    mfa: [
      { q:"O que significa a sigla MFA?", a:[{t:"Movimento das Forças Armadas",ok:true},{t:"Ministério das Forças Armadas",ok:false},{t:"Movimento das Forças Aliadas",ok:false}], exp:"MFA significa Movimento das Forças Armadas — a organização secreta de militares que planeou e executou o golpe de 25 de Abril de 1974." },
      { q:"Como foram conhecidos os oficiais do MFA que fizeram a revolução?", a:[{t:"Capitães de Abril",ok:true},{t:"Generais da Liberdade",ok:false},{t:"Soldados do Carmo",ok:false}], exp:"Os oficiais do MFA — sobretudo capitães e majores — ficaram conhecidos na história como 'Capitães de Abril'." },
      { q:"Em que ano foi criado o MFA?", a:[{t:"1973",ok:true},{t:"1970",ok:false},{t:"1975",ok:false}], exp:"O MFA foi criado em setembro de 1973, numa reunião secreta de oficiais descontentes com as guerras coloniais e com o regime." },
      { q:"Qual foi a principal razão que levou os oficiais a criar o MFA?", a:[{t:"O cansaço com as guerras coloniais em África que duravam há mais de 10 anos",ok:true},{t:"Uma crise económica muito grave em Portugal",ok:false},{t:"A morte de Salazar em 1970",ok:false}], exp:"Os capitães estavam esgotados de combater guerras sem fim em Angola, Guiné-Bissau e Moçambique, sem perspetiva de solução política." },
      { q:"Quem coordenou o planeamento operacional do golpe pelo MFA?", a:[{t:"Major Otelo Saraiva de Carvalho",ok:true},{t:"General António de Spínola",ok:false},{t:"Álvaro Cunhal",ok:false}], exp:"O major Otelo Saraiva de Carvalho foi o principal responsável pelo planeamento operacional — o 'cérebro' das operações militares do 25 de Abril." },
    ],
    sinal1: [
      { q:"Qual foi o primeiro sinal dado aos militares do MFA na noite de 24 de abril?", a:[{t:"'E Depois do Adeus', de Paulo de Carvalho, na Rádio Renascença",ok:true},{t:"'Grândola, Vila Morena', de Zeca Afonso, na Rádio Clube Português",ok:false},{t:"Uma mensagem em código na televisão",ok:false}], exp:"Às 22h55 do dia 24 de abril, a Rádio Renascença transmitiu 'E Depois do Adeus' de Paulo de Carvalho — o Sinal 1: os militares deviam preparar-se." },
      { q:"A que horas foi transmitida 'E Depois do Adeus' como primeiro sinal?", a:[{t:"22h55 do dia 24 de abril de 1974",ok:true},{t:"0h25 do dia 25 de abril de 1974",ok:false},{t:"7h00 do dia 25 de abril de 1974",ok:false}], exp:"Às 22h55 do dia 24 de abril, a Rádio Renascença transmitiu 'E Depois do Adeus' — o Sinal 1 para os militares se prepararem." },
      { q:"Em que evento tinha participado 'E Depois do Adeus' em 1974?", a:[{t:"No Festival da Eurovisão, em março de 1974",ok:true},{t:"No Festival da Canção Portuguesa, em 1973",ok:false},{t:"Nunca tinha sido transmitida antes",ok:false}], exp:"'E Depois do Adeus', de Paulo de Carvalho, representou Portugal no Festival da Eurovisão de 1974, realizado em Brighton, em março desse ano." },
      { q:"O que significava para os militares do MFA ouvir 'E Depois do Adeus' na rádio?", a:[{t:"Era o sinal para se prepararem e ficarem de prontidão",ok:true},{t:"Era o sinal para atacar imediatamente",ok:false},{t:"Era o sinal de que a revolução tinha falhado",ok:false}], exp:"'E Depois do Adeus' era o Sinal 1: ao ouvi-la, os militares do MFA deviam preparar-se e aguardar o segundo sinal definitivo." },
    ],
    grandola: [
      { q:"Qual foi o sinal definitivo para o início das operações do 25 de Abril?", a:[{t:"'Grândola, Vila Morena', de Zeca Afonso, na Rádio Clube Português",ok:true},{t:"'E Depois do Adeus', de Paulo de Carvalho, na Rádio Renascença",ok:false},{t:"Um comunicado na televisão pública",ok:false}], exp:"Às 0h25 do dia 25 de abril, a Rádio Clube Português transmitiu 'Grândola, Vila Morena' — o Sinal 2: as operações militares podiam começar." },
      { q:"Quem compôs 'Grândola, Vila Morena'?", a:[{t:"Zeca Afonso (José Afonso)",ok:true},{t:"Amália Rodrigues",ok:false},{t:"Paulo de Carvalho",ok:false}], exp:"José Manuel Cerqueira Afonso dos Santos, conhecido como Zeca Afonso (1929–1987), compôs 'Grândola, Vila Morena', editada no álbum Cantigas do Maio em 1971." },
      { q:"Porque era 'Grândola, Vila Morena' considerada especial como sinal?", a:[{t:"Era uma canção proibida pelo regime — a sua transmissão era um ato revolucionário",ok:true},{t:"Era o hino oficial do MFA",ok:false},{t:"Era a canção favorita do General Spínola",ok:false}], exp:"O regime proibiu 'Grândola, Vila Morena' por a considerar subversiva. Transmiti-la na rádio era em si um ato de rebeldia que confirmava que a revolução tinha começado." },
      { q:"A que horas foi transmitida 'Grândola, Vila Morena' como sinal definitivo?", a:[{t:"0h25 do dia 25 de abril de 1974",ok:true},{t:"22h55 do dia 24 de abril de 1974",ok:false},{t:"6h00 da manhã do dia 25",ok:false}], exp:"Às 0h25 do dia 25 de abril, a Rádio Clube Português transmitiu 'Grândola, Vila Morena' — as operações militares do MFA começaram de imediato." },
      { q:"Em que estação de rádio foi transmitida 'Grândola' como sinal da revolução?", a:[{t:"Rádio Clube Português",ok:true},{t:"Rádio Renascença",ok:false},{t:"Rádio Nacional",ok:false}], exp:"A Rádio Clube Português transmitiu 'Grândola, Vila Morena' às 0h25. Tinha sido a Rádio Renascença a transmitir o primeiro sinal, às 22h55 do dia anterior." },
    ],
    cravos: [
      { q:"Quem ofereceu os primeiros cravos aos soldados na manhã do 25 de Abril?", a:[{t:"Celeste Caeiro, funcionária do restaurante Franjinhas",ok:true},{t:"Uma enfermeira do Hospital de Santa Maria",ok:false},{t:"Uma professora da escola próxima",ok:false}], exp:"Celeste Caeiro trabalhava no restaurante Franjinhas, que celebrava naquele dia o seu primeiro aniversário. Com os cravos que sobraram, foi oferecê-los aos soldados." },
      { q:"Onde trabalhava Celeste Caeiro quando ofereceu os cravos?", a:[{t:"No restaurante Franjinhas, em Lisboa",ok:true},{t:"Num hospital militar em Lisboa",ok:false},{t:"Numa florista da Rua do Ouro",ok:false}], exp:"O restaurante Franjinhas, na Rua Ivens em Lisboa, celebrava o seu primeiro aniversário no dia 25 de abril. Tinha cravos preparados para os clientes — mas não abriu por causa da revolução." },
      { q:"O que fizeram os soldados com os cravos?", a:[{t:"Puseram-nos nos canos das espingardas",ok:true},{t:"Guardaram-nos para oferecer às famílias",ok:false},{t:"Jogaram-nos para o chão",ok:false}], exp:"Um sargento colocou o primeiro cravo no cano da sua espingarda e o gesto espalhou-se. Os cravos nos canos das armas tornaram-se o símbolo eterno da revolução." },
      { q:"Como ficou conhecida a revolução do 25 de Abril por causa dos cravos?", a:[{t:"Revolução dos Cravos",ok:true},{t:"Revolução das Flores",ok:false},{t:"Revolução Vermelha",ok:false}], exp:"A revolução ficou conhecida internacionalmente como 'Revolução dos Cravos' (Carnation Revolution), pelo símbolo dos cravos nos canos das espingardas." },
    ],
    rendição: [
      { q:"Onde se rendeu Marcello Caetano no dia 25 de Abril?", a:[{t:"No Quartel General da GNR, no Largo do Carmo, em Lisboa",ok:true},{t:"No Palácio de Belém",ok:false},{t:"Na Assembleia Nacional",ok:false}], exp:"Marcello Caetano refugiou-se no Quartel General da GNR no Largo do Carmo. Rodeado por tanques e populares, rendeu-se às 19h30." },
      { q:"A que horas se rendeu Marcello Caetano?", a:[{t:"Às 19h30",ok:true},{t:"Às 7h30 da manhã",ok:false},{t:"À meia-noite do dia 25",ok:false}], exp:"Marcello Caetano rendeu-se às 19h30 do dia 25 de abril de 1974, depois de horas sitiado no Quartel do Carmo." },
      { q:"A quem Marcello Caetano entregou o poder?", a:[{t:"Ao General António de Spínola",ok:true},{t:"Ao major Otelo Saraiva de Carvalho",ok:false},{t:"A Mário Soares",ok:false}], exp:"Caetano entregou o poder ao General António de Spínola, que se tornou presidente da Junta de Salvação Nacional e depois Presidente da República." },
      { q:"Quantas pessoas morreram no próprio dia 25 de Abril?", a:[{t:"Quatro, baleadas por agentes da PIDE junto à sede da PIDE",ok:true},{t:"Nenhuma — não houve qualquer vítima",ok:false},{t:"Centenas, num bombardeamento da cidade",ok:false}], exp:"Quatro pessoas foram baleadas por agentes da PIDE que dispararam da janela da sua sede, na Rua António Maria Cardoso (Chiado), sobre a multidão. O Largo do Carmo foi onde Caetano se rendeu — local diferente." },
      { q:"Quando regressou Mário Soares a Portugal depois do exílio?", a:[{t:"A 28 de abril de 1974",ok:true},{t:"A 25 de abril de 1974",ok:false},{t:"A 10 de junho de 1974",ok:false}], exp:"Mário Soares, líder do Partido Socialista, regressou do exílio em Paris a 28 de abril de 1974, três dias após a revolução." },
    ],
    colonial: [
      { q:"Em quantas colónias africanas Portugal travava guerras em 1974?", a:[{t:"Três: Angola, Guiné-Bissau e Moçambique",ok:true},{t:"Cinco colónias africanas",ok:false},{t:"Apenas uma: Angola",ok:false}], exp:"Em 1974, Portugal combatia em três frentes: Angola (guerra desde 1961), Guiné-Bissau (desde 1963) e Moçambique (desde 1964)." },
      { q:"Qual foi a primeira ex-colónia portuguesa a tornar-se independente após o 25 de Abril?", a:[{t:"Guiné-Bissau, a 10 de setembro de 1974",ok:true},{t:"Angola, a 11 de novembro de 1974",ok:false},{t:"Moçambique, a 25 de junho de 1974",ok:false}], exp:"A Guiné-Bissau foi a primeira — tornou-se independente a 10 de setembro de 1974. Moçambique seguiu em junho de 1975 e Angola em novembro de 1975." },
      { q:"Quando tornou Moçambique independente?", a:[{t:"25 de junho de 1975",ok:true},{t:"10 de setembro de 1974",ok:false},{t:"11 de novembro de 1975",ok:false}], exp:"Moçambique tornou-se independente a 25 de junho de 1975. A Frelimo, que tinha liderado a luta armada, passou a governar o novo país." },
      { q:"Quantos portugueses regressaram das ex-colónias após as independências?", a:[{t:"Cerca de 800 000 — os chamados 'retornados'",ok:true},{t:"Cerca de 50 000",ok:false},{t:"Cerca de 5 milhões",ok:false}], exp:"Estima-se que cerca de 800 000 portugueses regressaram das ex-colónias africanas após as independências de 1974–75. Ficaram conhecidos como 'retornados'." },
    ],
    eleicoes: [
      { q:"Em que data se realizaram as primeiras eleições livres em Portugal?", a:[{t:"25 de abril de 1975",ok:true},{t:"25 de novembro de 1975",ok:false},{t:"2 de abril de 1976",ok:false}], exp:"As primeiras eleições livres em Portugal realizaram-se a 25 de abril de 1975 — exatamente um ano após a revolução — para a Assembleia Constituinte." },
      { q:"Para que órgão foram as eleições de 25 de abril de 1975?", a:[{t:"Assembleia Constituinte — para escrever a nova Constituição",ok:true},{t:"Assembleia da República (Parlamento)",ok:false},{t:"Presidência da República",ok:false}], exp:"As eleições de 25 de abril de 1975 elegeram a Assembleia Constituinte, cujo objetivo era redigir a nova Constituição democrática de Portugal." },
      { q:"Qual foi a percentagem de eleitores que foi votar em 25 de abril de 1975?", a:[{t:"91,7% dos eleitores inscritos",ok:true},{t:"45% dos eleitores inscritos",ok:false},{t:"60% dos eleitores inscritos",ok:false}], exp:"A participação foi extraordinária: 91,7% dos eleitores inscritos foram votar, demonstrando o enorme entusiasmo dos portugueses com a democracia." },
      { q:"Que partido ganhou as eleições de 25 de abril de 1975, e com que percentagem?", a:[{t:"Partido Socialista (PS) com 37,9% dos votos",ok:true},{t:"Partido Comunista Português (PCP) com 37,9%",ok:false},{t:"PPD (atual PSD) com 37,9%",ok:false}], exp:"O PS, liderado por Mário Soares, ficou em primeiro lugar com 37,9%. O PPD teve 26,4%, o PCP 12,5% e o CDS 7,6%." },
    ],
    constituicao: [
      { q:"Em que data foi aprovada a Constituição da República Portuguesa democrática?", a:[{t:"2 de abril de 1976",ok:true},{t:"25 de abril de 1975",ok:false},{t:"25 de novembro de 1975",ok:false}], exp:"A Constituição da República Portuguesa foi aprovada pela Assembleia Constituinte a 2 de abril de 1976 e entrou em vigor a 25 de abril de 1976." },
      { q:"Em que data entrou em vigor a Constituição de 1976?", a:[{t:"25 de abril de 1976 — dois anos exatos após a revolução",ok:true},{t:"1 de janeiro de 1976",ok:false},{t:"2 de abril de 1976, no mesmo dia da aprovação",ok:false}], exp:"A Constituição foi aprovada a 2 de abril de 1976 mas entrou em vigor a 25 de abril de 1976, exactamente dois anos depois da Revolução dos Cravos." },
      { q:"Quem foi eleito Presidente da República em junho de 1976?", a:[{t:"General António Ramalho Eanes",ok:true},{t:"Mário Soares",ok:false},{t:"General António de Spínola",ok:false}], exp:"O General António Ramalho Eanes foi eleito Presidente da República a 27 de junho de 1976, com 61,5% dos votos, na primeira eleição presidencial democrática." },
      { q:"Quem foi o primeiro Primeiro-Ministro constitucional de Portugal?", a:[{t:"Mário Soares, que tomou posse em julho de 1976",ok:true},{t:"Álvaro Cunhal",ok:false},{t:"Francisco de Sá Carneiro",ok:false}], exp:"Mário Soares, líder do PS, tornou-se o primeiro Primeiro-Ministro constitucional, tomando posse em julho de 1976 à frente de um governo minoritário socialista." },
    ],
    legado: [
      { q:"Como se chama o feriado nacional do dia 25 de abril em Portugal?", a:[{t:"Dia da Liberdade",ok:true},{t:"Dia de Portugal",ok:false},{t:"Dia da República",ok:false}], exp:"O 25 de abril é o 'Dia da Liberdade'. O 'Dia de Portugal' celebra-se a 10 de junho (dia da morte de Camões). O 5 de outubro é o 'Dia da República'." },
      { q:"Em que ano Portugal aderiu à Comunidade Económica Europeia (atual União Europeia)?", a:[{t:"1 de janeiro de 1986",ok:true},{t:"25 de abril de 1975",ok:false},{t:"1 de janeiro de 2000",ok:false}], exp:"Portugal assinou o tratado de adesão à CEE em 12 de junho de 1985 e aderiu efetivamente a 1 de janeiro de 1986, consolidando a democracia no contexto europeu." },
      { q:"Que canção é o símbolo musical do 25 de Abril?", a:[{t:"'Grândola, Vila Morena', de Zeca Afonso",ok:true},{t:"'A Portuguesa' (hino nacional)",ok:false},{t:"'E Depois do Adeus', de Paulo de Carvalho",ok:false}], exp:"'Grândola, Vila Morena', de Zeca Afonso, é o hino informal do 25 de Abril — a canção que deu o sinal da revolução e que se canta em todas as cerimónias do Dia da Liberdade." },
      { q:"Quantas pessoas morreram no dia 25 de Abril de 1974?", a:[{t:"Quatro, baleadas por agentes da PIDE",ok:true},{t:"Nenhuma — a revolução foi totalmente pacífica",ok:false},{t:"Dezenas, numa batalha pela rádio",ok:false}], exp:"Quatro pessoas morreram no próprio dia — baleadas por agentes da PIDE junto à sua sede na Rua António Maria Cardoso. A revolução foi, em larga medida, pacífica." },
    ],
  };

  const THEMES = [
    // Cap. 1 — Estado Novo: céu azul-celeste claro (como Drummond nível 1)
    { skyTop:0x87ceeb, skyBot:0xc8e6f0, ground:0x5a7a3a, doorTint:0xcc3333, hillColor:0x4a6a2a, grassTop:0x5a8a3a,
      doorEmoji:"🔒", platformStyle:"stone" },
    // Cap. 2 — MFA conspira: céu dourado de final de tarde
    { skyTop:0xfde68a, skyBot:0xfff3d0, ground:0x5a7a3a, doorTint:0xcc8800, hillColor:0x4a6a28, grassTop:0x5a8a38,
      doorEmoji:"🌙", platformStyle:"stone" },
    // Cap. 3 — Primeiro sinal: céu azul-esverdeado luminoso
    { skyTop:0xa8d8ea, skyBot:0xd4edf7, ground:0x3a6a28, doorTint:0x2266cc, hillColor:0x3a6030, grassTop:0x4a7a40,
      doorEmoji:"📻", platformStyle:"stone" },
    // Cap. 4 — Grândola: céu laranja-rosa de pôr do sol (belo e visível)
    { skyTop:0xf4a460, skyBot:0xfdd090, ground:0x4a6a28, doorTint:0xcc2222, hillColor:0x4a6030, grassTop:0x5a7a40,
      doorEmoji:"🌹", platformStyle:"calçada" },
    // Cap. 5 — Cravos, aurora: céu rosa-laranja vibrante
    { skyTop:0xf08040, skyBot:0xf8c060, ground:0x5a8038, doorTint:0xcc2222, hillColor:0x5a7838, grassTop:0x6a9848,
      doorEmoji:"🌹", platformStyle:"calçada" },
    // Cap. 6 — Rendição, tarde de abril: céu azul claro e vivo
    { skyTop:0x60b0e0, skyBot:0xa0d8f8, ground:0x3a7030, doorTint:0xaa6600, hillColor:0x3a7830, grassTop:0x4a9040,
      doorEmoji:"🕊️", platformStyle:"calçada" },
    // Cap. 7 — Descolonização: azul-celeste tropical
    { skyTop:0x70c0e8, skyBot:0xa8e0f8, ground:0x3a7820, doorTint:0x226622, hillColor:0x3a8030, grassTop:0x4a9840,
      doorEmoji:"🌍", platformStyle:"calçada" },
    // Cap. 8 — Eleições 1975: azul-primavera festivo e alegre
    { skyTop:0x78c8e8, skyBot:0xb0e4f8, ground:0x3a8020, doorTint:0xcc2222, hillColor:0x388830, grassTop:0x48a040,
      doorEmoji:"🗳️", platformStyle:"calçada" },
    // Cap. 9 — Constituição: azul-celeste luminoso e claro
    { skyTop:0x88d0f0, skyBot:0xc0eaff, ground:0x3a8020, doorTint:0xaa7700, hillColor:0x388830, grassTop:0x48a040,
      doorEmoji:"📜", platformStyle:"calçada" },
    // Cap. 10 — Portugal livre: azul-Portugal solar e festivo
    { skyTop:0x50b8e8, skyBot:0x90d8f8, ground:0x208820, doorTint:0xcc2222, hillColor:0x208828, grassTop:0x30a838,
      doorEmoji:"🏆", platformStyle:"calçada" },
  ];

  // ===== Níveis — títulos com data/hora cronológica =====
  const LEVELS = [
    {
      name: "Cap. 1 · Portugal anos 60 · O Regime",
      chapterLabel: "Portugal, anos 1960\nO Estado Novo",
      theme:0, quizTheme:"estado_novo", worldW:2600,
      spawn:{x:120,y:460}, doorX:2100,
      platforms:[
        {x:450,y:520,w:900,h:28},{x:1040,y:450,w:300,h:22},{x:1380,y:380,w:270,h:22},
        {x:1700,y:310,w:240,h:22},{x:2050,y:520,w:900,h:28}
      ],
      items:[{x:1040,y:400,kind:"cravo"},{x:1380,y:330,kind:"jornal"},{x:1700,y:260,kind:"punho"}],
      malwares:[{x:1240,y:480,vx:130},{x:1960,y:480,vx:-150}]
    },
    {
      name: "Cap. 2 · Setembro 1973 · A Conspiração",
      chapterLabel: "Setembro de 1973\nO MFA",
      theme:1, quizTheme:"mfa", worldW:2800,
      spawn:{x:120,y:460}, doorX:2350,
      platforms:[
        {x:520,y:520,w:980,h:28},{x:900,y:450,w:240,h:22},{x:1180,y:380,w:240,h:22},
        {x:1460,y:310,w:240,h:22},{x:1740,y:380,w:240,h:22},{x:2020,y:450,w:240,h:22},
        {x:2380,y:520,w:980,h:28}
      ],
      items:[{x:900,y:400,kind:"jornal"},{x:1460,y:260,kind:"cravo_ouro"},{x:2020,y:400,kind:"cravo"}],
      malwares:[{x:1320,y:480,vx:145},{x:2140,y:480,vx:-155}]
    },
    {
      name: "Cap. 3 · 24 abr. 22h55 · O Primeiro Sinal",
      chapterLabel: "24 de abril, 22h55\n«E Depois do Adeus»",
      theme:2, quizTheme:"sinal1", worldW:2900,
      spawn:{x:120,y:460}, doorX:2500,
      platforms:[
        {x:520,y:520,w:1040,h:28},{x:840,y:460,w:240,h:22},{x:1180,y:390,w:240,h:22},
        {x:1520,y:320,w:240,h:22},{x:1860,y:390,w:240,h:22},{x:2200,y:460,w:240,h:22},
        {x:2480,y:520,w:1040,h:28}
      ],
      items:[{x:840,y:410,kind:"punho"},{x:1520,y:270,kind:"jornal"},{x:2200,y:410,kind:"cravo"}],
      malwares:[{x:1000,y:480,vx:150},{x:1700,y:480,vx:-160},{x:2350,y:480,vx:155}]
    },
    {
      name: "Cap. 4 · 25 abr. 0h25 · Grândola!",
      chapterLabel: "25 de abril, 0h25\n«Grândola, Vila Morena»",
      theme:3, quizTheme:"grandola", worldW:3000,
      spawn:{x:120,y:460}, doorX:2600,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:860,y:455,w:230,h:22},{x:1160,y:385,w:230,h:22},
        {x:1460,y:315,w:230,h:22},{x:1760,y:385,w:230,h:22},{x:2060,y:455,w:230,h:22},
        {x:2360,y:385,w:230,h:22},{x:2640,y:520,w:1000,h:28}
      ],
      items:[{x:860,y:405,kind:"cravo"},{x:1460,y:265,kind:"cravo_ouro"},{x:2060,y:405,kind:"punho"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1010,y:480,vx:160},{x:1610,y:480,vx:-165},{x:2210,y:480,vx:160}],
      playGrandola: true
    },
    {
      name: "Cap. 5 · 25 abr. manhã · Os Cravos",
      chapterLabel: "25 de abril, manhã\nOs Cravos",
      theme:4, quizTheme:"cravos", worldW:3100,
      spawn:{x:120,y:460}, doorX:2700,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:880,y:450,w:220,h:22},{x:1160,y:380,w:220,h:22},
        {x:1460,y:310,w:220,h:22},{x:1760,y:380,w:220,h:22},{x:2060,y:450,w:220,h:22},
        {x:2360,y:380,w:220,h:22},{x:2660,y:520,w:1000,h:28}
      ],
      items:[{x:880,y:400,kind:"punho"},{x:1460,y:260,kind:"cravo"},{x:2060,y:400,kind:"jornal"},{x:2360,y:330,kind:"cravo_ouro"}],
      malwares:[{x:1020,y:480,vx:165},{x:1620,y:480,vx:-170},{x:2220,y:480,vx:165},{x:2820,y:480,vx:-160}]
    },
    {
      name: "Cap. 6 · 25 abr. 19h30 · A Rendição",
      chapterLabel: "25 de abril, 19h30\nA Rendição no Carmo",
      theme:5, quizTheme:"rendição", worldW:3200,
      spawn:{x:120,y:460}, doorX:2800,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:900,y:448,w:205,h:22},{x:1180,y:375,w:205,h:22},
        {x:1460,y:305,w:205,h:22},{x:1740,y:375,w:205,h:22},{x:2020,y:448,w:205,h:22},
        {x:2300,y:375,w:205,h:22},{x:2580,y:448,w:205,h:22},{x:2900,y:520,w:1000,h:28}
      ],
      items:[{x:900,y:398,kind:"jornal"},{x:1460,y:255,kind:"cravo_ouro"},{x:2020,y:398,kind:"cravo"},{x:2580,y:398,kind:"punho"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1040,y:480,vx:170},{x:1640,y:480,vx:-175},{x:2240,y:480,vx:170},{x:2840,y:480,vx:-165}]
    },
    {
      name: "Cap. 7 · 1974–1975 · As Guerras Acabam",
      chapterLabel: "1974–1975\nA Descolonização",
      theme:6, quizTheme:"colonial", worldW:3300,
      spawn:{x:120,y:460}, doorX:2900,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:900,y:445,w:195,h:22},{x:1180,y:372,w:195,h:22},
        {x:1460,y:302,w:195,h:22},{x:1740,y:372,w:195,h:22},{x:2020,y:445,w:195,h:22},
        {x:2300,y:372,w:195,h:22},{x:2580,y:445,w:195,h:22},{x:2860,y:372,w:195,h:22},
        {x:2980,y:520,w:1000,h:28}
      ],
      items:[{x:900,y:395,kind:"cravo"},{x:1460,y:252,kind:"cravo_ouro"},{x:2020,y:395,kind:"jornal"},{x:2580,y:395,kind:"punho"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1040,y:480,vx:175},{x:1640,y:480,vx:-180},{x:2240,y:480,vx:175},{x:2840,y:480,vx:-170},{x:3080,y:480,vx:172}]
    },
    {
      name: "Cap. 8 · 25 abr. 1975 · As Primeiras Eleições",
      chapterLabel: "25 de abril de 1975\nAs Primeiras Eleições Livres",
      theme:7, quizTheme:"eleicoes", worldW:3400,
      spawn:{x:120,y:460}, doorX:3000,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:920,y:443,w:188,h:22},{x:1200,y:370,w:188,h:22},
        {x:1480,y:300,w:188,h:22},{x:1760,y:370,w:188,h:22},{x:2040,y:443,w:188,h:22},
        {x:2320,y:370,w:188,h:22},{x:2600,y:443,w:188,h:22},{x:2880,y:370,w:188,h:22},
        {x:3080,y:520,w:1000,h:28}
      ],
      items:[{x:920,y:393,kind:"jornal"},{x:1480,y:250,kind:"cravo_ouro"},{x:2040,y:393,kind:"cravo"},{x:2600,y:393,kind:"punho"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1060,y:480,vx:180},{x:1660,y:480,vx:-185},{x:2260,y:480,vx:180},{x:2860,y:480,vx:-175},{x:3160,y:480,vx:178}]
    },
    {
      name: "Cap. 9 · Abril 1976 · A Constituição",
      chapterLabel: "2 de abril de 1976\nA Constituição Democrática",
      theme:8, quizTheme:"constituicao", worldW:3500,
      spawn:{x:120,y:460}, doorX:3100,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:920,y:441,w:182,h:22},{x:1200,y:368,w:182,h:22},
        {x:1480,y:298,w:182,h:22},{x:1760,y:368,w:182,h:22},{x:2040,y:441,w:182,h:22},
        {x:2320,y:368,w:182,h:22},{x:2600,y:441,w:182,h:22},{x:2880,y:368,w:182,h:22},
        {x:3180,y:520,w:1000,h:28}
      ],
      items:[{x:920,y:391,kind:"punho"},{x:1480,y:248,kind:"cravo_ouro"},{x:2040,y:391,kind:"jornal"},{x:2600,y:391,kind:"cravo"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1060,y:480,vx:185},{x:1660,y:480,vx:-190},{x:2260,y:480,vx:185},{x:2860,y:480,vx:-180},{x:3240,y:480,vx:182}]
    },
    {
      name: "Cap. 10 · Hoje · 52 Anos de Liberdade",
      chapterLabel: "Hoje\n52 Anos de Liberdade",
      theme:9, quizTheme:"legado", worldW:3600,
      spawn:{x:120,y:460}, doorX:3200,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:920,y:442,w:185,h:22},{x:1200,y:368,w:185,h:22},
        {x:1480,y:298,w:185,h:22},{x:1760,y:368,w:185,h:22},{x:2040,y:442,w:185,h:22},
        {x:2320,y:368,w:185,h:22},{x:2600,y:442,w:185,h:22},{x:2880,y:368,w:185,h:22},
        {x:3150,y:520,w:1100,h:28}
      ],
      items:[{x:920,y:392,kind:"punho"},{x:1480,y:248,kind:"cravo_ouro"},{x:2040,y:392,kind:"jornal"},{x:2600,y:392,kind:"cravo"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1060,y:480,vx:190},{x:1660,y:480,vx:-195},{x:2260,y:480,vx:190},{x:2860,y:480,vx:-185},{x:3200,y:480,vx:188}]
    },
  ];

  // ===== Phaser =====
  let sceneRef=null, currentLevel=0;
  let bgGraphics, starsGraphics, hillsGraphics, groundGraphics, decorGraphics, shadowGfx;
  let clouds=[], starData=[], butterflies=[], petalEmitter=null;
  let player, platforms, itemsGroup, malwareGroup, door;
  let cursors, keySpace;
  let hudText, scoreText, heartsGfx, tipText, itemCountText;
  let progressBg, progressFill, powerIndicator;
  let pauseOverlayGfx, pauseVanImg, pauseLabel;
  let transitionGfx, transitionLabel;
  let chapterGfx, chapterText;
  let score=0, lives=3, livesLostThisLevel=0;
  const MAX_LIVES=5;
  let itemsCollected=0, itemsTotal=0;
  let touch={left:false,right:false,jump:false};
  let awaitingQuiz=false, awaitingStory=false;
  let powered=false, poweredTimer=null, powerCountdown=null, invuln=false;
  const GRAVITY=1100;

  const config = {
    type: Phaser.AUTO,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    width: 960, height: 540,
    parent: "game",
    backgroundColor: "#87ceeb",
    physics: { default:"arcade", arcade:{ gravity:{y:GRAVITY}, debug:false, overlapBias:12, tileBias:32 } },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 960,
      height: 540,
      min: { width: 320, height: 180 },
      max: { width: 1920, height: 1080 }
    },
    scene: { create, update }
  };

  const game = new Phaser.Game(config);
  window.__abril25_game = game;

  // ===== Baralhar array (Fisher-Yates) =====
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ===== QUIZ UI =====
  function showQuiz(quiz, onResult, isRetry=false) {
    if (!quiz) { onResult?.(true); return; }
    const tip = QUIZ_TIPS[lastQuizTheme] || "";
    quizQuestion.textContent = quiz.q;
    quizAnswers.innerHTML = "";
    quizFeedback.textContent = "";
    quizFeedback.className = "feedback";
    quizExplanation.textContent = "";
    quizExplanation.classList.add("hidden");
    btnCloseQuiz.textContent = "Continuar";
    btnCloseQuiz.classList.add("hidden");
    btnCloseQuiz.onclick = null;
    if (!isRetry) quizStats.total++;
    let firstTry = !isRetry;

    // Indicador de tentativas (3 pontos)
    const attemptsEl = document.getElementById("quizAttempts");
    if (attemptsEl && !isRetry) {
      attemptsEl.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const d = document.createElement("div");
        d.className = "quiz-attempt-dot";
        attemptsEl.appendChild(d);
      }
    }
    let attemptsUsed = isRetry ? 1 : 0;
    function markAttempt() {
      if (!attemptsEl) return;
      const dots = attemptsEl.querySelectorAll(".quiz-attempt-dot");
      if (dots[attemptsUsed]) dots[attemptsUsed].classList.add("used");
      attemptsUsed++;
    }

    // Baralhar as respostas para a resposta certa não ser sempre a primeira
    const answersShuffled = shuffleArray(quiz.a);

    answersShuffled.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = opt.t;
      btn.onclick = () => {
        if (opt.ok) {
          if (firstTry) {
            quizStats.correct++;
            quizStreak++;
            score += 20;
            scoreText.setText(`🌹 Pontos: ${score}`);
            showStreakBadge(quizStreak);
          }
          quizFeedback.textContent = pickPraise();
          quizFeedback.className = "feedback correct";
          if (quiz.exp) { quizExplanation.textContent = quiz.exp; quizExplanation.classList.remove("hidden"); }
          [...quizAnswers.children].forEach(b => { b.disabled = true; });
          btn.classList.add("correct-answer");
          markAttempt();
          btnCloseQuiz.classList.remove("hidden");
          ensureAudio(); SFX.coin();
          btnCloseQuiz.onclick = () => onResult?.(true);
        } else {
          if (firstTry) {
            firstTry = false;
            quizStreak = 0; // reset streak on wrong
            quizStats.everWrong = true;
            quizStats.errors.push({ q: quiz.q, wrong: opt.t, correct: quiz.a.find(a=>a.ok)?.t });
          }
          btn.disabled = true;
          btn.classList.add("wrong-answer");
          markAttempt();
          quizFeedback.textContent = `❌ Não é bem isso…\n💡 Dica: ${tip}`;
          quizFeedback.className = "feedback wrong";
          if (quiz.exp) { quizExplanation.textContent = quiz.exp; quizExplanation.classList.remove("hidden"); }
          ensureAudio(); SFX.hit();
          // Desativar todos os botões e mostrar botão para nova pergunta
          [...quizAnswers.children].forEach(b => b.disabled = true);
          btnCloseQuiz.textContent = "Tentar outra pergunta →";
          btnCloseQuiz.classList.remove("hidden");
          btnCloseQuiz.onclick = () => {
            btnCloseQuiz.textContent = "Continuar";
            const newQuiz = pickQuizForLevel(currentLevel, lastQuizTheme);
            showQuiz(newQuiz, onResult, true);
          };
        }
      };
      quizAnswers.appendChild(btn);
    });
    quizOverlay.classList.remove("hidden");
  }

  // ===== Texturas =====
  function makeTextures(scene) {
    makePlatformTexture(scene, "platform_stone", "stone");

    // ── Porta (muda por nível via tint) ──
    if (!scene.textures.exists("door_book")) {
      const dt=scene.textures.createCanvas("door_book",56,76), ctx=dt.getContext();
      const g=ctx.createLinearGradient(0,0,56,76);
      g.addColorStop(0,"#cc2222"); g.addColorStop(0.5,"#8b0000"); g.addColorStop(1,"#5a0000");
      ctx.fillStyle=g; rr(ctx,2,2,52,72,8); ctx.fill();
      ctx.strokeStyle="rgba(255,200,200,0.5)"; ctx.lineWidth=2; rr(ctx,6,6,44,64,5); ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,0.95)"; ctx.font="28px sans-serif"; ctx.textAlign="center";
      ctx.fillText("🌹",28,52);
      dt.refresh();
    }

    // ── Cravo vermelho ──
    if (!scene.textures.exists("item_cravo")) {
      const it=scene.textures.createCanvas("item_cravo",38,40), ctx=it.getContext();
      // Caule
      ctx.strokeStyle="#226600"; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(19,26); ctx.lineTo(19,38); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(19,33); ctx.quadraticCurveTo(12,28,10,25); ctx.stroke();
      // Pétalas externas
      const petals=[[19,14,10],[9,20,7],[29,20,7],[14,10,7],[24,10,7],[7,14,6],[31,14,6]];
      ctx.fillStyle="#cc0000";
      petals.forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();});
      // Centro
      ctx.fillStyle="#ff4444"; ctx.beginPath(); ctx.arc(19,16,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.28)"; ctx.beginPath(); ctx.arc(15,13,3.5,0,Math.PI*2); ctx.fill();
      it.refresh();
    }

    // ── Jornal (📰) ──
    if (!scene.textures.exists("item_jornal")) {
      const it=scene.textures.createCanvas("item_jornal",54,48), ctx=it.getContext();
      // Fundo papel
      ctx.fillStyle="#fefce8"; rr(ctx,2,2,50,44,4); ctx.fill();
      ctx.strokeStyle="#5a3a1a"; ctx.lineWidth=1.5; rr(ctx,2,2,50,44,4); ctx.stroke();
      // Manchete vermelha — canvas mais largo para o texto caber
      ctx.fillStyle="#cc2222"; ctx.fillRect(5,5,44,12);
      ctx.fillStyle="#fff"; ctx.font="bold 7px sans-serif"; ctx.textAlign="center";
      ctx.textBaseline="middle"; ctx.fillText("LIBERDADE",27,11);
      // Colunas de texto simuladas
      ctx.fillStyle="#5a3a1a";
      [21,26,31,37,42].forEach(y=>{ctx.fillRect(5,y,19,2);ctx.fillRect(29,y,19,2);});
      // Dobra de canto
      ctx.fillStyle="rgba(180,140,80,0.22)";
      ctx.beginPath(); ctx.moveTo(43,2); ctx.lineTo(52,2); ctx.lineTo(52,11); ctx.closePath(); ctx.fill();
      it.refresh();
    }

    // ── Rádio (📻) — símbolo dos sinais da revolução ──
    if (!scene.textures.exists("item_punho")) {
      const it=scene.textures.createCanvas("item_punho",42,38), ctx=it.getContext();
      // Corpo do rádio
      ctx.fillStyle="#e8a020";
      ctx.beginPath(); ctx.roundRect(3,10,36,24,4); ctx.fill();
      ctx.fillStyle="#c87c10";
      ctx.beginPath(); ctx.roundRect(3,28,36,6,{lowerLeft:4,lowerRight:4}); ctx.fill();
      // Ecrã/altifalante — grelha
      ctx.fillStyle="#1a1a2e";
      ctx.beginPath(); ctx.roundRect(6,13,16,14,2); ctx.fill();
      ctx.strokeStyle="#4a4a8a"; ctx.lineWidth=1;
      [15,17,19,21,23].forEach(y=>{ ctx.beginPath();ctx.moveTo(7,y);ctx.lineTo(21,y);ctx.stroke(); });
      // Botões
      ctx.fillStyle="#cc2222"; ctx.beginPath(); ctx.arc(30,17,4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#ff4444"; ctx.beginPath(); ctx.arc(30,17,2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#2244aa"; ctx.beginPath(); ctx.arc(30,26,3,0,Math.PI*2); ctx.fill();
      // Antena
      ctx.strokeStyle="#888"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(34,10); ctx.lineTo(38,2); ctx.stroke();
      ctx.fillStyle="#aaa"; ctx.beginPath(); ctx.arc(38,2,2,0,Math.PI*2); ctx.fill();
      // Ondas de rádio
      ctx.strokeStyle="rgba(255,140,0,0.7)"; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(30,17,7,Math.PI*1.3,Math.PI*1.7); ctx.stroke();
      ctx.beginPath(); ctx.arc(30,17,10,Math.PI*1.25,Math.PI*1.75); ctx.stroke();
      // Brilho
      ctx.fillStyle="rgba(255,255,255,0.2)";
      ctx.beginPath(); ctx.roundRect(4,11,34,6,2); ctx.fill();
      it.refresh();
    }

    // ── Cravo dourado (power-up) ──
    if (!scene.textures.exists("item_cravo_ouro")) {
      const it=scene.textures.createCanvas("item_cravo_ouro",44,44), ctx=it.getContext();
      // Aura
      const ag=ctx.createRadialGradient(22,22,6,22,22,22);
      ag.addColorStop(0,"rgba(255,220,60,0.85)"); ag.addColorStop(1,"rgba(255,180,0,0)");
      ctx.fillStyle=ag; ctx.beginPath(); ctx.arc(22,22,22,0,Math.PI*2); ctx.fill();
      // Caule dourado
      ctx.strokeStyle="#886600"; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(22,30); ctx.lineTo(22,42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(22,37); ctx.quadraticCurveTo(14,31,12,28); ctx.stroke();
      // Pétalas douradas
      [[22,16,10],[11,22,7],[33,22,7],[16,11,7],[28,11,7]].forEach(([x,y,r])=>{
        ctx.fillStyle="#e8b800"; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      });
      ctx.fillStyle="#ffdd44"; ctx.beginPath(); ctx.arc(22,17,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.4)"; ctx.beginPath(); ctx.arc(17,13,3.5,0,Math.PI*2); ctx.fill();
      it.refresh();
    }

    // ── Coração ──
    if (!scene.textures.exists("item_heart")) {
      const it=scene.textures.createCanvas("item_heart",38,38), ctx=it.getContext();
      const r=10;
      ctx.fillStyle="#cc2222";
      ctx.beginPath(); ctx.arc(13,14,r,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(25,14,r,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(3,14); ctx.lineTo(19,32); ctx.lineTo(35,14); ctx.closePath(); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.32)"; ctx.beginPath(); ctx.arc(13,11,4,0,Math.PI*2); ctx.fill();
      it.refresh();
    }

    // ── Pétala de cravo ──
    if (!scene.textures.exists("petal")) {
      const it=scene.textures.createCanvas("petal",10,10), ctx=it.getContext();
      ctx.fillStyle="#cc2222"; ctx.beginPath(); ctx.ellipse(5,5,4,2.5,Math.PI/4,0,Math.PI*2); ctx.fill();
      it.refresh();
    }

    // ── Agente da PIDE / censor ──
    ["virus_round","virus_spike","virus_bug"].forEach((k,vi)=>{
      if(scene.textures.exists(k)) return;
      const vt=scene.textures.createCanvas(k,60,60), ctx=vt.getContext();
      const cols=["#4a1a00","#2a0a00","#3a1a00"][vi];
      const gl=ctx.createRadialGradient(30,28,4,30,30,28);
      gl.addColorStop(0,"#8b3a00"); gl.addColorStop(1,cols);
      ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(30,30,22,0,Math.PI*2); ctx.fill();
      // Chapéu (PIDE usava chapéus)
      ctx.fillStyle="#1a0800"; ctx.fillRect(16,12,28,6); ctx.fillRect(20,8,20,6);
      if(vi===1){ // Bico extra ameaçador
        ctx.fillStyle="#6b2a00";
        [[30,8],[50,20],[50,40],[30,52],[10,40],[10,20]].forEach(([x,y])=>{
          ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();});
      }
      if(vi===2){ // Distintivo
        ctx.fillStyle="#cc9900"; ctx.beginPath();
        for(let a=0;a<5;a++){const ang=a*Math.PI*0.4-Math.PI/2;ctx.lineTo(38+8*Math.cos(ang),32+8*Math.sin(ang));ctx.lineTo(38+4*Math.cos(ang+Math.PI*0.2),32+4*Math.sin(ang+Math.PI*0.2));}
        ctx.closePath();ctx.fill();
      }
      // Olhos sinistros
      ctx.fillStyle="rgba(255,200,0,0.9)"; ctx.beginPath(); ctx.arc(23,28,5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(37,28,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#1a0800"; ctx.beginPath(); ctx.arc(24,29,2.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(38,29,2.5,0,Math.PI*2); ctx.fill();
      // Boca fechada / carrancuda
      ctx.strokeStyle="#1a0800"; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(22,40); ctx.lineTo(38,40); ctx.stroke();
      ctx.fillStyle="rgba(255,180,0,0.12)"; ctx.beginPath(); ctx.ellipse(22,22,7,4,-Math.PI/4,0,Math.PI*2); ctx.fill();
      vt.refresh();
    });

    // ── Spark ──
    if (!scene.textures.exists("spark_item")) {
      const st=scene.textures.createCanvas("spark_item",14,14), ctx=st.getContext();
      const sg=ctx.createRadialGradient(7,7,0,7,7,7);
      sg.addColorStop(0,"rgba(255,200,180,1)"); sg.addColorStop(0.5,"rgba(255,80,40,0.8)"); sg.addColorStop(1,"rgba(180,0,0,0)");
      ctx.fillStyle=sg; ctx.fillRect(0,0,14,14);
      st.refresh();
    }

    makeVanBertoTexture(scene,"vanberto_open",false,-1);
    makeVanBertoTexture(scene,"vanberto_blink",true,-1);
    makeVanBertoTexture(scene,"vanberto_step1",false,0);
    makeVanBertoTexture(scene,"vanberto_step2",false,1);
  }

  function rr(ctx,x,y,w,h,r){
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }

  function makePlatformTexture(scene, key, style) {
    if (scene.textures.exists(key)) return;
    const pt=scene.textures.createCanvas(key,200,28), ctx=pt.getContext();
    // Plataforma única: pedra quente terrosa — coerente em todos os níveis
    const g=ctx.createLinearGradient(0,0,0,28);
    g.addColorStop(0,"#a07850"); g.addColorStop(0.25,"#8a6440"); g.addColorStop(1,"#6a4828");
    ctx.fillStyle=g; ctx.fillRect(0,0,200,28);
    // Brilho no topo
    ctx.fillStyle="rgba(255,220,160,0.28)"; ctx.fillRect(0,0,200,5);
    // Sombra em baixo
    ctx.fillStyle="rgba(0,0,0,0.28)"; ctx.fillRect(0,23,200,5);
    // Juntas da pedra — horizontais e verticais suaves
    ctx.strokeStyle="rgba(0,0,0,0.15)"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,14); ctx.lineTo(200,14); ctx.stroke();
    const cuts=[0,28,60,88,116,152,178,200];
    cuts.forEach((x,i)=>{
      if(i===0||i===cuts.length-1) return;
      const yTop=(i%2===0)?0:14, yBot=(i%2===0)?14:28;
      ctx.beginPath(); ctx.moveTo(x,yTop); ctx.lineTo(x,yBot); ctx.stroke();
    });
    // Pequenos detalhes de textura (grão da pedra)
    ctx.fillStyle="rgba(255,255,255,0.07)";
    for(let i=0;i<8;i++){
      ctx.fillRect(10+i*24+(i%2)*4,3,14,4);
      ctx.fillRect(14+i*24+(i%3)*3,17,10,4);
    }
    pt.refresh();
  }

  // ===== VanBerto =====
  function rrVan(ctx,x,y,w,h,r){const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();}
  function cVan(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function cfVan(ctx,x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function lVan(ctx,x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}

  // ===== VanBerto — código original do Drummond =====
  function makeVanBertoTexture(scene,key,blink,step){
    if(scene.textures.exists(key)) return;
    const w=96,h=96, tex=scene.textures.createCanvas(key,w,h), ctx=tex.getContext();
    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha=0.35; ctx.beginPath(); ctx.arc(48,52,40,0,Math.PI*2); ctx.fillStyle="#93c5fd"; ctx.fill(); ctx.globalAlpha=1;
    const bodyGrad=ctx.createLinearGradient(0,38,0,88); bodyGrad.addColorStop(0,"#e5f2ff"); bodyGrad.addColorStop(1,"#bfdbfe");
    const headGrad=ctx.createLinearGradient(0,14,0,48); headGrad.addColorStop(0,"#e5f2ff"); headGrad.addColorStop(1,"#bfdbfe");
    // cabeça deslocada 4px para baixo (y=14) para dar espaço à antena
    rrVan(ctx,26,14,44,34,18); ctx.fillStyle=headGrad; ctx.fill();
    const visorGrad=ctx.createLinearGradient(30,20,66,38); visorGrad.addColorStop(0,"#22d3ee"); visorGrad.addColorStop(1,"#38bdf8");
    rrVan(ctx,32,22,32,18,10); ctx.fillStyle=visorGrad; ctx.fill();
    if(blink){ctx.globalAlpha=0.85;rrVan(ctx,32,22,32,18,10);ctx.fillStyle="#e5f2ff";ctx.fill();ctx.globalAlpha=1;}
    ctx.fillStyle="#0f172a";
    if(!blink){cVan(ctx,41,31,3);cVan(ctx,55,31,3);}
    else{ctx.lineWidth=3;ctx.strokeStyle="#0f172a";lVan(ctx,38,31,44,31);lVan(ctx,52,31,58,31);}
    // antena: haste de y=14 até y=7, bolinha raio 5 em y=7 — visível e separada da cabeça
    ctx.lineWidth=3; ctx.strokeStyle="#38bdf8"; ctx.beginPath(); ctx.moveTo(48,14); ctx.lineTo(48,7); ctx.stroke();
    cfVan(ctx,48,7,5,"#38bdf8");
    // corpo e pernas +4px em y
    rrVan(ctx,22,44,52,40,20); ctx.fillStyle=bodyGrad; ctx.fill();
    cfVan(ctx,48,66,8,"#9ca3af");
    rrVan(ctx,14,52,8,24,6); ctx.fillStyle="#e5e7eb"; ctx.fill();
    rrVan(ctx,74,52,8,24,6); ctx.fill();
    const baseY=78, stepAmt=3; let leftY=baseY, rightY=baseY;
    if(step===0){leftY=baseY-stepAmt;rightY=baseY+stepAmt;}
    else if(step===1){leftY=baseY+stepAmt;rightY=baseY-stepAmt;}
    rrVan(ctx,30,leftY,14,10,4); ctx.fillStyle="#1f2937"; ctx.fill();
    rrVan(ctx,52,rightY,14,10,4); ctx.fill();
    ctx.lineWidth=3; ctx.strokeStyle="#0f172a";
    rrVan(ctx,26,14,44,34,18); ctx.stroke();
    rrVan(ctx,22,44,52,40,20); ctx.stroke();
    tex.refresh();
  }

  // ===== Fundo =====
  function initBackground(scene){
    bgGraphics    =scene.add.graphics().setDepth(-60);
    starsGraphics =scene.add.graphics().setDepth(-55);
    hillsGraphics =scene.add.graphics().setDepth(-50);
    groundGraphics=scene.add.graphics().setDepth(-10);
    decorGraphics =scene.add.graphics().setDepth(-8);
    clouds=[]; for(let i=0;i<20;i++) clouds.push(scene.add.graphics().setDepth(-40));
    applyBackground(scene,0,2600);
  }

  function applyBackground(scene,themeIdx,worldW){
    const T=THEMES[themeIdx]||THEMES[0];
    bgGraphics.clear();
    bgGraphics.fillGradientStyle(T.skyTop,T.skyTop,T.skyBot,T.skyBot,1);
    bgGraphics.fillRect(0,0,worldW,540);

    // Estrelas — nos caps. 1 não há; caps. 2-4 sim; depois desaparecem
    starsGraphics.clear(); starData=[];
    const starAlpha = themeIdx===0 ? 0 : (themeIdx<=3 ? 1.0 : Math.max(0, 1-(themeIdx-3)*0.35));
    if(starAlpha>0){
      const starCount=40+Math.floor(worldW/80);
      for(let i=0;i<starCount;i++) starData.push({x:Math.random()*worldW,y:8+Math.random()*230,r:0.8+Math.random()*1.6,phase:Math.random()*Math.PI*2,speed:0.5+Math.random()*1.2,alpha:starAlpha});
    }

    // Nuvens — caps. 0 e 4+ têm; caps. 1-3 (noite) sem nuvens
    const sp=Math.max(130,Math.floor(worldW/(clouds.length+1)));
    clouds.forEach((g,i)=>{
      g.clear();
      if(themeIdx>=1&&themeIdx<=3) return; // noite sem nuvens
      const x=100+i*sp,y=55+(i%5)*24,r=18+(i%3)*5;
      g.fillStyle(0xffffff,0.14);g.fillCircle(x+2,y+4,r);g.fillCircle(x+26,y+8,r-4);g.fillCircle(x-20,y+8,r-3);
      g.fillStyle(0xffffff,0.62);g.fillCircle(x,y,r);g.fillCircle(x+24,y+6,r-4);g.fillCircle(x-22,y+7,r-3);g.fillCircle(x+12,y-6,r-7);
    });

    hillsGraphics.clear();
    hillsGraphics.fillStyle(T.hillColor,0.40);
    for(let i=0;i<Math.ceil(worldW/320)+1;i++) hillsGraphics.fillEllipse(i*320+160,420,400,200);
    hillsGraphics.fillStyle(T.grassTop,0.22);
    for(let i=0;i<Math.ceil(worldW/240)+1;i++) hillsGraphics.fillEllipse(i*240+80+(i%2)*60,450,320,160);

    groundGraphics.clear();
    groundGraphics.fillStyle(T.grassTop,1); groundGraphics.fillRect(0,510,worldW,30);
    groundGraphics.fillStyle(0xffffff,0.28); groundGraphics.fillRect(0,510,worldW,7);
    groundGraphics.fillStyle(0x000000,0.12); groundGraphics.fillRect(0,534,worldW,6);

    // Decoração — cravos de dia, estrelas de noite
    decorGraphics.clear();
    if(themeIdx>=4){
      // Cravos no chão (dia)
      const dc=[0xcc2222,0xff4444,0x006400,0xffffff,0x8b0000];
      for(let i=0;i<Math.floor(worldW/55);i++){
        const fx=18+i*55+(i%3)*8,fy=514+(i%2)*3,c=dc[i%dc.length];
        decorGraphics.fillStyle(c,0.75);decorGraphics.fillCircle(fx,fy,4);
        decorGraphics.fillStyle(0xffffff,0.5);decorGraphics.fillCircle(fx,fy,1.5);
      }
    } else {
      // Pequenas faíscas de luz de noite
      for(let i=0;i<Math.floor(worldW/80);i++){
        const fx=30+i*80+(i%3)*10,fy=516+(i%2)*2;
        decorGraphics.fillStyle(0x886622,0.55);decorGraphics.fillCircle(fx,fy,3);
      }
    }
  }

  // ===== Texto de capítulo no canvas =====
  function showChapterTitle(scene, label) {
    if (!chapterGfx || !chapterText) return;
    chapterGfx.clear();
    chapterGfx.fillStyle(0x000000, 0.65);
    chapterGfx.fillRect(0, 200, 960, 140);
    chapterText.setText(label);
    chapterText.setAlpha(0);
    chapterGfx.setAlpha(0);
    scene.tweens.add({ targets:[chapterGfx,chapterText], alpha:1, duration:400, ease:"Sine.easeIn",
      onComplete:() => {
        scene.time.delayedCall(2200, () => {
          scene.tweens.add({ targets:[chapterGfx,chapterText], alpha:0, duration:500, ease:"Sine.easeOut",
            onComplete:()=>chapterGfx.clear()
          });
        });
      }
    });
  }

  // ===== Botões UI =====
  btnMute.onclick=()=>{muted=!muted;btnMute.textContent=muted?"🔇 Som: OFF":"🔊 Som: ON";if(!muted){ensureAudio();SFX.coin();}saveGame();};
  btnHow.onclick=()=>howOverlay.classList.remove("hidden");
  btnCloseHow.onclick=()=>howOverlay.classList.add("hidden");

  // ===== Ecrã inteiro =====
  const isIOS=/iP(hone|ad|od)/.test(navigator.userAgent);

  function toggleFullscreen(){
    if(isIOS){
      alert("No iPhone/iPad usa o botão 'Partilhar' → 'Adicionar ao ecrã de início' para jogar em ecrã inteiro.");
      return;
    }
    if(!document.fullscreenElement&&!document.webkitFullscreenElement){
      const el=document.documentElement;
      if(el.requestFullscreen) el.requestFullscreen();
      else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if(document.exitFullscreen) document.exitFullscreen();
      else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }

  function updateFsButtons(full){
    const lbl=full?"✕ Ecrã normal":"⛶ Ecrã todo";
    const b1=document.getElementById("btnFullscreen");
    const b2=document.getElementById("btnFullscreenGame");
    if(b1) b1.textContent=lbl;
    if(b2) b2.textContent=lbl;
  }

  document.addEventListener("fullscreenchange",()=>updateFsButtons(!!document.fullscreenElement));
  document.addEventListener("webkitfullscreenchange",()=>updateFsButtons(!!document.webkitFullscreenElement));

  const btnFs=document.getElementById("btnFullscreen");
  const btnFsGame=document.getElementById("btnFullscreenGame");
  if(btnFs) btnFs.onclick=toggleFullscreen;
  if(btnFsGame) btnFsGame.onclick=toggleFullscreen;
  window.addEventListener("keydown",e=>{ if(e.key?.toLowerCase()==="f"&&!e.target.matches("input")) toggleFullscreen(); });

  btnStart.onclick=()=>{
    ensureAudio();SFX.coin();
    playerName=(playerNameInput?.value||"").trim();
    currentLevel=0;score=0;lives=3;livesLostThisLevel=0;quizStreak=0;
    quizStats.total=0;quizStats.correct=0;quizStats.everWrong=false;quizStats.errors=[];
    try{localStorage.removeItem(SAVE_KEY);}catch{}
    startOverlay.classList.add("hidden");
    document.body.classList.add("game-started");
    document.getElementById("legend")?.classList.remove("hidden");
    // Carrega nível 1 e arranca directamente — sem history no início
    if(sceneRef){
      awaitingQuiz=false;awaitingStory=false;
      loadLevel(sceneRef,0);
      sceneRef.physics.resume();
      saveGame();
    }
  };

  // Suporte a Enter no campo de nome
  if(playerNameInput){
    playerNameInput.addEventListener("keydown", e => {
      if(e.key === "Enter") btnStart.click();
    });
  }

  const btnRetry=document.getElementById("btnRetry"), btnExit=document.getElementById("btnExit");
  if(btnRetry) btnRetry.onclick=()=>{
    gameOverOverlay.classList.add("hidden");
    lives=3;score=0;resetQuizStats();livesLostThisLevel=0;
    Object.keys(usedQuizByLevel).forEach(k=>usedQuizByLevel[k].clear());
    scoreText.setText(`🌹 Pontos: ${score}`);updateHearts();
    awaitingQuiz=false;awaitingStory=false;loadLevel(sceneRef,0);sceneRef.physics.resume();saveGame();
  };
  if(btnExit) btnExit.onclick=()=>{
    gameOverOverlay.classList.add("hidden");try{sceneRef.physics.pause();}catch{}
    lives=3;score=0;resetQuizStats();livesLostThisLevel=0;
    startOverlay.classList.remove("hidden");
  };

  const btnWinRestart=document.getElementById("btnWinRestart");
  if(btnWinRestart) btnWinRestart.onclick=()=>{
    winOverlay.classList.add("hidden");
    document.getElementById("confetti")?.classList.add("hidden");
    lives=3;score=0;currentLevel=0;resetQuizStats();livesLostThisLevel=0;
    Object.keys(usedQuizByLevel).forEach(k=>usedQuizByLevel[k].clear());
    awaitingQuiz=false;
    try{sceneRef.physics.pause();}catch{}
    startOverlay.classList.remove("hidden");
    document.body.classList.remove("game-started");
    document.getElementById("legend")?.classList.add("hidden");
    saveGame();
  };

  // ===== CREATE =====
  function create() {
    sceneRef = this;
    cursors  = this.input.keyboard.createCursorKeys();
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.world.setBounds(0, 0, 2600, 514);
    this.cameras.main.setBounds(0, 0, 2600, 540);

    makeTextures(this);
    initBackground(this);

    shadowGfx = this.add.graphics().setDepth(1);

    // HUD
    hudText      = this.add.text(14, 10, "", { fontSize:"15px", fontStyle:"900", color:"#8b0000", stroke:"#ffffff", strokeThickness:4 }).setScrollFactor(0).setDepth(100);
    scoreText    = this.add.text(14, 30, "", { fontSize:"13px", fontStyle:"900", color:"#8b0000", stroke:"#ffffff", strokeThickness:3 }).setScrollFactor(0).setDepth(100);
    heartsGfx    = this.add.graphics().setScrollFactor(0).setDepth(100);
    tipText      = this.add.text(14, 70, "", { fontSize:"12px", fontStyle:"800", color:"#006400", stroke:"#ffffff", strokeThickness:3 }).setScrollFactor(0).setDepth(100);
    itemCountText= this.add.text(14, 86, "", { fontSize:"11px", fontStyle:"800", color:"#3b0a0a", stroke:"#ffffff", strokeThickness:2 }).setScrollFactor(0).setDepth(100);

    progressBg   = this.add.graphics().setScrollFactor(0).setDepth(100);
    progressFill = this.add.graphics().setScrollFactor(0).setDepth(100);
    progressBg.fillStyle(0x000000, 0.30);
    progressBg.fillRoundedRect(8, 104, 230, 10, 5);

    powerIndicator = this.add.text(960-14, 10, "", { fontSize:"13px", fontStyle:"900", color:"#ffdd44", stroke:"#060000", strokeThickness:4 }).setScrollFactor(0).setDepth(102).setOrigin(1,0);

    // Pausa
    pauseOverlayGfx = this.add.graphics().setScrollFactor(0).setDepth(500);
    pauseVanImg  = this.add.image(480, 240, "vanberto_open").setScrollFactor(0).setDepth(501).setScale(3).setAlpha(0);
    pauseLabel   = this.add.text(480, 370, "⏸ PAUSA", { fontSize:"44px", fontStyle:"900", color:"#cc2222", stroke:"#050000", strokeThickness:7 }).setOrigin(0.5).setScrollFactor(0).setDepth(501).setAlpha(0);

    // Transição
    transitionGfx   = this.add.graphics().setScrollFactor(0).setDepth(800).setAlpha(0);
    transitionLabel = this.add.text(480, 270, "", { fontSize:"30px", fontStyle:"900", color:"#ff8888", stroke:"#050000", strokeThickness:8, align:"center", lineSpacing:8 }).setOrigin(0.5).setScrollFactor(0).setDepth(801).setAlpha(0);

    // Texto de capítulo (overlay no canvas, funde com o nível)
    chapterGfx  = this.add.graphics().setScrollFactor(0).setDepth(600).setAlpha(0);
    chapterText = this.add.text(480, 270, "", {
      fontSize:"28px", fontStyle:"900", color:"#ff9090",
      stroke:"#050000", strokeThickness:7,
      align:"center", lineSpacing:10,
      fontFamily:"'Cinzel', serif"
    }).setOrigin(0.5).setScrollFactor(0).setDepth(601).setAlpha(0);

    platforms    = this.physics.add.staticGroup();
    itemsGroup   = this.physics.add.group({ allowGravity:false });
    malwareGroup = this.physics.add.group();

    player = this.physics.add.sprite(120, 460, "vanberto_open");
    player.setCollideWorldBounds(true);
    player.body.setSize(44, 48);
    player.body.setOffset(26, 40);

    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, itemsGroup, onCollectItem, null, this);
    this.physics.add.collider(malwareGroup, platforms);
    this.physics.add.collider(player, malwareGroup, onHitMalware, null, this);

    this.cameras.main.startFollow(player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(140, 90);

    createTouchInput(this);
    loadGame();
    btnMute.textContent = muted ? "🔇 Som: OFF" : "🔊 Som: ON";
    // Não carrega nível aqui — o btnStart trata disso
    scheduleBlink(this);
    // Garantir física pausada até o jogo começar
    this.physics.pause();

    // Controlos professor
    if (btnPause && btnRestart) {
      btnPause.onclick = () => {
        if (!sceneRef) return;
        pausedByTeacher = !pausedByTeacher;
        if (pausedByTeacher) {
          sceneRef.physics.pause(); btnPause.textContent = "▶ Continuar"; showPauseScreen(true);
        } else {
          if (!awaitingQuiz && startOverlay.classList.contains("hidden") && historyOverlay.classList.contains("hidden"))
            sceneRef.physics.resume();
          btnPause.textContent = "⏸ Pausa"; showPauseScreen(false);
        }
      };
      btnRestart.onclick = () => {
        if (!sceneRef) return;
        const lvlName = LEVELS[currentLevel]?.name || `Nível ${currentLevel+1}`;
        if (!confirm(`⚠️ Reiniciar o ${lvlName}?\nO progresso neste nível perde-se.`)) return;
        pausedByTeacher=false; btnPause.textContent="⏸ Pausa"; showPauseScreen(false);
        quizOverlay.classList.add("hidden"); btnCloseQuiz.classList.add("hidden");
        awaitingQuiz=false; historyOverlay.classList.add("hidden");
        touch.left=touch.right=touch.jump=false;
        sceneRef.physics.resume(); loadLevel(sceneRef,currentLevel); saveGame();
      };
    }

    if (btnRestartGame) {
      btnRestartGame.onclick = () => {
        if (!sceneRef) return;
        pausedByTeacher=false; btnPause.textContent="⏸ Pausa"; showPauseScreen(false);
        quizOverlay.classList.add("hidden"); btnCloseQuiz.classList.add("hidden");
        historyOverlay.classList.add("hidden"); awaitingQuiz=false;
        touch.left=touch.right=touch.jump=false;
        score=0; lives=3; livesLostThisLevel=0;
        resetQuizStats(); Object.keys(usedQuizByLevel).forEach(k=>usedQuizByLevel[k].clear());
        scoreText.setText(`🌹 Pontos: ${score}`); updateHearts();
        sceneRef.physics.resume(); loadLevel(sceneRef,0); saveGame();
      };
    }

    function toggleHighContrast() {
      highContrast=!highContrast;
      document.body.classList.toggle("high-contrast",highContrast);
      const btnC=document.getElementById("btnContrast");
      if(btnC){btnC.textContent=highContrast?"🌗 Contraste: ON":"🌗 Contraste";btnC.setAttribute("aria-pressed",highContrast?"true":"false");}
      saveGame();
    }
    const btnContrastEl=document.getElementById("btnContrast");
    if(btnContrastEl) btnContrastEl.onclick=toggleHighContrast;
    window.addEventListener("keydown",e=>{ if(e.key?.toLowerCase()==="h") toggleHighContrast(); });

    if(btnPresent){
      btnPresent.onclick=()=>{
        presentationMode=!presentationMode;
        document.body.classList.toggle("presentation-mode",presentationMode);
        btnPresent.textContent=presentationMode?"📽️ Normal":"📽️ Apresentação";
      };
    }
  }

  function showPauseScreen(on) {
    if(!pauseOverlayGfx) return;
    if(on){
      pauseOverlayGfx.clear();pauseOverlayGfx.fillStyle(0x000000,0.65);pauseOverlayGfx.fillRect(0,0,960,540);
      pauseVanImg.setAlpha(1);
      sceneRef.tweens.add({targets:pauseVanImg,angle:{from:-6,to:6},duration:900,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      pauseLabel.setAlpha(1);
    } else {
      pauseOverlayGfx.clear();pauseVanImg.setAlpha(0);pauseLabel.setAlpha(0);
      sceneRef.tweens.killTweensOf(pauseVanImg);pauseVanImg.setAngle(0);
    }
  }

  // ===== UPDATE =====
  function update() {
    if(awaitingQuiz||!startOverlay.classList.contains("hidden")||!historyOverlay.classList.contains("hidden")){
      player.setVelocityX(0);applyVanBertoTexture(sceneRef);updateShadow();return;
    }
    const speed=powered?320:280;
    const leftDown=cursors.left.isDown||touch.left;
    const rightDown=cursors.right.isDown||touch.right;
    const jumpDown=cursors.up.isDown||keySpace.isDown||touch.jump;

    if(leftDown&&!rightDown){player.setVelocityX(-speed);player.setFlipX(true);player.setAngle(-2);}
    else if(rightDown&&!leftDown){player.setVelocityX(speed);player.setFlipX(false);player.setAngle(2);}
    else{player.setVelocityX(0);player.setAngle(0);}
    player.setScale(1.0); // sem scale no super modo — robot mantém aparência

    if(jumpDown&&player.body.blocked.down){
      player.setVelocityY(powered?-680:-650);ensureAudio();SFX.jump();touch.jump=false;
      sceneRef.tweens.add({targets:player,scaleY:powered?1.26:1.11,scaleX:powered?1.11:0.95,duration:120,yoyo:true});
    }

    applyVanBertoTexture(sceneRef);updateShadow();

    if(starsGraphics&&starData.length){
      starsGraphics.clear();
      const t=sceneRef.time.now*0.001;
      starData.forEach(s=>{
        const alpha=(s.alpha||1)*(0.25+0.65*(0.5+0.5*Math.sin(t*s.speed+s.phase)));
        starsGraphics.fillStyle(0xffffff,alpha);starsGraphics.fillCircle(s.x,s.y,s.r);
      });
    }

    if(progressFill&&LEVELS[currentLevel]) updateHUD(LEVELS[currentLevel]);

    butterflies.forEach(b=>{
      b.x+=b.vx;b.y+=Math.sin(b.x*0.012+b.phase)*0.65;b.t+=0.1;
      drawButterfly(b.gfx,b.x,b.y,b.c1,b.c2,b.t);
      const L=LEVELS[currentLevel];
      if(b.x>L.worldW+80)b.x=-60;if(b.x<-80)b.x=L.worldW+60;
    });

    malwareGroup.getChildren().forEach(m=>{
      if(m.body.blocked.left) m.setVelocityX(Math.abs(m.body.velocity.x));
      if(m.body.blocked.right) m.setVelocityX(-Math.abs(m.body.velocity.x));
      // Impedir acumulação junto à porta: se o agente se aproximar a menos de 220px e vier na direção da porta, inverte
      if(door && m.x > door.x - 220 && m.body.velocity.x > 0)
        m.setVelocityX(-Math.abs(m.body.velocity.x));
      m.rotation+=0.022;
    });
  }

  let vanBlinkTimer=0,vanStep=0,vanStepTimer=0,blinkScheduled=false;
  function scheduleBlink(scene){
    if(blinkScheduled) return;blinkScheduled=true;
    scene.time.addEvent({delay:2800+Math.random()*2200,callback:()=>{vanBlinkTimer=1;blinkScheduled=false;scheduleBlink(scene);}});
  }
  function applyVanBertoTexture(scene){
    if(!player) return;
    if(vanBlinkTimer>0){vanBlinkTimer--;player.setTexture("vanberto_blink");return;}
    const moving=Math.abs(player.body?.velocity?.x||0)>20;
    if(moving){vanStepTimer++;if(vanStepTimer>8){vanStepTimer=0;vanStep=(vanStep+1)%2;player.setTexture(vanStep===0?"vanberto_step1":"vanberto_step2");}}
    else{player.setTexture("vanberto_open");vanStep=0;}
  }

  function updateShadow(){
    if(!shadowGfx||!player) return;
    shadowGfx.clear();
    const px=player.x,py=player.y;let groundY=520;
    platforms.getChildren().forEach(p=>{
      if(!p.body) return;
      if(px>=p.body.left&&px<=p.body.right&&p.body.top>py&&p.body.top<groundY) groundY=p.body.top;
    });
    const dist=Math.max(0,groundY-py),alpha=Math.max(0,0.28-dist*0.001),sc=Math.max(0.3,1-dist*0.003);
    shadowGfx.fillStyle(0x000000,alpha);shadowGfx.fillEllipse(player.x,groundY+2,44*sc,10*sc);
  }

  // ===== Borboletas =====
  function spawnButterflies(scene,worldW,themeIdx){
    butterflies.forEach(b=>b.gfx.destroy());butterflies=[];
    // Noite = raras; dia = muitas e coloridas
    const count=themeIdx<4?1:(3+(currentLevel%3));
    const cols=themeIdx<4
      ? [0x334466,0x224488]
      : [0xcc2222,0xff6644,0xffffff,0x006400,0xffdd44];
    for(let i=0;i<count;i++){
      const gfx=scene.add.graphics().setDepth(-5);
      butterflies.push({gfx,x:Math.random()*worldW,y:80+Math.random()*280,vx:(Math.random()<0.5?1:-1)*(0.4+Math.random()*0.5),c1:cols[i%cols.length],c2:cols[(i+2)%cols.length],phase:Math.random()*Math.PI*2,t:0});
    }
  }
  function drawButterfly(gfx,x,y,c1,c2,t){
    gfx.clear();const f=Math.abs(Math.sin(t*3));
    gfx.fillStyle(c1,0.68);gfx.fillEllipse(x-9*f,y-3,16*f+2,11);gfx.fillEllipse(x-7*f,y+4,11*f+2,8);
    gfx.fillStyle(c2,0.68);gfx.fillEllipse(x+9*f,y-3,16*f+2,11);gfx.fillEllipse(x+7*f,y+4,11*f+2,8);
    gfx.fillStyle(0x006400,0.7);gfx.fillEllipse(x,y,3,14);
  }

  function startPetals(scene,worldW,themeIdx){
    if(petalEmitter){petalEmitter.stop();petalEmitter.destroy();}
    if(themeIdx<4) return; // Noite sem pétalas
    petalEmitter=scene.add.particles(0,0,"petal",{
      x:{min:0,max:worldW},y:-10,
      speedX:{min:-10,max:10},speedY:{min:15,max:35},
      rotate:{min:0,max:360},lifespan:{min:5000,max:9000},
      frequency:themeIdx>=9?200:500,quantity:1,alpha:{start:0.75,end:0},
      scale:{min:0.5,max:1.2},gravityY:0
    }).setDepth(-3);
  }

  // ===== Dificuldade =====
  function difficultyFactor(idx){
    let f=1+idx*0.025;
    if(idx>=6) f+=(idx-6)*0.015;
    return Math.min(1.35,f);
  }

  // ===== Carregar nível =====
  function loadLevel(scene,idx){
    currentLevel=idx;
    const L=LEVELS[currentLevel];
    const T=THEMES[L.theme%THEMES.length];
    const themeIdx=L.theme%THEMES.length;

    scene.physics.world.setBounds(0,0,L.worldW,514);
    scene.cameras.main.setBounds(0,0,L.worldW,540);

    platforms.clear(true,true);itemsGroup.clear(true,true);malwareGroup.clear(true,true);
    if(door) door.destroy();

    awaitingQuiz=false;invuln=false;clearPower(scene);livesLostThisLevel=0;
    itemsCollected=0;itemsTotal=L.items.filter(it=>it.kind!=="heart").length;
    updateHUD(L);applyBackground(scene,themeIdx,L.worldW);

    // Plataformas — estilo único e coerente para todos os níveis
    L.platforms.forEach(p=>{
      const plat=platforms.create(p.x,p.y,"platform_stone");
      plat.displayWidth=p.w;plat.displayHeight=p.h;plat.refreshBody();
      if(plat.body){plat.body.checkCollision.left=false;plat.body.checkCollision.right=false;}
    });

    // Porta temática
    door=scene.physics.add.staticSprite(L.doorX,430,"door_book");
    // porta sem tint — cor natural
    scene.physics.add.overlap(player,door,()=>tryOpenDoor(scene),null,scene);
    scene.tweens.add({targets:door,alpha:{from:1,to:0.78},duration:800,yoyo:true,repeat:-1});

    // Itens
    const keyMap={cravo:"item_cravo",jornal:"item_jornal",punho:"item_punho",cravo_ouro:"item_cravo_ouro",heart:"item_heart"};
    L.items.forEach(it=>{
      const shadow=scene.add.ellipse(it.x,it.y+22,32,8,0x000000,0.15).setDepth(1);
      scene.tweens.add({targets:shadow,scaleX:{from:1,to:0.7},alpha:{from:0.15,to:0.06},duration:940,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      const obj=itemsGroup.create(it.x,it.y,keyMap[it.kind]||"item_cravo");
      obj.setDepth(2);
      scene.tweens.add({targets:obj,y:obj.y-8,duration:940,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      obj.setData("kind",it.kind);obj.setData("shadow",shadow);
    });

    // Agentes (censores/PIDE)
    const df=difficultyFactor(currentLevel);
    L.malwares.forEach(m=>spawnVirus(scene,m.x,480,m.vx,df));
    if(L.platforms.length>=5){
      const mid=L.platforms[Math.floor(L.platforms.length/2)];
      spawnVirus(scene,mid.x,480,(currentLevel%2===0)?170:-170,df);
      if(currentLevel>=6){const q=L.platforms[Math.floor(L.platforms.length/4)];spawnVirus(scene,q.x,480,(currentLevel%2===0)?-185:185,df);}
    }

    spawnButterflies(scene,L.worldW,themeIdx);
    startPetals(scene,L.worldW,themeIdx);

    // Texto de capítulo na entrada
    if(L.chapterLabel){
      scene.time.delayedCall(700,()=>showChapterTitle(scene,L.chapterLabel));
    }

    // Melodia de Grândola no capítulo 4
    if(L.playGrandola){
      scene.time.delayedCall(1200,()=>playGrandola());
    }

    // Animação de entrada — repor sempre alpha, scale e ângulo (podem ter ficado da animação da porta)
    player.setAlpha(1);player.setScale(1);player.setAngle(0);player.setFlipX(false);player.setOrigin(0.5,0.5);player.setDepth(3);
    player.setPosition(-60,L.spawn.y);player.setVelocity(400,0);
    touch.left=touch.right=touch.jump=false;
    scene.time.delayedCall(580,()=>{
      player.setPosition(L.spawn.x,L.spawn.y);player.setVelocity(0,0);snapPlayerToGround();
      player.setVelocityY(-300);
      scene.tweens.add({targets:player,scaleX:{from:0.85,to:1},scaleY:{from:1.15,to:1},duration:220,ease:"Bounce.easeOut"});
    });

    const tips=[
      "🔴 Evita os agentes da PIDE! Chega à porta 🔒",
      "🌙 Segredo é fundamental… chega à porta 🌙",
      "📻 Ouve o rádio e chega à porta 📻",
      "🌹 A revolução começa! Chega à porta 🌹",
      "🌹 Apanha cravos! A liberdade está próxima!",
      "🕊️ Caminha até ao Carmo — chega à porta 🕊️",
      "🌍 As colónias estão a tornar-se livres!",
      "🗳️ O teu voto importa! Chega à urna 🗳️",
      "📜 A Constituição está a ser escrita!",
      "🏆 Portugal livre! Celebra a democracia!"
    ];
    tipText.setText(tips[currentLevel]||"🌹 Apanha itens e chega à porta!");
    ensureAudio();SFX.door();saveGame();
  }

  function spawnVirus(scene,x,y,vx,df){
    const keys=["virus_round","virus_spike","virus_bug"];
    const v=malwareGroup.create(x,y,keys[Math.floor(Math.random()*keys.length)]);
    v.setCollideWorldBounds(true);
    v.setBounce(0); // sem bounce físico — evita tremido por velocidade acumulada
    v.setVelocityX(Math.round(vx*df));
    v.body.setSize(52,52,true);v.setDepth(2);
    // Salto controlado por timer: só salta quando está no chão
    const baseDelay=1800+Math.random()*1400;
    scene.time.addEvent({
      delay:400+Math.random()*1200,
      callback:()=>{
        scene.time.addEvent({
          delay:baseDelay, loop:true,
          callback:()=>{
            if(!v.active||!v.body) return;
            if(v.body.blocked.down) v.setVelocityY(-420-Math.random()*80);
          }
        });
      }
    });
    scene.tweens.add({targets:v,scaleX:{from:1.05,to:1.22},scaleY:{from:1.0,to:1.14},duration:430,yoyo:true,repeat:-1});
  }

  function updateHUD(L){
    hudText.setText(`${L.name}  (${currentLevel+1}/${LEVELS.length})`);
    scoreText.setText(`🌹 Pontos: ${score}`);
    updateHearts();
    itemCountText.setText(`📰 Itens: ${itemsCollected}/${itemsTotal}`);
    if(powerIndicator&&!powered) powerIndicator.setText("");

    if(progressFill){
      progressFill.clear();
      const BAR_X=8,BAR_Y=104,BAR_W=230,BAR_H=10;
      const levelPct=currentLevel/LEVELS.length;
      const levelNextPct=(currentLevel+1)/LEVELS.length;
      progressFill.fillStyle(0x5a0000,0.6);
      progressFill.fillRoundedRect(BAR_X,BAR_Y,Math.max(4,Math.round(BAR_W*levelPct)),BAR_H,5);
      if(player&&L){
        const worldW=L.worldW||2600,doorX=L.doorX||worldW-200,spawnX=L.spawn?.x||120;
        const px=Math.max(spawnX,Math.min(player.x,doorX));
        const inLevelPct=(px-spawnX)/Math.max(1,doorX-spawnX);
        const segStart=BAR_X+Math.round(BAR_W*levelPct);
        const segEnd=BAR_X+Math.round(BAR_W*levelNextPct);
        const segW=segEnd-segStart;
        progressFill.fillStyle(0xcc2222,0.92);
        progressFill.fillRoundedRect(segStart,BAR_Y,Math.max(3,Math.round(segW*inLevelPct)),BAR_H,5);
        const markerX=segStart+Math.round(segW*inLevelPct);
        progressFill.fillStyle(0x1a0000,1);progressFill.fillCircle(markerX,BAR_Y+BAR_H/2,6);
        progressFill.fillStyle(0xffffff,1);progressFill.fillCircle(markerX,BAR_Y+BAR_H/2,3);
        progressFill.fillStyle(0xcc2222,1);progressFill.fillRect(segEnd-5,BAR_Y+1,8,BAR_H-2);
      }
    }
  }

  function updateHearts(){
    if(!heartsGfx) return;
    heartsGfx.clear();
    const startX=14,y=52,size=12,gap=17;
    for(let i=0;i<MAX_LIVES;i++){
      const x=startX+i*gap,full=i<lives,r=size*0.52;
      heartsGfx.fillStyle(full?0xcc2222:0xfca5a5,full?1:0.35);
      heartsGfx.fillCircle(x-r*0.55,y-r*0.18,r);heartsGfx.fillCircle(x+r*0.55,y-r*0.18,r);
      heartsGfx.fillTriangle(x-size,y-r*0.1,x+size,y-r*0.1,x,y+size*1.05);
      if(full){heartsGfx.fillStyle(0xffffff,0.28);heartsGfx.fillCircle(x-r*0.3,y-r*0.5,r*0.3);}
    }
  }

  function snapPlayerToGround(){
    if(!player?.body||!platforms) return;
    player.body.updateFromGameObject();
    const pb=player.body;let best=null,bestTop=Infinity;
    platforms.getChildren().forEach(p=>{
      if(!p.body) return;
      if(pb.right>p.body.left&&pb.left<p.body.right){
        const top=p.body.top;
        if(top>=pb.bottom-2&&top<bestTop){bestTop=top;best=p;}
      }
    });
    if(best){const dy=pb.bottom-(best.body.top-1);player.setVelocity(0,0);player.y-=dy;player.body.updateFromGameObject();}
  }

  // ===== Porta + Quiz =====
  function tryOpenDoor(scene){
    if(awaitingQuiz) return;
    awaitingQuiz=true;
    // Parar movimento horizontal, deixar gravidade pousar o robot
    player.setVelocityX(0);
    player.setFlipX(false);
    const doorOrigX=door.x;
    let waited=0;
    const landingCheck=scene.time.addEvent({
      delay:16, loop:true,
      callback:()=>{
        waited+=16;
        const onGround=player.body&&player.body.blocked.down;
        if(onGround||waited>=400){
          landingCheck.remove();
          player.setVelocity(0,0);
          snapPlayerToGround();
          scene.physics.pause();
          ensureAudio();SFX.doorOpen();
          startDoorAnimation(scene,doorOrigX);
        }
      }
    });
  }

  function startDoorAnimation(scene,doorOrigX){
    // 1. Porta treme (trinco a destrancar)
    door.setOrigin(0.5,0.5);
    door.x=doorOrigX;
    scene.tweens.add({
      targets:door, x:{from:doorOrigX-3,to:doorOrigX+3},
      duration:60, yoyo:true, repeat:3, ease:"Sine.easeInOut",
      onComplete:()=>{
        door.x=doorOrigX;
        // 2. Luz a sair por baixo da porta
        const glow=scene.add.graphics().setDepth(10);
        glow.fillStyle(0xff6666,0.65);
        glow.fillEllipse(door.x,door.y+36,80,18);
        scene.tweens.add({targets:glow,alpha:{from:0.65,to:0},duration:500,
          onComplete:()=>glow.destroy()});
        // 3. Porta abre (dobradiça na esquerda)
        door.setOrigin(0,0.5);
        door.x=doorOrigX-32;
        scene.tweens.add({
          targets:door, scaleX:{from:1,to:0},
          duration:340, ease:"Sine.easeIn",
          onComplete:()=>{
            // 4. Partículas a sair do vão
            const burst=scene.add.particles(0,0,"spark_item",{
              x:doorOrigX, y:door.y,
              speed:{min:40,max:160}, lifespan:480, quantity:18,
              scale:{start:1.0,end:0}, gravityY:280,
              angle:{min:210,max:330},
              tint:[0xff4444,0xffd700,0xffffff]
            });
            scene.time.delayedCall(380,()=>burst.destroy());
            // 5. Robot caminha para dentro
            player.setDepth(1);
            scene.tweens.add({
              targets:player, x:doorOrigX,
              duration:280, ease:"Sine.easeIn",
              onComplete:()=>{
                // 6. Robot encolhe e desaparece
                player.setOrigin(0.5,0);
                scene.tweens.add({
                  targets:player,
                  scaleY:{from:1,to:0}, scaleX:{from:1,to:0.6}, alpha:{from:1,to:0},
                  duration:260, ease:"Sine.easeIn",
                  onComplete:()=>{ player.setOrigin(0.5,0.5); player.setDepth(3); }
                });
                // 7. Texto "🌹 Responde!"
                const label=scene.add.text(doorOrigX,door.y-55,"🌹 Responde!",{
                  fontSize:"20px",fontStyle:"900",
                  color:"#ffdd44",stroke:"#1a0000",strokeThickness:5
                }).setOrigin(0.5).setDepth(20).setAlpha(0);
                scene.tweens.add({targets:label,alpha:1,y:door.y-82,duration:260,ease:"Back.easeOut",
                  onComplete:()=>scene.time.delayedCall(300,()=>{
                    scene.tweens.add({targets:label,alpha:0,duration:180,onComplete:()=>label.destroy()});
                  })
                });
                // 8. Abre quiz
                scene.time.delayedCall(620,()=>{
                  lastQuizTheme=LEVELS[currentLevel].quizTheme;
                  showQuiz(pickQuizForLevel(currentLevel,LEVELS[currentLevel].quizTheme),(ok)=>{
                    if(ok){
                      ensureAudio();
                      if(currentLevel===LEVELS.length-1)SFX.finalWin();else SFX.win();
                      nextLevel(scene);
                    } else {
                      // Repõe porta e robot
                      door.setOrigin(0.5,0.5);
                      door.x=doorOrigX; door.setScale(1); door.setAlpha(1);
                      player.setAlpha(1); player.setScale(1);
                      const L=LEVELS[currentLevel];
                      player.setPosition(L.spawn.x,L.spawn.y);
                      snapPlayerToGround();
                      scene.physics.resume();
                      awaitingQuiz=false;
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  }

  function playLevelTransition(scene,nextIdx,onMidpoint){
    if(!transitionGfx||!transitionLabel){onMidpoint?.();return;}
    const nextL=LEVELS[nextIdx];
    const label=nextL?`🌹 ${nextIdx+1}/${LEVELS.length}\n${nextL.chapterLabel||nextL.name.replace(/^Cap\. \d+ · /,"")}` : "🏆 Portugal Livre!";
    transitionGfx.clear();transitionGfx.fillStyle(0x000000,1);transitionGfx.fillRect(0,0,960,540);
    transitionLabel.setText(label);
    scene.tweens.add({targets:[transitionGfx,transitionLabel],alpha:1,duration:350,ease:"Sine.easeIn",onComplete:()=>{
      onMidpoint?.();
      scene.time.delayedCall(560,()=>{
        scene.tweens.add({targets:[transitionGfx,transitionLabel],alpha:0,duration:400,ease:"Sine.easeOut"});
      });
    }});
  }

  function nextLevel(scene){
    const next=currentLevel+1;
    quizOverlay.classList.add("hidden");btnCloseQuiz.classList.add("hidden");
    awaitingQuiz=true;
    scene.physics.pause();
    player.setVelocity(0,0);
    // Robot e porta já desapareceram na animação de abertura — esconder silenciosamente
    player.setAlpha(0);
    if(door){door.setAlpha(0);door.destroy();door=null;}

    // Bónus nível perfeito
    if(livesLostThisLevel===0){
      score+=50;bonusStars.textContent="⭐⭐⭐\n+50 Capítulo Perfeito!";
      bonusStars.classList.add("show");setTimeout(()=>bonusStars.classList.remove("show"),2000);
    }
    livesLostThisLevel=0;

    if(next>=LEVELS.length){
      // Último nível — vitória
      scene.physics.resume();showVictoryScreen(scene);return;
    }

    score+=100;scoreText.setText(`🌹 Pontos: ${score}`);

    // "Sabias que?" — o jogo SÓ avança quando o aluno clica Continuar
    showHistory(next,()=>{
      // Depois do Continuar: carrega o nível e retoma física
      loadLevel(scene,next);
      scene.physics.resume();
    });
    saveGame();
  }


  function showGameOver(){
    try{sceneRef.physics.pause();}catch{}
    awaitingQuiz=true;touch.left=touch.right=touch.jump=false;
    try{player.setVelocity(0,0);}catch{}
    ensureAudio();SFX.gameOver();
    document.getElementById("gameOverOverlay").classList.remove("hidden");
  }

  function robotDance(scene,done){
    if(!player||!scene){done?.();return;}
    const camX=scene.cameras.main.scrollX;
    player.setPosition(camX+480,455);
    player.setVelocity(0,0);player.setFlipX(false);player.setAngle(0);player.setScale(1);
    const t1=scene.tweens.add({targets:player,angle:{from:-14,to:14},duration:120,yoyo:true,repeat:24});
    const t2=scene.tweens.add({targets:player,y:{from:455,to:435},duration:200,yoyo:true,repeat:12});
    scene.time.delayedCall(4400,()=>{try{t1.stop();t2.stop();}catch{}player.setAngle(0);player.y=455;done?.();});
  }

  function startConfetti(durationMs=6000){
    const el=document.getElementById("confetti");if(!el) return;
    el.classList.remove("hidden");el.innerHTML="";
    const emojis=["🌹","🌹","🌹","✨","⭐","📰","✊","🕊️","🎉","🇵🇹","🏅","🌸"];
    const vw=Math.max(320,window.innerWidth||800);
    for(let i=0;i<110;i++){
      const s=document.createElement("span");
      s.textContent=emojis[i%emojis.length];
      s.style.left=(Math.random()*vw)+"px";
      s.style.animationDuration=(3.0+Math.random()*2.5)+"s";
      s.style.animationDelay=(Math.random()*1.2)+"s";
      s.style.opacity=(0.75+Math.random()*0.25).toFixed(2);
      el.appendChild(s);
    }
    if(durationMs>0) setTimeout(()=>{el.classList.add("hidden");},durationMs);
  }

  function showVictoryScreen(scene){
    try{scene.physics.pause();}catch{}
    awaitingQuiz=true;
    robotDance(scene,()=>{
      ensureAudio();SFX.finalWin();
      setTimeout(()=>playGrandola(),500);
      startConfetti(8000);
      const total=quizStats.total,correct=quizStats.correct;
      const pct=total>0?Math.round(correct/total*100):100;
      const medal=pct===100?"🥇 Perfeito!":(pct>=75?"🥈 Muito bem!":(pct>=50?"🥉 Bom esforço!":"📚 Continua a estudar!"));
      document.getElementById("winPlayerName").textContent=playerName||"Cidadão Digital";
      document.getElementById("winScore").textContent=score;
      document.getElementById("winPct").textContent=`${correct}/${total} (${pct}%)`;
      document.getElementById("winMedal").textContent=medal;
      const errEl=document.getElementById("winErrors"),listEl=document.getElementById("winErrorList");
      if(quizStats.errors.length>0&&errEl&&listEl){
        errEl.style.display="block";
        listEl.innerHTML=quizStats.errors.map(e=>`<li>❓ <em>${e.q}</em><br>✗ Respondeste: <strong>${e.wrong}</strong><br>✓ Correto: <strong>${e.correct}</strong></li>`).join("");
      }
      winOverlay.classList.remove("hidden");
    });
  }

  // ===== Coleta de itens =====
  function onCollectItem(playerObj,item){
    const kind=item.getData("kind");
    const shadow=item.getData("shadow");
    // Destruir IMEDIATAMENTE como no Drummond — evita overlap multiplo e som repetido
    if(shadow) shadow.destroy();
    item.destroy();

    if(kind==="cravo_ouro"){
      clearPower(sceneRef);powered=true;
      powerIndicator.setText("⭐ SUPER MODO");
      ensureAudio();SFX.power();
      showFloat(sceneRef,playerObj.x,playerObj.y-50,"⭐ Super Modo!","#cc8800");
      poweredTimer=sceneRef.time.delayedCall(7000,()=>clearPower(sceneRef));
      // Countdown visual
      let secs=7;
      if(powerCountdown) powerCountdown.remove();
      powerCountdown=sceneRef.time.addEvent({delay:1000,loop:true,callback:()=>{
        secs--;
        if(secs>0&&powered) powerIndicator.setText(`⭐ SUPER ${secs}s`);
      }});
    } else if(kind==="heart"){
      if(lives<MAX_LIVES){
        lives++;ensureAudio();SFX.life();
        showFloat(sceneRef,playerObj.x,playerObj.y-50,"❤️ +1 Vida!","#cc2222");
        updateHearts();
      } else {
        score+=15;ensureAudio();SFX.coin();
        scoreText.setText(`🌹 Pontos: ${score}`);
      }
    } else {
      const pts={cravo:10,jornal:15,punho:20}[kind]||10;
      score+=pts;ensureAudio();SFX.coin();
      scoreText.setText(`🌹 Pontos: ${score}`);
      itemsCollected++;
      itemCountText.setText(`📰 Itens: ${itemsCollected}/${itemsTotal}`);
    }
    const p=sceneRef.add.particles(0,0,"spark_item",{x:playerObj.x,y:playerObj.y,speed:{min:50,max:170},lifespan:370,quantity:14,scale:{start:0.9,end:0},gravityY:400});
    sceneRef.time.delayedCall(260,()=>p.destroy());
  }


  function clearPower(scene){
    powered=false;
    if(poweredTimer){try{poweredTimer.remove();}catch{}poweredTimer=null;}
    if(powerCountdown){try{powerCountdown.remove();}catch{}powerCountdown=null;}
    if(powerIndicator) powerIndicator.setText("");
  }

  // ===== Colisão com agente =====
  function onHitMalware(playerObj,mal){
    if(invuln||awaitingQuiz) return;
    if(powered){
      score+=30;scoreText.setText(`🌹 Pontos: ${score}`);
      showFloat(sceneRef,mal.x,mal.y-20,"+30 💪","#cc2222");
      sceneRef.tweens.add({targets:mal,scaleX:0,scaleY:0,alpha:0,duration:260,ease:"Back.easeIn",onComplete:()=>mal.destroy()});
      ensureAudio();SFX.coin();return;
    }
    lives--;livesLostThisLevel++;invuln=true;
    hitFlash.classList.add("active");
    setTimeout(()=>hitFlash.classList.remove("active"),300);
    ensureAudio();SFX.hit();updateHearts();
    // Parar o robot imediatamente
    player.setVelocity(0,-200);
    sceneRef.physics.pause();
    if(lives<=0){
      setTimeout(()=>showGameOver(),800);
    } else {
      // Perde vida → reinicia o nível atual após breve pausa
      setTimeout(()=>{
        invuln=false;awaitingQuiz=false;awaitingStory=false;
        touch.left=touch.right=touch.jump=false;
        loadLevel(sceneRef,currentLevel);
        sceneRef.physics.resume();
      },1000);
    }
  }

  // ===== Touch =====
  function createTouchInput(scene){
    const btnL=document.getElementById("btnLeft"),btnR=document.getElementById("btnRight"),btnJ=document.getElementById("btnJump");
    if(!btnL||!btnR||!btnJ) return;
    function pressBtn(btn){btn.classList.add("pressed");}
    function releaseBtn(btn){btn.classList.remove("pressed");}
    btnL.addEventListener("touchstart",e=>{e.preventDefault();touch.left=true;pressBtn(btnL);},{passive:false});
    btnL.addEventListener("touchend",e=>{e.preventDefault();touch.left=false;releaseBtn(btnL);},{passive:false});
    btnR.addEventListener("touchstart",e=>{e.preventDefault();touch.right=true;pressBtn(btnR);},{passive:false});
    btnR.addEventListener("touchend",e=>{e.preventDefault();touch.right=false;releaseBtn(btnR);},{passive:false});
    btnJ.addEventListener("touchstart",e=>{e.preventDefault();touch.jump=true;pressBtn(btnJ);ensureAudio();},{passive:false});
    btnJ.addEventListener("touchend",e=>{e.preventDefault();touch.jump=false;releaseBtn(btnJ);},{passive:false});
    scene.input.on("pointerdown",ptr=>{ensureAudio();if(ptr.x>scene.scale.width/2) touch.jump=true;});
    scene.input.on("pointerup",()=>{touch.jump=false;});
    scene.input.on("pointerout",()=>{touch.jump=false;});
  }

  });

window.addEventListener("resize",()=>{try{if(window.__abril25_game?.scale)window.__abril25_game.scale.refresh();}catch{}});

// Pausa automática ao mudar de separador
document.addEventListener("visibilitychange",()=>{
  try{
    const game=window.__abril25_game; if(!game) return;
    const scene=game.scene.scenes[0]; if(!scene) return;
    if(document.hidden){scene.physics.pause();}
    else{
      const overlays=["startOverlay","quizOverlay","historyOverlay","gameOverOverlay","winOverlay"];
      const anyOpen=overlays.some(id=>{const el=document.getElementById(id);return el&&!el.classList.contains("hidden");});
      const isPaused=!!(document.getElementById("btnPause")?.textContent?.includes("Continuar"));
      if(!anyOpen&&!isPaused) scene.physics.resume();
    }
  }catch{}
});
